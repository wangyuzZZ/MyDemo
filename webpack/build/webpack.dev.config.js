const loaderConfig = require("./loader.config");
const pluginsConfig = require("./plugins.config");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "../"),
    mode: "development",
    entry: {
        "main": "./src/js/index.js",
        "account": "./src/js/account.js",
        "goodsdetails": "./src/js/goodsdetails.js",
        "goodslist": "./src/js/goodslist.js",
        "help": "./src/js/help.js",
        "kol": "./src/js/kol.js",
        "login": "./src/js/login.js",
        "news": "./src/js/news.js",
        "register": "./src/js/register.js",
        "shopcart": "./src/js/shopcart.js",
        "global": "./src/js/global.js",
        "common": "./src/js/common.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "static/js/[name]-bundle.js",
        publicPath: "http://localhost:8081"
    },
    plugins: pluginsConfig,
    module: loaderConfig,
    
    devServer: {
        contentBase: path.resolve(__dirname, "../dist/"),
        port: 8081,
        host: "localhost",
        open: "chrome",
        hot: false,
        inline: true
    }
}