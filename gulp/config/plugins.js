import replace from "gulp-replace" // search and replace
import plumber from "gulp-plumber" // error handling
import notify from "gulp-notify" // hints
import browserSync from "browser-sync" // livereload
import newer from "gulp-newer" // updates checker
import ifPlugin from "gulp-if" // if statement for gulp


export const plugins = {
    replace,
    plumber,
    notify,
    browserSync,
    newer,
    if: ifPlugin,
}
