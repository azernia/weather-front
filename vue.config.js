module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/': {
                ws: false,
                target: 'http://localhost:8899',
                pathRewrite: {'^/': ''}
            }
        }
    }
}
