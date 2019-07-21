function $(a,isAll){
    if(isAll){
       return document.querySelectorAll(a)
    }else{
        return document.querySelector(a)
    }
}
//获取JSON数据
function GET(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onload = function () {
        if (this.status == 200) {
            callback && callback(this.response,xhr);
        }
    }
}
//获取样式
function getStyle(el, attr) {
    // 兼容IE
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el, null)[attr];
    }
}
//回到顶部
function toTop(){
    var btn    = $(".top"),
        aside = $('.aside'),
        offset = 0;
    // 监听窗口滚动
    window.onscroll = function() {
        // 更新窗口滚动的距离
        offset = document.body.scrollTop || document.documentElement.scrollTop;
        // 显示或隐藏回到顶部按钮
        if(offset>500){
            aside.classList.remove('asideshow')
        }
        else{
            aside.classList.add('asideshow')
        }
    }
    // 点击回到顶部按钮
    btn.onclick = function() {
        /**
         * 帧动画，关键要素：
         * - 位移的距离：offset
         * - 持续时间：duration
         * - 每一帧持续时间：interval
         * - 每一位移的距离：speed
         */
        var duration = 1000;
        var interval = 15;
        var frames   = duration / interval;
        var speed    = Math.ceil(offset / frames);
        // 通过定时器执行每一帧
        var t = setInterval(function() {
            // 如果滚动的距离大于0
            // 说明还没有回到顶部
            // 则只需在当前位置的基础上基于往回移动speed就可以了
            // 直到小于等于0为止
            if(offset > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
            }else {
                // 清除定时器
                clearInterval(t);
                t = null;
                // 矫正误差
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }, interval);
       
    }
}
//加载尾部
function foot(){
    var foot = $('.foot'),
        htmlStr = '';
        GET('/json/index.json',function(el){
            htmlStr += `<section class="logo"><img src="${el.foot.logo}" alt=""></section>
                            <form class="form"><input type="text" placeholder="请输入商品名称"><span class="foot-btn">搜索</span></form>
                            <p class="keyword">热搜关键词:${el.foot.keyword}</p>
                            <ul class="foot-list">
                                <li>首页 /</li>
                                <li>所有宝贝 /</li>
                                <li>每周上新 /</li>
                                <li>单肩包 /</li>
                                <li>双肩包 /</li>
                                <li>手提包 /</li>
                                <li>斜挎包 /</li>
                                <li>联系商家</li>
                            </ul>
                            <p class="des">${el.foot.des}</p>
                            <p class="des">${el.foot.dest}</p>
                            <p class="des">${el.foot.desth}</p>`
            foot.innerHTML = htmlStr;
        })
}
//过滤加载
function loadingInfos(infosinfos,totalPage,curPage){
    // 获取开始下标
    var startIndex = (curPage - 1) * 9;
    // 获取结束下标
    var endIndex   = curPage == totalPage ?  startIndex + infosinfos.length % 9 - 1 : startIndex + 8;
    var htmlStr    = "";
    if(infosinfos.length == 0){
        htmlStr += '<h1 class="none">没有满足条件的商品</h1>'
        $('.main-box').innerHTML = htmlStr ;
        return;
    }
    for(var i = startIndex; i <= endIndex; i++) {
        htmlStr += ` <div class="content-box col-lg-4 col-md-6 col-xs-6 col-sm-6">
                        <a href="/pages/particulars.html"><img src="${infosinfos[i].img}" alt="" class="imgsrc"></a>
                        <a href="/pages/particulars.html" class="name">${infosinfos[i].des}</a>
                        <p><span><del class="opr">${infosinfos[i].oldPrice}</del></span><span class="min">${infosinfos[i].pricDes}</span><span class="npr">${infosinfos[i].newPrice}</span></p>
                        <a href="/pages/particulars.html" class="btn">${infosinfos[i].btn}</a>
                    </div>`;
    }
    $('.main-box').innerHTML = htmlStr;
    goodsclick();
}
//商品跳转详情页
function goodsclick(){
    var contentbox = $('.content-box',true),
        imgsrc = $('.imgsrc',true),
        names = $('.name',true),
        opr = $('.opr',true),
        minpr = $('.min',true),
        npr = $('.npr',true);
        var goods = {
            gname:"",
            imgurl:"",
            oldpr:"",
            newpr:"",
            mpr:""
        } 
    for(let i = 0;i < contentbox.length;i++){
        contentbox[i].onclick = function(){
            var good = [];
            goods.gname = names[i].textContent;
            goods.imgurl = imgsrc[i].src;
            goods.oldpr = opr[i].textContent;
            if(minpr[i].textContent == 0){
                goods.mpr == null
            }
            else{
                goods.mpr = minpr[i].textContent;
            }
            goods.newpr = npr[i].textContent;
            good.push(goods);
            sessionStorage.setItem('good',JSON.stringify(good))
        }
    }
}
//鼠标移入判断登录状态
function judge(){
    $('.login-page').onmouseenter = function(){
        if(localStorage.loginMessage){
            $('.login-page span').innerHTML = `${JSON.parse(localStorage.loginMessage)[0].userid}`
        }
    }
    $('.login-page').onmouseout = function(){
        $('.login-page span').textContent = "登录"
    }
    //实时显示购物车
    if(JSON.parse(localStorage.shoppingcar).length  > 0){
        $('.shop-car').innerHTML = `&#xe618;<span class="small-num">${JSON.parse(localStorage.shoppingcar).length}</span>`
    }
    else{
        $('.shop-car').innerHTML = `&#xe618;`
    }
}
//删除商品
function deleteshop(carArray,btn){
    for(let i = 0;i < btn.length;i++){
        btn[i].onclick = function(){
            carArray.splice(this.dataset.index,1)
            localStorage.removeItem('shoppingcar');
            localStorage.shoppingcar = JSON.stringify(carArray);
            shoppingTrolley();
        }
    }
}
//侧边栏
function sidebar(){
    $('.phone').onclick = function(){
        location.href = '/pages/relation.html'
    }
    $('.QQ').onclick = function(){
        location.href = '/pages/login.html'
    }
    $('.muen').onclick = function(){
        location.href = '/pages/login.html'
    }
}
//生成验证码
function getVerificationCode(length) {
    // 定义随机源
    var str = "";
    str += "QWERTYUIOPASDFGHJKLZXCVBNM";
    str += "1234567890";
    str += "qwertyuiopasdfghjklzxcvbnm";
    // 根据长度截取字符
    var resStr = "";
    for(var i = 0; i < length; i++) {
        // 获取随机下标
        var index = Math.floor(Math.random() * str.length);
        resStr += str.slice(index, index + 1);
    }
    return resStr;
}
