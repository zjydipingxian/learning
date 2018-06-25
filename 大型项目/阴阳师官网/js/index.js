
//导航隐藏层
(function () {
    
    var $nav = $("#nav"),
        $navLi = $nav.find(".mNav"),
        $haveHide = $nav.find(".mainList .haveHide"),
        $ulHide = $nav.find(".ulHide"),
        $allHide = $ulHide.find(".hide"),
        $logo = $nav.find(".logo"),
        $logo2 = $("#logo2");
        
    $logo2.delay(1000).queue(function(){
        $(this).css({
            left : 60,
            opacity : 1
        });
    });    
        
	
	$(window).scroll( navScroll() );
	function navScroll(){
		if($(document).scrollTop()){
			 $nav.addClass("scroll");
             $logo.stop().fadeIn();
              $logo2.addClass("scale");
		}else{
			$nav.removeClass("scroll");
            $logo.stop().fadeOut();
            $logo2.removeClass("scale");
		}
		return navScroll;
	}
	
	
	
    $navLi.hover(function () {
        $(this).addClass("hover");
    },function () {
        $(this).removeClass("hover");
    });
    $haveHide.hover(function () {
        $ulHide.stop().slideDown();
        $allHide.eq($(this).index(".mainList .haveHide")).stop().fadeIn();
        $nav.addClass("hover");
    },function () {
        $ulHide.stop().slideUp();
        $allHide.eq($(this).index(".mainList .haveHide")).stop().fadeOut();
        $nav.removeClass("hover");
    });

    $allHide.hover(function () {
        $ulHide.stop().slideDown();
        $haveHide.eq($(this).index()).addClass("hover");
        $allHide.eq($(this).index()).stop().fadeIn();
        $nav.addClass("hover");
    },function () {
        $ulHide.stop().slideUp();
        $haveHide.eq($(this).index()).removeClass("hover");
        $allHide.eq($(this).index()).stop().fadeOut();
        $nav.removeClass("hover");
    });
    
})();



//动画人物
(function(){
	var $role = $('#role'),
        $rol1 = $role.find('.rol1 .role'),
        $rol2 = $role.find(".rol2 .role");
        $btn = $role.find(".btn"),
        $server = $(".server"),
        $serverList = $("#serverList"),
        $serverClose = $serverList.find(".close"),
        off=false;   /*false 是第一组显示        true 第二组隐藏*/
        console.log($server);
    $rol1.removeClass('hide');
      $btn.click(function(){
      	  /*if(off){
      	  	$rol2.addClass('hide').delay(800).queue(function(){
      	  		$rol1.removeClass('hide');
      	  	});
      	  }else{
      	  	$rol1.addClass('hide').delay(800).queue(function(){
      	  		$rol2.removeClass('hide');
      	  	});
      	  }*/
      	 off?chang($rol2 , $rol1):chang($rol1 , $rol2);
         off = !off;
      })
    //封装相同的切换
    function chang($1,$2){
    	$1.stop(true,false);
    	$2.stop(true,false);
    	$1.addClass('hide').delay(800).queue(function(){
      	  	$2.removeClass('hide');
      	});
    }
    $server.click(function () {
        $serverList.fadeIn();
        $serverList.find(".main").addClass("show");
        $(document.body).addClass('noScroll');
    });
    $serverClose.click(function () {
        $serverList.fadeOut();
        $serverList.find(".main").removeClass("show");
        $(document.body).removeClass('noScroll');
    });
})();



//游戏日历
(function(){
    var $slide = $("#slide"),
        $download = $slide.find(".download"),
        $shrink = $download.find(".shrink"),
        $close = $download.find(".close"),
        $downloadMain = $download.find(".downloadMain"),
        $mainLi = $slide.find(".main .mainLi");
		
	$shrink.click(function(){
		$download.addClass("stretch");
        $(this).hide();
        $downloadMain.show();
	})
	$close.click(function () {
	    $download.removeClass("stretch");
	    $(this).stop().delay(200).queue(function () {
	        $downloadMain.hide();
	        $shrink.show();
	    })
	});
	$mainLi.hover(function () {
        $(this).stop().addClass("pos");
    },function () {
        $(this).stop().delay(500).queue(function () {
            $(this).removeClass("pos");
        });
    });
})();


// banner部分

