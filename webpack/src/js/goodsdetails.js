import {Util} from "./util";
import "../less/goodsdetails.less";
import "../less/normalized.less";
import "../less/common.jerry.less";
import "../less/common.lwj.less";
import "../less/common.wtt.less";
let util = new Util();

magnifyingGlass("old-img","img","mirror","enlargement","magnifying-glass","https://cdn.bestseller.com.cn/assets/category/JACKJONES/images/upload_a34486e45b2fc479e8b6637e44894369.jpg")

function magnifyingGlass(OldImg,OldBox,Mirror,Enlargement,MagnifyingGlass,url){
    /**
     * OldImg:原图片
     * OldBox:放原图片的盒子
     * Mirr:放大镜
     * Enlargement:放大后的图片
     * url:图片地址
     */
    let Data = {
        //图片宽度
        width:"500px",
    }
    setData(Data,url);
        //原图片
    let img = $(`.${OldImg}`),
        //原图片盒子
        oldbox = $(`.${OldBox}`),
        //放大镜
        mirror = $(`.${Mirror}`)[0],
        //放大后图片
        enlargement = $(`.${Enlargement}`)[0];
        $(`.${OldBox}`)[0].src = url;
        enlargement.style.width = oldbox[0].width + 'px';
        enlargement.style.height = oldbox[0].height + 'px';
        img.mousemove(function(e){
            enlargement.style.display = 'block';
            mirror.style.display = 'block';
            let x = e.clientX,
                y = e.clientY,
                boxTop = oldbox[0].getBoundingClientRect().top,
                boxLeft = oldbox[0].getBoundingClientRect().left,
                mirrorTop = (y - boxTop) - 100,
                mirrorLeft = (x - boxLeft) - 100,
                maxtop = oldbox[0].getBoundingClientRect().height - 200,
                maxleft = oldbox[0].getBoundingClientRect().width - 200;
                if(mirrorTop < 0){
                    mirrorTop = 0;
                }
                if(mirrorLeft < 0){
                    mirrorLeft = 0;
                }
                if(mirrorTop > maxtop){
                    mirrorTop = maxtop
                }
                if(mirrorLeft > maxleft){
                    mirrorLeft = maxleft
                }
                mirror.style.top = mirrorTop + 'px';
                mirror.style.left = mirrorLeft + 'px';
                enlargement.style.backgroundSize = (oldbox[0].getBoundingClientRect().width / 200) * 100 + '%'
                enlargement.style.backgroundPosition = mirrorLeft / maxleft * 100 +'% '+mirrorTop / maxtop * 100 + '%'
        })
    img.mouseout(function(){
        enlargement.style.display = 'none';
        mirror.style.display = 'none';
    })
    //设置CSS参数
    function setData(Data,url){
        $(`.${OldImg}`).css({
            position: "relative"
        })
        $(`.${OldBox}`).css({
            height: "100%",
            width: "100%"
        })
        $(`.${Mirror}`).css({
            display: "none",
            top: "0",
            left: "0",
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "rgba(0, 0, 0, 0.2)"
        })
        $(`.${Enlargement}`).css({
            backgroundSize:"250%",
            boxSizing: "border-box",
            position: "absolute",
            left: "100%",
            top: "0",
            display: "none",
            overflow: "hidden",
            background:`url(${url}) no-repeat`
        })
        $(`.${MagnifyingGlass}`).css({
            position: "relative",
            width: `${Data.width}`,
            height: `${Data.height}`
        })
    }
}

