const nama = "Salsabila Afra Gunas";
let umur = 20;
const kotaAsal = "Bekasi";

document.getElementById("data-diri").innerHTML = `
  <div class="p-4 bg-blue-50 rounded">
    <h3 class="font-bold text-lg">Data Diri</h3>
    <p>Nama: <strong>${nama}</strong></p>
    <p>Umur: <strong>${umur}</strong> tahun</p>
    <p>Kota Asal: <strong>${kotaAsal}</strong></p>
  </div>
`;



document
  .getElementById("btn-cek-nilai")
  .addEventListener("click", function () {

    const nilai = Number(
      document.getElementById("input-nilai").value
    );

    const hasil = document.getElementById("hasil-nilai");

    if (isNaN(nilai)) {
      hasil.innerHTML = `
        <p class="text-red-500">
          Masukkan nilai terlebih dahulu.
        </p>
      `;
      return;
    }

    if (nilai >= 70) {
      hasil.innerHTML = `
        <p class="text-green-600 font-bold">
          LULUS 🎉
        </p>
        <p>Nilai kamu: ${nilai}</p>
      `;
    } else {
      hasil.innerHTML = `
        <p class="text-red-600 font-bold">
          TIDAK LULUS
        </p>
        <p>Nilai kamu: ${nilai}</p>
      `;
    }

  });



document
  .getElementById("btn-cek-umur")
  .addEventListener("click", function () {

    const umurInput = Number(
      document.getElementById("input-umur").value
    );

    let kategori;

    if (isNaN(umurInput) || umurInput < 0) {
      kategori = "Umur tidak valid";
    } else if (umurInput < 12) {
      kategori = "Anak-anak";
    } else if (umurInput <= 17) {
      kategori = "Remaja";
    } else if (umurInput <= 59) {
      kategori = "Dewasa";
    } else {
      kategori = "Lansia";
    }

    document.getElementById("hasil-umur").innerHTML = `
      <p>
        Umur ${umurInput} tahun termasuk:
        <strong>${kategori}</strong>
      </p>
    `;

  });




document
  .getElementById("btn-hari")
  .addEventListener("click", function () {

    const angkaHari = Number(
      document.getElementById("input-hari").value
    );

    let hari;

    switch (angkaHari) {

      case 1:
        hari = "Monday";
        break;

      case 2:
        hari = "Tuesday";
        break;

      case 3:
        hari = "Wednesday";
        break;

      case 4:
        hari = "Thursday";
        break;

      case 5:
        hari = "Friday";
        break;

      case 6:
        hari = "Saturday";
        break;

      case 7:
        hari = "Sunday";
        break;

      default:
        hari = "Angka hari tidak valid";

    }

    document.getElementById("hasil-hari").innerHTML = `
      <p>
        ${angkaHari} = <strong>${hari}</strong>
      </p>
    `;

  });



document
  .getElementById("btn-grade")
  .addEventListener("click", function () {

    const nilai = Number(
      document.getElementById("input-grade").value
    );

    let grade;

    if (nilai >= 90) {
      grade = "A";
    } else if (nilai >= 80) {
      grade = "B";
    } else if (nilai >= 70) {
      grade = "C";
    } else if (nilai >= 60) {
      grade = "D";
    } else {
      grade = "E";
    }

    // Ternary operator
    const status = nilai >= 70
      ? "Lulus"
      : "Tidak Lulus";

    document.getElementById("hasil-grade").innerHTML = `
      <p>Nilai: <strong>${nilai}</strong></p>
      <p>Grade: <strong>${grade}</strong></p>
      <p>Status: <strong>${status}</strong></p>
    `;

  });



document
  .getElementById("btn-perkalian")
  .addEventListener("click", function () {

    const angka = Number(
      document.getElementById("input-perkalian").value
    );

    if (isNaN(angka)) {
      return;
    }

    let output = `
      <table class="border-collapse border w-full max-w-md">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Operasi</th>
            <th class="border p-2">Hasil</th>
          </tr>
        </thead>
        <tbody>
    `;

    // FOR LOOP
    for (let i = 1; i <= 10; i++) {

      output += `
        <tr>
          <td class="border p-2">
            ${angka} × ${i}
          </td>

          <td class="border p-2">
            ${angka * i}
          </td>
        </tr>
      `;

    }

    output += `
        </tbody>
      </table>
    `;

    document.getElementById("hasil-perkalian").innerHTML =
      output;

  });



