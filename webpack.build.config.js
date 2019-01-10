const path = require("path");
module.exports = {
    module: "development",
    entry: {
        "app": './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },
        ]
    }
}