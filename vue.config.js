module.exports = {
    configureWebpack: {
        output: {
            path: __dirname + '/dist',
            publicPath: '/tagset/'
        },
        devtool: 'none'
    }
}