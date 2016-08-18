var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'built/',
    tsSrc = 'app/';

gulp.task('html', function() {
    gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
    gulp.src(appSrc + '**/*.css');
});

gulp.task('copylibs', function() {
    // Copy all CSS from Libraries to the same folder
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(gulp.dest(appSrc + 'libs/css/'));

    // Copy all built files from Angular2 and RxJS. This is tighly related to systemjs.config.js
    gulp.src([
            'node_modules/rxjs/**/*.js',
            'node_modules/rxjs/**/*.js.map',
            'node_modules/@angular/**/*.min.js',
            'node_modules/@angular/**/*.js.map'
        ], {
            base: './node_modules/'
        })
        .pipe(gulp.dest(appSrc + 'libs/'));

    // Copy other standalone dependencies to general 'libs' folder
    return gulp
        .src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(gulp.dest(appSrc + 'libs/'));
});

gulp.task('typescript', function() {
    return gulp
        .src(tsSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appSrc + 'app/'));
});

gulp.task('watch', function() {
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
    gulp.watch(appSrc + 'css/*.css', ['css']);
    gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
    gulp.src(appSrc)
        .pipe(webserver({
            livereload: true,
            open: false
        }));
});

gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);
