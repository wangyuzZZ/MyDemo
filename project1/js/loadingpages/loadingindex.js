//加载轮播图
function loadingBannner(){
    var banner = $('.banner')
    
    var htmlStr = '';

    GET('/json/index.json',function(e){
        htmlStr += `<img src="${e.banner.bannerImgOne}" alt="" class='banImgOne show'>
                    <img src="${e.banner.bannerImgTwo}" alt=""  class=banImgTwo>
                    <div class=but>
                        <span class="iconfont left butshow"></span>
                        <span class="iconfont right"></span>
                    </div>`

        banner.innerHTML = htmlStr

        var butLeft = $('.left'),
            butRight = $('.right'),
            imgs = $('.banner img',true),
            buts = $('.but span',true),
            newidx = 0,
            oldidx = 0;

        butLeft.onclick = function(){
            newidx = newidx == 0 ? 1 : --newidx;
            test();
            oldidx = newidx;
        }
        butRight.onclick = function(){
            newidx = newidx == 0 ? 1 : --newidx;
            test();
            oldidx = newidx;
        }

        function test(){
            imgs[newidx].classList.add('show')
            imgs[oldidx].classList.remove('show')
            buts[newidx].classList.add('butshow')
            buts[oldidx].classList.remove('butshow')
        }
        setInterval(function(){
            butRight.onclick();
        },6000)
    })
}

//加载Our Srevice
function loadingOurService(){
    var OurService = $('.Our-Service')

    GET('/json/index.json',function(e){
        var htmlStr = '';
        htmlStr += ``
        htmlStr +=`<img class="col-lg-4 col-md-12 col-xs-12 col-sm-12 img-responsive" style="padding:0" src="https://ccdn.goodq.top/caches/d66d72e92dc9d8b96d26404f9977c15f/aHR0cDovLzVjMmY0MTkwMzk4MTQudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS82NGI5M2RlYzJkNzkxYjQzMDk4MDc3ZmNiNGRiMmQyMy5qcGc_p_p100_p_3D.jpg" alt="" class="our-img">
        <div class="our-Lservice col-lg-8 col-md-12 col-xs-12 col-sm-12">
            <div class="Lservice-sub">
                <h2>OUR SERVICE</h2>
                <h3>我们的服务</h3>
            </div>
            <div class="Lservice-bort">
                
            </div>
        </div>`
        OurService.innerHTML = htmlStr;

        var Lservicebortcont = $('.Lservice-bort')
        GET('/json/index.json',function(el){
            var str = '';
            el.OurService.forEach(function(item) {
                str += `<div class="Lservice-bort-cont col-lg-3 col-md-6 col-xs-6 col-sm-6">
                <img src="${item.img}" alt="">
                <h2>${item.title}</h2>
                <p>${item.des}</p>
                </div>`
            });
            Lservicebortcont.innerHTML = str;
        })
    })
}

//加载产品分类
function product(){
    var product = $('.product');
    var htmlStr = '';
    GET('/json/index.json',function(el){
        htmlStr += `<div class="pr-left">
                        <div class="left-top">
                            <div class="left-top-first" style="background:url(https://ccdn.goodq.top/caches/d66d72e92dc9d8b96d26404f9977c15f/aHR0cDovLzVjMmY0MTkwMzk4MTQudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOC8xMi9kMDNmMjBlM2UwMDYyNjcyZGFjZmZkYWM5NTg3ZGI3Yy5qcGc_p_p100_p_3D.jpg)no-repeat">
                                <h2>PRODUCT</h2>
                                <h3>产品分类</h3>
                                <p>您可以双击这里或者点击编辑</p>
                                <p>按钮来修改内容。您还可以添</p>
                                <p>加图标，按钮，图片等常用元素</p>
                            </div>
                            <a href="/pages/classification.html" class="last">
                                <h2>${el.product.productOne.title}</h2>
                                <p>${el.product.productOne.des}</p>
                                <img src="${el.product.productOne.img}" alt="">
                            </a>
                            <a href="/pages/classification.html" class="last">
                                <h2>${el.product.productTow.title}</h2>
                                <p>${el.product.productTow.des}</p>
                                <img src="${el.product.productTow.img}" alt="">
                            </a>
                        </div>
                        <div class="left-bottom">
                            <a href="/pages/classification.html" >
                                <img src="${el.product.productThree.img}" alt="">
                                <h2>${el.product.productThree.title}</h2>
                                <p>${el.product.productThree.des}</p>
                            </a>
                            <a href="/pages/classification.html">
                                <div class="cont-box">
                                    <h2>${el.product.productFour.title}</h2>
                                    <p>${el.product.productFour.des}</p>
                                </div>
                                <img src="${el.product.productFour.img}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="pr-right" style="background:url()no-repeat">
                        <h2>${el.product.productFive.title}</h2>
                        <p>${el.product.productFive.des}</p>
                        <a href="/pages/classification.html"><img src="https://ccdn.goodq.top/caches/d66d72e92dc9d8b96d26404f9977c15f/aHR0cDovLzVjMmY0MTkwMzk4MTQudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS80ODdhZTk2OGFkZWYxZWNmNWZjNzcwYTkyOTM5NThlMy5qcGc_p_p100_p_3D.jpg"/></a>
                    </div>`

        product.innerHTML = htmlStr;
    })
}

