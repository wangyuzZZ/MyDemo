//获取title
function getTitle(){
    var gname= $('.name');
    Storage('good',function(e){
        gname.textContent = e[0].gname;
    })  
}
//加载内容
function loading(){
    var mcltop = $('.m-cont');
    var htmlStr = '';
    GET('/json/particulars.json',function(item){
    Storage('good',function(el){
        htmlStr += `<div class="mc-left col-lg-10 col-md-12 col-xs-12 col-sm-12" style="padding:0">
                        <div class="mcl-top col-lg-12 col-md-12 col-xs-12 col-sm-12" style="padding:0">
                            <div class="left-img col-lg-6 col-md-12 col-xs-12 col-sm-12" style="padding:0">
                                <div class="magnifying-glass">
                                    <div class="old-img">
                                        <img src="${el[0].imgurl}" alt="" class=img>
                                        <div class="mirror"></div>
                                    </div>
                                    <div class="enlargement" style="background:url(${el[0].imgurl})no-repeat"></div>
                                </div>
                            </div>
                            <div class="goddes col-lg-6 col-md-12 col-xs-12 col-sm-12">
                                <h3 class="god-title">${el[0].gname}</h3>
                                <hr/>
                                <p class=p><span><del class="old">${el[0].oldpr}</del></span><span class="desa">${el[0].mpr}</span><span class="new">${el[0].newpr}</span></p>
                                <p class="god-des">${(function(){
                                    var s = '';
                                    item.left.forEach(function(cun) {
                                        if(el[0].gname == cun.title){
                                            s += cun.des;
                                        }
                                    });
                                    return s;
                                })()}</p>
                                <div class="img-btn">
                                    ${(function(){
                                        var s = '';
                                        item.left.forEach(function(cun) {
                                            if(el[0].gname == cun.title){
                                            s += `<div class="btnone bshow"><img src="${cun.imgone}" alt=""><span>黄色</span></div>
                                                <div class=btnone><img src="${cun.imgtwo}" alt=""><span>蓝色</span></div>
                                                <div class=btnone><img src="${cun.imgthree}" alt=""><span>红色</span></div>
                                                <div class=btnone><img src="${cun.imgfour}" alt=""><span>白色</span></div>`;
                                            }
                                        });
                                        return s;
                                    })()}
                                </div>
                                <div class=butshop>
                                    <button class="subshop">购物车</button>
                                    <span class="subtract">-</span><span class="num">1</span><span class="add">+</span>
                                </div>
                            </div>
                        </div>
                        <div class="m-bottom col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div class="bt-title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <p class="des-com"><span class="describe">描述</span><span class="comment ">用户评论</span></p>
                                <div class="details"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mc-right col-lg-2 col-md-12 col-xs-12 col-sm-12" >
                    </div>
                    <div class="shopping-trolley"></div>
                    `
        mcltop.innerHTML = htmlStr;
        rightcont();
        loaddata();
        // 物品名字
        var ShoppingName =  $(".god-title");
        var jg = $('.new');
        var subtract = $('.subtract'),
            num = $('.num'),
            add = $('.add'),
            number = 1;
        
        subtract.onclick = function(){
            var a = number == 1 ? 1 : --number;
            num.textContent = a;
        }
        add.onclick = function(){
            var b = ++number;
            num.textContent = b;
        }

        var bshow = $('.bshow');
        carless(num,bshow,ShoppingName,jg);
        var btnone = $('.btnone',true);
        var img = $('.img');
        var enlargement = $('.enlargement');
        for(let i = 0;i < btnone.length;i++){
            btnone[i].onclick = function(){
                for(let j = 0;j < btnone.length;j++){
                    btnone[j].classList.remove('bshow')
                }
                this.classList.add("bshow")
                img.src = this.firstChild.src
                enlargement.style.background = `url(${this.firstChild.src})`
                var bshow = $('.bshow');
                carless(num,bshow,ShoppingName,jg);
            }
        }
       

        //放大镜
        //原图片
        var oldimg = $('.img').getBoundingClientRect(),
            //原图片盒子
            oldbox = $('.old-img'),
            //放大镜
            mirror = $('.mirror'),
            //放大后图片
            enlargement = $('.enlargement');
            enlargement.style.width = oldimg.width + 'px';
            enlargement.style.height = oldimg.height + 'px';
            oldbox.onmousemove = function(e){
                var x = e.clientX,
                    y = e.clientY,
                    boxTop = oldbox.getBoundingClientRect().top,
                    boxLeft = oldbox.getBoundingClientRect().left,
                    mirrorTop = (y - boxTop) - 100,
                    mirrorLeft = (x - boxLeft) - 100;

                    maxtop = oldbox.getBoundingClientRect().height - 200;
                    maxleft = oldbox.getBoundingClientRect().width - 200;
                    if(mirrorTop < 0){
                        mirrorTop = 0;
                    }
                    if(mirrorLeft < 0){
                        mirrorLeft = 0;
                    }
                    if(mirrorTop > maxtop){
						mirrorTop = maxtop
					}
					if(mirrorLeft > maxleft){
						mirrorLeft = maxleft
					}
                    mirror.style.top = mirrorTop + 'px';
                    mirror.style.left = mirrorLeft + 'px';
                    enlargement.style.display = 'block';
                    mirror.style.display = 'block';
                    enlargement.style.backgroundSize = (oldbox.getBoundingClientRect().width / 200) * 100 + '%'
                    enlargement.style.backgroundPosition = mirrorLeft / maxleft * 100 +'% '+mirrorTop / maxtop * 100 + '%'
            }
            oldbox.onmouseout  = function(){
                enlargement.style.display = 'none';
                mirror.style.display = 'none';
            }

    })
})
}
//读取会话存储
function Storage(name,callback){
    var names = JSON.parse(sessionStorage.getItem(name));
    if(name){
        callback && callback(names)
    }
}
//购物车按钮
function carless(num,bshow,ShoppingName,jg){
    var goods = {
        productname:"",
        color:"",
        pric:"",
        num:"",
        goodimg:""
    }
    var  img = $(".img")
    var subshop = $('.subshop'),
        goodArray = [];
    subshop.onclick = function(){
        goods.productname = ShoppingName.textContent;
        if(bshow == null){
            goods.color = '黄色';
            goods.goodimg = img.src;
        }
        else{
            goods.goodimg = img.src;
            goods.color = bshow.childNodes[1].textContent;
        }
        goods.pric = jg.textContent;
        goods.num = num.textContent;

        if(localStorage.shoppingcar){
            goodArray = JSON.parse(localStorage.shoppingcar);
        }
        for(let i = 0;i < goodArray.length;i++){
            if(goods.productname == goodArray[i].productname && goods.color == goodArray[i].color){
                goodArray[i].num = Number(goodArray[i].num) + Number(goods.num);
                localStorage.shoppingcar = JSON.stringify(goodArray);
                goodArray.splice(0,goodArray.length);
                shoppingTrolley();
                return;
            }
        }
        goodArray.push(goods);
        localStorage.shoppingcar = JSON.stringify(goodArray);
        goodArray.splice(0,goodArray.length);
        shoppingTrolley();
    }

}
//加载商品数据
function loaddata(){
    var describe = $('.describe'),
        comment = $('.comment'),
        details = $('.details');
    GET('/json/particulars.json',function(shop){
        details.innerHTML = `<img src="${shop.leftBot.des.img}"/>`;
        describe.onclick = function(){
            var s = '';
            s += `<img src="${shop.leftBot.des.img}"/>`
            details.innerHTML = s;
        }
        comment.onclick = function(){
            details.innerHTML = `目前还未有评论`;
        }
    })
}
//加载界面内容
function rightcont(){
    var rcontent = $(".mc-right")
    GET("/json/index.json",function(indexcon){
        var x = '';
        x += `<h4 class=mc-right-title>HOT SALE商品推荐</h4>
        ${(function(){
            var z = '';
            indexcon.spotwholesale.summer.forEach(function(item){
                z += `<div class="right-img col-lg-12 col-md-6 col-xs-6 col-sm-6">
                        <img src="${item.img}" alt="">
                        <p>${item.des}</p>
                        <p>${item.newPrice}</p>
                    </div>`
            })
           return z;
        })()}
        `
        rcontent.innerHTML = x;
    })
} 
//加入购物车
function shoppingTrolley(){
    var shoppingTrolley = $('.shopping-trolley');
    var carArray = [];

    var carArray = JSON.parse(localStorage.shoppingcar);
    shoppingTrolley.style.display = "block";
    if(document.documentElement.clientWidth < 2026){
        setTimeout(function() {
            alert('添加成功')
        }, 1000);
    }
    shoppingTrolley.innerHTML = `<div class="xxxx"></div>
                                <div class="shoppingTrolley-content">
                                    <h1>购物车</h1>
                                    ${(function(){
                                        var z = '';
                                        carArray.forEach(function(x,idx){
                                            z += `<div class="Trolley-content col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                            <img src="${x.goodimg}" alt="" class="Trolley-content-img">
                                            <div class="Trolley-content-cont">
                                                <h4 class="title">${x.productname}</h4>
                                                <p class="color">颜色：${x.color}</p>
                                                <p class="Trolley-content-box"><span class="number">${x.num}件</span> X <span class="price">${x.pric}</span></p>
                                                <button class="delete" data-index="${idx}">删除</button>
                                            </div>
                                        </div>`
                                        })
                                        return z;
                                    })()}
                                    <div class="car-bottom">
                                        <p class="sum-pric"></p>
                                        <button class="show-car">查看购物车</button>
                                        <button class="end-pric">结算</button>
                                     </div>
                                </div>`

    $('.xxxx').onclick = function(){
        shoppingTrolley.style.display = "none";
    }
    var sumpric = $('.sum-pric'),
        sumNum = 0;
        carArray.forEach(function(su){
            sumNum += Number(su.num) * Number(su.pric.split("￥")[1])
        })
        sumpric.innerHTML = '小计￥'+sumNum;
        deleteshop(carArray,$('.delete',true))

        $('.show-car').onclick = function(){
            location.href = '/pages/shopping.html'
        }
        $('.end-pric').onclick = function(){
            location.href = '/pages/settleaccounts.html'
        }
    //更新购物车下标
    judge();
}
