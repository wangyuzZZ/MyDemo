class Util {
    static ajaxGetTab(options) {
        $.ajax({
            url: options.url,
            type: "GET",
            dataType: "json",
            success: callback,
            error: function () {}
        })

        function callback(res) {
            let classifyStr = '';
            let brandStr = '';
            // 品牌加载
            $(res[options.index].taglist).each((index, item) => {
                brandStr += `
                    <li><a href="javascript:;">${item}</a></li>`;
            })
            $(".brand").html(brandStr);

            // 分类读取
            let list = [];
            $(res[options.index].list).each((val, item) => {
                list.push(item.details.classify);
            })
            // 类型去重
            let new_list = Util.removeMore(list);
            // 分类加载
            $(new_list).each((index, item) => {
                classifyStr += `
                    <li><a href="javascript:;">${item}</a></li>`;
            })
            $(".classify").html(classifyStr);

        }
    }

    static ajaxGetGoods(options) {
        $.ajax({
            url: options.url,
            type: "GET",
            dataType: "json",
            success: callback,
            error: function () {}
        })

        function callback(res) {
            let htmlStr = '';
            let taglist = '';
            let classify = '';
            let sessionList = [];
            let list = [];
            $(res).each((index, val) => {
                // 品牌列表
                $(val.taglist).each((index, item) => {
                    taglist += `<span class='checkTag'>${item}</span>`
                })
                // 商品列表
                $(val.list).each((num, item) => {
                    list.push(item.details.classify);
                    if (item.details.classify == "车辆租赁") {
                        htmlStr += `<li data-id='${JSON.stringify(item)}'>
                        <div class="comm-img">
                            <img src=${item.img[0]} alt="">
                        </div>
                        <div class="skip">
                            <a href="" class="comm-title">${item.details.title}</a>
                        </div>
                        <div class="pri">
                            <p class="money">￥${item.price}</p>
                            <p class="collect">&#xe601;收藏</p>
                        </div>
                    </li>
                    `
                    } else {
                        htmlStr += `<li data-id='${JSON.stringify(item)}'>
                                    <div class="comm-img">
                                        <img src=${item.img[0]} alt="">
                                    </div>
                                    <span>自营</span>
                                    <span class="depreciate">直降</span>
                                    <div class="skip">
                                        <a href="" class="comm-title">${item.details.title}</a>
                                    </div>
                                    <div class="pri">
                                        <p class="money">￥${item.price}</p>
                                        <p class="collect">&#xe601;收藏</p>
                                    </div>
                                </li>
                                 `
                    }
                    sessionList.push(item)
                })
            })
            sessionStorage.list = JSON.stringify(sessionList);
            // 类型去重
            let new_list = Util.removeMore(list)
            // 分类加载
            $(new_list).each((index, item) => {
                classify += `<span class='checkClass'>${item}</span>`;
            })
            $(".classifys-list").html(classify);
            $('.taglist').html(taglist);

            $(".comm-list").html(htmlStr);

            Util.loadCheck();

            // 品牌塞选
            $('.checkTag').click(function () {
                sessionStorage.loadclass = true;
                Util.loadClass('tag', $(this).text());
            })
            $('.checkClass').click(function () {
                sessionStorage.loadclass = true;
                Util.loadClass('class', $(this).text());
            })
            // 清空筛选
            $('.clearcheck').click(function () {
                sessionStorage.removeItem("checktag");
                sessionStorage.removeItem("checkclass");
                Util.loadCheck();
                let goodslist = {
                    url: "../json/goodslist.json"
                }
                Util.ajaxGetGoods(goodslist);
            })

        }
    }

    static loadClass(em, className) {
        $.ajax({
            url: "../json/goodslist.json",
            type: "GET",
            dataType: "json",
            success: callback,
            error: function () {}
        })

        function callback(res) {
            let list = [];
            let htmlStr = $('.checklist').html();
            if (em == 'tag') {
                $(res).each((index, item) => {
                    $(item.list).each((num, val) => {
                        if (className == val.details.tag) {
                            list.push(val)
                        }
                    })
                })
                sessionStorage.checktag = className;
            } else if (em == 'class') {
                $(res).each((index, item) => {
                    $(item.list).each((num, val) => {
                        if (className == val.details.classify) {
                            list.push(val)
                        }
                    })
                })
                sessionStorage.checkclass = className;
            }
            Util.loadCheck();
            Util.selectItem();
        }
    }
    // 筛选
    static selectItem() {
        $.ajax({
            url: "../json/goodslist.json",
            type: "GET",
            dataType: "json",
            success: callback,
            error: function () {}
        })

        function callback(res) {
            let list = [];
            let classify = '';
            if (sessionStorage.checktag) {
                let htmlStr = '';
                $(res).each((index, item) => {
                    $(item.list).each((num, val) => {
                        if (val.details.tag == sessionStorage.checktag) {
                            list.push(val.details.classify);
                            if (val.details.classify == "车辆租赁") {
                                htmlStr += `<li data-id='${JSON.stringify(item)}'>
                                <div class="comm-img">
                                    <img src=${val.img[0]} alt="">
                                </div>
                                <div class="skip">
                                    <a href="" class="comm-title">${val.details.title}</a>
                                </div>
                                <div class="pri">
                                    <p class="money">￥${val.price}</p>
                                    <p class="collect">&#xe601;收藏</p>
                                </div>
                            </li>
                            `
                            } else {
                                htmlStr += `<li data-id='${JSON.stringify(val)}'>
                                            <div class="comm-img">
                                                <img src=${val.img[0]} alt="">
                                            </div>
                                            <span>自营</span>
                                            <span class="depreciate">直降</span>
                                            <div class="skip">
                                                <a href="" class="comm-title">${val.details.title}</a>
                                            </div>
                                            <div class="pri">
                                                <p class="money">￥${val.price}</p>
                                                <p class="collect">&#xe601;收藏</p>
                                            </div>
                                        </li>
                                         `
                            }
                        }
                    })

                })
                $(".comm-list").html(htmlStr);
                // 类型去重
                let new_list = Util.removeMore(list);
                $(new_list).each((index, item) => {
                    classify += `<span class='checkClass'>${item}</span>`;
                })
                $(".classifys-list").html(classify);
            }

            if (sessionStorage.checkclass) {
                let htmlStr = '';
                $(res).each((index, item) => {
                    $(item.list).each((num, val) => {
                        if (val.details.classify == sessionStorage.checkclass) {
                            list.push(val.details.tag);
                            if (val.details.classify == "车辆租赁") {
                                htmlStr += `<li data-id='${JSON.stringify(item)}'>
                                <div class="comm-img">
                                    <img src=${val.img[0]} alt="">
                                </div>
                                <div class="skip">
                                    <a href="" class="comm-title">${val.details.title}</a>
                                </div>
                                <div class="pri">
                                    <p class="money">￥${val.price}</p>
                                    <p class="collect">&#xe601;收藏</p>
                                </div>
                            </li>
                            `
                            } else {
                                htmlStr += `<li data-id='${JSON.stringify(val)}'>
                                            <div class="comm-img">
                                                <img src=${val.img[0]} alt="">
                                            </div>
                                            <span>自营</span>
                                            <span class="depreciate">直降</span>
                                            <div class="skip">
                                                <a href="" class="comm-title">${val.details.title}</a>
                                            </div>
                                            <div class="pri">
                                                <p class="money">￥${val.price}</p>
                                                <p class="collect">&#xe601;收藏</p>
                                            </div>
                                        </li>
                                         `
                            }
                        }
                    })

                })
                $(".comm-list").html(htmlStr);
                // 类型去重
                let new_list = Util.removeMore(list);
                $(new_list).each((index, item) => {
                    classify += `<span class='checkTag'>${item}</span>`;
                })
                $(".taglist").html(classify);
            }

            if (sessionStorage.checkclass && sessionStorage.checktag) {
                let sortList = [];
                let list = [];
                $('.comm-list li').each((index, item) => {
                    sortList.push(JSON.parse(item.dataset.id))
                })
                $(sortList).each((index, item) => {
                    if (item.details.tag == sessionStorage.checktag && item.details.classify == sessionStorage.checkclass) {
                        list.push(item);
                    }
                })
                Util.sortLoad(list);
            }

            // 品牌塞选
            $('.checkTag').click(function () {
                sessionStorage.loadclass = true;
                Util.loadClass('tag', $(this).text());
            })
            $('.checkClass').click(function () {
                sessionStorage.loadclass = true;
                Util.loadClass('class', $(this).text());
            })

            // 清空筛选
            if (!sessionStorage.checktag && !sessionStorage.checkclass) {
                sessionStorage.removeItem("checktag");
                sessionStorage.removeItem("checkclass");
                Util.loadCheck();
                let goodslist = {
                    url: "../json/goodslist.json"
                }
                Util.ajaxGetGoods(goodslist);
            }

        }

    }
    // 排序
    static sortLoad(sortList) {
        // 商品列表
        let htmlStr = '';
        $(sortList).each((num, item) => {
            if (item.details.classify == "车辆租赁") {
                htmlStr += `<li data-id='${JSON.stringify(item)}'>
                <div class="comm-img">
                    <img src=${item.img[0]} alt="">
                </div>
                <div class="skip">
                    <a href="" class="comm-title">${item.details.title}</a>
                </div>
                <div class="pri">
                    <p class="money">￥${item.price}</p>
                    <p class="collect">&#xe601;收藏</p>
                </div>
            </li>
            `
            } else {
                htmlStr += `<li data-id='${JSON.stringify(item)}'>
                            <div class="comm-img">
                                <img src=${item.img[0]} alt="">
                            </div>
                            <span>自营</span>
                            <span class="depreciate">直降</span>
                            <div class="skip">
                                <a href="" class="comm-title">${item.details.title}</a>
                            </div>
                            <div class="pri">
                                <p class="money">￥${item.price}</p>
                                <p class="collect">&#xe601;收藏</p>
                            </div>
                        </li>
                         `
            }
        })
        $(".comm-list").html(htmlStr);
        if (sessionStorage.loadclass) {
            sessionStorage.list = JSON.stringify(sortList);
        }
    }

    /**
     * 对象属性排序
     * @param {对象属性} attr 
     * @param {是否降序} isDown 
     */
    static sortBy(attr, isDown) {
        return function objMax(a, b) {
            if (isDown) {
                return b[attr] - a[attr];
            } else {
                return a[attr] - b[attr];
            }
        }
    }

    static removeMore(list) {
        // 类型去重
        let new_list = [];
        for (let i = 0, len = list.length; i < len; i++) {
            let items = list[i];
            if ($.inArray(items, new_list) == -1) {
                new_list.push(items);
            }
        }
        return new_list;
    }
    static loadCheck() {
        let htmlStr = ``;
        if (sessionStorage.checktag) {
            htmlStr += `<span data-name='tag'>${sessionStorage.checktag}</span>`
            $('.tag-brand').addClass('hide');
            $('.check-box').removeClass('hide');
        } else {
            $('.tag-brand').removeClass('hide');
        }

        if (sessionStorage.checkclass) {
            htmlStr += `<span data-name='class'>${sessionStorage.checkclass}</span>`
            $('.class-brand').addClass('hide');
            $('.check-box').removeClass('hide');
        } else {
            $('.class-brand').removeClass('hide');
        }

        if (!sessionStorage.checktag && !sessionStorage.checkclass) {
            $('.tag-brand').removeClass('hide');
            $('.class-brand').removeClass('hide');
            $('.check-box').addClass('hide');
        }
        $('.checklist').html(htmlStr);

        // 取消塞选
        $('.checklist span').click(function () {
            sessionStorage.loadclass = false;
            if ($(this).data('name') == 'tag') {
                sessionStorage.removeItem("checktag");
            } else if ($(this).data('name') == 'class') {
                sessionStorage.removeItem("checkclass");
            }
            Util.loadCheck();
        })

        Util.selectItem();
    }
}



























module.exports = {
    Util
}