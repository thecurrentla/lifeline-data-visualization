const axios = require("axios");
const seed = require("../../../utils/save-seed.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabID = "ovej33q";

module.exports = () => {
	var totals = {
		health: 0,
		food: 0,
		housing: 0,
		financial: 0,
		largest: 0,
	};

	return new Promise((resolve, reject) => {
		var googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/${tabID}/public/values?alt=json`;
		console.log(`Requesting data from ${googleSheetUrl}`);
		axios
			.get(googleSheetUrl)
			.then((response) => {
				var sheet = response.data.feed.entry;

				// console.log(sheet);
				// console.log(typeof sheet);
				sheet.forEach((row, index) => {
					const labels = Object.keys(row);
					const values = Object.values(row);

					for (var key in labels) {
						if (labels.hasOwnProperty(key)) {
							if (labels[key].includes("gsx$") && values[key].$t) {
								var prop = labels[key].replace("gsx$", "");

								var new_value = parseInt(values[key].$t);

								if (isNaN(new_value) || !(prop in totals)) {
									continue;
								}

								var current_value = parseInt(totals[prop]);

								// console.log(prop);

								// console.log(current_value);
								// console.log(typeof current_value);
								// console.log(new_value);
								// console.log(typeof new_value);

								if (current_value < new_value) {
									totals[prop] = new_value;
								}
								if (totals["largest"] < new_value) {
									totals["largest"] = new_value;
								}
							}
						}
					}
				});

				// console.log(totals);

				seed(JSON.stringify(totals), `${__dirname}/../dev/stat_totals.json`);
				resolve(totals);
			})
			.catch((error) => {
				console.log("Error :", error);
				reject(error);
			});
	});
};
