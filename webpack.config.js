var path = require('path');
var webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var es3ifyPlugin = require('es3ify-webpack-plugin');

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
                test: /\.js?$/, 
                loaders: ['es3ify-loader']
            },
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                //plugins:["transform-es3-property-literals","transform-es3-member-expression-literals"],
                query: {
                    presets: ['es2015', "stage-0"]
                }
            }
        ],
    },
    plugins: [
        
        // new UglifyJsPlugin({

        //         warnings: true,
        //         screw_ie8: false,
        //         drop_console: true,

        //         include: /\.min\.js$/,
        //         minimize: true,
        //         mangle: {
        //             screw_ie8: false
        //         },
        //         output: { comments: false,screw_ie8:false }
        // }),
        new es3ifyPlugin()
    ],
}