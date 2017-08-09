var webpack = require('webpack');

module.exports = {
    watch: true,
    entry: {
        initialize: ["babel-polyfill", "./assets/src/js/initialize.js"],
        common: [
            'lodash'
        ]
    },
    externals: {
        jquery: "jQuery"
    },
    output: {
        path: __dirname + "/assets/build/js/",
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
                options: {
                    failOnWarning: false,
                    failOnError: false
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'mustache-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.html', '.js', '.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            _ : 'lodash'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
