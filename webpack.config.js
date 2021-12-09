const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const license = 'Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license';

module.exports = {
    mode: 'production',
    entry: {
        NxIO: './src/NxIO.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                SSITU: {
                    test: /[\\/]libr[\\/]/,
                    name: 'SSITU',
                    chunks: 'all',
                },
                NxCore: {
                    test: /[\\/]core[\\/]/,
                    name: 'NxCore',
                    chunks: 'all',
                },
                NxEditor: {
                    test: /[\\/]editor[\\/]/,
                    name: 'NxEditor',
                    chunks: 'all',
                },
                NxViewer: {
                    test: /[\\/]viewer[\\/]/,
                    name: 'NxViewer',
                    chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }, ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({ filename: "css/NexusI.css" }),
        new webpack.BannerPlugin({
            banner: license,
        })
    ],
}