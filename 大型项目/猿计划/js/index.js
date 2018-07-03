var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
var pageNow,first=1; //保存当前页面页码
var windowWidth = parseInt($(document).width()); //页面宽
var index = 1 , moving = 0 , speed = 40 ,times;
var childs = document.getElementById("circless").children;
function domAppend(topic_id,info,title,comment,like){   //动态查询的数据渲染到页面
    // topic_id = encodeURIComponent(topic_id);
    var div=$("<div class='article-list'></div>");  
    var divLeft=$("<div class='article-list-left'></div>"); 
    var divRight=$("<div class='article-list-right'></div>"); 
    var span_time=$("<p class='article-list-time'>"+info+"</p>");  
    var span_title=$("<p class='article-list-title'><a href='article.html?topic-id="+topic_id+"'>"+title+"</a></p>");  
    divLeft.append(span_time);
    divLeft.append(span_title);
    var span_comment=$("<span><i class='fa fa-commenting-o' aria-hidden='true'></i><span>"+comment+"</span></span>");  
    divRight.append(span_comment);
    var span_like=$(" <span><i class='fa fa-thumbs-o-up' aria-hidden='true'></i><span>"+like+"</span></span>");  
    divRight.append(span_like);
    div.append(divLeft);
    div.append(divRight);
    $(".articles").append(div);  
}
function goPage(page,resType){     //页码改变后，改变页面数据
    $(".articles").html("");
    var obj = {};
    obj["type"] = resType;
    obj["sort"] = "new";
    obj["page"] = page;
    obj["index"] = true;
    // console.log(obj)
    $.ajax({
        url:'http://www.ftusix.com/static/data/topicList.php',
        contentType: 'application/json',
        type: 'GET',
        timeout: 5000,
        dataType:'JSON',
        data: obj,
        success:(res) =>{
            // 按时间排序一下
            // for(let i=0;i<res.data.length&&i<10;i++){
            //     for(let j=i+1;j<res.data.length&&j<10;j++){
            //         if (res.data[i].modify_time > res.data[j].modify_time)  
            //         {   let change = res.data[i] ;
            //             res.data[i] = res.data[j];
            //             res.data[j] = change;
            //         }  
            //     }
            // }
            //准备dom插
            for(let i=0;i<res.data.length&&i<10;i++){
                var date = new Date(parseInt(res.data[i].modify_time)*1000)
                var dateNow = new Date();
                var info; //用于存天数相关信息
                var time = dateNow.getTime() - parseInt(res.data[i].modify_time)*1000;
                time =  time/(1000 * 60 * 60 * 24); 
                if(time > 30){
                    time = parseInt(time/30);
                    info = res.data[i].nick_name + " . " + parseInt(time) +"个月前"
                }else if(time < 30&&time > 1){
                    info = res.data[i].nick_name + " . " + parseInt(time) +"天前";
                }else if(time*24 < 1){
                    info = res.data[i].nick_name + " . " + parseInt(time*24*60) +"分钟前";
                }else{
                    info = res.data[i].nick_name + " . " + parseInt(time*24) +"小时前";
                }
                domAppend(res.data[i].topic_id,info,res.data[i].title,res.data[i].comment_num,res.data[i].like_num);
                windowWidth = parseInt($(document).width()); 
            }
        }
    });
}
//轮播图
function moveRight(){
   if(first == 1){
        windowWidth = parseInt($(document).width()); 
        $(".all-picture").css("left",-windowWidth*0.8+"px");
        first = 2;
   }
    clearTimeout(times);
    if(!moving){
        moving = 1;
        index++;
        index = index>3?1:index;
        var flag = 10;
        var left = -(index-1)*windowWidth*0.8;
        function go(){
            left = left - windowWidth*0.8/10;
            $(".all-picture").css("left",left+"px");
            if(flag-- != 1){
                setTimeout(go, speed);
            }else{
                moving = 0;
            }
        }
        go();
        showCircle();
        play();
    }else{ return; }
}
function moveLeft(){
    if(first == 1){
        windowWidth = parseInt($(document).width()); 
        $(".all-picture").css("left",-windowWidth*0.8+"px");
        first = 2;
   }
    clearTimeout(times);
    if(!moving){
        moving = 1;
        index--;
        index = index<1?3:index;
        var flag = 10;
        var left = -(index-1)*windowWidth*0.8 - windowWidth*0.8 - windowWidth*0.8;
        function go(){
            left = left + windowWidth*0.8/10;
            $(".all-picture").css("left",left+"px");
            if(flag-- != 1){
                setTimeout(go, speed);
            }else{
                moving = 0;
            }
        }
        go();
        showCircle();
        play();
    }else{ 
        return; 
    }
}
function showCircle(){
    for(let i=0,len=childs.length;i<len;i++){
        childs[i].className = "circle";
    }
    childs[index-1].className = "circle circle-on";
}
function play() {
    times = setTimeout(function () {
        moveRight();
        play();
    }, 4000);
}  
function articleInit(jsons,resType){   //ajax查数据
    $(".articles").html("");
    $.ajax({
        url:"http://www.ftusix.com/static/data/topicList.php",
        type:"get",
        timeout:5000,
        contentType:"json",
        dataType:"json",
        data : jsons, 
        success:(res)=>{
            if(res.status == 0){
                $("#page").html("暂无数据");
            }else{
                console.log(res)
                $(()  =>{
                    var options={
                        bootstrapMajorVersion:1, //版本要求
                        currentPage:1, //当前页数
                        numberOfPages:5, //最多显示Page页
                        totalPages:Math.ceil(res.listCount[0]/10), //所有数据可以显示的页数
                        itemTexts: (type, page, current) => { //样式文字设置  
                            switch (type) {  
                                case "first":  
                                    return "首页";  
                                case "prev":  
                                    return "上一页";  
                                case "next":  
                                    return "下一页";  
                                case "last":  
                                    return "尾页";  
                                case "page":  
                                    return ""+page;  
                            }  
                        },  
                        onPageClicked: (e,originalEvent,type,page) =>{  
                            pageNow = page;
                            goPage(page,resType);  
                        },  
                    }
                    $("#page").bootstrapPaginator(options);
                });
            }
            // 按时间排序一下
            // for(let i=0;i<res.data.length&&i<10;i++){
            //     for(let j=i+1;j<res.data.length&&j<10;j++){
            //         if (res.data[i].modify_time > res.data[j].modify_time)  
            //         {   let change = res.data[i] ;
            //             res.data[i] = res.data[j];
            //             res.data[j] = change;
            //         }  
            //     }
            // }
            //准备dom插
            for(let i=0;i<res.data.length&&i<10;i++){
                var date = new Date(parseInt(res.data[i].modify_time)*1000)
                var dateNow = new Date();
                var info; //用于存天数相关信息
                var time = dateNow.getTime() - parseInt(res.data[i].modify_time)*1000;
                time =  time/(1000 * 60 * 60 * 24); 
                if(time > 30){
                    time = parseInt(time/30);
                    info = res.data[i].nick_name + " . " + parseInt(time) +"个月前"
                }else if(time < 30&&time > 1){
                    info = res.data[i].nick_name + " . " + parseInt(time) +"天前";
                }else if(time*24 < 1){
                    info = res.data[i].nick_name + " . " + parseInt(time*24*60) +"分钟前";
                }else{
                    info = res.data[i].nick_name + " . " + parseInt(time*24) +"小时前";
                }
                domAppend(res.data[i].topic_id,info,res.data[i].title,res.data[i].comment_num,res.data[i].like_num); 
            }
        },
        error:(a,b,c)=>{
            console.log(a)
            console.log(b)
            console.log(c)
        }
    });
}
$().ready(()=>{   
    var obj = {};
    obj["type"] = 0;
    obj["sort"] = "new";
    obj["page"] = null;
    obj["index"] = true;
    articleInit(obj,obj["type"]);
    windowWidth = parseInt($(document).width()); 
    $(".all-picture").css("left",-windowWidth*0.8+"px");
    play();
    if(storage.token){ 
        $("#header_nav").load("header-login.html",function(){
            $("#header_nav a").each(function(){  
                $this = $(this);  
                if($this[0].href==String(window.location.href)){  
                    $this.addClass("now");  
                }  
            });           
            let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
            $("#pic").attr("src",path);
            $(document).on("click","#logout",function(){
                //登出
                storage.clear();
                $(window).attr('location','login.html');
            });
        });  
    }else{
        $("#header_nav").load("header.html",function(){
        $("#header_nav a").each(function(){  
                $this = $(this);  
                if($this[0].href==String(window.location.href)){  
                    $this.addClass("now");  
                }  
            }); 
        });
    }
});
$(window).resize(function(){
    windowWidth = parseInt($(window).innerWidth()); 
    $(".all-picture").css("left",-windowWidth*0.8+"px");
});
$(".arrow-right").click(()=>{
    moveRight();
});
$(".arrow-left").click(()=>{
    moveLeft();
});
$("#span-all").click(()=>{
    $("#span-all").removeClass();
    $("#span-HTML").removeClass();
    $("#span-JAVA").removeClass();
    $("#span-PHP").removeClass();
    $("#span-all").addClass("span-on");
    var obj = {};
    obj["type"] = 0;
    obj["sort"] = "new";
    obj["page"] = null;
    obj["index"] = true;
    articleInit(obj,obj["type"])
});
$("#span-HTML").click(()=>{
    $("#span-all").removeClass();
    $("#span-HTML").removeClass();
    $("#span-JAVA").removeClass();
    $("#span-PHP").removeClass();
    $("#span-HTML").addClass("span-on");
    var obj = {};
    obj["type"] =   1;
    obj["sort"] = "new";
    obj["page"] = null;
    obj["index"] = true;
    articleInit(obj,obj["type"]);
});
$("#span-JAVA").click(()=>{
    $("#span-all").removeClass();
    $("#span-HTML").removeClass();
    $("#span-JAVA").removeClass();
    $("#span-PHP").removeClass();
    $("#span-JAVA").addClass("span-on");
    var obj = {};
    obj["type"] = 2;
    obj["sort"] = "new";
    obj["page"] = null;
    obj["index"] = true;
    articleInit(obj,obj["type"]);
});
$("#span-PHP").click(()=>{
    $("#span-all").removeClass();
    $("#span-HTML").removeClass();
    $("#span-JAVA").removeClass();
    $("#span-PHP").removeClass();
    $("#span-PHP").addClass("span-on");
    var obj = {};
    obj["type"] = 3;
    obj["sort"] = "new";
    obj["page"] = null;
    obj["index"] = true;
    articleInit(obj,obj["type"]);
});