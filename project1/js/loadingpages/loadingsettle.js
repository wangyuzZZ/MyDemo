function load(){
    GET('/json/citys.json',function(el){
        $('.bill-box').innerHTML = ` <div class="bbilling-address col-lg-6 col-md-12 col-xs-12 col-sm-12">
        <h2>订单地址</h2>
        <input type="text" placeholder="请输入你的姓名" required class="name">
        <input type="tel" placeholder="请输入你的联系方式" required class="tel">
        <div class="pcd">
            <select name="" id="province" required>
                <option value="--请选择你的省份--">--请选择你的省份--</option>
                <option value="Szechwan">四川</option>
                <option value="Guizhou">贵州</option>
                <option value="Guangdong">广东</option>
            </select>
            <select name="" id="city" required>
                <option value="--请选择你的市--">-请选择你的市--</option>
            </select>
            <select name="" id="district" required>
                <option value="--请选择你的地区--">-请选择你的地区--</option>
            </select>
        </div>
        <input type="text" placeholder="请输入你的详细地址" class="dz">
        <textarea name="" id="" cols="30" rows="10" placeholder="备注信息" class="textarea"></textarea>
    </div>
    <div class="line-item col-lg-6 col-md-12 col-xs-12 col-sm-12">
        <h2>订单详情</h2>
        <div class="line-item-title text">
            <span>商品</span>
            <span>合计</span>
        </div>
        <div class="line-item-content">
        ${(function(){
            var s = '';
            JSON.parse(localStorage.shoppingcar).forEach(function(item,idx) {
                s += `<div class="Trolley-content col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <img src="${item.goodimg}" alt="" class="Trolley-content-img">
                        <div class="Trolley-content-cont">
                            <h4 class="title">${item.productname}</h4>
                            <p class="color">颜色：${item.color}</p>
                            <p class="Trolley-content-box"><span class="number">数量：${item.num}</span></p>
                            <p class="price">价格：${item.pric}</p>
                        </div>
                    </div>`
            });
            return s;
        })()}

        </div>
        <div class="sum text">
            <span>购物车小计</span>
            <span>￥${(function(){
                var q = 0;
                JSON.parse(localStorage.shoppingcar).forEach(function(item){
                    q += Number(item.pric.split('￥')[1])
                })
                return q;
            })()}</span>
        </div>
        <div class="sum text">
            <span>运费：</span>
            <span>普通快递：￥${(function(){
                var q = 0;
                JSON.parse(localStorage.shoppingcar).forEach(function(item){
                    q += Number(item.pric.split('￥')[1])
                })
                return q * 0.02;
            })()}</span>
        </div>
        <div class="sum text">
            <span>订单总计</span>
            <span>￥${(function(){
                var q = 0;
                JSON.parse(localStorage.shoppingcar).forEach(function(item){
                    q += Number(item.pric.split('￥')[1])
                })
                return q + (q *0.02);
            })()}</span>
        </div>
        <section>
            <input type="radio" name="pay" id="Alipay"><label for="Alipay">支付宝</label><span class="iconfont">&#xe603;</span>
        </section>
        <section>
            <input type="radio" name="pay" id="wx"><label for="wx">微信</label><span class="iconfont">&#xe6a9;</span>
        </section>
        <section>
            <input type="radio" name="pay" id="yl"><label for="yl">银联</label><span class="iconfont">&#xe6af;</span>
        </section>
        <button class="pay-btn">下单</button>
    </div>
    `
    
    //select三级联动
    $('#province').onchange = function(){
        el.forEach(function(con){
            if(con.province == $('#province').value){
                $('#city').innerHTML = `<option value="--请选择你的市--">-请选择你的市--</option>${(function(){
                    var q = '';
                    con.citys.forEach(function(ct){
                        q += `<option value="${ct.name}">${ct.name}</option>`
                    })
                    return q;
                })()}`
            }
        })
    }
    $('#city').onchange = function(){
        el.forEach(function(con){
            con.citys.forEach(function(x){
                if($('#city').value == x.name){
                    $('#district').innerHTML = `<option value="--请选择你的地区--">-请选择你的地区--</option>${(function(){
                        var a = '';
                        x.district.forEach(function(v){
                            a += `<option value="${v}">${v}</option>`
                        })
                        return a;
                    })()}`
                }
            })
        })
    }
    //获取用户订单信息
    $('.pay-btn').onclick = function(){
        var userpay = {
            name:"",
            tel:"",
            site:"",
            message:""
        }
        userpay.name = $('.name').value;
        userpay.tel = $('.tel').value;
        userpay.site = $('#province').value + $('#city').value + $('#district').value + $('.dz').value;
        userpay.message = $('.textarea').value;
        var userpayArray = [];
        if(userpay.name.length != 0 && userpay.tel.length !=0 && userpay.site.length !=0 && userpay.message.length !=0){
            if(localStorage.userp){
                userpayArray = JSON.parse(localStorage.userp)
            }
            userpayArray.push(userpay)
            localStorage.userp = JSON.stringify(userpayArray)
        }
    }
    })
}