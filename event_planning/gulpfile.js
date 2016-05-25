/// <binding BeforeBuild='clean, min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");
    //ngAnnotate = require('gulp-ng-annotate');

var paths = {
    webrootApp: "./src/app/",
    webrootAssets: "./src/assets/"
};

paths.js = paths.webrootApp + "**/*.js";
paths.minJs = paths.webrootAssets + "js/**/*.min.js";
paths.css = paths.webrootAssets + "**/*.css";
paths.minCss = paths.webrootAssets + "css/**/*.min.css";
paths.concatJsDest = paths.webrootAssets + "js/app.min.js";
paths.concatCssDest = paths.webrootAssets + "css/app.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    // we need to set order of minimizing js-files
    return gulp.src([paths.webrootApp + "app.js",
        paths.webrootApp + "components/main/main.module.js",
        paths.webrootApp + "components/login/login.module.js",
        paths.webrootApp + "components/about/about.module.js",
        paths.webrootApp + "components/cities/cities.module.js",
        paths.webrootApp + "components/events/events.module.js",
        paths.js, "!" + paths.minJs], { base: "." }) 
        //.pipe(ngAnnotate({ add: true }))
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);