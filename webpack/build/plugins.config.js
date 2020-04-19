const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require("./html.config");

const glob = require("glob");
const path = require("path");
const PurifyCSSPlugin = require('purifycss-webpack');

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
    // 版权声明
    new webpack.BannerPlugin("版权归‘Jerry’所有，翻版必究"),
    // 抽离CSS
    // new ExtractTextPlugin("static/css/[name].min.css"),
    // 压缩CSS
    new OptimizeCssAssetsPlugin(),
    new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, '../src/*.html')),
    }),
    new CopyWebpackPlugin([{
        from: './src/json/',
        to: './static/json/'
    }]),
    // 引入三方插件
    new webpack.ProvidePlugin({
        $: "jquery"
    }),
    // 编译页面
    ...HtmlPlugin

]