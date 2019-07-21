//加载文章
function loadarticle(){
    $('.main').innerHTML = `<div class="article col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <p class="article-title"><a href="/index.html">首页</a>/<a href="/pages/new.html">博客动态</a>/<span>${JSON.parse(sessionStorage.article)}</span></p>
                                <div class="article-box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                    <h3>${JSON.parse(sessionStorage.article)}</h3>
                                    <p class="article-des"></p>
                                    <button class="back">返回</button>
                                </div>
                            </div>`
    GET('/json/article.json',function(el){
        var articleDes = $('.article-des');
        el.forEach(function(item) {
            if(item.title == JSON.parse(sessionStorage.article)){
                articleDes.innerHTML = `${item.des}`
            }
        });
    })
    $('.back').onclick = function(){
        location.href = '/pages/new.html'
    }
}