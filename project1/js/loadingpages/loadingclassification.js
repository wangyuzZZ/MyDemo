// 加载右侧数据
function loadgoods(){
    var title = $('.title'),
        htmlStr = '';
    GET('/json/classification.json',function(el){
        htmlStr += `<img src="${el.title.img}" alt="" class="col-lg-12 col-md-12 col-xs-12 col-sm-12 img-responsive title-img">`;
        title.innerHTML = htmlStr; 
        loadrightlist(el.content)      
    })
}
// 文字点击
function listbtn(){
    var btn = $('.list-btn',true),
        sublist = $('.sub-list',true);
    
    for(let i = 0;i < sublist.length;i++){
        sublist[i].setAttribute("data-index",i)
    }

    var array = Array.from(btn),
        condition = true;
    array.forEach(function(item,index) {
        item.onclick = function(){
            if(condition){
                this.classList.add("rotate")
                sublist[index].classList.add('height')
                condition = false;
            }
            else{
                this.classList.remove("rotate")
                sublist[index].classList.remove('height')
                condition = true;
            }
        }
    });
}
function checkbox(){
    var liArray =Array.from($('.sub-list li input',true));
    var inputflage = 'flase';
    var check = $('.check',true);
    liArray.forEach(function(item,index){
        item.setAttribute('data-flage','flase')
        item.onclick = function(){
            if(this.dataset.flage == 'flase'){
                this.setAttribute('data-flage','true')
                goods(check);
            }
            else{
                this.setAttribute('data-flage','flase')
                goods(check);
            }
        }
    })
}
//加载满足条件的商品
function goods(item){
    var valueArray = [];
    var oldArray = [];
    var arrlen = 0;
    for(let i = 0;i < item.length;i++){
        if(item[i].dataset.flage == 'true'){
            valueArray.push('.*'+item[i].value)    
        }
        else{
            arrlen++;
        }
    }
    if(arrlen == 37){
        valueArray.push('.*包')
    }
    GET('/json/classification.json',function(el){
        valueArray.forEach(function(item){
        var reg = new RegExp(`${item}`)
        var resArr = el.content.filter(function(goods) {
            return reg.test(JSON.stringify(goods));
        });
        resArr.forEach(function(item){
            oldArray.push(item)
        })
        loadrightlist(oldArray)
    })
    })

}
function loadrightlist(con){
    var cur = 1,
    total = 1,
    curPage = $('.curPage'),
    totalPage = $('.totalPage');
    total = Math.ceil(con.length / 9);
    if(total == 0){
        total = 1;
    }
    totalPage.innerHTML = total;
    loadingInfos(con,total,cur);

    $('.up').onclick = function(){
        cur = cur == 1 ? 1 : --cur;
        curPage.innerHTML = cur;
        loadingInfos(con,total,cur);
    }
    $('.down').onclick = function(){
        cur = cur == total ? total : ++cur;
        curPage.innerHTML = cur;
        loadingInfos(con,total,cur);
    }
}
//搜索
function search(){
    var serach = $('.search');
    var inp = $('.inp');
    var oldArray = [];

    serach.onclick = function(){
        var cont = inp.value;
        if(cont.length == 0){
            alert('请输入商品名称');
            return;
        }
        GET('/json/classification.json',function(el){
            if(oldArray.length != 0){
                oldArray.splice(0,oldArray.length)
            }
            var reg = new RegExp(`.*${cont}`)
            var resArr = el.content.filter(function(goods) {
                return reg.test(JSON.stringify(goods.des));
            });
            resArr.forEach(function(item){
                oldArray.push(item)
            })
            loadrightlist(oldArray)
        })
    }
}