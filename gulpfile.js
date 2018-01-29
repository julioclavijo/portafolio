//cargar los modulos
//procesar los modulos
//procesar script
//vigilar cambios

const gulp = require('gulp');
var pug = require ('gulp-pug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var postcss  = require('gulp-postcss');
var cssnano  = require('cssnano');

const postcssPlugins = [
  cssnano({
    core: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
];

const sassOptions = {
  outputStyle: 'expanded',
  includePaths: ['node_modules']
};


gulp.task('html', function () {
    return gulp.src('src/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});

gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/*.{eot,woff,woff2,ttf,svg}')
        .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('css', function(){
  gulp.src('src/assets/scss/style.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js','src/assets/js/*.js'])
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        injectChanges: true,
        files: ['*.html', './dist/**/*.{html,css,js}'],
        server: "./dist/",
    });
});

gulp.task('imagemin', function () {
    return gulp.src('src/assets/images/*.{jpg,jpeg,png,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('watch', function () {
    gulp.watch('src/assets/images/**/*.{jpg,jpeg,png,gif,svg}', ['imagemin']);
    gulp.watch('src/assets/fonts/*.{eot,woff,woff2,ttf,svg}', ['fonts']);
    gulp.watch('src/assets/scss/**/*.scss', ['css']);
    gulp.watch('src/assets/js/**/*.js', ['scripts']);
    gulp.watch('src/**/*.pug', ['html']);
});

gulp.task('default', ['css','html','fonts','scripts', 'browser-sync', 'imagemin', 'watch', ]);
