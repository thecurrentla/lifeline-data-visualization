const axios = require("axios");
const seed = require("../../../utils/save-seed.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabID = "ovej33q";

module.exports = () => {
	var categories = [
		{ name: "Health", slug: "health", largest: 0, total: 0 },
		{ name: "Food", slug: "food", largest: 0, total: 0 },
		{ name: "Housing", slug: "housing", largest: 0, total: 0 },
		{ name: "Financial", slug: "financial", largest: 0, total: 0 },
	];

	return new Promise((resolve, reject) => {
		var googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/${tabID}/public/values?alt=json`;
		console.log(`Requesting data from ${googleSheetUrl}`);
		axios
			.get(googleSheetUrl)
			.then((response) => {
				var totals = new Object();
				var largests = new Object();
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

								if (index == 0) {
									largests[prop] = 0;
									totals[prop] = 0;
								}
								if (isNaN(new_value) || prop == "date") {
									continue;
								}

								var current_value = parseInt(largests[prop]);

								if (current_value < new_value) {
									largests[prop] = new_value;
								}

								totals[prop] = new_value + totals[prop];
							}
						}
					}
				});

				categories.forEach((category, index) => {
					category.largest = new Intl.NumberFormat("en-US", {}).format(largests[category.slug]);
					category.total = new Intl.NumberFormat("en-US", {}).format(totals[category.slug]);
				});

				seed(JSON.stringify(categories), `${__dirname}/../dev/categories.json`);
				resolve(categories);
			})
			.catch((error) => {
				console.log("Error :", error);
				reject(error);
			});
	});
};
