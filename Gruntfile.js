module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: ['www/_assets/js/*.js', '!www/_assets/js/prototype.js', '!www/_assets/js/region-selector.js', '!www/_assets/js/scripts.js', '!www/_assets/js/scripts.min.js'],
                dest: 'www/_assets/js/scripts.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'www/_assets/js/scripts.min.js': ['www/_assets/js/scripts.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        modernizr: {
            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile": "www/_assets/js/vendor/modernizr-2.7.1.js",

                // [REQUIRED] Path to save out the built file.
                "outputFile": "www/_assets/js/vendor/modernizr-custom.js"
            }
        },
        sass: {
            dev: {
                options: {
                    includePaths: ['www/_assets/scss'],
                    outputStyle: 'compressed',
                    sourceMap: true
                },
                files: {
                    'www/_assets/css/main.css': 'www/_assets/scss/main.scss',
                    'www/_assets/css/main-ie8.css': 'www/_assets/scss/main-ie8.scss'
                }
            }
        },
        assemble: {
            options: {
                flatten: false,
                expand: true,

                assets: 'www/_assets',

                layout: 'default.hbs',
                layoutdir: 'www/_templates/layouts',

                partials: ['www/_templates/partials/*.hbs'],
                data: ['www/_templates/data/*.json']
            },

            dev: {
                files: [{
                    expand: true,
                    cwd: 'www/_templates/pages/',
                    src: '**/*.hbs',
                    dest: 'www/',
                    ext: '.html'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            css: {
                files: ['www/_assets/scss/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['www/_assets/js/**/*.js', '!www/_assets/js/scripts.min.js', '!www/_assets/js/scripts.js'],
                tasks: ['jshint', 'concat:dev']
            },
            hbs: {
                files: ['www/_templates/{,*/}*.hbs', 'www/_templates/{,*/*/}*.hbs', 'www/_templates/{,*/*/*/}*.hbs'],
                tasks: ['assemble']
            },
            html: {
                files: ['www/email.html']
            }
        },
        copy: {
          prototype: {
            files: [{
              expand: true,
              cwd: 'www',
              src: [
                '**/*',
                '!_assets/scss/**/*',
                '!_assets/js/**/*',
                '!_templates/**/*',
                '!_assets/css/*.map',
                '_assets/js/vendor/**/*',
                '_assets/js/scripts.js',
                '_assets/js/region-selector.js',
                '_assets/js/prototype.js'
              ],
              dest: 'prototype/'
            }],
            options: {
              ignore: [

              ]
            }
          },
          screenshots: {
            files: [{
              expand: true,
              cwd: 'screens/',
              src: ['**/*.png'],
              dest: '/Users/henrycharge/Google Drive/_CSR/Beta/Screenshots/',
              rename: function(dest, src) {
                var date = new Date();
                    now = "-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes();

                return dest + src.replace(/\.png$/, now + ".png");
              }
            }]
          },
          latestscreens: {
            files: [{
              expand: true,
              cwd: 'screens/',
              src: ['**/*.png'],
              dest: '/Users/henrycharge/Google Drive/_CSR/Beta/Screenshots/_latest'
            }]
          }
        },
        clean: {
          prototype: [
            "prototype/_assets/",
            "prototype/_templates/",
            "prototype/fasttrack/",
            "prototype/offline/",
            "prototype/*.html"
          ]
        },
        replace: {
            map: {
                src: ['www/_assets/css/*.css'],
                overwrite: true,
                replacements: [{
                    from: 'sourceMappingURL=main.css.map',
                    to: 'Map removed'
                }, {
                    from: 'sourceMappingURL=main-ie8.css.map',
                    to: 'Map removed'
                }]
            },
            scripts: {
                src: ['www/apprentice/*.html', 'www/*.html'],
                overwrite: true,
                replacements: [{
                    from: 'scripts.js',
                    to: 'scripts.min.js'
                }]
            }
        },
        prettify: {
            options: {
                indent: 2,
                wrap_line_length: 78,
                brace_style: 'expand',
            },
            // Specify a number to padcomments
            prototype: {
                files: [{
                    expand: true,
                    cwd: 'prototype/',
                    src: ['fasttrack/*.html', '*.html', '!pattern-library.html'],
                    dest: 'prototype/',
                    ext: '.html'
                }]
            }
        },
        localscreenshots: {
          desktop: {
            options: {
              path: 'screens',
              type: 'png',
              local : {
                  path: 'prototype',
                  port: 5000
              },
              viewport: ['1024x1024']
            },
            src: ['prototype/**/*.html']
          },
          mobile: {
            options: {
              path: 'screens-mob',
              type: 'png',
              local : {
                  path: 'prototype',
                  port: 5000
              },
              viewport: ['420x420']
            },
            src: ['prototype/**/*.html']
          }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'www/_assets/css/*.css',
                        'www/_assets/js/scripts.js',
                        'www/**/*.html'
                    ]
                },
                options: {
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    },
                    watchTask: true,
                    server: {
                        baseDir: "www"
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 7000,
                    base: 'www',
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },
        buildcontrol: {
          options: {
            dir: 'prototype',
            commit: true,
            push: true,
            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
          },
          heroku: {
            options: {
              remote: 'git@heroku.com:csr-ft-prototype.git',
              branch: 'master'
            }
          },
          local: {
            options: {
              remote: '../',
              branch: 'build'
            }
          }
        }

    });

    [
        'assemble',
        'grunt-modernizr',
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-sass',
        'grunt-contrib-concat',
        'grunt-text-replace',
        'grunt-contrib-watch',
        'grunt-contrib-copy',
        'grunt-contrib-clean',
        'grunt-contrib-compress',
        'grunt-browser-sync',
        'grunt-dev-update',
        'grunt-contrib-connect',
        'grunt-prettify',
        'grunt-build-control',
        'grunt-localscreenshots'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('images', ['imageoptim']);

    grunt.registerTask('modern', ['modernizr']);

    grunt.registerTask('dev', ['jshint', 'concat:dev', 'sass', 'assemble', 'connect', 'watch']);

    grunt.registerTask('sync', ['jshint', 'concat:dev', 'sass', 'assemble', 'browserSync', 'watch']);

    grunt.registerTask('proto', ['clean', 'replace:map', 'copy:prototype', 'prettify:prototype']);

    grunt.registerTask('deploy', ['buildcontrol']);

    grunt.registerTask('screens', ['localscreenshots:desktop', 'copy:screenshots', 'copy:latestscreens']);

    grunt.registerTask('screenshots', ['localscreenshots:desktop']);

    grunt.registerTask('mobilescreenshots', ['localscreenshots:mobile']);

    grunt.registerTask('copyscreens', ['copy:screenshots']);


};
