import PropTypes from 'prop-types';
export default function Spinner({ size = 8 }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-gray-900`}
      ></div>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};
