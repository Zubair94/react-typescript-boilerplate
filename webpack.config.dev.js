const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'favicon.ico',
                    to: 'favicon.ico'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.scss$/, 
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ] 
            },
            { test: /\.tsx?$/, loader: 'babel-loader' },
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { 
                test: /\.(png|j?g|svg|gif|ico|woff|woff2|eot|ttf|otf|txt|xml)?$/, 
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    stats: {
        entrypoints: false
    },
    performance: {
        hints: false
    },
    devServer: {
        historyApiFallback: true,
        port: 4200,
        hot: true,
        publicPath: '/',
        overlay: true
    }
};
