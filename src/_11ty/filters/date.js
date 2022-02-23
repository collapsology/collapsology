const { DateTime } = require("luxon");

/**
 * Format dates to ISO
 *
 * @param {Date} date - JS date
 * @return {String} formatted date
 */

const dateISO = function (date) {
  const jsDate = new Date(date);  
  const dt = DateTime.fromJSDate(jsDate);
  return dt.toISO();
};

/**
 * Format dates to readable
 *
 * @param {Date} date - JS date
 * @param {String} locale - locale code
 * @return {String} formatted date
 */

const dateFull = function (date, locale = "en") {
  const jsDate = new Date(date);  
  const dt = DateTime.fromJSDate(jsDate);
  return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
};

/**
 * Get year from date
 *
 * @param {Date} date - JS date
 * @return {String} formatted year
 */

 const dateYear = function(date) {
  const jsDate = new Date(date);  
  const fullYear = jsDate.getFullYear();
  return fullYear;
}

/**
 * Format date for feeds
 *
 * @param {Date} date - JS date
 * @return {String} formatted year
 */

 const dateFeed = function(date) {
  const jsDate = new Date(date);  
  const dt = DateTime.fromJSDate(jsDate);
  return dt.toHTTP();
}

module.exports = { dateISO, dateFull, dateYear, dateFeed };
