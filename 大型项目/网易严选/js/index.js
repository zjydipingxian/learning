//公用方法调用
yx.public.navFn();
yx.public.lazyImgFn();
yx.public.backUpFn();

yx.public.shopFn();

// banner轮播
var bannerPic = new banner();
bannerPic.init({
    id: 'bannerPic', //轮播图父级的id，必需传的参数
    autoplay: true, //自动播放，true为自动，false为不自动，默认为true
    intervalTime: 3000, //间隔时间，运动后停顿的时间，默认1s
    loop: true, //循环播放，true为循环，false为不循环，默认为true
    totalNum: 6, //图片总量
    moveNum: 1, //单次运动的图片数量（图片总量必须为运动数量的整倍数）
    circle: true, //小圆点功能，true为显示，false为不显示，默认显示
    moveWay: 'opacity' //运动方式，opacity为透明度过渡，position为位置过渡
});




(function() {
    // console.log(newList.newItemList)

    var item = newList.newItemList;
    var str = ''
    // console.log(item[0].name)
    for (var i = 0; i < item.length; i++) {

        var spanStr = '';

        if (item[i].productPlace) {
            spanStr += '<span class="colorNum">'+item[i].productPlace+'</span>';
        } else {
            spanStr = '';
        }

        str += '<li>'+
                    spanStr+
                    '<a href="#">'+
                    '<img class="original" src="images/empty.gif" data-original="'+item[i].primaryPicUrl+'"/>'+
                    '<img class="original" src="images/empty.gif" data-original="'+item[i].scenePicUrl+'"/>'+
                '</a>'+
                    '<div class="title">'+
                        '<a href="#">'+item[i].name+'</a>'+
                        '<p>¥'+item[i].retailPrice+'</p>'+
                    '</div>'+
                '</li>'; 
    }
    yx.g('#newProduct .carouselImgCon ul').innerHTML = str;
    // console.log(yx.ga('#newProduct .carouselImgCon ul'))
    var newProduct = new banner();
    newProduct.init({
        id: 'newProduct', //轮播图父级的id，必需传的参数
        autoplay: false, //自动播放，true为自动，false为不自动，默认为true
        intervalTime: 3000, //间隔时间，运动后停顿的时间，默认1s
        loop: false, //循环播放，true为循环，false为不循环，默认为true
        totalNum: item.length, //图片总量
        moveNum: 4, //单次运动的图片数量（图片总量必须为运动数量的整倍数）
        circle: true, //小圆点功能，true为显示，false为不显示，默认显示
        moveWay: 'position' //运动方式，opacity为透明度过渡，position为位置过渡
    })
    newProduct.on('rightEnd', function() {
        //alert('右边到头了');
        this.nextBtn.style.background = '#E7E2D7';
    });
    newProduct.on('leftEnd', function() {
        //alert('左边到头了');
        this.prevBtn.style.background = '#E7E2D7';
    });
    newProduct.on('leftClick', function() {
        //alert('左边点击了');
        this.nextBtn.style.background = '#D0C4AF';
    });
    newProduct.on('rightClick', function() {
        //alert('右边点击了');
        this.prevBtn.style.background = '#D0C4AF';
    });

})();







//人气推荐
(function() {
    var titles = yx.ga('#recommend header li'),
        contents = yx.ga('#recommend  .content'),
        index = 0;

    for (var i = 0; i < titles.length; i++) {
        titles[i].i = i;
        titles[i].onclick = function() {
            var x = this.i;
            change(function(event) {
                index = x;
            });
        }
    }

    function change(cha) {
        titles[index].className = '';
        contents[index].style.display = 'none'
        cha();
        titles[index].className = 'active';
        contents[index].style.display = 'block'
    }

})();


