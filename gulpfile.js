const { src, dest, parallel, series, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const server = browserSync.create();

function html() {
    return src('src/**/*.pug')
        .pipe(pug())
        .pipe(dest('dist'));
}

function css() {
    return src('src/**/*.scss')
        .pipe(sass())
        .pipe(dest('dist'));
}

function copy() {
    return src([
            'src/**/*.js',
            'src/**/*.png',
            'src/**/*.ico',
            'src/**/*.ogg',
            'src/**/*.fnt'
        ])
        .pipe(dest('dist'));
}

const compile = parallel(html, css, copy);

function serveDist(done) {
    server.init({
        server: {
            baseDir: './dist'
        }
    });
    done();
}

function reload(done) {
    server.reload();
    done();
}

function watchSrc() {
    return watch('src/', series(compile, reload));
}

exports.default = series(compile, serveDist, watchSrc);
