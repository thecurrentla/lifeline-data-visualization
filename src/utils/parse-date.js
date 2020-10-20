const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const toObject = require("dayjs/plugin/toObject");
dayjs.extend(toObject);

module.exports = (date, time) => {
  if (time) {
    // var date_obj = dayjs(date + " " + time, "MM/DD/YYYY h:mm A").toObject();
  } else {
  }
  var date_obj = dayjs(date, "MM/DD/YYYY").toObject();

  var date_unix = new Date(date);
  var date_num = dayjs(date, "MM/DD/YYYY").format("YYYYMMDD");
  var date_short = dayjs(date, "MM/DD/YYYY").format("M/D");
  var date_medium = dayjs(date, "MM/DD/YYYY").format("MMM. D");
  var date_long = dayjs(date, "MM/DD/YYYY").format("MMMM D");

  var dates = {
    date_obj: date_obj,
    date_unix: date_unix,
    date_num: date_num,
    date_short: date_short,
    date_medium: date_medium,
    date_long: date_long,
  };

  return dates;
};