//加载定制
function customization(){
    var custtopBox = $('.cust-topBox'),
        custbottomBox = $('.cust-bottomBox');
    var htmlStr = '';
    var htmlstr = '';
    GET('/json/index.json',function(el){
        el.customization.top.forEach(function(item){
            htmlStr += `<div class="top col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6" style="padding:0">
                                <p>${item.subDes}</p>
                                <h2>${item.title}</h2>
                                <p>${item.des}</p>
                            </div>
                            <img class="col-lg-6 col-md-6 col-xs-6 col-sm-6" style="padding:0" src="${item.img}" alt="" >
                        </div>`
            custtopBox.innerHTML = htmlStr;
        })
        el.customization.bottom.forEach(function(item){
            htmlstr += `<div class="col-lg-2 col-md-4 col-xs-4 col-sm-4" style="padding:0"><img src="${item.img}" alt=""></div>`
            custbottomBox.innerHTML = htmlstr;
        })
    })
}

//加载selected
function selected(){
    var selected = $('.selected')
    var htmlStr = '';
    GET('/json/index.json',function(el){
        htmlStr += `<div class="title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <h2>${el.selected.title.title}</h2>
                        <h3>${el.selected.title.des}</h3>
                    </div>
                    <div class="cont-left col-lg-7 col-md-12 col-xs-12 col-sm-12">
                        <div class="cont-top-box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        ${(function(){
                            var s = '';
                            el.selected.content.forEach(function(item){
                                s += `<div class="col-lg-4 col-md-6 col-xs-6 col-sm-6 selected-cont">
                                            <div class="check"></div>
                                            <img src="${item.img}" alt="">
                                            
                                            <p>${item.des}</p>

                                    </div>`
                            })
                            return s;
                        })()}
                        </div>
                        <div class="cont-bottom-box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <h3>${el.selected.contentbottom.title}</h3>
                            <p>${el.selected.contentbottom.des}</p>
                        </div>
                    </div>
                    <div class="cont-left-box col-lg-5 col-md-12 col-xs-12 col-sm-12">
                        <img src="${el.selected.contentleft.img}" alt="">
                    </div>`

        selected.innerHTML = htmlStr;
    })
}

//加载sample
function sample(){
    var sample = $('.sample'),
        htmlStr = '';
    GET("/json/index.json",function(el){
        htmlStr += `<div class="sample-title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <h2>${el.sample.title.title}</h2>
                        <h3>${el.sample.title.des}</h3>
                    </div>
                    <div class="sample-content col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    ${(function(){
                        var s = '';
                        el.sample.content.forEach(function(item){
                            s += `<div class="sample-box col-lg-3 col-md-6 col-xs-6 col-sm-6">
                                        <a href="/pages/classification.html"><img src="${item.img}" alt=""></a>
                                    </div>`
                        })
                        return s;
                    })()}
                    </div>`              
        sample.innerHTML = htmlStr;
    })
}

