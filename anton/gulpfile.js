var gulp = require('gulp'), // Подключаем Gulp
		sass = require('gulp-sass'),
		concat = require('gulp-concat');
 
gulp.task('concat_styles', function() {
  return gulp.src('app/css/*.css')
    .pipe(concat('main_prod.css'))
    .pipe(gulp.dest('app/prod/'))
});

gulp.task('sass', function() { // Создаем таск "sass"
	return gulp.src(['app/sass/*.sass', 'app/sass/*.scss']) // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку css
	});

gulp.task('watch', function() {
	gulp.watch(['app/sass/*.sass', 'app/sass/*.scss'], ['concat_styles','sass' ]); // Наблюдение за sass файлами в папке sass
});

gulp.task('default', ['watch']);