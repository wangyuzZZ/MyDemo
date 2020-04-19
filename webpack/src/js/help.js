import {
	Util
} from "./util";
import "../less/help.less";
import "../less/normalized.less";
import "../less/common.jerry.less";
import "../less/common.lwj.less";
import "../less/common.wtt.less";
let util = new Util();

$(".attract-investment").click(function(){
    location.href = "http://localhost:8081/static/pages/attract-investment.html"
})
$(document).ready(function () {

	function myfunction(li, li_a, menu_tab) {
		li.click(function () {
			var index = $(this).index();
			menu_tab.eq(index).addClass("active").siblings().removeClass("active");
			li_a.removeClass("selected");
			li_a.eq(index).addClass("selected").siblings().removeClass("selected");

		});
	}
	myfunction($(".container .menu .ulmenu1 li"), $(".container .ulmenu1 li a"), $(".container .content .menu1 .tab"));
	myfunction($(".container .menu .ulmenu2 li"), $(".container .ulmenu2 li a"), $(".container .content .menu2 .tab"));
	myfunction($(".container .menu .ulmenu3 li"), $(".container .ulmenu3 li a"), $(".container .content .menu3 .tab"));
	myfunction($(".container .menu .ulmenu4 li"), $(".container .ulmenu4 li a"), $(".container .content .menu4 .tab"));
	myfunction($(".container .menu .ulmenu5 li"), $(".container .ulmenu5 li a"), $(".container .content .menu5 .tab"));
	myfunction($(".container .menu .ulmenu6 li"), $(".container .ulmenu6 li a"), $(".container .content .menu6 .tab"));
	myfunction($(".container .menu .ulmenu7 li"), $(".container .ulmenu7 li a"), $(".container .content .menu7 .tab"));
	myfunction($(".container .menu .ulmenu8 li"), $(".container .ulmenu8 li a"), $(".container .content .menu12 .tab"));
	myfunction($(".container .menu .ulmenu9 li"), $(".container .ulmenu9 li a"), $(".container .content .menu9 .tab"));
	myfunction($(".container .menu .ulmenu10 li"), $(".container .ulmenu10 li a"), $(".container .content .menu10 .tab"));
	myfunction($(".container .menu .ulmenu12 li"), $(".container .ulmenu12 li a"), $(".container .content .menu11 .tab"));
	$(function () { //ul/li的折叠效果
		$(".menu > ul").eq(0).show();
		$(".menu h2").click(function () {
			//找menu对应的tab
			$(".menu_tab > div").removeClass("active");

			var val = ($(this).next().attr('class'));
			var menu_value = (val.substring(val.length - 1));
			$(".container .content .menu" + menu_value + " .tab:first-child").addClass("active");
			$(".container .menu .ulmenu" + menu_value + " li>a").removeClass("selected");
			$(".container .menu .ulmenu" + menu_value + " li a").eq(0).addClass("selected"); //默认设置为被选中状态
			$(this).next().stop().slideToggle();
			$(this).siblings().next("ul").stop().slideUp();

		});

	});
	$(function () { // 导航 >
		$(".container .menu > h2").click(function () {
			$(".container .content .A1").empty().text($(this).text());
			$(".container .content .menu" + ((($(this).index()) / 2) + 1) + " .tab").addClass("active")
			$(".container .menu .ulmenu" + ((($(this).index()) / 2) + 1) + " a").removeClass("selected");
			$(".container .menu .ulmenu" + ((($(this).index()) / 2) + 1) + " a").eq(0).addClass("selected");
		});
	});


	/*
	点击事件加载页面

	线下体验中心：ulmenu8；
	寺库招商：ulmenu9；
	关于寺库--媒体报道：media

	*/



});