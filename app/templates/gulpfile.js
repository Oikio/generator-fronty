'use strict';
//TODO build watch with $.changed()
//TODO hogan renderer
//TODO test everything
//TODO add tests, maybe?

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync');

var htmlminOps = {
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeOptionalTags: true
};

//Fonts
gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sass({errLogToConsole: true}))
//   FIXME !@#$% bleeding edge, no source maps in w8 for now with .pipe($.sass({sourceComments: 'map'}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src([
    'app/scripts/**/*.js',
    'app/blocks/**/*.js'
  ])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});


// HTML
gulp.task('html', function () {
  var neededFilesFilter = $.filter([
    'blocks/**/*.{html,mustache}',
    'templates/**/*.{html,mustache}'
  ]);

  return gulp.src('app/**/*.{html,mustache}')
    .pipe(neededFilesFilter)
    .pipe($.htmlmin(htmlminOps))
    .pipe(gulp.dest('dist'));
});

// Usref
// FIXME useref and uglify don't play well to provide source map files
gulp.task('usref', function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var htmlFilter = $.filter('**/*.html');

  return gulp.src('app/*.html')
    .pipe($.useref.assets())
    .pipe(jsFilter)
    .pipe($.uglify({outSourceMap: true}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(htmlFilter)
    .pipe($.htmlmin(htmlminOps))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'));
});

// Images
gulp.task('images', function () {
  var svgFilter = $.filter('**/*.svg');

  return gulp.src('app/images/**/*')
//  FIXME imagemin always says (already-optimized)
    .pipe($.changed('dist/images'))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(svgFilter)
    .pipe($.svgmin([
      {
//        cleanupAttrs: false,
//        cleanupEnableBackground: false,
//        cleanupIDs: false,
//        cleanupNumericValues: false,
//        collapseGroups: false
//        convertColors: false,
//        convertPathData: false,
//        convertStyleToAttrs: false,
//        convertTransform: false,
//        mergePaths: false,
//        moveElemsAttrsToGroup: false,
//        moveGroupAttrsToElems: false,
//        removeComments: false,
//        removeDoctype: false,
//        removeEditorsNSData: false,
//        removeEmptyAttrs: false,
//        removeEmptyContainers: false,
//        removeEmptyText: false,
//        removeHiddenElems: false,
//        removeMetadata: false,
//        removeNonInheritableGroupAttrs: false,
//        removeRasterImages: false,
//        removeUnknownsAndDefaults: false,
//        removeUnusedNS: false,
//        removeUselessStrokeAndFill: false,
//        removeViewBox: false,
//        removeXMLProcInst: false,
//        sortAttrs: false,
//        transformsWithOnePath: false
      }
    ]))
    .pipe(svgFilter.restore())
    .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images', 'dist/templates', 'dist/blocks', 'dist/fonts'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['styles', 'scripts', 'html', 'images', 'fonts', 'usref']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Browser-sync
gulp.task('browser-sync', function() {
  browserSync.init(['app/**/*.{html,mustache,css,js,svg,png,apng,gif,jpg,jpeg,ico,appcache}'], {
    server: {
      baseDir: 'app/',
      middleware: function (req, res, next) {
        console.log(req.url);
        next();
      }
    }
  });
});

// Watch
gulp.task('watch', ['browser-sync'], function () {

  // Watch .scss files
  gulp.watch([
    'app/styles/**/*.scss',
    'app/blocks/**/*.scss'
  ], ['styles']);


  // Watch .js files
  gulp.watch([
    'app/scripts/**/*.js',
    'app/blocks/**/*.js'
  ], ['scripts']);

});

gulp.task('distWatch', ['default'], function () {
  gulp.watch(['app'], ['build']);
});
