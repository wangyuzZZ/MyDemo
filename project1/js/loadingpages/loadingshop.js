function loadshop(){
    var shopArray = [];
    if(localStorage.shoppingcar){
        shopArray = JSON.parse(localStorage.shoppingcar);
        if(shopArray.length == 0){
            $('.main').innerHTML = `<h1 class="none">购物车是空的哟，快去挑选喜欢的商品吧！</h1>
            <a href="/pages/classification.html" class="backShop">返回商店</a>
            `
            return;
        }
        $('.main').innerHTML = `${(function(){
            var s = '';
           shopArray.forEach(function(item,idx) {
               s += `<div class="shop">
               <div class="shop-name">
                   <img src="${item.goodimg}" alt="">
                   <div class="shop-des">
                       <p class="shop-des-name">${item.productname}</p>
                       <p class="shop-des-color">颜色：${item.color}</p>
                   </div>
               </div>
               <p class="shop-price">价格：${item.pric}</p>
               <div class="shop-num-btn">
                   <span class="delete" data-index="${idx}">-</span>
                   <span class="shop-num">${item.num}</span>
                   <span class="add" data-index="${idx}">+</span>
               </div>
               <p class="price-sum">总计：￥${(function(){
                   var z =Number(item.pric.split('￥')[1]) * item.num
                   return z
               })()}</p>
               <button class="delete-btn" data-index="${idx}">删除</button>
           </div>
           `
           });
           return s;
        })()}
        <div class="shop-end shop">
            <p class="freight"></p>
            <p class="sum"></p>
            <button class="money">前往收银台</button>
        </div>
        `
        //运费
        $('.freight').innerHTML = '运费：￥' + Math.ceil(sum() * 0.009) 
        // 订单总计
        $('.sum').innerHTML = '订单总计:￥' + (sum() + Math.ceil(sum() * 0.009));
        del(shopArray,$('.delete-btn',true))
        //收银台
        $('.money').onclick = function(){
            location.href = '/pages/settleaccounts.html'
        }
        var adds = $('.add',true);
        var deletes = $('.delete',true);
        for(let i = 0;i < adds.length;i++){
            adds[i].onclick = function(){
                num('add',i,shopArray)
            }
            deletes[i].onclick = function(){
                num('delete',i,shopArray)
            }
        }
    }

   
}
//计算订单总价
function sum(){
    var z = 0;
    var sumpr =  $('.price-sum',true);
    for(let i = 0;i < sumpr.length;i++){
        z += Number((sumpr[i].textContent).split('￥')[1]);
    }
    return z;
}
//删除
function del(carArray,btn){
    for(let i = 0;i < btn.length;i++){
        btn[i].onclick = function(){
            carArray.splice(this.dataset.index,1)
            localStorage.removeItem('shoppingcar');
            localStorage.shoppingcar = JSON.stringify(carArray);
            loadshop();
            //更新下标
            judge();
        }
    }
}
function num(name,idx,shopArray){
    switch (name) {
        case 'add':{
            shopArray[idx].num = Number(shopArray[idx].num) + 1
            localStorage.shoppingcar = JSON.stringify(shopArray)
            loadshop();
        }break;
    
        case 'delete':{
            shopArray[idx].num = shopArray[idx].num == 1 ? shopArray.splice(idx,1) :Number(shopArray[idx].num) - 1;
            localStorage.shoppingcar = JSON.stringify(shopArray)
            loadshop();
        }break;
    }
}