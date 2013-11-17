var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      compass: {
        options: {
          spawn: false
        },
        files: [
          'app/styles/**/*.{scss,sass}',
          'app/fonts/**/*.{css,scss,sass}',
          'app/blocks/**/*.{scss,sass}',
          'app/static/**/*.{scss,sass}'
        ],
        tasks: ['compass', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'app/*.html',
          '{app}/fonts/**/*',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '.tmp/test/*.js',
          'app/static/**/*.{html,js}'
        ]
      },
      hogan: {
        options: {
          spawn: false
        },
        files: ['app/templates/**/*.html', 'app/blocks/**/*.html'],
        tasks: ['hogan:dev']
      },
      concat: {
        options: {
          spawn: false
        },
        files: ['app/blocks/**/*_fish.js'],
        tasks: ['concat:fish']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [mountFolder(connect, '.tmp'), mountFolder(connect, 'app')];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [mountFolder(connect, 'test'), mountFolder(connect, 'dist')];
          }
        }
      }
    },
    open: {
      local: {
        path: 'http://localhost:9000'
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['.tmp', 'dist/*', '!dist/.git*']
          }
        ]
      },
      server: '.tmp'
    },
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        imagesDir: 'app/images',
        javascriptsDir: '.tmp/scripts',
        fontsDir: 'app/fonts',
        importPath: ['app/bower_components', 'app/blocks'],
        relativeAssets: false,
        config: 'compass.rb'
      },
      styles: {},
      blocks: {
        options: {
          sassDir: 'app/blocks',
          cssDir: '.tmp/blocks'
        }
      },
      static: {
        options: {
          sassDir: 'app/static',
          cssDir: '.tmp/static'
        }
      }
    },
    useminPrepare: {
      html: ['app/index.html', 'app/static/**/*.html'],
      options: {
        dest: 'dist'
//        flow: {
//          steps: { 'js': ['concat'] }
//        }
      }
    },
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/{,*/}*.css', 'dist/blocks/**/*.css'],
      options: {
        dirs: ['dist']
      }
    },
    uglify: {
      blocks: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['blocks/**/*.js', '!blocks/**/*_fish.js'],
            dest: 'dist'
          }
        ]
      }
    },
    autoprefixer: {
      make: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: ['styles/{,*/}*.css', 'blocks/**/*.css'],
            dest: '.tmp'
          }
        ]
      }
    },
    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: ['styles/{,*/}*.css', 'blocks/**/*.css', 'static/**/*.css'],
            dest: 'dist'
          }
        ],
        options: {
          report: 'min'
        }
      }
    },
    htmlmin: {
      options: {
        removeCommentsFromCDATA: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeOptionalTags: true
      },
      dist: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['templates/**/*.html', 'blocks/**/*.html', 'static/**/*.html'],
            dest: 'dist'
          }
        ]
      },
      distIndex: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: '*.html',
            dest: 'dist'
          }
        ]
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'app/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: 'dist/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        options: {
          plugins: [
            {
//            cleanupAttrs: false,
//            cleanupEnableBackground: false,
//            cleanupIDs: false,
//            cleanupNumericValues: false,
              collapseGroups: false
//            convertColors: false,
//            convertPathData: false,
//            convertStyleToAttrs: false,
//            convertTransform: false,
//            mergePaths: false,
//            moveElemsAttrsToGroup: false,
//            moveGroupAttrsToElems: false,
//            removeComments: false,
//            removeDoctype: false,
//            removeEditorsNSData: false,
//            removeEmptyAttrs: false,
//            removeEmptyContainers: false,
//            removeEmptyText: false,
//            removeHiddenElems: false,
//            removeMetadata: false,
//            removeNonInheritableGroupAttrs: false,
//            removeRasterImages: false,
//            removeUnknownsAndDefaults: false,
//            removeUnusedNS: false,
//            removeUselessStrokeAndFill: false,
//            removeViewBox: false,
//            removeXMLProcInst: false,
//            sortAttrs: false,
//            transformsWithOnePath: false
            }
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'app/images',
            src: '{,*/}*.svg',
            dest: 'dist/images'
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*.{webp}',
              '*.manifest',
              'fonts/**/**',
              'scripts/fallbacks/*.js'
            ]
          }
        ]
      },
      wdist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*',
              '*.manifest',
              '**/*.html',
              'fonts/**/**',
              'scripts/**/*',
              '!bower_components/**',
              'blocks/**/*.js',
              '!blocks/**/*_fish.js'
            ]
          }
        ]
      },
      wdistTmp: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '.tmp',
            dest: 'dist',
            src: [
              'styles/*.css',
              'blocks/**/*.css',
              'static/**/*.css'
            ]
          }
        ]
      }
    },
    hogan: {
      dev: {
        templates: ['app/blocks/**/*.html', 'app/templates/**/*.html'],
        output: '.tmp/scripts/dev/dev-templates.js',
        binderName: 'hulk'
      },
      dist: {
        templates: 'app/blocks/**/*_c.html',
        output: '.tmp/scripts/dist-templates.js',
        binderName: 'hulk'
      }
    },
    concat: {
      fish: {
        files: {
          '.tmp/scripts/dev/fish_blocks.js': ['app/blocks/**/*_fish.js']
        }
      }
    },
    concurrent: {
      server: ['concat:fish', 'compass', 'hogan'],
      dist: ['compass', 'imagemin', 'htmlmin', 'svgmin', 'hogan'],
      wdist: ['compass', 'hogan']
    }
  });


  grunt.registerTask('server', 'Starting local server with watch task.', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:local', 'connect:dist:keepalive']);
    }
    return grunt.task.run(['clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'open:local', 'watch']);
  });

  grunt.registerTask('build', 'Builds project.',
    [
      'clean:dist',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'cssmin',
      'concat',
      'uglify',
      'copy:dist',
      'usemin'
    ]
  );
  grunt.registerTask('default', ['build']);

  grunt.registerTask('prebuild', 'Builds project with no minification.',
    [
      'clean:dist',
      'useminPrepare',
      'concurrent:wdist',
      'autoprefixer',
      'concat',
      'uglify',
      'copy:wdist',
      'copy:wdistTmp',
      'usemin'
    ]
  );
  grunt.registerTask('wdist', 'Watching files for change and compiles project with no minification, can handle server with target \':server\'.', function (target) {
    grunt.config('watch', {
      options: {
        livereload: true
      },
      prebuild: {
        files: ['app/**/**', 'test/**/**'],
        tasks: ['prebuild']
      }
    });
    if (target === 'server') {
      return grunt.task.run(['prebuild', 'connect:dist', 'open:local', 'watch']);
    } else {
      return grunt.task.run(['prebuild', 'watch']);
    }
  });


  var updateBlockList = function () {
    var paths = '';
    grunt.file.recurse('app/blocks/', function (abspath, rootdir, subdir, filename) {
      if (abspath.search(/_.*\.sass/) > -1) {
        var sassImportPath;
        sassImportPath = abspath.slice(abspath.search('/b-') + 1, -5);
        return paths += '@import "../blocks/' + sassImportPath + '"\n';
      }
    });
    grunt.log.subhead('Sass blocks list updated:'.yellow);
    grunt.log.writeln(paths);
    return grunt.file.write('app/styles/_blocks.sass', paths);
  };

  grunt.registerTask('updateBlockList', 'Updates list of sass blocks in blocks.sass.', function () {
    updateBlockList();
  });

  grunt.registerTask('addB', 'Adds block in blocks folder and updates block.sass.', function (name) {
    var CCName;
    CCName = name.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    grunt.file.write('app/blocks/b-' + name + '/b-' + name + '.html', '<div class="b-' + name + '">\n\n  \n\n</div>');
    grunt.file.write('app/blocks/b-' + name + '/_b-' + name + '.sass', '.b-' + name);
    grunt.file.write('app/blocks/b-' + name + '/b-' + name + '.js', '$(function() {\n  \n});');
    grunt.file.write('app/blocks/b-' + name + '/b-' + name + '_fish.js', 'gBlocks.b' + (CCName.charAt(0).toUpperCase() + CCName.slice(1)) + ' = {\n   \n};');
    updateBlockList();
  });

  grunt.registerTask('removeB', 'Removes block in blocks folder and updates block.sass.', function (name) {
    grunt.file['delete']('app/blocks/b-' + name);
    updateBlockList();
  });

  grunt.registerTask('static', 'Adds static page in "static" folder', function (name) {
    grunt.file.write('app/static/' + name + '/' + name + '.html', '<!DOCTYPE html>\n<html lang="ru">\n<head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <link type="image/x-icon" rel="shortcut icon" href="../../favicon.ico"/>\n\n    <title></title>\n\n    <link rel="stylesheet" href="name.css">\n\n</head>\n<body>\n\n<div class="w-layout">\n\n\n\n\n\n</div>\n\n<!--<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>\n<script type="text/javascript">\n    if (!window.jQuery) {\n        document.write(\'<script src="../../scripts/fallbacks/jquery-2.0.3.min.js"><\\/script>\');\n    }\n</script>-->\n\n<!-- build:js static/name/name.js -->\n<script type="text/javascript" src="name.js"></script>\n<!-- endbuild -->\n\n</body>\n\n</html>');
    grunt.file.write('app/static/' + name + '/' + name + '.sass', '');
    grunt.file.write('app/static/' + name + '/' + name + '.js', '');
  });

};