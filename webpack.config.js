var webpack = require('webpack');

module.exports = {
    watch:true,
    entry: {
        initialize: "./assets/src/js/initialize.js",
        depend: "./assets/src/js/depend.js",
        common: [
            'lodash',
            'backbone'
        ]
    },
    externals: { jquery: "jQuery" },
    output: {
        path: __dirname + "/assets/build/js/",
        filename: "[name].min.js"
    },
    module: {
        preLoaders: [
            {
                loaders: ['eslint'],
            }
        ],
        loaders: [ {
            test: /\.html$/,
            loader: 'mustache'
        } ]
    },
    resolve: {
      // you can now require('file') instead of require('file.js')
      extensions: ['', '.html', '.js', '.json']
    },
    eslint: {
        failOnWarning: false,
        failOnError: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            _               : 'lodash',
            backbone        : 'backbone',

        }),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]

}

