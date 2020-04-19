const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    // 主页
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        filename: "index.html",
        chunks: ["main","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/account.html",
        inject: "body",
        filename: "./static/pages/account.html",
        chunks: ["account","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/goodsdetails.html",
        inject: "body",
        filename: "./static/pages/goodsdetails.html",
        chunks: ["goodsdetails","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/goodslist.html",
        inject: "body",
        filename: "./static/pages/goodslist.html",
        chunks: ["goodslist","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/help.html",
        inject: "body",
        filename: "./static/pages/help.html",
        chunks: ["help","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/kol.html",
        inject: "body",
        filename: "./static/pages/kol.html",
        chunks: ["kol","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/login.html",
        inject: "body",
        filename: "./static/pages/login.html",
        chunks: ["login","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/news.html",
        inject: "body",
        filename: "./static/pages/news.html",
        chunks: ["news","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/register.html",
        inject: "body",
        filename: "./static/pages/register.html",
        chunks: ["register","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/shopcart.html",
        inject: "body",
        filename: "./static/pages/shopcart.html",
        chunks: ["shopcart","common"]
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/global.html",
        inject: "body",
        filename: "./static/pages/global.html",
        chunks: ["global","common"]
    })
]