window.yx = {
    g: function(name) { //获取类名
        return document.querySelector(name)
    },
    ga: function(name) {
        return document.querySelectorAll(name)
    },
    addEvent: function(obj, event, fn) { //事件监听
        if (obj.addEventListener) {
            obj.addEventListener(event, fn)
        } else {
            obj.attachEvent('on' + event, fn)
        }
    },
    removeEvent: function(obj, event, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(event, fn);
        } else {
            obj.detachEvent('on' + event, fn);
        }
    },
    getTopValue: function(obj) { //获取元素离html的距离
        var top = 0;
        while (obj.offsetParent) {
            top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return top;
    },
    cutTime: function(target) { //倒计时
        var currentDate = new Date();
        var v = Math.abs(target - currentDate);

        return {
            d: parseInt(v / (24 * 3600000)),
            h: parseInt(v % (24 * 3600000) / 3600000),
            m: parseInt(v % (24 * 3600000) % 3600000 / 60000),
            s: parseInt(v % (24 * 3600000) % 3600000 % 60000 / 1000)
        };
    },
    format: function(v) { //给时间补0
        return v < 10 ? '0' + v : v;
    },
    formatDate: function(time) {
        var d = new Date(time);
        return d.getFullYear() + '-' + yx.format(d.getMonth() + 1) + '-' + yx.format(d.getDate()) + ' ' + yx.format(d.getHours()) + ':' + yx.format(d.getMinutes());
    },
    parseUrl: function(url) {
        // id = xxxxxxx
        var reg = /(\w+)=(\w+)/ig,
            result = {};

        url.replace(reg, function(a, b, c) {
            result[b] = c;
        });

        return result;
    },
    public: {
        navFn: function() {
            var nav = yx.g('.nav'),
                lis = yx.ga('.navBar li'),
                subNav = yx.g('.subNav'),
                uls = yx.ga('.subNav ul'),
                newLis = []; //存储实际有用到的导航li
            // console.log(navList.cateList.length)


            //首页没有hover和后三个没有
            for (var i = 1; i < lis.length - 3; i++) {
                newLis.push(lis[i])
            }

            // console.log(navList.cateList[this.index].subCateList);

            // 导航hover
            for (var i = 0; i < newLis.length; i++) {

                newLis[i].index = uls[i].index = i;
                newLis[i].setAttribute('data-index', newLis[i].index);

                var idx = newLis[i].getAttribute('data-index');

                newLis[i].onmouseenter = uls[i].onmouseenter = function() {
                    newLis[this.index].className = 'active';
                    subNav.style.display = 'block';
                    subNav.style.opacity = 1;

                    uls[this.index].style.display = 'block';
                }

                newLis[i].onmouseleave = uls[i].onmouseleave = function() {
                    newLis[this.index].className = '';
                    subNav.style.display = 'none';
                    subNav.style.opacity = 0;
                    uls[this.index].style.display = 'none';
                }
            }


            //吸顶盒
            yx.addEvent(window, 'scroll', setNavPos);
            setNavPos();

            function setNavPos() {
                nav.id = window.pageYOffset > nav.offsetTop ? 'navFix' : '';
            } // 导航栏
        },
        lazyImgFn: function() { //懒加载
            yx.addEvent(window, 'scroll', delayImg);
            delayImg();

            function delayImg() {
                var originals = yx.ga('.original'), //所有要懒加载的图片
                    scrollTop = window.innerHeight + window.pageYOffset; //可视区的高与滚动跳的距离

                for (var i = 0; i < originals.length; i++) {
                    if (yx.getTopValue(originals[i]) < scrollTop) {
                        originals[i].src = originals[i].getAttribute('data-original');
                        originals[i].removeAttribute('class'); //如果这个图片的地址已经换成真实的地址了，那就把它身上的class去掉，为了再次获取不到这张图片
                    }
                }

                if (originals[originals.length - 1].getAttribute('src') != 'images/empty.gif') {
                    //所有的图片已经换成真实的地址了
                    yx.removeEvent(window, 'scroll', delayImg);
                }
            }


            // console.log(yx.getTopValue(originals[0]))
        },
        backUpFn: function() { //回到顶部功能
            var back = yx.g('.back');
            var timer;
            back.onclick = function() {
                var top = window.pageYOffset;
                timer = setInterval(function() {
                    top -= 100;
                    if (top <= 0) {
                        top = 0;
                        clearInterval(timer);
                    }
                    window.scrollTo(0, top);
                }, 16);
            };
        },
        shopFn: function() { //购物车

            var productNum = 0; //买了几个商品
            (function(local) {
                var totalPrice = 0; //商品合计
                var ul = yx.g('.cart ul');
                var li = '';
                ul.innerHTML = '';

                for (var i = 0; i < local.length; i++) {
                    var attr = local.key(i); //取到每个key
                    var value = JSON.parse(local[attr]);
                    console.log(value)
                    if (value && value.sign == 'productLocal') {
                        //这个条件成立说明现在拿到的local就是我们主动添加的local
                        li += '<li data-id="' + value.id + '">' +
                            '<a href="#" class="img"><img src="' + value.img + '"/></a>' +
                            '<div class="message">' +
                            '<p><a href="#">' + value.name + '</a></p>' +
                            '<p>' + value.spec.join(' ') + ' x ' + value.num + '</p>' +
                            '</div>' +
                            '<div class="price">¥' + value.price + '.00</div>' +
                            '<div class="close">X</div>' +
                            '</li>';

                        totalPrice += parseFloat(value.price) * Number(value.num);
                    }
                }
                ul.innerHTML = li;
                productNum = ul.children.length; //买了几个商品
                yx.g('.cartWrap i').innerHTML = productNum; //更新商品数量的值
                yx.g('.cartWrap .total span').innerHTML = '¥' + totalPrice + '.00'; //更新总价格


                //删除商品功能
                var colseBtns = yx.ga('.cart .list .close');
                for (var i = 0; i < colseBtns.length; i++) {
                    colseBtns[i].onclick = function() {
                        localStorage.removeItem(this.parentNode.getAttribute('data-id'));
                        yx.public.shopFn();
                        if (ul.children.length == 0) {
                            yx.g('.cart').style.display = 'none';
                        }
                    };
                }


                //给小红圈添加事件
                var cartWrap = yx.g('.cartWrap');
                var timer;
                cartWrap.onmouseenter = function() {
                    clearTimeout(timer);
                    yx.g('.cart').style.display = 'block';
                    scrollFn();
                };
                cartWrap.onmouseleave = function() {
                    timer = setTimeout(function() {
                        yx.g('.cart').style.display = 'none';
                    }, 100);
                };
            })(localStorage)

            //购物车滚动
            

            function scrollFn() {
                var contentWrap = yx.g('.cart .list'),
                    content = yx.g('.cart .list ul'),
                    scrollBar = yx.g('.cart .scrollBar'),
                    slide = yx.g('.cart .slide'),
                    slideWrap = yx.g('.cart .slideWrap'),
                    btns = yx.ga('.scrollBar span'),
                    timer;

                //倍数（用来设置滚动条的高度）
                var beishu = content.offsetHeight / contentWrap.offsetHeight;
                //设置滚动条显示与否
                scrollBar.style.display = beishu <= 1 ? 'none' : 'block';

                //给倍数一下最大值
                if (beishu > 0) {
                    beishu = 20;
                }

                //内容与内容的父级的倍数与滑块与滑块父级的倍数是相等的
                slide.style.height = slideWrap.offsetHeight / beishu + 'px';

                //滑块
                var scrollTop = 0; //滚动条走的距离
                var maxHeight = slideWrap.offsetHeight - slide.offsetHeight; //滑块能够走的最大距离

                slide.onmousedown = function(ev) {
                    var disY = ev.clientY - slide.offsetTop;

                    document.onmousemove = function(ev) {
                        scrollTop = ev.clientY - disY;
                        scroll();
                    };
                    document.onmouseup = function() {
                        this.onmousemove = null;
                    };

                    ev.cancelBubble = true;
                    return false;
                };
                // 鼠标滚轮
                myScroll(contentWrap, function() {
                    scrollTop -= 10;
                    scroll();
                }, function() {
                    scrollTop += 10;
                    scroll();
                });

                //上下箭头
                for (var i = 0; i < btns.length; i++) {
                    (function(i) {
                        btns[i].onmousedown = function() {
                            var n = i;
                            timer = setInterval(function() {
                                scrollTop = n ? scrollTop + 3 : scrollTop - 3;
                                scroll();
                            }, 16)
                        };
                        btns[i].onmouseup = function() {
                            clearInterval(timer);
                        };
                    })(i);
                }

                //滑块区
                slideWrap.onmousedown = function(ev) {
                    timer = setInterval(function() {
                        var slideTop = slide.getBoundingClientRect().top + slide.offsetHeight / 2;

                        if (ev.clientY < slideTop) {
                            //这个条件成立说明现在鼠标在滑块的上面，滚动条应该往上走
                            scrollTop -= 5;
                        } else {
                            scrollTop += 5;
                        }

                        if (Math.abs(ev.clientY - slideTop) <= 5) {
                            clearInterval(timer);
                        }

                        scroll();
                    }, 16);
                }

                function scroll() {
                    if (scrollTop < 0) {
                        scrollTop = 0;
                    } else if (scrollTop > maxHeight) {
                        scrollTop = maxHeight;
                    }

                    var scaleY = scrollTop / maxHeight;

                    slide.style.top = scrollTop + 'px';
                    content.style.top = -(content.offsetHeight - contentWrap.offsetHeight) * scaleY + 'px';
                }

                //滚轮事件
                function myScroll(obj, fnUp, fnDown) {
                    obj.onmousewheel = fn;
                    obj.addEventListener('DOMMouseScroll', fn);

                    function fn(ev) {
                        if (ev.wheelDelta > 0 || ev.detail < 0) {
                            fnUp.call(obj);
                        } else {
                            fnDown.call(obj);
                        }

                        ev.preventDefault();
                        return false;
                    }
                }
            }
        }
    }
}