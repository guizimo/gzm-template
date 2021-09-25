const path = require('path');

module.exports = {
    // 模式
    mode: 'development',
    // 入口
    entry: './src/index.js',
    // 打包地址
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        // 静态文件目录
        contentBase: path.join(__dirname, "static"),
        // 是否压缩
        compress: false,
        // 端口号
        port: 8080,
        // 虚拟打包路径
        publicPath: "/virtul/"
    }
};