//加载WHOLESALE
function wholesale(){
    var spotwholesale = $('.spotwholesale'),
        htmlStr = '';

        GET('/json/index.json',function(el){
            htmlStr += `
                    <div class="spotwholesale-title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div class="title-box col-lg-5">
                            <h2>${el.spotwholesale.title.title}</h2>
                            <h3>${el.spotwholesale.title.des}</h3>
                        </div>
                        <ul class="title-list col-lg-7">
                            <li class="one showcolor" data-index="0">${el.spotwholesale.title.catalogueOne}</li>
                            <li class="two" data-index="1">${el.spotwholesale.title.catalogueTwo}</li>
                            <li class="three" data-index="2">${el.spotwholesale.title.catalogueThree}</li>
                            <li class="four" data-index="3">${el.spotwholesale.title.catalogueFour}</li>
                        </ul>
                    </div>
                    <div class="spotwholesale-content col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    ${(function(){
                        var s = '';
                        el.spotwholesale.content.forEach(function(item){
                            s += `<div class="content-box col-lg-3 col-md-6 col-xs-6 col-sm-6">
                                    <a href="/pages/particulars.html" class=goodbtn><img src="${item.img}" alt="" class=imgsrc></a>
                                    <a href="/pages/particulars.html" class=name>${item.des}</a>
                                    <p class=pr><span><del class=opr>${item.oldPrice} </del></span><span class=min>${item.pricDes}</span><span class=npr>${item.newPrice} </span></p>
                                    <a href="/pages/particulars.html" class="btn goodbtn">${item.btn}</a>
                                </div>`
                        })
                        return s;

                    })()}
                    </div>
                    `
            spotwholesale.innerHTML = htmlStr;



            var listArray = Array.from($('.title-list li',true));
            

            listArray.forEach(function(el,idx){
                
                el.onclick = function(){
                    onclickText(listArray,el);
                    switch(this.dataset.index){
                        case "0":{
                            
                            GET('/json/index.json',function(el){
                                var content = el.spotwholesale.content
                                getData(content,el);
                            })
                            
                        };break;
                        case "1":{
                            GET('/json/index.json',function(el){
                                var winter = el.spotwholesale.winter
                                getData(winter,el);
                            })
                        };break;
                        case "2":{
                            GET('/json/index.json',function(el){
                                var autumn = el.spotwholesale.autumn
                                getData(autumn,el);
                            })
                        };break;
                        case "3":{
                            GET('/json/index.json',function(el){
                                var summer = el.spotwholesale.summer
                                getData(summer,el);

                            })  
                        };break;
                    }

                }

            });
            goodsclick();
        })    
}

//加载processing
function processing(){
    var process = $('.processing'),
        htmlStr = '';
    GET('/json/index.json',function(el){
        htmlStr += `<div class="sample-title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <h2>${el.processing.title.title}</h2>
                        <h3>${el.processing.title.des}</h3>
                    </div>
                    <div class="processing-cont col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    ${(function(){
                        var s = '';
                        el.processing.content.forEach(function(item){
                            s += `<div class="pc-box col-lg-3 col-md-6 col-xs-6 col-sm-6">
                                    <img src="${item.img}" alt="" class="col-lg-12 col-md-12 col-xs-12 col-sm-12 pc-img img-responsive">
                                    <ul class="col-lg-6 col-md-6 col-xs-6 col-sm-6 pc-leftbox">
                                        <li>${item.brand}</li>
                                        <li>${item.order}</li>
                                        <li>${item.draw}</li>
                                        <li>${item.production}</li>
                                        <li>${item.accumulative}</li>
                                    </ul>
                                    <ul class="col-lg-6 col-md-6 col-xs-6 col-sm-6 pc-rightbox">
                                    <li>${item.brandDes}</li>
                                    <li>${item.orderDes}</li>
                                    <li>${item.drawDes}</li>
                                    <li>${item.productionDes}</li>
                                    <li>${item.accumulativeDes}</li>
                                    </ul>
                                </div>`
                        })
                        return s;
                    })()}
                    </div>`
        process.innerHTML = htmlStr;
    })
}

//加载元素
function getData(sel,el){
    var spotwholesalecontent = $('.spotwholesale-content');
        s = '';
        sel.forEach(function(item){
            s += `<div class="content-box col-lg-3 col-md-6 col-xs-6 col-sm-6">
                    <a href="/pages/particulars.html" class=goodbtn><img src="${item.img}" alt="" class=imgsrc></a>
                    <a href="/pages/particulars.html" class=name>${item.des}</a>
                    <p class=pr><span><del class=opr>${item.oldPrice} </del></span><span class=min>${item.pricDes}</span><span class=npr>${item.newPrice} </span></p>
                    <a href="/pages/particulars.html" class="btn goodbtn">${item.btn}</a>
                </div>`
        })
        spotwholesalecontent.innerHTML = s;
        goodsclick();
}

//添加字体点击效果
function onclickText(listArray,el){
    listArray.forEach(function(item){
        item.classList.remove('showcolor')
    })
    el.classList.add('showcolor')
}