function faktorial(angka) {

  if (angka < 0) {
    return null;
  }

  let hasil = 1;

  for (let i = 1; i <= angka; i++) {
    hasil *= i;
  }

  return hasil;
}


document
  .getElementById("btn-faktorial")
  .addEventListener("click", function () {

    const angka = Number(
      document.getElementById("input-faktorial").value
    );

    const hasil = faktorial(angka);

    if (hasil === null) {

      document.getElementById("hasil-faktorial").innerHTML = `
        <p class="text-red-500">
          Faktorial tidak boleh negatif.
        </p>
      `;

      return;
    }

    document.getElementById("hasil-faktorial").innerHTML = `
      <p>
        ${angka}! = <strong>${hasil}</strong>
      </p>
    `;

  });



function isPrima(angka) {

  if (angka < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(angka); i++) {

    if (angka % i === 0) {
      return false;
    }

  }

  return true;
}


document
  .getElementById("btn-prima")
  .addEventListener("click", function () {

    const angka = Number(
      document.getElementById("input-prima").value
    );

    const hasil = isPrima(angka);

    document.getElementById("hasil-prima").innerHTML = hasil
      ? `<p class="text-green-600">${angka} adalah bilangan prima.</p>`
      : `<p class="text-red-600">${angka} bukan bilangan prima.</p>`;

  });



function hitungBMI(berat, tinggiCm) {

  const tinggiMeter = tinggiCm / 100;

  return berat / (tinggiMeter * tinggiMeter);

}


