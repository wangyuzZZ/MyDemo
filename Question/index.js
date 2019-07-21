(function () {
    var obj = null; //当前操作对象
    var box = null; //要处理的对象;
    //保留上次的x,y位置
    var clickX = 0;
    var clickY = 0;
    // 大盒子
    document.querySelector('#box').onmousedown = (e) => {
        onDragDown(e, "move");
    }
    // 四个角(小盒子)
    Array.from(document.querySelectorAll('#box div')).forEach(item => {
        item.onmousedown = (e) => {
            switch (e.target.id) {
            case 'upLeftBtn': {
                onDragDown(e, 'nw')
            };
            break
            case 'upRightBtn': {
                onDragDown(e, "ne");
            };
            break
            case 'downLeftBtn': {
                onDragDown(e, "sw");
            };
            break
            case 'downRightBtn': {
                onDragDown(e, "se");
            };
            break
            }
        }
    })
    // 鼠标移动
    document.onmousemove = function (e) {
        if (obj) {
            e = e || window.event;
            var location = {
                x: e.x || e.clientX,
                y: e.y || e.clientY
            }
            switch (obj.operateType) {
                case "nw":
                    move('n', location, box);
                    move('w', location, box);
                    break;
                case "ne":
                    move('n', location, box);
                    move('e', location, box);
                    break;
                case "sw":
                    move('s', location, box);
                    move('w', location, box);
                    break;
                case "se":
                    move('s', location, box);
                    move('e', location, box);
                    break;
                case "move":
                    move('move', location, box);
                    break;
            }
        }
    }
    // 清除移动
    document.onmouseup = function () {
        obj = null;
    }
    //鼠标点击
    var onDragDown = function (e, type) {
        e.stopPropagation();
        e = e || window.event;
        clickX = e.x || e.clientX;
        clickY = e.y || e.clientY;
        obj = this;
        obj.operateType = type;
        box = document.getElementById("box");
    }
    // 鼠标移动
    var move = function (type, location, tarobj) {
        switch (type) {
            case 'n':
                var add_length = clickY - location.y;
                clickY = location.y;
                var length = parseInt(tarobj.style.height) + add_length;
                tarobj.style.height = length + "px";
                tarobj.style.top = (clickY - 100) + "px";
                break;
            case 's':
                var add_length = clickY - location.y;
                clickY = location.y;
                var length = parseInt(tarobj.style.height) - add_length;
                tarobj.style.height = length + "px";
                break;
            case 'w':
                var add_length = clickX - location.x;
                clickX = location.x;
                var length = parseInt(tarobj.style.width) + add_length;
                tarobj.style.width = length + "px";
                tarobj.style.left = clickX + "px";
                break;
            case 'e':
                var add_length = clickX - location.x;
                clickX = location.x;
                var length = parseInt(tarobj.style.width) - add_length;
                tarobj.style.width = length + "px";
                break;
            case 'move':
                var add_ylength = clickY - location.y;
                clickY = location.y;
                var length = parseInt(tarobj.style.top) - add_ylength;
                tarobj.style.top = length + "px";
                var add_xlength = clickX - location.x;
                clickX = location.x;
                var xlength = parseInt(tarobj.style.left) - add_xlength;
                tarobj.style.left = xlength + "px";
                break;
        }
    }
})()