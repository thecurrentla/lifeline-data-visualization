module.exports = function (eleventyConfig) {
  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // eleventyConfig.addWatchTarget("./_includes/css/");

  // Layout aliases can make templates more portable
  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");

  // minify the html output
  eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // use a filter for simple css minification
  eleventyConfig.addFilter("cssmin", require("./src/utils/minify-css.js"));

  // make the seed target act like prod
  env = env == "seed" ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`,
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
