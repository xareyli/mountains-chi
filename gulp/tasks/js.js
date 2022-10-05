import webpack from "webpack-stream"

export const js = () =>
    app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
            .pipe(app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JavaScript",
                    message: "Error: <%= error.message %>"
                })
            ))
            .pipe(webpack({
                mode: app.isDev ? 'development' : 'production',
                output: {
                    filename: 'app.min.js'
                }
            }))
            .pipe(app.gulp.dest(app.path.build.js))
            .pipe(app.plugins.browserSync.stream())
