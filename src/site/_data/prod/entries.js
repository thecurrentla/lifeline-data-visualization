// Sheet IDs https://spreadsheets.google.com/feeds/worksheets/18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU/public/basic?alt=json

const axios = require("axios");

const seed = require("../../../utils/save-seed.js");
const parse_date = require("../../../utils/parse-date.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabIDs = ["onyp2mz", "od6", "ovy9w99"];
// const tabIDs = ["oe0qcby", "ok7deqw"];

module.exports = () => {
	var requests = [];
	tabIDs.forEach((tabID) => {
		requests.push(axios.get(`https://spreadsheets.google.com/feeds/list/${sheetID}/${tabID}/public/values?alt=json`));
	});

	return Promise.all(requests).then((responses) => {
		var entries = [];

		responses.forEach((response) => {
			var sheet = response.data.feed.entry;

			// console.log(sheet);
			// console.log(typeof sheet);
			sheet.forEach((row) => {
				const labels = Object.keys(row);
				const values = Object.values(row);

				if (row.gsx$date && row.gsx$time) {
					var item = parse_date(row.gsx$date.$t, row.gsx$time.$t);
				} else {
					var item = parse_date(row.gsx$date.$t);
				}

				for (var key in labels) {
					if (labels.hasOwnProperty(key)) {
						var prop = labels[key].replace("gsx$", "");
						if (labels[key].includes("gsx$") && values[key].$t) {
							item[prop] = values[key].$t;
						}
					}
				}

				// console.log(item);
				// console.log(typeof item);

				if (item["date_num"] != "Invalid Date") {
					entries.push(item);
				}
			});
		});

		entries.sort(function (a, b) {
			if (a.date_num > b.date_num) return 1;
			if (a.date_num < b.date_num) return -1;
		});

		seed(JSON.stringify(entries), `${__dirname}/../dev/entries.json`);
		return entries;
	});
};
