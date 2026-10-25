import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { STATUS_OPTIONS } from '../../utils/constants';
import './Stats.css';

/** Halaman statistik koleksi (memakai custom hook useBookStats) */
function Stats() {
  const { books } = useBooks();
  const { total, counts, percentages, uniqueAuthors } = useBookStats(books);

  return (
    <section className="stats">
      <h1>Statistik Koleksi</h1>

      <div className="stats__summary">
        <div className="stats__card">
          <span className="stats__number" data-testid="stat-total">
            {total}
          </span>
          <span className="stats__caption">Total Buku</span>
        </div>
        <div className="stats__card">
          <span className="stats__number" data-testid="stat-authors">
            {uniqueAuthors}
          </span>
          <span className="stats__caption">Penulis Berbeda</span>
        </div>
      </div>

      <h2>Berdasarkan Status</h2>
      <ul className="stats__bars">
        {STATUS_OPTIONS.map(({ value, label }) => (
          <li key={value} className="stats__bar-row">
            <div className="stats__bar-label">
              <span>{label}</span>
              <span>
                {counts[value]} buku ({percentages[value]}%)
              </span>
            </div>
            <div className="stats__bar-track">
              <div
                className={`stats__bar-fill stats__bar-fill--${value}`}
                style={{ width: `${percentages[value]}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Stats;
