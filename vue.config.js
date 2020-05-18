module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                wx: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}