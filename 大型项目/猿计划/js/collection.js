var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
if(!storage.token){
    window.location = 'login.html';
}
var pageNow; //保存当前页面
var faEdit,faCancle; //用于保存当前点击的标签
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
function minsize(topic_id){
    if($(".top_id"+topic_id).html().length > 10){  //考虑到标题可能会超出span的大小，用这个限制内部字体大小
        $(".top_id"+topic_id).css('font-size',parseInt($(".top_id"+topic_id).css('font-size'))- 6 +'px');
    }
} 
function domAppend(topic_id,title,type,comment,browser,time1,time2){   //动态查询的数据渲染到页面
    var div=$("<div class='article-list'></div>");  
    var span_title=$("<span class='top-first'><a href='article.html?top_id="+topic_id+"' class='title-resize'>"+title+"</a></span>");  
    div.append(span_title);
    var span_type=$("<span>"+type+"</span>");  
    div.append(span_type);
    var span_comment=$("<span>"+comment+"</span>");  
    div.append(span_comment);
    var span_browser=$("<span>"+browser+"</span>");  
    div.append(span_browser);
    var span_time=$("<span><p>"+time1+"</p><p>"+time2+"</p></span>");  
    div.append(span_time);
    var span_delete=$("<span><a class='star top_id"+topic_id+"'>取消收藏</i></a></span>");  
    div.append(span_delete);
    $(".articles").append(div);  
}
function goPage(page){     //页码改变后，改变页面数据
    $(".articles").html("");
    var obj = {};
    obj["user_id"] = storage.user_id; 
    obj["page"] = page;
    $.ajax({
        url:'http://www.ftusix.com/static/data/myColl.php',
        type: 'GET',
        timeout: 5000,
        dataType:'JSON',
        data: obj,
        success:(res) =>{
            for(let i=0;i<res.data.length&&i<10;i++){
                switch(res.data[i].type)
                {
                    case '0':
                    res.data[i].type = "所有分类" ;
                    break;
                    case '1':
                    res.data[i].type = "经验分享" ;
                    break;
                    case '2':
                    res.data[i].type = "入门学习" ;
                    break;
                    case '3':
                    res.data[i].type = "成果分享" ;
                    break;
                    default:  break;
                }
                var date = new Date(parseInt(res.data[i].modify_time)*1000);
                var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                domAppend(res.data[i].topic_id,res.data[i].title,res.data[i].type,res.data[i].comment_num,res.data[i].browser_num,data_time1,data_time2);
                minsize(res.data[i].topic_id);
            }
        }
    });
}
$().ready(() => {   
    $("#header_nav").load("header-login.html",function(){
        //加载完导航栏，callback执行下面的
        $("#header_nav a").each(function(){  
            $this = $(this);  
            if($this[0].href==String(window.location.href)){  
                $this.addClass("now");  
            }  
        }); 
        //ajax获取相关信息
        let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
        $("#pic").attr("src",path);
        // 获取文章列表进行分页显示
        var obj = {};
        obj["user_id"] = storage.user_id; 
        obj["page"] = null;
        $.ajax({
            url:'http://www.ftusix.com/static/data/myColl.php',
            type: 'GET',
            timeout: 5000,
            dataType:'JSON',
            data: obj,
            success:(res) =>{
                // console.log(res)
                if(res.status == 0){
                        $("#page").html("暂无数据");
                }else{
                    $(()  =>{
                        var options={
                         bootstrapMajorVersion:1, //版本要求
                         currentPage:1, //当前页数
                         numberOfPages:5, //最多显示Page页
                         totalPages:Math.ceil(res.commentList[0]/10), //所有数据可以显示的页数
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
                                goPage(page);  
                            },  
                        }
                        $("#page").bootstrapPaginator(options);
                    });
                    for(let i=0;i<res.data.length&&i<10;i++){
                        switch(res.data[i].type)
                        {
                            case '0':
                            res.data[i].type = "所有分类" ;
                            break;
                            case '1':
                            res.data[i].type = "经验分享" ;
                            break;
                            case '2':
                            res.data[i].type = "入门学习" ;
                            break;
                            case '3':
                            res.data[i].type = "成果分享" ;
                            break;
                            default:  break;
                        }
                        var date = new Date(parseInt(res.data[i].modify_time)*1000);
                        var data_time1 = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                        var data_time2 = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        domAppend(res.data[i].topic_id,res.data[i].title,res.data[i].type,res.data[i].comment_num,res.data[i].browser_num,data_time1,data_time2);
                        minsize(res.data[i].topic_id);
                    }
                }
            }
        });
    });
});
 //事件冒泡原理，所以绑定在document上的事件，可以冒泡到未来元素
$(document).on("click",".star",function(){
    faCancle = $(this);
    var height=$(document).height();   
    var width=$(document).width(); 
    $("#mask").css("height",height); 
    $("#mask").css("width",width); 
　　$("#mask").css("display","block"); 
　  $("#dialog").css("display","block"); 
}); 
$(document).on("click",".dialog-cancle",function(){
    success("操作已被取消");
　　$("#mask").css("display","none"); 
　  $("#dialog").css("display","none"); 
}); 
$(document).on("click",".dialog-confirm",function(){
    　　$("#mask").css("display","none"); 
    　  $("#dialog").css("display","none"); 
        var user_id = 4;             
        var position = faCancle.attr("class").indexOf("top_id") + 6;
        var topic_id = faCancle.attr("class").slice(position);
        var obj = {      //参数
            "user_id": storage.user_id,                                         
            "topic_id":topic_id,           
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
                if(res.status == 1){
                    goPage(pageNow)
                    success(res.info) 
                }else{
                    err(res.info)
                }
            }
        });
    }); 
$(document).on("click","#logout",function(){
    //登出
    storage.clear();
    $(window).attr('location','login.html');
});