//限时购
(function() {
    var timeBox = yx.g('#limit .timeBox');
    var spans = yx.ga('#limit .timeBox span');
    var timer = setInterval(showTime, 1000);

    //倒计时
    showTime();

    function showTime() {
        var endTime = new Date(2018, 6, 3, 1);
        if (new Date() < endTime) { //如果当前的时间没有超过结束的时间才去做倒计时
            var overTime = yx.cutTime(endTime);
            spans[0].innerHTML = yx.format(overTime.h);
            spans[1].innerHTML = yx.format(overTime.m);
            spans[2].innerHTML = yx.format(overTime.s);
        } else {
            clearInterval(timer);
        }
    }

    //商品数据
    var boxWrap = yx.g('#limit .boxWrap');
    var str = '';

    var item = json_promotion.itemList;

    for (var i = 0; i < item.length - 2; i++) {
        str += '<div class="limitBox">' +
            '<a href="#" class="left scaleImg"><img class="original" src="images/empty.gif" data-original="' + item[i].primaryPicUrl + '"/></a>' +
            '<div class="right">' +
            '<a href="#" class="title">' + item[i].itemName + '</a>' +
            '<p>' + item[i].simpleDesc + '</p>' +
            '<div class="numBar clearfix">' +
            '<div class="numCon"><span style="width:' + Number(item[i].currentSellVolume) / Number(item[i].totalSellVolume) * 100 + '%"></span></div>' +
            '<span class="numTips">还剩' + item[i].currentSellVolume + '件</span>' +
            '</div>' +
            '<div>' +
            '<span class="xianshi">限时价<span class="fuhao">¥</span><strong>' + item[i].actualPrice + '</strong></span>' +
            '<span class="yuan">原价 ¥' + item[i].retailPrice + '</span>' +
            '</div>' +
            '<a href="#" class="qianggou">立即抢购</a>' +
            '</div>' +
            '</div>';
    }

    boxWrap.innerHTML = str;
})();

// "<a href='#' class='scaleImg'><img class='original' src='images/empty.gif' data-original='"+item[i].listPicUrl+"'></a>"+
(function() {
    // console.log(indexF)
    var boxWrap = yx.g('#xie .categoryList');
    // console.log(boxWrap)
    var str = '';
    var item = indexF.itemList;


    var Img = document.createElement('img');
    Img.className = 'original';
    Img.setAttribute('data-original', indexF.indexFocus[0].picUrl);
    Img.scr = "images/empty.gif";
    var oA = yx.g('#xie .categoryBigImg');
    oA.appendChild(Img)
    for (var i = 0; i < item.length; i++) {
        str += '<li>' +
            '<a href="#" class="scaleImg"><img class="original" src="images/empty.gif" data-original="' + item[i].listPicUrl + '"></a>' +
            '<p><a href="#">' + item[i].name + '</a></p>' +
            '<span>¥' + item[i].retailPrice + '</span>' +
            '</li>'
    }
    boxWrap.innerHTML = str;
})();



// 大家都在说



(function() {
    var oUl = yx.g('#sayPic ul'),
        commentList = comment.commentList,
        str = '';
    for (var i = 0; i < commentList.length; i++) {
        var content = '';
        var jiantou = '';
        if (commentList[i].content.length > 85) {
            var newStr = commentList[i].content.substring(0, 85);
            jiantou += '<span class = "jiantou1"></span>'
            content = newStr;
        } else {
            content = commentList[i].content;
        }
        str += '<li>' +
            '<a class="scaleImg" href="#"><img class="original" src="images/empty.gif" data-original="' + commentList[i].listPicUrl + '"/></a>' +
            '<div>' +
            '<p>' + commentList[i].frontUserName + ' &nbsp;' + yx.formatDate(commentList[i].createTime) + '</p>' +
            '<p class="clearfix">' +
            '<span class="left">' + commentList[i].name + '</span>' +
            '<span class="right" >¥' + commentList[i].retailPrice + '</span>' +
            '</p>' +
            '<p data-content = ' + commentList[i].content + ' class="p1">' + content + '</p>' +
            '</div>' +
            jiantou +
            '</li>'

    }
    oUl.innerHTML = str;




    var sayPic = new banner();
    sayPic.init({
        id: 'sayPic', //轮播图父级的id，必需传的参数
        autoplay: false, //自动播放，true为自动，false为不自动，默认为true
        intervalTime: 3000, //间隔时间，运动后停顿的时间，默认1s
        loop: true, //循环播放，true为循环，false为不循环，默认为true
        totalNum: commentList.length, //图片总量
        moveNum: 1, //单次运动的图片数量（图片总量必须为运动数量的整倍数）
        circle: true, //小圆点功能，true为显示，false为不显示，默认显示
        moveWay: 'position' //运动方式，opacity为透明度过渡，position为位置过渡
    })
})();