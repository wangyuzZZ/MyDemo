(function(){
    var warp = document.querySelector('.warp');
    var but = document.querySelector('.but-right')
    var butL = document.querySelector('.but-left')
    var rotate = 0;
    var htmlStr = '';
    play();
    for(var i =0;i<50 ; i++){
        htmlStr += `<div class="list">
                        <div style=background-position:${-20 * i + 'px'}></div>
                        <div style=background-position:${-20 * i + 'px'}></div>
                        <div style=background-position:${-20 * i + 'px'}></div>
                        <div style=background-position:${-20 * i + 'px'}></div>
                    </div>`
    }
    warp.innerHTML = htmlStr;

    var list = Array.from(document.querySelectorAll('.list'))

    but.onclick = function(){
        rotate += 90;
        if(rotate == 360){
            rotate = 0;
        }
        rotatet(rotate);
    }

    butL.onclick = function(){
        rotate -= 90;
        if(rotate === -360){
            rotate = 0;
        }
            rotatet(rotate);
    }
    

    function rotatet(rotate){
        for(let i = 0,len = list.length;i < len;i++){
            list[i].setAttribute('style',`transition:all linear 0.5s ${i*6}ms;transform:rotateX(${rotate+'deg'})`)
        }
    }

    function play(){
        t = setInterval(function(){
            butL.onclick();
        },8000)
    }


    warp.onmouseenter = function(){
        clearInterval(t)
    }
    warp.onmouseleave = function(){
        play();
    }

})();