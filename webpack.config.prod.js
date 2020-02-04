const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
	context: __dirname,
	entry: "./src/index.tsx",
	mode: 'production',
    output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: '[name]-[hash].bundle.js',
		chunkFilename: '[name]-[hash].bundle.js',
		publicPath: '/'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{ 
				from: 'favicon.ico',
				to: 'favicon.ico'
			}
		]),
		new HtmlWebpackPlugin({
		   template: 'index.html'
		})
	],
    resolve: {
        extensions: [".ts", ".tsx", '.js']
    },
    module: {
        rules: [
			{ test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
			{ test: /\.tsx?$/, loader: "babel-loader" },
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ 
				test: /\.(png|j?g|svg|gif|ico|woff|woff2|eot|ttf|otf|txt|xml)?$/, 
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
				}
			}
        ]
	},
	performance: {
		hints: false
	},
	stats:{
		entrypoints: false
	}
}