const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/flappy/',
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
            minify: false,
            base: "/flappy/"
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

}
