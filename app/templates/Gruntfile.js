'use strict';
//var localIP = '192.168.1.5';
var Hogan = require('hogan.js');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    watch: {
      options: {},
      sassMain: {
        options: {
          spawn: false
        },
        files: [
          'app/fonts/**/*.{css,scss,sass}',
          'app/styles/**/*.{scss,sass}',
          'app/blocks/**/_*.{scss,sass}'
        ],
        tasks: ['sass:main', 'autoprefixer:main']
      },
      sassBlocks: {
        options: {
          spawn: false
        },
        files: [
          'app/blocks/**/!(_)*.{scss,sass}'
        ],
        tasks: ['sass:blocks', 'autoprefixer:blocks']
      },
      hogan: {
        options: {
          spawn: false
        },
        files: [
          'app/templates/**/*.{html,mustache}',
          'app/blocks/**/*.{html,mustache}',
        ],
        tasks: ['hogan']
      },
      concat: {
        options: {
          spawn: false
        },
        files: ['app/blocks/**/*_state.js'],
        tasks: ['concat:fish']
      },
      jshint: {
        options: {
          spawn: false
        },
        files: ['app/**/*.js'],
        tasks: ['jshint']
      }
    },
    browserSync: {
      bsFiles: {
        src: [
          '.tmp/**/*.css',
          '.tmp/**/*.js',
          'app/scripts/**/*.js',
          'app/blocks/**/*.js',
          '!app/blocks/**/*_fish.js',
          'app/**/*.html',
          'app/fonts/**/*',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,apng}'
        ]
      },
      options: {
        watchTask: true,
        proxy: {
          host: '0.0.0.0',
          port: 9000
        },
//        host: localIP,
        ghostMode: {
          clicks: true,
          links: true,
          forms: true,
          scroll: true
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      serve: {
        options: {
          middleware: function (connect) {
            return [mountFolder(connect, '.tmp'), mountFolder(connect, 'app')];
          }
        }
      },
      dist: {
        options: {
          livereload: true,
          middleware: function (connect) {
            return [mountFolder(connect, 'test'), mountFolder(connect, 'dist')];
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'app/**/*.js',
        '!app/bower/**'
      ]
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
      serve: '.tmp'
    },
    sass: {
      options: {
        includePaths: ['app/bower/foundation/scss']
      },
      main: {
        files: {
          '.tmp/styles/main.css': 'app/styles/main.scss'
        }
      },
      blocks: {
        files: [
          {
            expand: true,
            cwd: 'app/blocks/',
            src: ['**/*.scss'],
            dest: '.tmp/blocks/',
            ext: '.css'
          }
        ]
      }
    },
    //TODO make second UseminPrepare task with no minification (2.1.0 throws error)
    useminPrepare: {
      html: ['app/index.html'],
      options: {
        dest: 'dist'
//        flow: {
//          steps: { js: ['concat'] },
//          post: {}
//        }
      }
    },
    usemin: {
      html: ['dist/*.{html,mustache}'],
      css: [
        'dist/styles/{,*/}*.css',
        'dist/blocks/**/*.css'
      ],
      options: {
        dirs: ['dist']
      }
    },
    autoprefixer: {
      main: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: ['styles/**/*.css'],
            dest: '.tmp'
          }
        ]
      },
      blocks: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: ['blocks/**/*.css'],
            dest: '.tmp'
          }
        ]
      }
    },
    csso: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: [
              'styles/{,*/}*.css',
              'blocks/**/*.css'
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
            src: ['*.html'],
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
              'images/{,*/}*.{webp,apng,gif}',
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
              '!bower/**',
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
              'blocks/**/*.css'
            ]
          }
        ]
      },
      renderSourceApp: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist/sources',
            src: ['**']
          }
        ]
      },
      renderSourceTmp: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '.tmp',
            dest: 'dist/sources',
            src: [
              'blocks/**',
              'scripts/**',
              'styles/**'
            ]
          }
        ]
      }
    },
    hogan: {
      options: {
        defaultName: function (filename) {
          filename = filename.split('/').pop().split('.').shift();
          return filename;
        }
      },
      blocks: {
        options: {
          namespace: 'devBlocks'
        },
        files: {
          '.tmp/scripts/dev/dev-blocks.js': ['app/blocks/**/*.{html,mustache}']
        }
      },
      templates: {
        options: {
          namespace: 'devTemplates'
        },
        files: {
          '.tmp/scripts/dev/dev-templates.js': [
            'app/templates/**/*.{html,mustache}'
          ]
        }
      },
      dist: {
        options: {
          namespace: 'templates'
        },
        files: {
          '.tmp/scripts/dist-templates.js': [
            'app/blocks/**/*_c.{html,mustache}'
          ]
        }
      }
    },
    concat: {
      fish: {
        files: {
          '.tmp/scripts/dev/state_blocks.js': ['app/blocks/**/*_state.js']
        }
      }
    },
    concurrent: {
      options: {
        limit: 8
      },
      serve: [
        'concat:fish',
        'sass',
        'hogan',
        'jshint'
      ],
      dist: [
        'sass',
        'newer:imagemin',
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


  grunt.registerTask('serve', 'Starting local server with watch task.', function () {
    grunt.task.run([
      'clean:serve',
      'concurrent:serve',
      'autoprefixer',
      'connect:serve',
      'browserSync',
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
      'csso',
      'concat',
      'uglify',
      'copy:dist',
      'usemin',
      'productionIndex'
    ]);
  });
  grunt.registerTask('default', ['build']);

  grunt.registerTask('pre', 'Builds project with no minification.',
    [
      'clean:dist',
      'useminPrepare',
      'concurrent:prebuild',
      'newer:autoprefixer',
      'concat',
      'newer:uglify',
      'newer:copy:prebuild',
      'newer:copy:prebuildTmp',
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

  grunt.registerTask('block', 'Adds block in blocks folder and updates block.scss.', function (target) {
    var CCName;
    CCName = target.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    grunt.file.write('app/blocks/' + target + '/' + target + '.mustache', '<div class="' + target + '">\n\n  \n\n</div>');
    grunt.file.write('app/blocks/' + target + '/_' + target + '.scss', '.' + target + ' {}');
    grunt.file.write('app/blocks/' + target + '/' + target + '.js', '(function () {\n  \'use strict\';\n  \n}());');
    grunt.file.write('app/blocks/' + target + '/' + target + '_state.js', 'gBlocks.' + CCName + ' = {\n   \n};');
    updateBlockList();
  });

  grunt.registerTask('rBlock', 'Removes block in blocks folder and updates block.scss.', function (target) {
    grunt.file['delete']('app/blocks/' + target);
    updateBlockList();
  });

  grunt.registerTask('productionIndex', 'Creates production.html file for production usage', function (target) {
    var template = grunt.file.read('dist/index.html');
    template = template
      .replace(/<!-- start:devMeta -->((.|[\r\n])*?)<!-- end:devMeta -->/g, '')
      .replace(/<!-- start:devTools -->((.|[\r\n])*?)<!-- end:devTools -->/g, '');
    grunt.file.write('dist/index.html', template);
  });

  grunt.registerTask('hoganToHTML', 'Render hogan templates to .html files', function (target) {
    var templates = {};
    var templatesPath = './.tmp/scripts/dev/dev-templates.js';
    var blocksPath = './.tmp/scripts/dev/dev-blocks.js';
    var rendersPath = './dist/';
    var templateRendersPath = './dist/templates/renders/';
    var indexFile = grunt.file.read('dist/index.html');

    templates.$set = function () {
      eval(grunt.file.read(blocksPath));
      eval(grunt.file.read(templatesPath));
    };
    templates.$set();

    for (var template in templates.devTemplates) {
      if (templates.devTemplates.hasOwnProperty(template)) {
        var templateRender = templates.devTemplates[template].render('', templates.devBlocks);
        grunt.file.write(templateRendersPath + template + '.html', templateRender);
        templateRender = indexFile.replace('<!-- insert:content -->', '\n' + templateRender + '\n');
        grunt.file.write(rendersPath + template + '.html', templateRender);
      }
    }
  });

  grunt.registerTask('render', 'Build and render hogan templates to .html files', function (target) {
    grunt.task.run([

    ]);
    grunt.task.run([
      'build',
      'copy:renderSourceApp',
      'copy:renderSourceTmp',
      'hoganToHTML'
    ]);
  });

};