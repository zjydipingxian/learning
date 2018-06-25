$(function(){

//首屏滑动显示
(function(){
	var $embed = $("#bg").find(".bg1 object"),
		$wrap = $("#wrap"),
        $swp = $wrap.find(".swp");
        
    setTimeout(function () {
        $embed[0].onload = function () {
            $(this).css("opacity" , 1);
        };
    },1500);
    
    $swp.eq(0).animate({
        opacity : 1,
        left : 0
    },1800);
    
    $swp.eq(1).animate({
        opacity : 1,
        right : 0
    },1800);
    
    $swp.eq(2).animate({
        opacity : 1,
        top : 70
    },1200);
    
    $swp.eq(3).animate({
        opacity : 1,
        top : 610
    },1200);
})();


//视频弹窗
(function(){
	var $wrap = $("#wrap"),
		$video = $wrap.find(".video"),
		$close = $wrap.find("#video .close"),
		$btn = $wrap.find(".videoBtn");
	$btn.click(function(){
		$video.show();
		$(document.body).addClass('noScroll');
	});
	$close.click(function(){
		$video.hide();
		$(document.body).removeClass('noScroll');
	});
})();	


//最新情报弹窗	
(function(){
	var $newinfo = $("#newinfo"),
		$infoListLi = $newinfo.find(".infoList li"), //获取6个li
		$pop = $newinfo.find(".popwindow"), //获取遮罩层
		$popLi = $pop.find(".content ul li"), //获取有6个内容图片
		$popClose = $pop.find(".close"), //获取关闭按钮
		$txt = $pop.find(".content .txt"), //获取文本
        $btn = $pop.find(".content .btn"),
		index = 0;
        txtH = $txt.height();   //加了隐藏的text 315px
        len = $popLi.length;
        
    //自定义滚动条
    $txt.each(function(){
    	var $mainTxt = $(this).find(".mainTxt"),//获取文本里面的内容
	        $scroll = $(this).find(".scroll"),  //获取滚动条
	        $bar = $(this).find(".bar"), //获取滚动块
	        mainH = $mainTxt.height(), //总的text 
	        barH = txtH*txtH/mainH,//滚动块  
	        topMax = txtH - barH,  //最高运动
            topMin = 0;
	        $bar.height(barH);
	    $bar.mousedown(function(e){
	    	e = e || window.event;
	    	var sY = e.clientY,
	    		sTop = $(this).position().top,
	    		$This = $(this),
	    		$mainTxt = $(this).parent().siblings();
	    	$(document).mousemove(function(e){
	    		e = e || window.event;
	    		var nY = e.clientY-sY,
	    			top =nY+sTop;
	    			setTop(top);	
	    	}).mouseup(function () {
                    $(this).off("mousemove").off("mouseup");
            });
	    	return false;
	    });
	    
	   //鼠标滚轮事件
	   $(this).mousewheel(function(e,d){
	   	 	var top = $bar.position().top;
	   	 		d<0?top+=20:top-=20;
	   	 		setTop(top);	
	   });
	   
	   //点击滚动条动画
	   $scroll.click(function(e){
	   		if( e.target === this ){
	   			var RunY=e.clientY-($(this).offset().top-$(document).scrollTop());
	   			var top = $bar.position().top;
	   	 		top = RunY<top?top-50:top+50;
   				top = Math.min(top , topMax);
       			top = Math.max(top , topMin);
       			
       			$bar.stop().animate({"top" : top},500);
                $mainTxt.stop().animate({"top" : -top*mainH/txtH},500);
	   		}
	   });
	   
	   //封装滚轮相同的事情
	   function setTop(top){
   			top = Math.min(top , topMax);
            top = Math.max(top , topMin);
            $bar.css("top" , top);
            $mainTxt.css("top" , -top*mainH/txtH);
	   };   
});
    //点击弹出全屏窗
    
    $pop.hide().css("opacity" , 1);
    $popLi.hide();
    
        $infoListLi.click(function () {
            index = $(this).index();
            $(document.body).addClass("noScroll");
            $pop.show();
            $popLi.eq(index).show().siblings().hide();
        });    
    //关闭弹窗
    $popClose.click(function () {
        $(document.body).removeClass("noScroll");
        $pop.hide();
    });    
   	//弹窗层左右按钮
   	$btn.click(function(){
   		if ($(this).index(".content .btn")) {
   			index ++;
            index %= len;
   		}else{
   			index --;
            if(index<0)index=len-1;
   		}
   		$popLi.eq(index).show().siblings().hide();
   	});
   
	})();


//游戏特色banner
(function(){
		var $game = $("#game"),
            $picLi = $game.find(".pic ul li"),
            $banner =$game.find(".main"),
            $btn = $game.find(".btn p"),
            index = 0,
            timer=null,
            len= $picLi.length;
            
        $picLi.click(function(){
        	if($(this).index()!==index){
        		index = $(this).index();
        		chang();
        	}
        	
        })
        
        $btn.click(function () {
            if ( $(this).index() ){
                index ++;
                index %= len;
            }else{
                index --;
                if(index<0)index=len-1;
            }
            chang();
        });
        
        //相同函数封装
        function chang(){
        	var lIndex = index - 1,
	            rIndex = index + 1;
                if ( lIndex < 0 )lIndex = len-1;
                if (rIndex >= len)rIndex = 0;
                $picLi.removeClass("left mid right");
                $picLi.eq(lIndex).addClass("left");
                $picLi.eq(index).addClass("mid");
                $picLi.eq(rIndex).addClass("right");
        };
		auto();
            function auto(){
                timer = setInterval(function (){
                    index ++;
                    index %= len;
                    chang();
                },1500);
        	};
        $banner.mouseenter(function(){
        	clearInterval(timer);
        });
        $banner.mouseleave(function(){
        	auto();
        });
})();



});


	
	
	
	
	

