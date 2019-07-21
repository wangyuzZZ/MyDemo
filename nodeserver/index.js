// 引入http模块
const http = require("http");
// 引入url解析模块
const url = require("url");
// 引入文件管理模块
const fs = require("fs");
// 引入querystring
const querystring = require("querystring");

// 创建服务
// req -> 请求对象，包含请求信息
// res -> 响应对象，包含响应信息
// 监听：http://127.0.0.1:8081
http.createServer((req, res) => {
    console.log(req)
    // 设置跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 发送 HTTP 头部 , HTTP 状态值: 200 : OK, 内容类型: text/plain
    res.writeHeader(200, { "Content-Type": "text/plain;charset=utf-8;" })
    // 过滤空请求
    if (req.url == "/favicon.ico") return;
    // 路由处理
    if (req.method == "GET") { // GET请求
        // 解析url
        let obj = url.parse(req.url, true);
        if (obj.pathname == "/goodslist") {
            // 读取文件
            fs.readFile("./www/goodslist.json", (err, data) => {
                // buffer -> json
                let json = data.toString()
                // json -> obj
                let arr = JSON.parse(json);
                let index = obj.query.type;
                // handle response datas
                let response = JSON.stringify(arr[index]);
                // send data
                res.end(response);
                console.log(response)
            });
        }
    } else { // POST 请求
        let query = "";  // 接收参数
        req.on("data", data => {
            query += data;
        })
        req.on("end", () => {
            // key=value => obj
            query = querystring.parse(query);
            fs.readFile("./www/user.json", (err, data) => {
                // buffer -> json -> obj
                let o = JSON.parse(data.toString());
                // 解构参数
                let { username, password } = query;
                if (!username || !password) {
                    res.end(JSON.stringify({
                        "ok": false,
                        "errMsg": "用户或密码为空"
                    }))
                } else if (username == o.token.username && password == o.token.password) {
                    res.end(JSON.stringify({
                        "ok": true,
                        "userinfo": o.userinfo
                    }));
                } else {
                    res.end(JSON.stringify({
                        "ok": false,
                        "errMsg": "账号或密码错误"
                    }));
                }
            });
        }) 
    }
}).listen(8081);