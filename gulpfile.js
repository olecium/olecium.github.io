var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var concatCss 	= require('gulp-concat-css');
var csso        = require('gulp-csso');

// для правильной работы не забудьте подключить плагины к своему проекту

// Компилируем Less при помощи плагина gulp-scss
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss") // находим все scss файлы в папке scss 
        .pipe(sass.sync().on('error', sass.logError))
        //.pipe(sass()) // собственно компилируем их
        //.pipe(csso()) // если нужно - сжимаем css код (если не нужно, строчку можно удалить)
        .pipe(concatCss('main.css')) // при желании можно объединить все в один css-файл 
        .pipe(gulp.dest("src/css")) // выгружаем файлы в папку app в раздел css 
        .pipe(browserSync.stream()); // при желании можно обновить browser-sync после изменений
});

// Настраиваем сервер browser-sync для отслеживания изменений в проекте 
gulp.task('serve', ['sass'], function() {
    // Запускаем сервер и указываем за какой папкой нужно следить 
    browserSync.init({
        server: "./src"
    });
    gulp.watch("src/scss/*.scss", ['sass']); // следим за изменениями scss файлов и сразу запускаем таск sass 
    gulp.watch("src/*.html").on('change', browserSync.reload); // запускаем перезагрузку страницы при изменениях html 
});


gulp.task('default', ['serve']); // делаем это стандартным таском
