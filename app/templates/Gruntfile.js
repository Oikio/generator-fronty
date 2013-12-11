var localIP = '192.168.1.5';
var lrsnippet = require('connect-livereload')();
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    watch: {
      options: {},
      sass: {
        options: {
          spawn: false
        },
        files: [
          'app/styles/**/*.{scss,sass}',
          'app/fonts/**/*.{css,scss,sass}',
          'app/blocks/**/*.{scss,sass}',
          'app/static/**/*.{scss,sass}'
        ],
        tasks: ['sass', 'autoprefixer']
      },
      hogan: {
        options: {
          spawn: false
        },
        files: ['app/templates/**/*.{html,mustache}', 'app/blocks/**/*.{html,mustache}'],
        tasks: ['hogan']
      },
      concat: {
        options: {
          spawn: false
        },
        files: ['app/blocks/**/*_fish.js'],
        tasks: ['concat:fish']
      }
    },
    browser_sync: {
      files: {
        src: [
          '.tmp/**/*.css',
          '.tmp/**/*.js',
          'app/scripts/**/*.js',
          'app/blocks/**/*.js',
          '!app/blocks/**/*_fish.js',
          'app/**/*.html',
          'app/fonts/**/*',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,apng}',
          'app/static/**/*.{html,js}'
        ]
      },
      options: {
        watchTask: true,
        host: localIP,
        ghostMode: {
          scroll: true,
          links: true,
          forms: true
        }
//        server: {
//          baseDir: 'app'
//        }
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
            return [lrsnippet, mountFolder(connect, 'test'), mountFolder(connect, 'dist')];
          }
        }
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
    sass: {
      options: {
        includePaths: ['app/bower_components/foundation/scss']
      },
      main: {
        files: {
          '.tmp/styles/all.css': 'app/styles/all.scss'
        }
      },
      blocks: {
        files: [
          {
            expand: true,
            cwd: 'app/blocks/',
            src: ['**/!(_)*.scss'],
            dest: '.tmp/blocks/',
            ext: '.css'
          }
        ]
      },
      static: {
        files: [
          {
            expand: true,
            cwd: 'app/static/',
            src: ['**/!(_)*.scss'],
            dest: '.tmp/static/',
            ext: '.css'
          }
        ]
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
      html: ['dist/*.{html,mustache}'],
      css: [
        'dist/styles/{,*/}*.css',
        'dist/blocks/**/*.css',
        'dist/static/**/*.css'
      ],
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
            src: [
              'styles/{,*/}*.css',
              'blocks/**/*.css',
              'static/**/*.css'
            ],
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
            src: [
              'styles/{,*/}*.css',
              'blocks/**/*.css',
              'static/**/*.css'
            ],
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
            src: [
              'templates/**/*.{html,mustache}',
              'blocks/**/*.{html,mustache}'
            ],
            dest: 'dist'
          }
        ]
      },
      distIndex: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: [
              '*.html',
              'static/**/*.html'
            ],
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
              '*',
              '.htaccess',
              'images/{,*/}*.{webp,apng,gif}',
              '*.appcache',
              'fonts/**/**'
            ]
          }
        ]
      },
      prebuild: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/**/*',
              '*.appcache',
              '**/*.{html,mustache}',
              'fonts/**/**',
              '!bower_components/**',
              'blocks/**/*.js',
              '!blocks/**/*_fish.js'
            ]
          }
        ]
      },
      prebuildTmp: {
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
      options: {
        defaultName: function(filename) {
          filename = filename.split('/').pop().split('.').shift();
          return filename;
        }
      },
      blocks: {
        options: {
          namespace: 'devBlocks'
        },
        files: {
          '.tmp/scripts/dev/dev-blocks.js' : [
            'app/blocks/**/*.{html,mustache}',
          ]
        }
      },
      templates: {
        options: {
          namespace: 'devTemplates'
        },
        files: {
          '.tmp/scripts/dev/dev-templates.js' : [
            'app/templates/**/*.{html,mustache}'
          ]
        }
      },
      dist: {
        options: {
          namespace: 'templates'
        },
        files: {
          '.tmp/scripts/dist-templates.js' : [
            'app/blocks/**/*_c.{html,mustache}'
          ]
        }
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
      server: [
        'concat:fish',
        'sass',
        'hogan'
      ],
      dist: [
        'sass',
        'imagemin',
        'htmlmin',
        'svgmin',
        'hogan'
      ],
      prebuild: [
        'sass',
        'hogan'
      ]
    }
  });


  grunt.registerTask('server', 'Starting local server with watch task.', function () {
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'browser_sync',
      'watch'
    ]);
  });

  grunt.registerTask('build', 'Builds project.', function (target) {
    if (target === 'server') {
      return grunt.task.run([
        'build',
        'connect:dist:keepalive'
      ]);
    }
    grunt.task.run([
      'clean:dist',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'cssmin',
      'concat',
      'uglify',
      'copy:dist',
      'usemin'
    ]);
  });
  grunt.registerTask('default', ['build']);

  grunt.registerTask('pre', 'Builds project with no minification.',
    [
      'clean:dist',
      'useminPrepare',
      'concurrent:prebuild',
      'autoprefixer',
      'concat',
      'uglify',
      'copy:prebuild',
      'copy:prebuildTmp',
      'usemin'
    ]
  );
  grunt.registerTask('wPre', 'Watching files for change and compiles project with no minification, can handle server with target \':server\'.', function (target) {
    grunt.config('watch', {
      options: {
        livereload: true
      },
      prebuild: {
        files: ['app/**/**', 'test/**/**'],
        tasks: ['pre']
      }
    });

    if (target === 'server') {
      return grunt.task.run([
        'pre',
        'connect:dist',
        'watch'
      ]);
    } else {
      return grunt.task.run([
        'pre',
        'watch'
      ]);
    }
  });


  var updateBlockList = function () {
    var paths = '';
    grunt.file.recurse('app/blocks/', function (abspath, rootdir, subdir, filename) {
      if (abspath.search(/_.*\.scss/) > -1) {
        var sassImportPath;
        // Searching for /blocks start in path and removing /app (or other folders above)
        sassImportPath = abspath.slice(abspath.search('/blocks'), -5);
        return paths += '@import "..' + sassImportPath + '";\n';
      }
    });
    grunt.log.subhead('Sass blocks list updated:'.yellow);
    grunt.log.writeln(paths);
    return grunt.file.write('app/styles/_blocks.scss', paths);
  };

  grunt.registerTask('uBlocks', 'Updates list of sass blocks in blocks.scss.', function () {
    updateBlockList();
  });

  grunt.registerTask('block', 'Adds block in blocks folder and updates block.scss.', function (name) {
    var CCName;
    CCName = name.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    grunt.file.write('app/blocks/' + name + '/' + name + '.mustache', '<div class="' + name + '">\n\n  \n\n</div>');
    grunt.file.write('app/blocks/' + name + '/_' + name + '.scss', '.' + name + ' {}');
    grunt.file.write('app/blocks/' + name + '/' + name + '.js', '$(function() {\n  \n});');
    grunt.file.write('app/blocks/' + name + '/' + name + '_fish.js', 'gBlocks.' + CCName + ' = {\n   \n};');
    updateBlockList();
  });

  grunt.registerTask('rBlock', 'Removes block in blocks folder and updates block.scss.', function (name) {
    grunt.file['delete']('app/blocks/' + name);
    updateBlockList();
  });

  grunt.registerTask('static', 'Adds static page in "static" folder', function (name) {
    grunt.file.write('app/static/' + name + '/index.html', '<!DOCTYPE html>\n<html lang="ru">\n<head>\n    <meta charset="utf-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">    \n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="">\n    <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico"/>\n\n    <title></title>\n\n    <link rel="stylesheet" href="/static/pageName/pageName.css">\n\n    <!-- build:js /static/pageName/utilities.js -->\n    <script src="/bower_components/modernizr/modernizr.js"></script>\n    <!-- endbuild -->\n\n</head>\n<body>\n\n<div class="layout">\n\n\n\n\n\n</div>\n\n<!-- build:js /static/pageName/pageName.js -->\n<script type="text/javascript" src="/bower_components/jquery/jquery.js"></script>\n<script type="text/javascript" src="/static/pageName/pageName.js"></script>\n<!-- endbuild -->\n\n<script src="http://192.168.1.5:3000/socket.io/socket.io.js"></script>\n<script src="http://192.168.1.5:3001/browser-sync-client.min.js"></script>\n<!--<script src="http://192.168.1.5:8080/target/target-script-min.js#anonymous"></script>-->\n\n</body>\n\n</html>');
    grunt.file.write('app/static/' + name + '/' + name + '.scss', '');
    grunt.file.write('app/static/' + name + '/' + name + '.js', '');
  });

};