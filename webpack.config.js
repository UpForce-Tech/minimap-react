const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Build_dir = path.resolve(__dirname, 'example/assets');
const App_dir = path.resolve(__dirname, 'example/src');

const WebpackConfig = {

    entry: {
        minimap: App_dir + '/index.js',
    },

    output: {
        path: Build_dir,
        filename: 'index.js',
        library: 'minimap-react',
        libraryTarget: 'umd',
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(["css-loader"])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./index.css"),
        new webpack.optimize.UglifyJsPlugin({
            exclude: ['index.js'],
            minimize: false,
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = WebpackConfig;