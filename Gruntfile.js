module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerMultiTask('fileconstruct', 'Build a file', function () {
		var cwd, dist = this.data.dist, files, path, ref, scripts, src = this.data.src;
		if (!src) return grunt.log.warn('src is required');
		if (!dist) return grunt.log.warn('dist is required');

		cwd = (ref = this.data.cwd) != null ? ref : './';
		files = grunt.file.expand({ cwd: cwd }, src);

		if (!files.length) return grunt.verbose.warn('No src files found');

		path = require('path');
		if (!path) return grunt.log.warn('path lib is required');

		console.log('files:', files);
		console.log(dist);

		if (grunt.file.exists(dist)) {
			grunt.file.delete(dist);
		}
		scripts = "";
		files.forEach(function (file) {
			return scripts += "<script src='" + file + "'></script>\n";
		});
		grunt.file.write(dist, scripts);
		return grunt.template.process;
	});

	grunt.registerMultiTask("wrap", "Wraps source files with specified header and footer", function () {
		var contents, data, devScripts, footer, header, path, tag, tagBlock, tmp;
		data = this.data;
		path = require("path");
		header = grunt.file.read(grunt.template.process(data.header));
		footer = grunt.file.read(grunt.template.process(data.footer));
		contents = grunt.file.read(grunt.template.process(data.content));
		if (data.devScripts) {
			devScripts = grunt.file.read(grunt.template.process(data.devScripts));
		}
		tag = grunt.option('tag' || '');
		if (tag && tag !== true) {
			tagBlock = '<div class="tag-information">' + moment().format('YYYY-MM-DD HH:mm') + ' ' + tag + '</div>';
		}
		tmp = header + contents;
		if (data.devScripts) {
			tmp = tmp + devScripts;
		}
		if (tagBlock) {
			tmp = tmp + tagBlock;
		}
		tmp = tmp + footer;
		grunt.file.write("./.temp/index.html", tmp);
		if (data.devScripts) {
			grunt.file["delete"](grunt.template.process(data.devScripts));
		}
		grunt.log.writeln("File \"" + "./.temp/index.html" + "\" created.");
	});

	grunt.initConfig({

		clean: {
			bower: {
				src: ['./bower_components/']
			},
			dev: {
				src: ['./.temp/']
			}
		},

		bower: {
			install: {
				options: {
					layout: 'byType',
					install: true,
					copy: false
				}
			}
		},

		copy: {
			bower: {
				files: [
					{
						cwd: './bower_components/',
						src: '**',
						dest: './.temp/vendors/',
						expand: true
					}
				]
			},
			scriptSource: {
				files: [
					{
						cwd: './src/scripts',
						src: '**/*.js',
						dest: '.temp/scripts',
						expand: true
					}
				]
			},
			styleSource: {
				files: [
					{
						cwd: './src/',
						src: 'styles/**/*',
						dest: './.temp/',
						expand: true
					}
				]
			}
		},

		fileconstruct: {
			scripts: {
				cwd: "./.temp",
				dist: "./src/views/devScripts.html",
				src: [
					"vendors/angular/angular.js",
					"vendors/angular-resource/angular-resource.js",
					'vendors/angular-bootstrap/ui-bootstrap-tpls.js',
					"vendors/angular-ui-scroll/dist/ui-scroll.js",
					"vendors/angular-ui-scroll/dist/ui-scroll-jqlite.js",
					"vendors/angular-smart-table/dist/smart-table.js",
					"vendors/**/ui-bootstrap-tpls.js",
					"scripts/**/*.js"]
			}
		},

		wrap: {
			dev: {
				header: './src/views/header.html',
				content: './src/views/contents.html',
				devScripts: './src/views/devScripts.html',
				footer: './src/views/footer.html',
				dest: '.'
			}
		}

	});

	grunt.registerTask('build', [
		'clean:dev',
		'bower:install',
		'copy:bower',
		'copy:scriptSource',
		'copy:styleSource',
		'fileconstruct',
		'wrap:dev'
	]);

};