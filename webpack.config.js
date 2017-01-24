var config   = require('./config');
var webpack  = require('webpack');


module.exports = {
    entry: config.path.webpack,
    output: {
        filename: "app.js"
    },
    resolve: {
        modulesDirectories: [
            './bower_components', 
            './node_modules', 
            './assets/scripts'
        ],
        alias: {
            "jquery"         : "jquery/dist/jquery.min.js"
        }    
    },
    module: {
        loaders: [
            // { test: /jquery\.js$/, loader: 'expose?$' },
            // { test: /jquery\.js$/, loader: 'expose?jQuery' }
        ]
    },
    
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]  
};