# 登陆接口
地址：/login
方法：POST
参数：
- username String 用户名
- password String 用户密码
返回：
- success => {"ok":true, 用户信息...}
- fail    => {"ok":false, errMsg: ""}

# 订单接口
地址：/orders
方法：GET
参数：
- type Number 订单类型
1：包袋
2：腕表
3：配饰
4：珠宝首饰
5：美妆

返回：
- success => {"ok":true, 订单数据}
- fail    => {"ok":false, errMsg: ""}
