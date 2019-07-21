function load(){
    var boxleft = $('.main'),
        htmlStr = '';
    GET('/json/new.json',function(el){
        htmlStr += `<div class="m-left col-lg-4 col-md-12 col-xs-12 col-sm-12">
                        <div class="m-title col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <h2>${el.boxLeft.title}</h2>
                            <h3>${el.boxLeft.des}</h3>
                        </div>
                        <img class="m-img col-lg-12 col-md-12 col-xs-12 col-sm-12 img-responsive" src="${el.boxLeft.img}" alt="">
                    </div>
                    <div class="m-right col-lg-8 col-md-12 col-xs-12 col-sm-12"></div>
                    <p class="paging">
                        <span class="up">上一页</span>
                        第<span class="curPage">1</span>页
                        共<span class="totalPage"></span>页
                        <span class="down">下一页</span>
                    </p>`
        boxleft.innerHTML = htmlStr
        contLen = el.boxRight.length;
        nowpage = 1;
        pageSum = Math.ceil(contLen / 5);
        $('.totalPage').innerHTML = pageSum;
        loadpage(el.boxRight,nowpage,pageSum,contLen,$('.m-right'));
        $('.up').onclick = function(){
            nowpage = nowpage == 1 ? 1 : --nowpage
            loadpage(el.boxRight,nowpage,pageSum,contLen,$('.m-right'));
        }
        $('.down').onclick = function(){
            nowpage = nowpage == pageSum ? pageSum : ++nowpage
            loadpage(el.boxRight,nowpage,pageSum,contLen,$('.m-right'));
        }
    })
}

// 加载数据
function loadpage(el,nowpage,pageSum,sum,eml){
    var startIdx = (nowpage - 1) * 5;
    var endIdx = nowpage == pageSum ? startIdx + sum % 5 - 1 : ((nowpage - 1) * 5) + 3
    var str = '';
    for(let i = startIdx;i <= endIdx;i++){
        str +=`<div class="m-content col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <div class="c-title" >
                        <h3 class="article-btn"><a href="/pages/article.html">${el[i].title}</a></h3>
                        <span>${el[i].time}</span>
                    </div>
                    <p>${el[i].des}</p>
                </div>`
    }
    $('.curPage').innerHTML = nowpage;
    eml.innerHTML = str;

    for(let i = 0;i <  $('.article-btn',true).length;i++){
        $('.article-btn',true)[i].onclick = function(){
            sessionStorage.article = JSON.stringify(this.textContent)
        }
    }
}