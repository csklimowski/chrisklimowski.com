import pugPlugin from "@11ty/eleventy-plugin-pug";
import * as sass from "sass";

export default function (eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
	eleventyConfig.addPlugin(pugPlugin);

    eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent) {
			let result = sass.compileString(inputContent);
			return async (data) => {
				return result.css;
			};
		},
	});

    eleventyConfig.addPassthroughCopy("src/**/*.png");
    eleventyConfig.addPassthroughCopy("src/**/*.gif");
    eleventyConfig.addPassthroughCopy("src/**/*.js");
    eleventyConfig.addPassthroughCopy("src/**/*.ico");
    eleventyConfig.addPassthroughCopy("src/**/*.fnt");
    eleventyConfig.addPassthroughCopy("src/**/*.html");
	
    eleventyConfig.addPassthroughCopy("src/**/*.otf");
}