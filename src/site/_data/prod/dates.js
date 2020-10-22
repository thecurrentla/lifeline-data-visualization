const axios = require("axios");

const seed = require("../../../utils/save-seed.js");
const parse_date = require("../../../utils/parse-date.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabIDs = ["onyp2mz", "od6", "ovy9w99"];

module.exports = () => {
	var requests = [];
	tabIDs.forEach((tabID) => {
		requests.push(axios.get(`https://spreadsheets.google.com/feeds/list/${sheetID}/${tabID}/public/values?alt=json`));
	});

	return Promise.all(requests).then((responses) => {
		var dates_raw = [];
		var dates = [];

		responses.forEach((response) => {
			var sheet = response.data.feed.entry;

			// console.log(sheet);
			// console.log(typeof sheet);
			sheet.forEach((row) => {
				if (!dates_raw.includes(row.gsx$date.$t)) {
					dates_raw.push(row.gsx$date.$t);
				}
			});
		});

		dates_raw.forEach((item) => {
			dates.push(parse_date(item));
		});

		dates.sort(function (a, b) {
			if (a.date_num > b.date_num) return 1;
			if (a.date_num < b.date_num) return -1;
		});

		// console.log(dates);

		seed(JSON.stringify(dates), `${__dirname}/../dev/dates.json`);
		return dates;
	});
};
