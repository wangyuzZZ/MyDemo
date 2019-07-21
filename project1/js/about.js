(function(){
    toTop();
    foot();

    var imgs = $('.img-box'),
        btnImg = $('.btn-img',true);
        for(let i = 0;i < btnImg.length;i++){             
            btnImg[i].onclick = function(){
                console.log(i)
                console.log((imgs.offsetWidth) / 5)
                imgs.style.left = -((imgs.offsetWidth) / 5 * i) + 'px'
                console.log(-((imgs.offsetWidth) / 5 * i))
            }
        }
    //侧边栏
    sidebar();
    judge();
})()