(function(){
	var $banner = $("#news").find(".banner"),  //获取banner区块
        $picUl = $banner.find(".pic ul"),  //获取有缝轮播的ul
        $picLi = $picUl.children(),  //获取ul里的的li 等下要获取li的宽度
        $tabLi = $banner.find(".tab ul li"), //小圆点
        index = 0,
        length = $picLi.length,
        enterTimer=null,
        timer=null;
        width = $picLi.width();
        
    $tabLi.mouseenter(function(){
    	var $this = $(this);
    	clearTimeout(enterTimer);
    	enterTimer=setTimeout(function(){
    		index=$this.index();
    		$this.addClass('on').siblings().removeClass('on');
    		$picUl.stop().animate({
    			left : -width*index
    		});
    	},300);
    });
    $banner.hover(function(){
    	clearInterval(timer);
    },auto());
    function auto(){
    	timer=setInterval(function(){
    		index++;
    		index%=length;
    		$tabLi.eq(index).addClass('on').siblings().removeClass('on');
    		$picUl.stop().animate({
    			left : -width*index
    		});
    	},3000);
    	return auto;
    }
    
})();

//新闻
(function(){
	var $news = $("#news"),
        $tabLi = $news.find(".inform .tab ul li"),
        $wrapUl = $news.find(".inform .show .wrapUl"),
        $wrapLi =  $wrapUl.find(".wrapLi"),
        index = 0,
        length = $tabLi.length,
        enterTimer=null,
        timer=null;
        width1= $wrapLi.width();
    $tabLi.mouseenter(function(){
    	$(this).addClass('on').siblings().removeClass('on');
    });
    
    $wrapLi.each(function(i){
    	var $ul=$("<ul class='list'></ul>");
    	var num = 0;
    	for (var j=0,length=data.length;j<length;j++) {
    		if (!i || data[j].typeX === (i-1)) {
    			$ul.append("<li><p><a href=''>"+data[j].title+"</a></p><span>"+data[j].time+"</span></li>");
                num ++;
                if(num===length){
                	break;
                }
    		}
    	}
    	$(this).append($ul);
    });
    
    $tabLi.mouseenter(function(){
    	var $this = $(this);
    	clearTimeout(enterTimer);
    	enterTimer=setTimeout(function(){
    		index=$this.index();
    		$this.addClass('on').siblings().removeClass('on');
    		$wrapUl.stop().animate({
    			left : -width1*index
    		});
    	},300);
    });
})();



//式神列表生成
(function(){
	var $shishenList = $("#character").find(".shishenList"),
        $mainListUl = $shishenList.find(".mainList .mUl>ul");
    
    /*$titleTab.click(function () {
        $(this).addClass("active").siblings(".tab").removeClass("active");
    });*/
    
    /*$shishenListTab.click(function () {
        $(this).addClass("on").siblings(".clickBtn").removeClass("on");
    });*/
    
    //生成所有的式神图标
    var count=[
    	[0,null],
    	[0,null],
    	[0,null],
    	[0,null],
    	[0,null]
    ];
    for(var i =0,length=shishenData.length;i<length;i++){
    	var index = 0;
    	switch (shishenData[i].level){
    		case "SSR":
    			index = 1;
    			break;
    		case "SR":
    			index = 2;
    			break;
    		case "R":
                index = 3;
                break;
            case "N":
                index = 4;
                break;	
    	}
    	count[0][0] ++;
        count[index][0] ++;
        if(count[0][0] % 2){
        	count[0][1] = $("<li class='ssList'></li>");
        	$mainListUl.eq(0).append(count[0][1]);
        }
        if ( count[index][0] % 2 ){
            count[index][1] = $("<li class='ssList'></li>");
            $mainListUl.eq(index).append(count[index][1]);
        }
        var str = shishenData[i].isNew?"<i class='new'></i>":"";
        $div = $("<div class='shishen'>" +
            "<img src='images/index/content/shishen/"+shishenData[i].id+".png'>" +
            "<p class='cover'><span>"+shishenData[i].name+"</span></p>" +
            str +
            "</div>");
        var $clone = $div.clone();
        count[0][1].append($div);
        count[index][1].append($clone);
    }
})();

//式神列表的左右点击
(function () {
    var $character = $('#character'),
        $mUl = $character.find('.shishenList .mainList .mUl'),
        $shishenListTab = $character.find(".shishenTab .clickBtn"),
        width = $mUl.width();

    $shishenListTab.click(function () {
        var i = $(this).index();
        $(this).addClass("on").siblings(".clickBtn").removeClass("on");
        $mUl.eq(i).show().siblings().hide().each(function () {
            var $btn = $(this).children(".btn");
            this.index = 0;
            this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();
            $(this).children("ul").css("marginLeft" , 0);
        });
    });

    $mUl.each(function () {
        var $ul = $(this).children("ul"),
            $li = $ul.children("li"),
            $btn = $(this).children(".btn"),
            length = Math.ceil($li.length / 6); 
        this.index = 0;
        this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
        this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();
        $btn.click(function () {
            var i = $(this).index(),
                parent = this.parentNode;
            if ( i === 2 ){
                parent.index ++;
                parent.index %= length;
            }else{
                parent.index --;
                if (parent.index<0)parent.index = 0;
            }
            parent.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            parent.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();

            $ul.stop().animate({
                marginLeft : parent.index * -width
            },300);
        });
    });
})();

