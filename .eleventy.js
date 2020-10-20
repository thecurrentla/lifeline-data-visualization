const markdownIt = require("markdown-it");

const SpreadsheetTabStats = "ovej33q";
const SpreadsheetTabsCards = "ovej33q";

module.exports = function (eleventyConfig) {
	// A useful way to reference the context we are runing eleventy in
	let env = process.env.ELEVENTY_ENV;

	eleventyConfig.addWatchTarget("includes/css/");

	//Markdown config
	const md = new markdownIt({
		html: true,
	});

	eleventyConfig.addPairedShortcode("markdown", (content) => {
		return md.render(content);
	});

	// make the seed target act like prod
	env = env == "seed" ? "prod" : env;
	return {
		dir: {
			includes: "_includes",
			layouts: "_layouts",
			input: "src/site",
			output: "dist",
			data: `_data/${env}`,
		},
		templateFormats: ["njk", "md"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
