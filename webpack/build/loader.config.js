module.exports = {
    rules: [
        // es6 -> es5
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        },
        // 处理css
        {
            test: /\.(css|less)$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
        // 图片处理
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            use: {
                loader: "url-loader",
                options: {
                    limit: "1024",
                    name: "[name].[ext]",
                    outputPath: "/static/images/"
                }
            }
        },
        {
            test: /\.html/,
            exclude: /node_modules/,
            loader: 'html-withimg-loader'
        }
    ]
}