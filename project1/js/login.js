(function(){
    toTop();
    foot();
    //侧边栏
    sidebar();
    // 跳转注册
    $('.rest').onclick = function(){
        location.href = "/pages/register .html"
        window.event.returnValue = false;
    }

    //实现登录功能
    $('.loginbtn').onclick = function(){
        var userObj = {
            userid : "",
            userpwd : ""
        }
        var userArray = [],
            ID = $('.ID'),
            Pwd = $('.Pwd');
        var idx = -1;
        if(localStorage.user){
            userArray = JSON.parse(localStorage.user);
            userArray.forEach(function(item) {
                if(ID.value == item.username && Pwd.value == item.password){
                    idx = 1;
                }
            });
            if(idx != -1){
                userObj.userid = ID.value;
                userObj.userpwd = Pwd.value;
                var userMessage = [];
                if(localStorage.loginMessage){
                    userArray = JSON.parse(localStorage.loginMessage);
                    if(userArray[0].userid == ID.value && userArray[0].userpwd == Pwd.value){
                        alert('用户已登录');
                        location.href = '/index.html'
                        window.event.returnValue = false;
                        return;
                    }
                    else{
                        $('.loginbtn').textContent = '登录中...'
                        setInterval(function() {
                            location.href = '/index.html'
                            window.event.returnValue = false;
                        }, 3000);
                    }
                }
                userMessage.push(userObj);
                localStorage.loginMessage = JSON.stringify(userMessage);
                return;
            }
            else{
                alert('登录失败,请核对信息后登录')
            }
        }
        else{
            alert('登录失败，请注册后登录');
        }
    }

    //判断是否登录
    judge();
})()