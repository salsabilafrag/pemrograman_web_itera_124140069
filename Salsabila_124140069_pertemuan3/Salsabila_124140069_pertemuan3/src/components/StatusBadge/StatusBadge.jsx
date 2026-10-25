import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../utils/constants';
import './StatusBadge.css';

/** Komponen reusable #1: label berwarna untuk status buku */
function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
};

export default StatusBadge;
