'use strict';
 
/**
 * Tugas Kuliah Tracker
 * Dashboard daftar tugas mahasiswa dengan localStorage dan API publik.
 */
 
// ---------- Konstanta (const) ----------
const STORAGE_KEY = 'tugasKuliah.v1';
const API = {
  quote: 'https://dummyjson.com/quotes/random',
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=5',
};
const MS_PER_DAY = 86_400_000;
 
// ---------- Fungsi bantu (arrow functions) ----------
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
 
const toDateInput = (date) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};
 
const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
 
const generateId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
 
// ---------- Class TaskItem ----------
class TaskItem {
  constructor({ id = generateId(), title, course = '', deadline = '', priority = 'sedang', done = false, createdAt = Date.now() }) {
    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.deadline = deadline;
    this.priority = priority;
    this.done = done;
    this.createdAt = createdAt;
  }
 
  /** Selisih hari dari hari ini ke deadline (null jika tanpa deadline). */
  get daysLeft() {
    if (!this.deadline) return null;
    const today = new Date(`${toDateInput(new Date())}T00:00:00`);
    const due = new Date(`${this.deadline}T00:00:00`);
    return Math.round((due - today) / MS_PER_DAY);
  }
 
  get isOverdue() {
    return !this.done && this.daysLeft !== null && this.daysLeft < 0;
  }
 
  /** Label deadline yang ramah dibaca. */
  get deadlineLabel() {
    const d = this.daysLeft;
    if (d === null) return { text: 'Tanpa deadline', cls: '' };
    if (this.done) return { text: formatDate(this.deadline), cls: '' };
    if (d < 0) return { text: `Terlambat ${Math.abs(d)} hari`, cls: 'badge--late' };
    if (d === 0) return { text: 'Hari ini!', cls: 'badge--soon' };
    if (d <= 2) return { text: `${d} hari lagi`, cls: 'badge--soon' };
    return { text: `${d} hari lagi`, cls: '' };
  }
}
 
// ---------- Class DashboardApp ----------
class DashboardApp {
  constructor() {
    this.tasks = [];
    this.filter = 'all';
    this.query = '';
    this.editingId = null;
 
    this.el = {
      clock: document.getElementById('clock'),
      quote: document.getElementById('quote'),
      form: document.getElementById('taskForm'),
      formTitle: document.getElementById('formTitle'),
      title: document.getElementById('title'),
      course: document.getElementById('course'),
      deadline: document.getElementById('deadline'),
      priority: document.getElementById('priority'),
      submitBtn: document.getElementById('submitBtn'),
      cancelBtn: document.getElementById('cancelBtn'),
      search: document.getElementById('search'),
      list: document.getElementById('taskList'),
      clearDone: document.getElementById('clearDone'),
      progress: document.getElementById('progress'),
      progressBar: document.getElementById('progressBar'),
      statTotal: document.getElementById('statTotal'),
      statActive: document.getElementById('statActive'),
      statDone: document.getElementById('statDone'),
      statOverdue: document.getElementById('statOverdue'),
    };
  }
 
  // ----- Inisialisasi -----
  async init() {
    this.bindEvents();
    this.startClock();
 
    const hasData = this.load();
    this.render();
 
    // Jalankan pemanggilan API secara paralel
    const jobs = [this.fetchQuote()];
    if (!hasData) jobs.push(this.seedFromApi());
    await Promise.allSettled(jobs);
  }
 
