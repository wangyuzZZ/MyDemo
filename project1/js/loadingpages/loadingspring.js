function goodslist(){
    var maincontent = $('.main-content'),
        htmlStr = '';
        GET('/json/spring.json',function(el){
            htmlStr += `<div class="title col-lg-12 col-md-12 col-xs-12 col-sm-12" style="background:url(${el.title.img})no-repeat">
                            <div class="title-des">
                                <h1>${el.title.des}</h1>
                                <h2>${el.title.subtitle}</h2>
                            </div>
                        </div>
                        <div class="goods-box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          ${(function(){
                            var s = ''
                              el.content.forEach(function(item) {
                                  s += `<div class="content-box col-lg-3 col-md-6 col-xs-6 col-sm-6">
                                            <a href="/pages/particulars.html"><img src="${item.img}" alt="" class="imgsrc"></a>
                                            <a href="/pages/particulars.html" class="name">${item.des}</a>
                                            <p><span><del class="opr">${item.oldPrice}</del></span><span class="min">${item.pricDes}</span><span class="npr">${item.newPrice}</span></p>
                                            <a href="/pages/particulars.html" class="btn">${item.btn}</a>
                                        </div>`
                              });
                              return s;
                          })()}
                        </div>`
        maincontent.innerHTML = htmlStr;
        goodsclick();
        })
}