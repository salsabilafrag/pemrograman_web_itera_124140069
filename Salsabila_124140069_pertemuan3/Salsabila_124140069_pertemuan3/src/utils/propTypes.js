import PropTypes from 'prop-types';

// Bentuk (shape) objek buku, dipakai ulang di banyak komponen untuk PropTypes
export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
});
