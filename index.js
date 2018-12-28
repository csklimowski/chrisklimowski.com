var Metalsmith = require('metalsmith'),
	collections = require('metalsmith-collections'),
	markdown = require('metalsmith-markdown'),
	jade = require('metalsmith-jade'),
	layouts = require('metalsmith-layouts'),
	sass = require('metalsmith-sass'),
	autoprefixer = require('metalsmith-autoprefixer'),
	watch = require('metalsmith-watch'),
	serve = require('metalsmith-serve');

Metalsmith(__dirname)
	.use(collections({
		projects: {
			pattern: 'projects/*/index.jade',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(markdown())
	.use(jade({
		useMetadata: true
	}))
	.use(layouts({
		engine: 'jade'
	}))
	.use(sass())
	.use(autoprefixer())
	.use(watch())
	.use(serve({
		port: 8000
	}))
	.build(function(err) {
		if (err) throw err;
	});