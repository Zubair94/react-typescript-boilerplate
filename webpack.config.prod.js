const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.tsx',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[contentHash].bundle.js',
        chunkFilename: '[name]-[contentHash].bundle.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
            terserOptions: {
                parse: {
                    // We want terser to parse ecma 8 code. However, we don't want it
                    // to apply any minification steps that turns valid ecma 5 code
                    // into invalid ecma 5 code. This is why the 'compress' and 'output'
                    // sections only apply transformations that are ecma 5 safe
                    // https://github.com/facebook/create-react-app/pull/4234
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    // Disabled because of an issue with Uglify breaking seemingly valid code:
                    // https://github.com/facebook/create-react-app/issues/2376
                    // Pending further investigation:
                    // https://github.com/mishoo/UglifyJS2/issues/2011
                    comparisons: false,
                    // Disabled because of an issue with Terser breaking valid code:
                    // https://github.com/facebook/create-react-app/issues/5250
                    // Pending further investigation:
                    // https://github.com/terser-js/terser/issues/120
                    inline: 2,
                },
                mangle: {
                    safari10: true,
                },
                keep_classnames: true,
                keep_fnames: true,
                output: {
                    ecma: 5,
                    comments: false,
                    // Turned on because emoji and regex is not minified properly using default
                    // https://github.com/facebook/create-react-app/issues/2488
                    ascii_only: true,
                }
            }
        }),
        // This is only used in production mode
        new CssMinimizerPlugin()
      ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'favicon.ico',
                    to: 'favicon.ico'
                }
            ]
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(
            Object.assign(
                {},
                {
                    inject: true,
                    template: 'index.html',
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                }
            )
        )
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                            sourceMap: false,
                        }
                    },
                    'sass-loader'
                ] 
            },
            { test: /\.tsx?$/, loader: 'babel-loader' },
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { 
                test: /\.(png|jpg|jpeg|svg|gif|ico|woff|woff2|eot|ttf|otf|txt|xml)?$/, 
                loader: 'file-loader',
                options: {
                    name: '[name]-[contentHash].[ext]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    stats: {
        entrypoints: false
    }
};