//主角列表选项卡切换
(function(){
	var $character = $("#character"),
        $zhujueList = $character.find(".zhujueList"),
        $tabLi = $zhujueList.find(".tab>ul>li"),
        $picLi = $zhujueList.find(".pic>ul>li"),
        $titleTab = $character.find(".sMain .title .tab"),
        $titlePic = $character.find(".sMain .showMain>.mList>.mLi"),
        index = 0;
    $titleTab.click(function () {
        var i = $(this).index("#character .sMain .title .tab");
        $(this).addClass("active").siblings(".tab").removeClass("active");
        $titlePic.eq(i).stop().fadeIn().siblings().stop().fadeOut();
    });
    $tabLi.click(function () {
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $picLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });
})();


//startegy
(function(){
	var $strategy = $("#strategy"),
        $banner = $strategy.find(".leftPart .banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $banner.find(".pic ul li"),
        width2 =$picLi.width(),
        $tabLi = $banner.find(".tab ul li"),
        $right = $strategy.find(".rightPart"),
        $titleTab = $right.find(".title .tab"),
       	$show=$right.find('.mContent .show'),
        $ul = $right.find(".mContent ul"),
        width3=$ul.width(),
        timer=null,index=0,len=$tabLi.length;

    $tabLi.click(function(){
    	index = $(this).index();
    	$(this).addClass('on').siblings().removeClass('on');
    	
    	$picUl.stop().animate({
    		left : -width2*index
    	},1000);
    });  
    
    $titleTab.click(function(){
			index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$show.stop().animate({
	    		left : -width3/2*index
	    	},1000);
		});
    
    //添加数据-攻略
    //右侧选项卡内容生产
    var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    //console.log(strateData);
    $ul.each(function(i){ //i是攻略 新手 式神 斗技 玩法
    	var num=0;
    	for (var j=0,length=strateData.length;j<length;j++) {
    		var data=strateData[j];
    		var reg=new RegExp(i-1); //减一是因为 新手的下标是0  用正测分类0就在哪里ul 1就在哪里ul
    		//console.log( reg.test(data.type))
    		if(!i || reg.test(data.type)){
    			var index = !i?data.type.charAt(data.type.length-1):i-1;
    			/*if(!i){
    				var index = Number(data.type.charAt(data.type.length-1));
    				//console.log(typeof index)
    			}else{
    				index =i-1;
    			}*/
    			$(this).append('<li>' +
                    '<a href="">' +
                        '<i></i> ' +
                        '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p> ' +
                        '<p class="author">作者：<span>'+data.author+'</span></p>' +
                    '</a>' +
                '</li>');
    		}
    	}
    })
    
})();


//fan
(function(){
	var $fan = $("#fan"),
        $show = $fan.find(".mFan .show"),
        $tab = $fan.find(".tab .tabNav ul li"),
        index = 0;
        length = 6;
    for (var i = 0; i < length; i++) {
        var $ul = $("<ul></ul>");
        for (var j = i*8; j < (i+1)*8; j++) {
            $ul.append('<li>\
                <div class="pic">\
                <img src="'+fanData[j].url+'" alt="">\
                <span><b></b></span>\
                </div>\
                <p class="sTitle">'+fanData[j].title+'</p>\
            </li>');
        }
        $show.append($ul);
    }
    $ul=$show.find('ul');
    width4=$ul.width();
    $tab.click(function(){
    	index = $(this).index();
    	$tab.eq(index).addClass('on').siblings().removeClass('on');
    	$show.stop().animate({
    		left : -index*width4
    	},300);	
    })
})();

//回到顶部
(function(){
    var $goTop = $("#contact").find(".goTop");
    $goTop.click(function () {
        //$(document).scrollTop(0);
        $("body,html").animate({
            scrollTop : 0
        },300);
    });
    $goTop.hover(function(){
    	$(this).animate({
    		top : 0
    	},300)
    },function(){
    	$(this).animate({
    		top : 15,
    	},300)
    })
})();