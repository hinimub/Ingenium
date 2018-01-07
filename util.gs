/**
 * @param {string} trainNo
 */
function isValidTrainNo (trainNo) {
  return /[0-9]{5}/.test(trainNo);
}

function normalizeDate(date) {
  date = date.replace(/\//g, '-');
  return date;
}

function isValidDate() {
  
}
