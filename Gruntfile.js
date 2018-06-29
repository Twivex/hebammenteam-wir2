module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
			src: 'src',
            dest: 'frontend' ,
			jsSrc: ['<%= config.src %>/javascripts/vendor/jquery-1.11.3.min.js',
					'<%= config.src %>/javascripts/vendor/bootstrap.js',
					'<%= config.src %>/javascripts/vendor/response.js',
					'<%= config.src %>/javascripts/custom/{,*/}*.js'],
			jsDest: '<%= config.dest %>/main.js'
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        ''
                    ]
                }
            }
        },
		
		jshint: {
			// define the files to lint
			files: ['<%= config.src %>/javascripts/custom/{,*/}*.js'],
			options: {
				// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
  
        watch: {
            options: {
                livereload: true,
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '<%= config.dest %>/{,*/}*.css',
                    '<%= config.dest %>/{,*/}*.js',
                    'images/{,*/}*'
                ]
            },
			scripts: {
				files: ['**/*.js'],
				tasks: ['jshint','concat'],
				options: {
					spawn: false
				}
			},
            compass: {
                files: ['<%= config.src %>/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: '<%= config.src %>/stylesheets',
                    cssDir: '<%= config.dest %>',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: ['<%= config.src %>/stylesheets'],
                    cssDir: ['<%= config.dest %>'],
                    environment: 'production'
                }
            }
        },
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: '<%= config.jsSrc %>',
				dest: '<%= config.jsDest %>'
			}
		},
		uglify: {
			dist: {
				src: '<%= config.jsSrc %>',
				dest: '<%= config.jsDest %>'
			}
		},
		cssmin: {
			minify: {
				files: {
					'<%= config.dest %>/*.css': '<%= config.dest %>/*.css'
				}
			}
		}
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');



    // Default task(s).
    grunt.registerTask('default', ['connect:livereload', 'compass:dev', 'watch', 'concat']);
    // prod build
    grunt.registerTask('prod', ['compass:prod', 'uglify', 'cssmin']);

};
