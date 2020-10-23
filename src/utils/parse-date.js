const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const toObject = require("dayjs/plugin/toObject");
dayjs.extend(toObject);

module.exports = (date, time) => {
	var date_obj = dayjs(date, "MM/DD/YYYY").toObject();

	var date_unix = new Date(date);
	var date_datetime = dayjs(date, "MM/DD/YYYY").format();
	var date_num = dayjs(date, "MM/DD/YYYY").format("YYYYMMDD");
	var date_slug = dayjs(date, "MM/DD/YYYY").format("MMM-DD");
	var date_short = dayjs(date, "MM/DD/YYYY").format("M/D");
	var date_medium = dayjs(date, "MM/DD/YYYY").format("MMM D");
	var date_long = dayjs(date, "MM/DD/YYYY").format("MMMM D");

	if (time) {
		var time_obj = dayjs(date + " " + time, "MM/DD/YYYY h:mm A").toObject();
		var time_num = time_obj.hours.toString() + ":" + time_obj.minutes.toString();

		// date_slug = date_slug + "-" + time_obj.hours.toString();
	} else {
		var time_num = null;
	}

	var dates = {
		date_num: date_num,
		date_datetime: date_datetime,
		date_slug: date_slug,
		date_short: date_short,
		date_long: date_long,
		time_num: time_num,
	};

	return dates;
};
