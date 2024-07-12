const normalizeHebrew = (str) => {
  return str
    .replace(/'/g, "") // Remove apostrophes
    .replace(/[\u0591-\u05C7]/g, ""); // Remove Hebrew diacritics
};

module.exports = { normalizeHebrew };
