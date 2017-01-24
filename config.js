
  /* ---------------------------------------
    CONFIG
   --------------------------------------- */
var dist    = './';

module.exports = {
  dest: {
    js        : dist+'dist/js',
    images    : dist+'public/images',
    css       : dist+'public/css',
    fonts     : dist+'public/fonts'
  },

  path: {
    html      : dist+'*.html',
    htmlEntry : [dist+'*.html', dist+'include/**/*.html'],
    public    : dist+'public',
    webpack   : dist+'assets/scripts/app.js',
    js        : dist+'assets/scripts/**/*.js',
    less      : dist+'assets/less/**/*',
    lessEntry : dist+'assets/less/main.less',
    fonts     : dist+'assets/fonts/**/*',
    images    : dist+'assets/images/**/*',
  },

  browsersync: {
    proxy: 'dwise.dev',
    baseDir: '_site',
    // logConnections: true,
    // port: '80',
    // logLevel: 'debug',
    // logConnections: true,
    watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    }
  }
};