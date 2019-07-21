(function(){
    toTop();
    foot();

    //地图
    var map = new BMap.Map("map");    
    var point = new BMap.Point(90.404, 39.915); 
    map.addControl(new BMap.NavigationControl());    
    map.addControl(new BMap.ScaleControl());    
    map.addControl(new BMap.OverviewMapControl());    
    map.addControl(new BMap.MapTypeControl());    
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);    
    window.setTimeout(function(){  
        map.panTo(new BMap.Point(116.409, 39.918));    
    }, 2000);

    //用户留言提交
    var message = {
        name:'',
        tel:'',
        content:''
    }
    var name = $('.name'),
        tel = $('.tel'),
        content = $('.content'),
        subut = $('.subut'),
        mes = $('.mes');
        subut.onclick = function(){
            var userMess = [];
            message.name = name.value;
            message.tel = tel.value;
            message.content = content.value;

            if(localStorage.userMessage){
                userMess = JSON.parse(localStorage.userMessage)
            }
            if(name.value != 0 && tel.value != 0 && content.value != 0){
                userMess.push(message);
                localStorage.userMessage = JSON.stringify(userMess)
                mes.classList.add('show')
                setInterval(function() {
                    mes.classList.remove('show')
                }, 5000);
            }
        }
    //侧边栏
    sidebar();
    //判断登录状态
     judge();    
})()