const errorMap = {
  BAD_REQUEST: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};