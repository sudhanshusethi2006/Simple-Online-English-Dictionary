const { src } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


// compile scss into css

function style() {
    // path of css file
    return gulp.src('./scss/**/*.scss')
        // pass the file to compiler
        .pipe(sass())
        // where to save the css
        .pipe(gulp.dest('./css'))

    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({

        server: {
            baseDir: './',
            index: '/home.html'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', style).on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;