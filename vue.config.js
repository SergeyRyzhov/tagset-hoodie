/*global require, module, __dirname */

var OfflinePlugin = require('offline-plugin');

module.exports = {
    configureWebpack: {
        output: {
            path: __dirname + '/dist',
            publicPath: '/tagset/'
        },
        devtool: 'none',
        plugins: [
            new OfflinePlugin()
        ]
    }
}