// In webpack there are 4 configurations 
//    1 - Entry points, 
//    2 - Outputs
//    3 - Loaders
//    4 - Plugins 

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("babel-polyfill");


module.exports = {
    entry: ["babel-polyfill", './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './dist/js/bundle.js'
    },
    devServer: {
        //here we specify the folder from which webpack should serve the files:
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './dist/index.html'
        })
    ],
    module: {
        rules: [
            {
                //Regular expression testing for all the Javascript files
                //  The test is looking for all the files and check if they end in js
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }

}