function kategoriBMI(bmi) {

  if (bmi < 18.5) {
    return "Kurus";
  }

  if (bmi < 25) {
    return "Normal";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obesitas";

}


document
  .getElementById("btn-bmi")
  .addEventListener("click", function () {

    const berat = Number(
      document.getElementById("input-berat").value
    );

    const tinggi = Number(
      document.getElementById("input-tinggi").value
    );

    if (
      isNaN(berat) ||
      isNaN(tinggi) ||
      berat <= 0 ||
      tinggi <= 0
    ) {

      document.getElementById("hasil-bmi").innerHTML = `
        <p class="text-red-500">
          Masukkan berat dan tinggi yang valid.
        </p>
      `;

      return;
    }

    const bmi = hitungBMI(berat, tinggi);
    const kategori = kategoriBMI(bmi);

    document.getElementById("hasil-bmi").innerHTML = `
      <p>BMI: <strong>${bmi.toFixed(2)}</strong></p>
      <p>Kategori: <strong>${kategori}</strong></p>
    `;

  });


document
  .getElementById("btn-fizzbuzz")
  .addEventListener("click", function () {

    const output =
      document.getElementById("hasil-fizzbuzz");

    output.innerHTML = "";

    for (let i = 1; i <= 100; i++) {

      let hasil = "";

      if (i % 15 === 0) {
        hasil = "FizzBuzz";
      } else if (i % 3 === 0) {
        hasil = "Fizz";
      } else if (i % 5 === 0) {
        hasil = "Buzz";
      } else {
        hasil = i;
      }

      output.innerHTML += `
        <div class="border rounded p-2 text-center">
          ${hasil}
        </div>
      `;

    }

  });



let mahasiswa = [

  {
    nama: "Afra",
    nim: "24140069",
    jurusan: "Informatika",
    nilai: 85
  },

  {
    nama: "Caca",
    nim: "24150069",
    jurusan: "Sistem Informasi",
    nilai: 90
  },

  {
    nama: "Sabil",
    nim: "24170069",
    jurusan: "Teknologi Informasi",
    nilai: 78
  },

  {
    nama: "Sasa",
    nim: "24270069",
    jurusan: "IT",
    nilai: 95
  },

  {
    nama: "Bibil",
    nim: "24300069",
    jurusan: "Komputer",
    nilai: 70
  }

];



function tampilkanMahasiswa(data = mahasiswa) {

  const tbody =
    document.getElementById("tabel-mahasiswa");

  tbody.innerHTML = "";

  data.forEach((mhs, index) => {

    tbody.innerHTML += `
      <tr>
        <td class="border p-2 text-center">
          ${index + 1}
        </td>

        <td class="border p-2">
          ${mhs.nama}
        </td>

        <td class="border p-2">
          ${mhs.nim}
        </td>

        <td class="border p-2">
          ${mhs.jurusan}
        </td>

        <td class="border p-2 text-center">
          ${mhs.nilai}
        </td>
      </tr>
    `;

  });

}



function mahasiswaNilaiTertinggi() {

  return mahasiswa.reduce(
    (tertinggi, current) =>
      current.nilai > tertinggi.nilai
        ? current
        : tertinggi
  );

}



function rataRataMahasiswa() {

  const total = mahasiswa.reduce(
    (sum, mhs) => sum + mhs.nilai,
    0
  );

  return total / mahasiswa.length;

}



function tampilkanAnalisisMahasiswa() {

  const tertinggi = mahasiswaNilaiTertinggi();
  const rataRata = rataRataMahasiswa();

  const diAtasRata = mahasiswa.filter(
    mhs => mhs.nilai > rataRata
  );

  document.getElementById("info-mahasiswa").innerHTML = `
    <p>
      Nilai tertinggi:
      <strong>${tertinggi.nama}</strong>
      (${tertinggi.nilai})
    </p>

    <p>
      Rata-rata:
      <strong>${rataRata.toFixed(2)}</strong>
    </p>
  `;

  document.getElementById("mahasiswa-atas-rata").innerHTML =
    diAtasRata.length > 0
      ? `
        <ul class="list-disc ml-6">
          ${diAtasRata
            .map(mhs => `
              <li>
                ${mhs.nama} - ${mhs.nilai}
              </li>
            `)
            .join("")}
        </ul>
      `
      : "<p>Tidak ada mahasiswa di atas rata-rata.</p>";

}


tampilkanMahasiswa();
tampilkanAnalisisMahasiswa();



function tampilkanHasilSort(data) {

  document.getElementById("hasil-sort").innerHTML = `
    <ul class="list-disc ml-6">
      ${data
        .map(mhs => `
          <li>
            ${mhs.nama} - ${mhs.nilai}
          </li>
        `)
        .join("")}
    </ul>
  `;

}


document
  .getElementById("sort-asc")
  .addEventListener("click", function () {

    const hasil = [...mahasiswa].sort(
      (a, b) => a.nama.localeCompare(b.nama)
    );

    tampilkanHasilSort(hasil);

  });


document
  .getElementById("sort-desc")
  .addEventListener("click", function () {

    const hasil = [...mahasiswa].sort(
      (a, b) => b.nama.localeCompare(a.nama)
    );

    tampilkanHasilSort(hasil);

  });



let dataCRUD = [
  {
    nama: "Sasa",
    nim: "069",
    jurusan: "Informatika",
    nilai: 90
  },
  {
    nama: "Alsa",
    nim: "096",
    jurusan: "Sistem Informasi",
    nilai: 85
  }
];



function renderCRUD() {

  const tbody =
    document.getElementById("tabel-crud");

  tbody.innerHTML = "";

  dataCRUD.forEach((mhs, index) => {

    tbody.innerHTML += `
      <tr>

        <td class="border p-2">
          ${index + 1}
        </td>

        <td class="border p-2">
          ${mhs.nama}
        </td>

        <td class="border p-2">
          ${mhs.nim}
        </td>

        <td class="border p-2">
          ${mhs.jurusan}
        </td>

        <td class="border p-2">
          ${mhs.nilai}
        </td>

        <td class="border p-2">

          <button
            onclick="editMahasiswa(${index})"
            class="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>

          <button
            onclick="hapusMahasiswa(${index})"
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Hapus
          </button>

        </td>

      </tr>
    `;

  });

}


document
  .getElementById("btn-tambah-mahasiswa")
  .addEventListener("click", function () {

    const nama =
      document.getElementById("crud-nama").value.trim();

    const nim =
      document.getElementById("crud-nim").value.trim();

    const jurusan =
      document.getElementById("crud-jurusan").value.trim();

    const nilai =
      Number(document.getElementById("crud-nilai").value);

    if (!nama || !nim || !jurusan || isNaN(nilai)) {

      alert("Semua data harus diisi!");

      return;
    }

    dataCRUD.push({
      nama,
      nim,
      jurusan,
      nilai
    });

    document.getElementById("crud-nama").value = "";
    document.getElementById("crud-nim").value = "";
    document.getElementById("crud-jurusan").value = "";
    document.getElementById("crud-nilai").value = "";

    renderCRUD();

  });



function editMahasiswa(index) {

  const mhs = dataCRUD[index];

  const namaBaru = prompt(
    "Nama:",
    mhs.nama
  );

  if (namaBaru === null) {
    return;
  }

  const nilaiBaru = prompt(
    "Nilai:",
    mhs.nilai
  );

  if (nilaiBaru === null) {
    return;
  }

  dataCRUD[index].nama = namaBaru;
  dataCRUD[index].nilai = Number(nilaiBaru);

  renderCRUD();

}



function hapusMahasiswa(index) {

  const konfirmasi = confirm(
    "Yakin ingin menghapus mahasiswa ini?"
  );

  if (!konfirmasi) {
    return;
  }

  dataCRUD.splice(index, 1);

  renderCRUD();

}


renderCRUD();



const domOutput =
  document.getElementById("dom-output");

let itemCount = 0;


// Tambah item
document
  .getElementById("btn-tambah-item")
  .addEventListener("click", function () {

    itemCount++;

    const newItem =
      document.createElement("div");

    newItem.className =
      "p-2 mb-2 bg-gray-200 rounded";

    newItem.innerText =
      `Item ${itemCount}`;

    domOutput.appendChild(newItem);

  });


document
  .getElementById("btn-hapus-item")
  .addEventListener("click", function () {

    if (domOutput.lastElementChild) {

      domOutput.removeChild(
        domOutput.lastElementChild
      );

      itemCount--;

    }

  });


document
  .getElementById("btn-ubah-warna")
  .addEventListener("click", function () {

    const colors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-pink-100",
      "bg-purple-100"
    ];

    const randomColor =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    domOutput.className =
      `p-4 mb-4 ${randomColor} rounded min-h-16`;

  });




