module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 5000
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/'
}