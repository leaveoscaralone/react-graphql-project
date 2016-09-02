
const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore Node modules and Bower components
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/node_modules{,/**}',
    '!**/bower_components{,/**}',
    '!**/private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// Lint all files
gulp.task('lint', ['js-lint', 'html-lint', 'css-lint']);

// JavaScript and JSON linter
gulp.task('js-lint', function () {
  return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), {dot: true})
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// HTML linter
gulp.task('html-lint', function () {
  return gulp.src(addDefSrcIgnore(['**/*.html']))
    .pipe($.htmlLint({htmllintrc: '.htmllintrc.json'}))
    .pipe($.htmlLint.format())
    .pipe($.htmlLint.failAfterError());
});

// CSS linter
gulp.task('css-lint', function () {
  return gulp.src(addDefSrcIgnore(['**/*.css']))
    .pipe($.stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// Prepare files for distribution to students (remove solutions)
gulp.task('dist', ['lint'], function () {
  del.sync('dist');
  gulp.src(addDefSrcIgnore(['**']), {dot: true})
    .pipe($.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, ''))
    .pipe(gulp.dest('dist'));
});
