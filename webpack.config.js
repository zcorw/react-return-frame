const path = require("path");
module.exports = {
    mode: "development",
    entry: {
        "app": './demo/app',
    },
    output: {
        path: path.join(__dirname, 'demo/__build__'),
        filename: '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        compress: true,
        inline: true,
        port: 9000,
        overlay: true,
        noInfo: false,
    }
}