let posts = [];
let filteredPosts = [];

let currentPage = 1;
const postsPerPage = 5;




async function fetchPosts() {

  const output =
    document.getElementById("api-output");

  output.innerHTML = `
    <p class="text-blue-500">
      Mengambil data...
    </p>
  `;

  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    posts = await response.json();

    filteredPosts = [...posts];

    currentPage = 1;

    renderPosts();

  } catch (error) {

    output.innerHTML = `
      <div class="bg-red-100 text-red-700 p-4 rounded">
        Gagal mengambil data:
        ${error.message}
      </div>
    `;

  }

}


document
  .getElementById("btn-fetch")
  .addEventListener(
    "click",
    fetchPosts
  );



function renderPosts() {

  const output =
    document.getElementById("api-output");

  if (filteredPosts.length === 0) {

    output.innerHTML = `
      <p class="text-red-500">
        Data tidak ditemukan.
      </p>
    `;

    document.getElementById("page-info")
      .textContent = "Halaman 0";

    return;
  }


  const totalPages =
    Math.ceil(
      filteredPosts.length /
      postsPerPage
    );


  if (currentPage > totalPages) {
    currentPage = totalPages;
  }


  const start =
    (currentPage - 1) *
    postsPerPage;

  const end =
    start + postsPerPage;

  const pagePosts =
    filteredPosts.slice(start, end);


  output.innerHTML = `
    <h3 class="font-bold text-xl mb-3">
      Daftar Post
    </h3>
  `;


  pagePosts.forEach(post => {

    output.innerHTML += `
      <article class="p-4 mb-3 bg-gray-100 rounded">

        <h4 class="font-bold capitalize">
          ${post.id}.
          ${post.title}
        </h4>

        <p class="mt-2">
          ${post.body}
        </p>

      </article>
    `;

  });


  document.getElementById("page-info")
    .textContent =
      `Halaman ${currentPage} / ${totalPages}`;

}



document
  .getElementById("search-post")
  .addEventListener("input", function () {

    const keyword =
      this.value.toLowerCase().trim();

    filteredPosts =
      posts.filter(post =>
        post.title
          .toLowerCase()
          .includes(keyword)
      );

    currentPage = 1;

    renderPosts();

  });



document
  .getElementById("btn-prev")
  .addEventListener("click", function () {

    if (currentPage > 1) {

      currentPage--;

      renderPosts();

    }

  });



