var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var builtSrc = 'built/',
    appSrc = 'app/',
    distSrc = 'dist/';

gulp.task('html', function() {
    gulp.src(builtSrc + '**/*.html');
});

gulp.task('css', function() {
    gulp.src(builtSrc + '**/*.css');
});

gulp.task('css-dist', function() {
    gulp.src(distSrc + '**/*.css');
});

gulp.task('copylibs', function() {
    // Copy all CSS from Libraries to the same folder
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(gulp.dest(builtSrc + 'libs/css/'));

    // Copy all built files from Angular2 and RxJS. This is tighly related to systemjs.config.js
    gulp.src([
            'node_modules/rxjs/**/*.js',
            'node_modules/rxjs/**/*.js.map',
            'node_modules/@angular/**/*.min.js',
            'node_modules/@angular/**/*.js.map'
        ], {
            base: './node_modules/'
        })
        .pipe(gulp.dest(builtSrc + 'libs/'));

    // Copy other standalone dependencies to general 'libs' folder
    return gulp
        .src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest(builtSrc + 'libs/'));
});

gulp.task('copylibs-dist', function() {
    // Copy all CSS from Libraries to the same folder
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(gulp.dest(distSrc + 'libs/css/'));

    // Copy other standalone dependencies to general 'libs' folder
    return gulp
        .src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest(distSrc + 'libs/'));
});

gulp.task('typescript', function() {
    return gulp
        .src(appSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(builtSrc + 'app/'));
});

gulp.task('watch', function() {
    gulp.watch(appSrc + '**/*.ts', ['typescript']);
    gulp.watch(builtSrc + 'css/*.css', ['css']);
    gulp.watch(builtSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
    gulp.src(builtSrc)
        .pipe(webserver({
            livereload: true,
            open: false
        }));
});

gulp.task('webserver-dist', function() {
    gulp.src(distSrc)
        .pipe(webserver({
            livereload: true,
            open: false
        }));
});


gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);

gulp.task('dist', function (cb) {
  // Copy all CSS from Libraries to the same folder
  gulp.src([
          'node_modules/bootstrap/dist/css/bootstrap.min.css'
      ])
      .pipe(gulp.dest(distSrc + 'libs/css/'));

  // Copy other standalone dependencies to general 'libs' folder
  gulp.src([
          'node_modules/core-js/client/shim.min.js',
          'node_modules/zone.js/dist/zone.js',
          'node_modules/reflect-metadata/Reflect.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js'
      ])
      .pipe(gulp.dest(distSrc + 'libs/'));

  gulp.src([
          builtSrc + 'styles.css'
      ])
      .pipe(gulp.dest(distSrc));

  runSequence(['copylibs-dist', 'css-dist'], 'webserver-dist', cb);
});
