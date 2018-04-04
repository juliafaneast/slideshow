/**
 * Created by FD1 on 2018/4/4.
 */
window.onload = function () {
    // 1.动态添加焦点精灵图

    // 1-1. 获取元素
    function $(id) { return document.getElementById(id);}
    var slider_ctrl = $("slider_ctrl");
    var imgs = $("slider_main_block").children; // 获取所有图片节点
    for (var i = 0; i < imgs.length; i++) {
        var span = document.createElement("span");
        span.innerHTML = imgs.length - i;
        if ( i == imgs.length-1) {
            span.className = "slider-ctrl-con current";
        } else {
            span.className = "slider-ctrl-con";
        }
        slider_ctrl.insertBefore(span, slider_ctrl.children[1]);
    }
    // 2. 设置图片的位置
    // 2-1 slider 盒子里面只留第一张图片，其他的图片全部到第一张的右边
    var scrollWidth = $("js_slider").clientWidth;  // clientWidth = width + padding
    for (var j = 1; j < imgs.length; j++) {
        imgs[j].style["left"] = scrollWidth + "px";
    }

    // 3.给8 个按钮添加点击事件
    var spans = slider_ctrl.children;
    var iNow =  0; // 当前显示的图片
    for (var k in spans) {
        spans[k].onclick = function (event) {
            // 3-1 区分左右侧按钮
            if(this.className == "slider-ctrl-prev") {
                // // 3-2 点击了左侧按钮，当前的图片向右移动，左侧的图片也同时向右移动
                animate(imgs[iNow], {left: scrollWidth});
                (--iNow < 0) ? iNow = imgs.length-1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow], 0);
                animate(imgs[iNow], {left: 0});
            } else if ( this.className == "slider-ctrl-next") {
                // 3-2 点击右侧按钮， 当前的图片向左移，后一张图片也跟着向左移动
                animate(imgs[iNow], {left: -scrollWidth});
                // 判断下一张是否是最后一张图，如果是则再从0 开始
                (++iNow> imgs.length-1) ? iNow = 0 : iNow;
                // 不论这张图片当前是在哪个位置，都要先定位到当前图片的右边，然后在滑动到左边  *********核心
                imgs[iNow].style.left = scrollWidth + "px";
                animate(imgs[iNow], {left: 0});
            } else {
                // // 4 点击焦点
                // // 4-1 获取当前点击的焦点的下标
                var clickedIndex = parseInt(this.innerHTML)-1;

                if ( iNow < clickedIndex) {  // 4-3 如果点击的焦点在当前图片的右侧，类似右侧按钮
                    animate(imgs[iNow],{left: -scrollWidth});
                    imgs[clickedIndex].style.left = scrollWidth + "px";
                    // animate(imgs[clickedIndex], {left: 0});
                    // iNow = clickedIndex;

                } else if ( iNow > clickedIndex) { //4-4 如果点击的焦点在当前图片的左侧，类似左侧按钮
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[clickedIndex].style.left = -scrollWidth + "px";
                    // animate(imgs[clickedIndex], {left: 0});
                    // iNow = clickedIndex;
                }
                animate(imgs[clickedIndex], {left: 0});
                iNow = clickedIndex;
            }
            setSquare();
        }
    }

    // 添加定时器  定时器其实相当于右侧按钮
    var timer = null;
    timer = setInterval(autoPlay,1000)

    // 停止定时器
    $("js_slider").onmouseover = function () {
        clearInterval(timer);
    }
    $("js_slider").onmouseout = function () {
        clearInterval(timer);  // 要启动定时器先清除定时器
        timer = setInterval(autoPlay,1000); // 启动定时器
    }

    function  autoPlay() {
        // 3-2 点击右侧按钮， 当前的图片向左移，后一张图片也跟着向左移动
        animate(imgs[iNow], {left: -scrollWidth});
        // 判断下一张是否是最后一张图，如果是则再从0 开始
        (++iNow> imgs.length-1) ? iNow = 0 : iNow;
        // 不论这张图片当前是在哪个位置，都要先定位到当前图片的右边，然后在滑动到左边  *********核心
        imgs[iNow].style.left = scrollWidth + "px";
        animate(imgs[iNow], {left: 0});
        setSquare();
    }

    // 4-2 设置点击焦点的背景图片位置， focus。 焦点要跟着定时器走
    function setSquare() {
        for (var m = 1; m <=imgs.length; m++) {
            spans[m].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";
    }
}