var gulp = require('gulp');
var ts = require('gulp-typescript');
var preprocess = require("gulp-preprocess");
var replace = require('gulp-just-replace');
var print = require('gulp-print').default;

gulp.task('build', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return gulp.src('src/**/*.ts')
        .pipe(print(filepath => `source: ${filepath}`))
        .pipe(tsProject())
        .pipe(preprocess())
        .pipe(replace(/export.*class/g,'class')) // remove export keyword from the transformed js file
        .pipe(print(filepath => `tranformed: ${filepath}`))
        .pipe(gulp.dest('lib'))
});