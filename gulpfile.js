var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    less          = require('gulp-less'),
    prefix        = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'),
    gutil         = require('gulp-util'),
    plumber       = require('gulp-plumber'),
    filter        = require('gulp-filter'),
    rename        = require('gulp-rename'),
    notify        = require('gulp-notify'),
    sourcemaps    = require('gulp-sourcemaps'),
    config        = require('./config.js'),
    webpack       = require('webpack-stream'),
    imagemin      = require('gulp-imagemin'),
    shell         = require('gulp-shell'),
    imageResize   = require('gulp-image-resize'),
    strip         = require('gulp-strip-comments'),
    webpackConfig = require('./webpack.config.js'),
    fileinclude   = require('gulp-file-include');


/**
 * handle error notifications 
 */
onError = function(err) {
    gutil.beep();
    console.error(err.message);
    this.emit('end');
}




/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync.init([config.browsersync.baseDir],{
        server: config.browsersync
    });
});


/**
 * Compile files from _less into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('less', function () {
    return gulp.src(config.path.lessEntry)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(plumber.stop())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('_site/'+config.dest.css))
        .pipe(browserSync.reload({stream:true}));
        // .pipe(gulp.dest(config.dest.css));
});


gulp.task("webpack", function() {
    return gulp.src(config.path.webpack)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(webpack( webpackConfig ))
        .pipe(plumber.stop())
        .pipe(gulp.dest(config.dest.js))
        .pipe(gulp.dest('_site/'+config.dest.js))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("build_infinite", function() {
    gulp.src('./assets/scripts/infinite.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(strip())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist'));

    gulp.src('./assets/scripts/infinite.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist'));
});


/*
copy all font files from _assets/fonts to _sites/public/fonts (set in config file)
 */
gulp.task('fonts', function () {
    return gulp.src(config.path.fonts)
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2,css,js}'))
        .pipe(gulp.dest('_site/'+config.dest.fonts))
        .pipe(browserSync.reload({stream:true}));
});


/*
Compress all images in the assets/images folder and place in  _sites/public/images (set in config file)
 */
gulp.task('images',function(){
    return gulp.src(config.path.images)
        .pipe(filter('**/*.{png,jpg}'))
        .pipe(imageResize({
              width : 500,
              crop : false
            }))
        .pipe(imagemin())
        .pipe(gulp.dest('_site/'+config.dest.images))
        .pipe(browserSync.reload({stream:true}));
});





gulp.task('html', function() {
    return gulp.src(config.path.html)
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('_site/'))
    .pipe(browserSync.reload({stream:true}));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', [ 'images', 'fonts', 'less', 'html', 'webpack'],function () {
    //written this was to catch new files added
    gulp.watch( config.path.less, function(){
        gulp.start(['less']);    
    });
    gulp.watch( config.path.htmlEntry, function(){
        gulp.start(['html']);    
    });

    gulp.watch( config.path.js, function(){
        gulp.start(['webpack']);    
    });

    gulp.watch( config.path.images, function(){
        gulp.start(['images']);
    });
    gulp.watch( config.path.fonts, function(){
        gulp.start(['fonts']);
    });
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('serve', ['browser-sync', 'watch', ]);
gulp.task('build', [ 'images', 'fonts', 'less', 'html', 'webpack', 'build_infinite']);

gulp.task('deploy', [ 'build'], shell.task([
  'git subtree push --prefix _site origin gh-pages',
]));


