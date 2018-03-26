/*global process, require, module, __dirname */

const OfflinePlugin = require('offline-plugin');
// const webpack = require("webpack");

var debug = process.env.NODE_ENV !== 'production';

var webpackConfig = {
    output: {
        path: __dirname + '/dist',
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     include: /\.min\.js$/,
        //     minimize: !debug
        // }),
        new OfflinePlugin()
    ]
};

if (!debug) {
    webpackConfig.output.publicPath = '/tagset/';
    delete webpackConfig.devtool;
}

module.exports = {
    configureWebpack: webpackConfig
}