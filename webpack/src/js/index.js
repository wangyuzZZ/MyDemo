import {
    Util
} from "./util";
import "../less/index.less";
import "../less/normalized.less";
import "../less/common.jerry.less";
import "../less/common.lwj.less";
import "../less/common.wtt.less";
import Swiper from "swiper";
import "style-loader!css-loader!../../node_modules/swiper/dist/css/swiper.min.css";
let util = new Util();

$(".global").click(function () {
    location.href = "http://localhost:8081/static/pages/global.html"
})
$(".kol").click(function () {
    location.href = "http://localhost:8081/static/pages/kol.html"
})
$(".content-right-imgbox").click(function () {
    location.href = "http://localhost:8081/static/pages/news.html"
})
$(".abc").click(function () {
    location.href = "http://localhost:8081/static/pages/help.html"
})

$(".abcd").click(function () {
    location.href = "http://localhost:8081/static/pages/attract-investment.html"
})
// 点击播放视频 
$(".vido-mask").click(function () {
    $(".video-play").css({
            display: "block"
        }),
        $(".vido-mask").css({
            display: "none"
        })
    $(".video-play").click()
})
let swiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
// 类名class
/*
-----头部---------
头部logo：          head-logo
登陆：              landing
注册：              login
购物车：            cart
我的收藏：          collection

头部一级菜单列表ul：     hed-list
搜索框input：           inputs
搜索框按钮：            search-click
二级菜单分类ul列表：     classify
二级菜单品牌ul列表：     brand


------内容模块------
看街头潮人穿什么：   content-left-img
发现更多：          content-left-bj
国际品牌：          content-right-imgbox
时装衣橱：          main-mask
寺库kol:            kol
美妆魔法：          makeup
鞋履天堂：          shoes
全球买手店：        global
寺库体验中心：      centre
关于我们：          aboutus

------尾部---------
服务指南ul列表：   sub-list
*/