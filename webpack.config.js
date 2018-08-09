var path = require('path');
var webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "development",//development production
    entry: {
        "svga.min": "./src/Canvas/index.js",
        "svga.createjs.min": "./src/CreateJS/index.js",
        "svga.layabox.min": "./src/LayaBox/index.js",
        "svga.ie.min": "./src/Canvas/svgaplayer.ie.js"
    },
    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
        library: 'SVGA',
    },
    module: {
        //loaders  rules
        rules: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-0"]
                }
            }
        ],
    },
    plugins: [
        new UglifyJsPlugin({

                // warnings: true,
                // drop_console: true

                // include: /\.min\.js$/,
                // minimize: true,
                // output: { comments: false }
        })
    ],
}