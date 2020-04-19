// 公用方法/函数
import {
    Util
} from "./util";


$(".hed-list .tab-hover").hover(function () {
    // 品牌.分类动态加载
    let tabIndex = $(this).data("index");
    let tablist = {
        url: "../static/json/goodslist.json",
        attr: ["taglist", "list"],
        index: tabIndex
    }
    Util.ajaxGetTab(tablist);
    // over
    $(".tab-car").css({
        display: "flex"
    })
}, function () {
    // out
    $(".tab-car").css({
        display: "none"
    })
})

$(".tab-car").hover(function () {
    // over
    $(".tab-car").css({
        display: "flex"
    })
}, function () {
    // out
    $(".tab-car").css({
        display: "none"
    })
})
// 固定导航栏
$(document).ready(function () {
    var navOffset = $(".hed-list-box").offset().top;
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos >= navOffset) {
            $(".hed-list-box").addClass("fixed");
            $(".list-box").addClass("full");
            $(".tab-car").addClass("show")
        } else {
            $(".hed-list-box").removeClass("fixed");
            $(".list-box").removeClass("full");
            $(".tab-car").removeClass("show")
        }
    });
});

//  隐藏固定定位
$(window).resize(function () {
    if ($(window).width() < 1100) {
        $(".fixed-box").css({
            display: "none"
        })
    } else {
        $(".fixed-box").css({
            display: "block"
        })
    }
})