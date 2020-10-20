const axios = require("axios");
const seed = require("../../../utils/save-seed.js");
const parse_date = require("../../../utils/parse-date.js");

const sheetID = "18q-im3-O1-vlCj7XT5TaFkBzocnFWvyBV7XTtyTcqoU";
const tabID = "ovej33q";

module.exports = () => {
  return new Promise((resolve, reject) => {
    var googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/${tabID}/public/values?alt=json`;
    console.log(`Requesting data from ${googleSheetUrl}`);
    axios
      .get(googleSheetUrl)
      .then((response) => {
        var sheet = response.data.feed.entry;
        var results = [];

        // console.log(sheet);
        // console.log(typeof sheet);
        sheet.forEach((row) => {
          var item = parse_date(row.gsx$date.$t);

          const labels = Object.keys(row);
          const values = Object.values(row);

          for (var key in labels) {
            if (labels.hasOwnProperty(key)) {
              if (labels[key].includes("gsx$") && values[key].$t) {
                var prop = labels[key].replace("gsx$", "");
                // console.log(labels[key]);
                // console.log(values[key].$t);

                item[prop] = values[key].$t;
              }
            }
          }

          // console.log(item);
          // console.log(typeof item);

          results.push(item);
        });

        results.sort(function (a, b) {
          if (a.date_num > b.date_num) return 1;
          if (a.date_num < b.date_num) return -1;
        });

        seed(JSON.stringify(results), `${__dirname}/../dev/stats.json`);
        resolve(results);
      })
      .catch((error) => {
        console.log("Error :", error);
        reject(error);
      });
  });
};
