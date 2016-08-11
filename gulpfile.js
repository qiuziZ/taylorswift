/**
 * Created by Anly.Z on 16/8/11.
 */

'use strict';

var gulp = require('gulp'),
	mincss = require('gulp-mini-css'),
	minifyCss = require('gulp-minify-css'),
	stripDebug = require('gulp-strip-debug'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var src = './',
	dist = './dist';




gulp.task('mincss', function () {
	gulp.src(src + 'css/*.css')
		.pipe(mincss())
		.pipe(concat("style.min.css"))
		.pipe(gulp.dest(dist));
});

gulp.task('minjs', function () {
	gulp.src(src + "js/*.js")
		.pipe(concat("bundle.min.js"))
		.pipe(stripDebug())
		.pipe(uglify({outSourceMap: false}))
		.pipe(gulp.dest(dist));
});



gulp.task('default', function () {
	gulp.run( 'mincss','minjs');
});

