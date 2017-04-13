'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './main.js',
        dev: [
            'webpack-dev-server/client?http://127.0.0.1:8080',
            'webpack/hot/only-dev-server'
        ]
    },
    devtool: 'source-map', //'cheap-module-eval-source-map', //'source-map'
    vendor: ['antd', 'react', 'react-dom' ],
    cache: false,
    output: { path: __dirname, filename: 'bundle.js' },
    module: {
        resolve: {
            extensions: [ '', '.js', '.jsx' ]
        },
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            } ,
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {test: /\.css$/,loader:'style!css!'},
            {test: /\.html$/, loader: 'html' },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
        ]
    },
    plugins: [],
};