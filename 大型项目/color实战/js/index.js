


var $hideNav = $('.header-nav');
var $content = $('.con-main');
var line1 = $('p.line-1');
var line2 = $('p.line-2');
var line3 = $('p.line-3');
var line4 = $('p.line-4');
var line5 = $('p.line-5');
var line6 = $('p.line-6');
var line7 = $('p.line-7');
var line8 = $('p.line-8');
var num1 = $('span.num-1');
var num2 = $('span.num-2');
var num3 = $('span.num-3');
var num4 = $('span.num-4');
var flag1 = true;
var flag2 = true;
var flag3 = true;
var flag4 = true;
var conTop;
var p1;
var p2;
var timeout = null;
var video1;
var video2;
var video3;
var img1;
var img2;
var imgS1;
var imgS2;
var imgS3;
var imgS4;
var imgS5;
var $aList = $('.aNav');
var nav = $('.header-nav ul li');
var nav2 = $('#nav ul li');
var body =$('html body');
nav.click(function(){
    var index = $(this).index();
    var top = $aList.eq(index).offset().top;
    body.animate({
        scrollTop:top-100
    },500);
});
nav2.click(function(){
    var index = $(this).index();
    var top = $aList.eq(index).offset().top;
    body.animate({
        scrollTop:top-100
    },500);
});
$(window).scroll(function(){
    var top = $(this).scrollTop();
    if(top > 800){
        $hideNav.stop().slideDown(200);
    }else{
        $hideNav.stop().slideUp(200);
    }

    //导航
    $aList.each(function(i){
        var aTop = $(this).offset().top;
        if((top+100) >= aTop){
            nav.eq(i).addClass('on').siblings().removeClass('on');
        }
    });
    $content.each(function(i){
        conTop = $(this).offset().top - 886;
        conBot = $(this).offset().top + 200;
        if(top > conTop && top < conBot){
            p1 = $(this).find('p.p-1');
            p2 = $(this).find('p.p-2');

            p1.addClass('on');
            p2.addClass('on');
            if(i==2){
                video1 = $(this).find('video.video1');
                video2 = $(this).find('video.video2');
                video1.css('z-index','0');
                video2.css('z-index','0');
                video1[0].play();
                video2[0].play();
                video2[0].addEventListener("ended",function(){
                             video1.css('z-index','-1');
                             video2.css('z-index','-1');
                });
            }
            if(i==3){
                img1 = $(this).find('img.img-1');
                img1.addClass('on');
                img2 = $(this).find('img.img-2');
                img2.addClass('on');
                imgS1 = $(this).find('img.img-s1');
                imgS1.addClass('on');
                imgS2 = $(this).find('img.img-s2');
                imgS2.addClass('on');
                imgS3 = $(this).find('img.img-s3');
                imgS3.addClass('on');
                imgS4 = $(this).find('img.img-s4');
                imgS4.addClass('on');
                imgS5 = $(this).find('img.img-s5');
                imgS5.addClass('on');
            }
            if(i==4){
                video3 = $(this).find('video');
                video3.css('z-index','0');
                video3[0].play();
            }

            var icon = $(this).find('img.icon');
            icon.each(function(i){
                icon.eq(i).css('transform','scale(1)');
            });
        }
    });

    //线
    if(top > 1490){
        line1.css('width','240px');
        line2.css('width','160px');
        line3.css('width','520px');
        line4.css('width','425px');
        line5.css('width','390px');
        line6.css('width','315px');
        line7.css('width','650px');
        line8.css('width','515px');

        //模拟后台已经传值数字
        if(flag1){
            flag1 = false;
            goNum(num1,34.9);
        }
        if(flag2){
            flag2 = false;
            goNum(num2,19.1);
        }
        if(flag3){
            flag3 = false;
            goNum(num3,17.9);
        }
        if(flag4){
            flag4 = false;
            goNum(num4,17.8);
        }
        function goNum(obj,number){
            var s = number / 1500;
            var n = 0;
            var timer = setInterval(function(){
                n = n + s * 10;
                obj.html(n.toFixed(1));
                if(parseFloat(obj.html()) == number){
                    clearInterval(timer);
                }
            },10);
        }


    }

});


var $page9 = $('.page-9');
var now = new Date().getHours();
if(now < 8 || now > 18){
    $page9.css('background',"url('images/s8_bg_2.jpg') no-repeat center/cover");
}