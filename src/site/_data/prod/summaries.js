const axios = require("axios");

const seed = require("../../../utils/save-seed.js");
const parse_date = require("../../../utils/parse-date.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabIDs = ["onyp2mz"];

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

				var category = row.gsx$category;
				var item = new Object();

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

				entries.push(item);
			});
		});

		entries.sort(function (a, b) {
			if (a.date_num > b.date_num) return 1;
			if (a.date_num < b.date_num) return -1;
		});

		seed(JSON.stringify(entries), `${__dirname}/../dev/summaries.json`);
		return entries;
	});
};
