import {
    Util
} from "./util";
import "../less/goodslist.less";
import "../less/normalized.less";
import "../less/common.jerry.less";
import "../less/common.lwj.less";
import "../less/common.wtt.less";
let util = new Util();

let goodslist = {
    url: "../json/goodslist.json"
}
Util.ajaxGetGoods(goodslist);

// 价格之间
$(".price").hover(function () {
    $(".butn").css({
        display: "block"
    })
}, function () {
    $(".butn").css({
        display: "none"
    })
})

$(".butn").hover(function () {
    $(".butn").css({
        display: "block"
    })
})

// 排序按钮箭头旋转
$(".filtrate li").click(function () {
    $(".filtrate li").removeClass('on');
    $(this).addClass('on');
    $(this).toggleClass('reture');
})

// 点击排序
let sorted = false;
$(".filtrate li").each((index, item) => {
    let sortList = [];
    let sortIng = false;
    $(item).click(function () {
        if ($('.comm-list').html() == `<p class="err">没有找到对应的宝贝请重新输入价格区间！</p>`) {

        } else {
            $('.comm-list li').each((index, item) => {
                sortList.push(JSON.parse(item.dataset.id))
            })
            switch (index) {
                case 0: {
                    if (sessionStorage.loadclass) {
                        let list = JSON.parse(sessionStorage.list);
                        list.reverse();
                        Util.sortLoad(list);
                    } else if (sorted) {
                        $(".filtrate li").removeClass('reture');
                        Util.ajaxGetGoods(goodslist);
                        sorted = false;
                    } else {
                        sortList.reverse();
                        Util.sortLoad(sortList);
                    }
                }
                break;
            case 1: {
                sorted = true;
                if (sortIng) {
                    $(".filtrate li").removeClass('reture');
                    sortList.sort(Util.sortBy("price", true));
                    Util.sortLoad(sortList);
                    sortIng = false;
                } else {
                    sortList.sort(Util.sortBy("price", false));
                    Util.sortLoad(sortList);
                    sortIng = true;
                }
            }
            break;
            }
            sortList = [];
        }

    })
})

// 价格塞选
$('.enter').click(function () {
    if ($('.number')[0].value == '') {
        $('.number')[0].value = 0;
    }
    if ($('.number')[1].value == '') {
        $('.number')[1].value = 0;
    }
    let sortList = [];
    let pirceList = [];
    $('.comm-list li').each((index, item) => {
        sortList.push(JSON.parse(item.dataset.id))
    })
    $(sortList).each((index, item) => {
        if (parseInt(item.price) >= $('.number')[0].value && parseInt(item.price) <= $('.number')[1].value) {
            pirceList.push(item);
        }
    })
    if (pirceList.length == 0) {
        let errStr = `<p class='err'>没有找到对应的宝贝请重新输入价格区间！</p>`
        $('.comm-list').html(errStr)
    } else {
        Util.sortLoad(pirceList);
    }
})

$('.empty').click(function () {
    location.reload();
})