  // ----- localStorage -----
  /** @returns {boolean} true jika sudah ada data tersimpan sebelumnya */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return false;
      this.tasks = JSON.parse(raw).map((data) => new TaskItem(data));
      return true;
    } catch (err) {
      console.error('Gagal membaca localStorage:', err);
      return false;
    }
  }
 
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (err) {
      console.error('Gagal menyimpan ke localStorage:', err);
    }
  }
 
  // ----- API eksternal (async/await) -----
  async fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
 
  async fetchQuote() {
    try {
      const { quote, author } = await this.fetchJson(API.quote);
      this.el.quote.innerHTML = `“${escapeHtml(quote)}”<em>— ${escapeHtml(author)}</em>`;
    } catch (err) {
      this.el.quote.textContent = 'Tetap semangat mengerjakan tugasmu! 💪';
    }
  }
 
  /** Mengisi daftar awal dari JSONPlaceholder saat pertama kali dibuka. */
  async seedFromApi() {
    try {
      const todos = await this.fetchJson(API.todos);
      const today = new Date();
      const seeded = todos.map(({ title, completed }, index) => {
        const due = new Date(today.getTime() + (index + 1) * MS_PER_DAY);
        return new TaskItem({
          title,
          course: 'Contoh (JSONPlaceholder)',
          deadline: toDateInput(due),
          priority: ['rendah', 'sedang', 'tinggi'][index % 3],
          done: completed,
        });
      });
      this.tasks = [...seeded, ...this.tasks];
      this.save();
      this.render();
    } catch (err) {
      console.warn('Seed data gagal, mulai dari daftar kosong.', err);
      this.save();
    }
  }
 
  // ----- CRUD (immutable: spread & map & filter) -----
  addTask(data) {
    this.tasks = [new TaskItem(data), ...this.tasks];
    this.save();
    this.render();
  }
 
  updateTask(id, changes) {
    this.tasks = this.tasks.map((task) => (task.id === id ? new TaskItem({ ...task, ...changes }) : task));
    this.save();
    this.render();
  }
 
  toggleTask(id) {
    const target = this.tasks.find((task) => task.id === id);
    if (target) this.updateTask(id, { done: !target.done });
  }
 
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    if (this.editingId === id) this.resetForm();
    this.save();
    this.render();
  }
 
  clearDone() {
    const count = this.tasks.filter(({ done }) => done).length;
    if (!count) return;
    if (!confirm(`Hapus ${count} tugas yang sudah selesai?`)) return;
    this.tasks = this.tasks.filter(({ done }) => !done);
    this.save();
    this.render();
  }
 
  // ----- Form -----
  startEdit(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    const { title, course, deadline, priority } = task;
    this.editingId = id;
    Object.assign(this.el.title, { value: title });
    this.el.course.value = course;
    this.el.deadline.value = deadline;
    this.el.priority.value = priority;
    this.el.formTitle.textContent = 'Edit Tugas';
    this.el.submitBtn.textContent = 'Simpan';
    this.el.cancelBtn.hidden = false;
    this.el.title.focus();
    this.el.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
 
  resetForm() {
    this.editingId = null;
    this.el.form.reset();
    this.el.formTitle.textContent = 'Tambah Tugas';
    this.el.submitBtn.textContent = 'Tambah';
    this.el.cancelBtn.hidden = true;
  }
 
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: this.el.title.value,
      course: this.el.course.value,
      deadline: this.el.deadline.value,
      priority: this.el.priority.value,
    };
    if (!data.title.trim()) return;
 
    if (this.editingId) this.updateTask(this.editingId, data);
    else this.addTask(data);
    this.resetForm();
  }
 
  // ----- Event -----
  bindEvents() {
    this.el.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.el.cancelBtn.addEventListener('click', () => this.resetForm());
    this.el.clearDone.addEventListener('click', () => this.clearDone());
 
    this.el.search.addEventListener('input', ({ target }) => {
      this.query = target.value.toLowerCase();
      this.render();
    });
 
    document.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filter = btn.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((b) => b.classList.toggle('is-active', b === btn));
        this.render();
      });
    });
 
    // Event delegation untuk checkbox / edit / hapus
    this.el.list.addEventListener('click', ({ target }) => {
      const item = target.closest('[data-id]');
      if (!item) return;
      const { id } = item.dataset;
      const action = target.dataset.action;
      if (action === 'edit') this.startEdit(id);
      if (action === 'delete') this.deleteTask(id);
    });
    this.el.list.addEventListener('change', ({ target }) => {
      if (target.dataset.action === 'toggle') this.toggleTask(target.closest('[data-id]').dataset.id);
    });
  }
 
  startClock() {
    const tick = () => {
      this.el.clock.textContent = new Date().toLocaleString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    };
    tick();
    setInterval(tick, 30_000);
  }
 
  // ----- Rendering (template literals) -----
  get visibleTasks() {
    const order = { tinggi: 0, sedang: 1, rendah: 2 };
    return this.tasks
      .filter(({ done }) => (this.filter === 'all' ? true : this.filter === 'done' ? done : !done))
      .filter(({ title, course }) => `${title} ${course}`.toLowerCase().includes(this.query))
      .sort((a, b) => {
        if (a.done !== b.done) return a.done - b.done;
        if (a.deadline !== b.deadline) return (a.deadline || '9999').localeCompare(b.deadline || '9999');
        return order[a.priority] - order[b.priority];
      });
  }
 
  renderTask(task) {
    const { id, title, course, priority, done } = task;
    const { text, cls } = task.deadlineLabel;
    return `
      <li class="task task--${priority} ${done ? 'task--done' : ''}" data-id="${id}">
        <input type="checkbox" data-action="toggle" ${done ? 'checked' : ''} aria-label="Tandai selesai: ${escapeHtml(title)}">
        <div>
          <div class="task__title">${escapeHtml(title)}</div>
          <div class="task__meta">
            ${course ? `<span>📖 ${escapeHtml(course)}</span>` : ''}
            <span class="badge ${cls}">⏰ ${text}</span>
            <span>Prioritas: ${priority}</span>
          </div>
        </div>
        <div class="task__actions">
          <button class="icon-btn" data-action="edit" title="Edit" aria-label="Edit tugas">✏️</button>
          <button class="icon-btn" data-action="delete" title="Hapus" aria-label="Hapus tugas">🗑️</button>
        </div>
      </li>`;
  }
 
  renderStats() {
    const total = this.tasks.length;
    const done = this.tasks.filter(({ done }) => done).length;
    const overdue = this.tasks.filter((t) => t.isOverdue).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
 
    this.el.statTotal.textContent = total;
    this.el.statActive.textContent = total - done;
    this.el.statDone.textContent = done;
    this.el.statOverdue.textContent = overdue;
    this.el.progressBar.style.width = `${percent}%`;
    this.el.progress.setAttribute('aria-valuenow', percent);
    this.el.progress.title = `${percent}% selesai`;
  }
 
  render() {
    const tasks = this.visibleTasks;
    this.el.list.innerHTML = tasks.length
      ? tasks.map((task) => this.renderTask(task)).join('')
      : '<li class="empty">Tidak ada tugas. Tambahkan tugas pertamamu di atas! 🎉</li>';
    this.renderStats();
  }
}
 
// ---------- Jalankan aplikasi ----------
const app = new DashboardApp();
app.init();