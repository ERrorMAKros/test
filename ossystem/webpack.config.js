'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Authentication = require( "./authentication.json" ) ;

module.exports = {
    entry: {
        main: './main.js',
        dev: [
            'webpack-dev-server/client?http://127.0.0.1:8080/bin',
            'webpack/hot/only-dev-server'
        ]
    },
    devtool: 'source-map', //'cheap-module-eval-source-map', //'source-map'
    vendor: ['antd', 'react', 'react-dom' ],
    cache: false ,
    output: {
    	context: __dirname + "/src",
    	path: __dirname + "/bin",
	    filename: '[name].js'
    },
    module: {
        resolve: {
            extensions: [ '', '.js', '.jsx' ]
        },
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            } ,
	        {
	        	test: /\.css$/,
		        loader: ExtractTextPlugin.extract("style-loader", "css")
	        },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!less")
            },
            {test: /\.html$/, loader: 'html' },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}
        ]
    },
    plugins: [
	    new webpack.DefinePlugin({
		    __WEBPACK_AUTHENTICATION: JSON.stringify( Authentication )
	    } ),
        new webpack.optimize.DedupePlugin() ,
        new webpack.optimize.UglifyJsPlugin({
	        compress: {
		        warnings: false
	        } ,
	        comments: false ,
        	mangle: false ,
	        sourcemap: false
        }) ,
	    new ExtractTextPlugin( "[name].css" )
    ],
};