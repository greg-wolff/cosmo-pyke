var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var Path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/prod/',
        filename: 'index.bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.(jpg|png|woff(2)?|svg)$/,
            loader: 'file-loader'
        }]
    },
    resolve: {
        alias: {
            "TweenLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
            "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
            "TimelineLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
            "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
            "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
            "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
            "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Cosmo Pyke',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeAttributeQuotes: true,
                useShortDoctype: true,
                minifyCSS: true
            },
            template: './src/index.ejs'
        }),
        new ExtractTextPlugin("style.css"),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        //new UglifyJSPlugin()
    ]
}