document
  .getElementById("btn-next")
  .addEventListener("click", function () {

    const totalPages =
      Math.ceil(
        filteredPosts.length /
        postsPerPage
      );

    if (currentPage < totalPages) {

      currentPage++;

      renderPosts();

    }

  });




document
  .getElementById("form-mahasiswa")
  .addEventListener("submit", function (event) {

    event.preventDefault();


    const nama =
      document.getElementById("form-nama")
        .value.trim();

    const nim =
      document.getElementById("form-nim")
        .value.trim();

    const email =
      document.getElementById("form-email")
        .value.trim();

    const nilai =
      Number(
        document.getElementById("form-nilai")
          .value
      );


    const message =
      document.getElementById("form-message");



    if (nama.length < 3) {

      message.innerHTML = `
        <p class="text-red-500">
          Nama minimal 3 karakter.
        </p>
      `;

      return;
    }


    // Validasi NIM
    if (!nim) {

      message.innerHTML = `
        <p class="text-red-500">
          NIM wajib diisi.
        </p>
      `;

      return;
    }


    // Validasi email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      message.innerHTML = `
        <p class="text-red-500">
          Format email tidak valid.
        </p>
      `;

      return;
    }


    // Validasi nilai
    if (
      isNaN(nilai) ||
      nilai < 0 ||
      nilai > 100
    ) {

      message.innerHTML = `
        <p class="text-red-500">
          Nilai harus antara 0 - 100.
        </p>
      `;

      return;
    }


    message.innerHTML = `
      <div class="bg-green-100 text-green-700 p-3 rounded">

        <p class="font-bold">
          Data berhasil divalidasi!
        </p>

        <p>Nama: ${nama}</p>
        <p>NIM: ${nim}</p>
        <p>Email: ${email}</p>
        <p>Nilai: ${nilai}</p>

      </div>
    `;


    this.reset();

  });




const darkModeButton =
  document.getElementById("btn-dark-mode");


const darkMode =
  localStorage.getItem("darkMode");

if (darkMode === "true") {

  document.body.classList.add(
    "bg-gray-900",
    "text-white"
  );

}


darkModeButton.addEventListener(
  "click",
  function () {

    document.body.classList.toggle(
      "bg-gray-900"
    );

    document.body.classList.toggle(
      "text-white"
    );


    const aktif =
      document.body.classList.contains(
        "bg-gray-900"
      );


    localStorage.setItem(
      "darkMode",
      aktif
    );

  }
);



let todos =
  JSON.parse(
    localStorage.getItem("todos")
  ) || [];



function renderTodos() {

  const list =
    document.getElementById("todo-list");

  list.innerHTML = "";


  todos.forEach((todo, index) => {

    const li =
      document.createElement("li");

    li.className =
      "flex items-center justify-between gap-2 p-3 bg-gray-100 rounded";


    const text =
      document.createElement("span");

    text.textContent =
      todo.text;


    if (todo.completed) {

      text.classList.add(
        "line-through",
        "text-gray-400"
      );

    }


    text.addEventListener(
      "click",
      function () {

        todos[index].completed =
          !todos[index].completed;

        saveTodos();

        renderTodos();

      }
    );


    const deleteButton =
      document.createElement("button");

    deleteButton.textContent =
      "Hapus";

    deleteButton.className =
      "bg-red-500 text-white px-3 py-1 rounded";


    deleteButton.addEventListener(
      "click",
      function () {

        todos.splice(index, 1);

        saveTodos();

        renderTodos();

      }
    );


    li.appendChild(text);
    li.appendChild(deleteButton);

    list.appendChild(li);

  });

}



function saveTodos() {

  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );

}



function tambahTodo() {

  const input =
    document.getElementById("todo-input");

  const text =
    input.value.trim();


  if (!text) {

    alert(
      "Tugas tidak boleh kosong."
    );

    return;
  }


  todos.push({

    text: text,

    completed: false

  });


  saveTodos();

  renderTodos();

  input.value = "";

  input.focus();

}


document
  .getElementById("btn-tambah-todo")
  .addEventListener(
    "click",
    tambahTodo
  );



document
  .getElementById("todo-input")
  .addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {
        tambahTodo();
      }

    }
  );



renderTodos();



console.log(
  "Praktikum JavaScript berhasil dijalankan!"
);
