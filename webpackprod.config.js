const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const finalPath = path.resolve(__dirname, 'public')

module.exports = {
	mode: "production",
	entry: [
        "./assets/js/app.js",
        "./assets/js/lemniscate.js",
    ],
	output: {
		path: finalPath,
		filename: "[name].js",
		chunkFilename: `[name].min.js`,
	},
	resolve: {
		modules: [path.resolve(__dirname, "./node_modules")],
		alias: {
			jquery: "jquery/dist/jquery.slim.js",
			img   : path.resolve(__dirname, "assets/images"),
			js    : path.resolve(__dirname, "assets/js"),
			scsss : path.resolve(__dirname, "assets/scss"),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
            test: /\.s[ac]ss$/i,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: '../'
                  }
               },
               'css-loader',
               "postcss-loader",
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: false,
                     sassOptions: {
                        outputStyle: 'compressed',
                     },
                  },
               },
            ]
         },
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "img",
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyPlugin([
			{
				from: "./assets/images",
				to: path.join(finalPath, "/images"),
				force: true,
			},
		]),
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery'
      })
	],
};