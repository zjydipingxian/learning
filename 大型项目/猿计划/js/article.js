var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
var globalCount = 0; //用于加载更多按钮
var id; //记录topic_id的值
function err(msg){ 
    $(".tips_red").html("×");
    $(".tips_red").css("background-color","rgb(242, 14, 51)");
    $(".error").html(msg);
    $(".tips").css("top","40px");
    setTimeout(() => {$(".tips").css("top","-40px");},1000);
}
function success(msg){
    $(".tips_red").html("√");
    $(".tips_red").css("background-color","#28c928");
    $(".error").html(msg);
    $(".tips").css("top","40px");
    setTimeout(() => {$(".tips").css("top","-40px");},2000);
}
function domAppend(classname,topic_id,info,title){   //动态查询的文章列表渲染到页面
    // topic_id = encodeURIComponent(topic_id);
    var div=$("<div class='article-list'></div>");  
    var span_time=$("<p class='article-list-time'>"+info+"</p>");  
    var span_title=$("<p class='article-list-title'><a href='article.html?topic-id="+topic_id+"'>"+title+"</a></p>");  
    div.append(span_time);
    div.append(span_title);
    $("."+classname).append(div);  
}
function domComment(info,name,content){   //动态查询的评论渲染到页面
    var div=$("<div class='comment-list clear'></div>");  
    var span_time=$("<span class='comment-list-time'>"+info+"</span>");  
    var span_name=$("<span class='comment-list-name'>"+name+":</span>");  
    var span_content=$("<span class='comment-list-content'>"+content+"</span>"); 
    var span_response=$("<span class='comment-list-response'>回复</span>"); 
    div.append(span_name);
    div.append(span_content);
    div.append(span_response);
    div.append(span_time);
    $(".comment-lists").append(div); 
}
function goPage(classname,page,resType,sortType){     //页码改变后，改变页面文章数据
    $("."+classname).html("");
    var obj = {};
    obj["type"] = resType;
    obj["sort"] = sortType;
    obj["page"] = page;
    obj["index"] = false;
    // console.log(obj)
    $.ajax({
        url:'http://www.ftusix.com/static/data/topicList.php',
        contentType: 'application/json',
        type: 'GET',
        timeout: 5000,
        dataType:'JSON',
        data: obj,
        success:(res) =>{
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
                domAppend(classname,res.data[i].topic_id,info,res.data[i].title);
            }
        }
    });
}
function articleInit(classname,pageid,resType,sortType){   //初始化时候,ajax查数据，用于查文章
    $("."+classname).html("");
    var obj = {};
    obj["type"] = resType;
    obj["sort"] = sortType;
    obj["page"] = null;
    obj["index"] = false;
    $.ajax({
        url:"http://www.ftusix.com/static/data/topicList.php",
        type:"GET",
        timeout:5000,
        dataType:"json",
        data : obj, 
        success:(res)=>{
            if(res.status == 0){
                $("#"+pageid).html("暂无数据");
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
                            goPage(classname,page,resType,sortType);
                        },  
                    }
                    $("#"+pageid).bootstrapPaginator(options);
                });
            }
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
                }else if(time < 30 && time > 1){
                    info = res.data[i].nick_name + " . " + parseInt(time) +"天前";
                }else if(time*24 < 1){
                    info = res.data[i].nick_name + " . " + parseInt(time*24*60) +"分钟前";
                }else{
                    info = res.data[i].nick_name + " . " + parseInt(time*24) +"小时前";
                }
                domAppend(classname,res.data[i].topic_id,info,res.data[i].title); 
            }
        },
        error:(a,b,c)=>{
            // console.log(a)
            // console.log(b)
            // console.log(c)
        }
    });
}
$().ready(()=>{  
    if(window.location.href.indexOf("?") > 0){  //如果有?,代表是看某一篇具体文章
        $(".article-table").hide();  //把之前的文章列表隐藏，准备显示单篇文章详细信息
        $(".comments").hide();
        $(".article-content").show();
        var pos = window.location.href.indexOf("=");
        id = window.location.href.slice(pos+1);
        if(storage.user_id){    //判断是否登录了
            $(".comments").show();
            user_id = storage.user_id;
        }else{
            user_id = -1;   //未登录，user_id为小于0的数
        }
        var obj = {           //查文章用的数据
            "user_id":user_id,
            "topic_id":id
        }
        $.ajax({
            url:'http://www.ftusix.com/static/data/content.php',
            type: 'get',
            timeout: 5000,
            dataType:'JSON',
            data: obj,
            success:(res) =>{
                if(res.status == 0){
                    err("该文章已不存在");
                    setTimeout(() => {
                        $(window).attr('location','article.html');
                    }, 500);
                }else{
                    // console.log(res)
                    if(storage.user_id){    //如果登录了的
                        var date = new Date(parseInt(res.data.modify_time)*1000);
                        var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                        var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        $(".topic h2").html(res.data.title);
                        $(".topic .date").html(data_time1);
                        $(".topic .time").html(data_time2);
                        $(".topic .browser").html('浏览'+res.data.browser_num);
                        $(".topic .comment").html('评论'+res.data.comment_num);
                        $(".topic .topic-content").html(res.data.content);
                        if(res.iszan){           //是否已经点赞过
                            $(".like i").addClass("fa-thumbs-up");
                            $(".like i").removeClass("fa-thumbs-o-up");
                        }
                        if(res.iscoll){           //是否已经收藏过
                            $(".good i").removeClass("fa-star-o");
                            $(".good i").addClass("fa-star");
                        }
                    }else{   //如果没登录，就把点赞收藏和写评论的div隐藏
                        $(".comments").css("display","none");
                        var date = new Date(parseInt(res.data.modify_time)*1000);
                        var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                        var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        $(".topic h2").html(res.data.title);
                        $(".topic .date").html(data_time1);
                        $(".topic .time").html(data_time2);
                        $(".topic .browser").html('浏览'+res.data.browser_num);
                        $(".topic .comment").html('评论'+res.data.comment_num);
                        $(".topic .topic-content").html(res.data.content);
                    }
                }
            }
        });
        $.ajax({           //这里用来查评论
            url:'http://www.ftusix.com/static/data/commentList.php',
            type: 'get',
            timeout: 5000,
            dataType:'JSON',
            data: {               //参数
                "topic_id": id      
            },
            success:(res) =>{
                // console.log(res)
                if(res.status == 0){
                    $(".comment-lists").html(res.info);
                }else{
                    for(var i = globalCount,length = res.data.length;i < length&&i < globalCount+10;i++){
                        var date = new Date(parseInt(res.data[i].date)*1000);
                        var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                        var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        var info = data_time1 + " " + data_time2;
                        domComment(info,res.data[i].nick_name,res.data[i].comment);
                    }
                    globalCount = i;
                    if(i < res.data.length){   //如果还可以加载更多评论，就把更多评论按钮不隐藏
                        $(".btn-more").show();
                    }
                }
            }
        });
    }else{                     //如果url没？，代表就是看所有文章的列表，这里的else里面的内容无问题
        $(".article-table").show();
        articleInit("article-aa","pageid-a",0,"new");
        articleInit("article-bb","pageid-b",1,"new");
        articleInit("article-cc","pageid-c",2,"new");
        articleInit("article-dd","pageid-d",3,"new");
        articleInit("article-aaa","pageid-aa",0,"hot");
        articleInit("article-bbb","pageid-bb",1,"hot");
        articleInit("article-ccc","pageid-cc",2,"hot");
        articleInit("article-ddd","pageid-dd",3,"hot");
    }
    if(storage.token){    //这个if-else用于加载合适的导航栏，登录和未登录的导航栏不同
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
//选择不同类型，来获取不同文章列表
$(".article-type-new").click(()=>{
    $(".article-type-hot").removeClass("article-type-on");
    $(".article-type-new").addClass("article-type-on");
    $(".article-new").removeClass("article-none");
    $(".article-hot").addClass("article-none");
});
$(".article-type-hot").click(()=>{
    $(".article-type-new").removeClass("article-type-on");
    $(".article-type-hot").addClass("article-type-on");
    $(".article-hot").removeClass("article-none");
    $(".article-new").addClass("article-none");
});
$(".top-list-a").click(()=>{
    $(".top-list-a").addClass("top-list-on");
    $(".top-list-a").siblings().removeClass("top-list-on");
    $(".article-a").removeClass("article-none");
    $(".article-a").siblings().addClass("article-none");
});
$(".top-list-b").click(()=>{
    $(".top-list-b").addClass("top-list-on");
    $(".top-list-b").siblings().removeClass("top-list-on");
    $(".article-b").removeClass("article-none");
    $(".article-b").siblings().addClass("article-none");
});
$(".top-list-c").click(()=>{
    $(".top-list-c").addClass("top-list-on");
    $(".top-list-c").siblings().removeClass("top-list-on");
    $(".article-c").removeClass("article-none");
    $(".article-c").siblings().addClass("article-none");
});
$(".top-list-d").click(()=>{
    $(".top-list-d").addClass("top-list-on");
    $(".top-list-d").siblings().removeClass("top-list-on");
    $(".article-d").removeClass("article-none");
    $(".article-d").siblings().addClass("article-none");
});
//点赞功能，点一次，就图标改样式，顺带再传一次参数
$(".like").click(()=>{
    if( $(".like i").attr("class").indexOf("fa-thumbs-o-up")>0){
        $(".like i").removeClass("fa-thumbs-o-up");
        $(".like i").addClass("fa-thumbs-up");

    }else{
        $(".like i").removeClass("fa-thumbs-up");
        $(".like i").addClass("fa-thumbs-o-up");
    }
    var obj = {      //参数
        "user_id": storage.user_id,                                         
        "topic_id":id,           
        type:"zan" 
    }
    var jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/zan.php',
        type: 'post',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success:(res) =>{
            // console.log(res)
            if(res.status == 1){
                success(res.info) 
            }else{
                err(res.info)
            }
        }
    });
});
$(".good").click(()=>{
    if( $(".good i").attr("class").indexOf("fa-star-o")>0){
        $(".good i").removeClass("fa-star-o");
        $(".good i").addClass("fa-star");
    }else{
        $(".good i").removeClass("fa-star");
        $(".good i").addClass("fa-star-o");
    }
    var obj = {
        "user_id": storage.user_id,                                         
        "topic_id":id,           
        type:"coll" 
    }
    var jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/zan.php',
        type: 'post',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success:(res) =>{
            // console.log(res)
            if(res.status == 1){
                success(res.info) 
            }else{
                err(res.info)
            }
        }
    });
});
$(".btn-submit").click(()=>{                
    var obj = {
        "user_id":storage.user_id,
        "topic_id": id,     
        "comment":$("textarea").val()
    };
    var jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/comment.php',
        contentType:"application/json",
        type: 'post',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success:(res) =>{
            // console.log(res);
            if(res.status == 1){
                success(res.info);
                $("textarea").val("");
                globalCount = 0;
                //发布成功后，立即执行查询评论操作，并显示在页面
                $.ajax({
                    url:'http://www.ftusix.com/static/data/commentList.php',
                    type: 'get',
                    timeout: 5000,
                    dataType:'JSON',
                    data: {
                        "topic_id": id      
                    },
                    success:(res) =>{
                        var str = $(".topic .comment").html();
                        str = parseInt(str.slice(2))+1;
                        $(".topic .comment").html("评论"+str);
                        $(".comment-lists").html('');
                        for(var i = globalCount,length = res.data.length;i < length&&i < globalCount+10;i++){
                            var date = new Date(parseInt(res.data[i].date)*1000);
                            var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                            var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            var info = data_time1 + " " + data_time2;
                            domComment(info,res.data[i].nick_name,res.data[i].comment);
                        }
                        globalCount = i;
                        if(i < res.data.length){
                            $(".btn-more").show();
                        }
                    }
                });
            }else{
                err(res.info);
            }
        }
    });
});
//用于加载更多评论
$(".btn-more").click(()=>{
    $.ajax({
        url:'http://www.ftusix.com/static/data/commentList.php',
        type: 'get',
        timeout: 5000,
        dataType:'JSON',
        data: {
            "topic_id": id      
        },
        success:(res) =>{
            if(res.status == 0){
                $(".comment-lists").html(res.info);
            }else{
                for(var i = globalCount,length = res.data.length;i < length&&i < globalCount+10;i++){
                    var date = new Date(parseInt(res.data[i].date)*1000);
                    var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                    var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    var info = data_time1 + " " + data_time2;
                    domComment(info,res.data[i].nick_name,res.data[i].comment);
                }
                globalCount = i;
                // console.log(i)
                if(i < res.data.length){
                    $(".btn-more").show();
                }else{
                    $(".btn-more").html("已到底部");
                }
            }
        }
    });
});


