var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
if(!storage.token){
    window.location = 'login.html';
}
var pageNow; //保存当前页面
var faEdit,faCancle; //用于保存当前点击的标签,分别是取消删除，确认删除
function err(msg){  //用于跳操作错误信息
    $(".tips_red").html("×");
    $(".tips_red").css("background-color","rgb(242, 14, 51)");
    $(".error").html(msg);
    $(".tips").css("top","40px");
    setTimeout(() => {$(".tips").css("top","-40px");},1000);
}
function success(msg){  //用于跳操作成功信息
    $(".tips_red").html("√");
    $(".tips_red").css("background-color","#28c928");
    $(".error").html(msg);
    $(".tips").css("top","40px");
    setTimeout(() => {$(".tips").css("top","-40px");},2000);
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
    var span_delete=$("<span><a class='pencil top_id"+topic_id+"'><i class='fa fa-pencil' aria-hidden='true'></i></a><a class='trash top_id"+topic_id+"''><i class='fa fa-trash' aria-hidden='true'></i></a></span>");  
    div.append(span_delete);
    $(".articles").append(div);  
}
function goPage(page){     //页码改变后，改变页面数据
    $(".articles").html("");  //数据清空
    var obj = {};
    obj["user_id"] = storage.user_id; 
    obj["page"] = page;
    // console.log(obj)
    $.ajax({
        url:'http://www.ftusix.com/static/data/myNote.php',
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
            }
        }
    });
}
$().ready(() => {   
    $("#header_nav").load("header-login.html",function(){
        //加载完导航栏，callback执行下面的
        $("#header_nav a").each(function(){   //当前页面，导航栏对应当前文字变红
            $this = $(this);  
            if($this[0].href==String(window.location.href)){  
                $this.addClass("now");  
            }  
        }); 
        //ajax获取头像信息
        let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
        $("#pic").attr("src",path);
        // 获取文章列表进行分页显示
        var obj = {};
        obj["user_id"] = storage.user_id; 
        obj["page"] = null;
        $.ajax({
            url:'http://www.ftusix.com/static/data/myNote.php',
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
                    }
                }
            }
        });
    });
});
 //事件冒泡原理，所以绑定在document上的事件，可以冒泡到未来元素
$(document).on("click",".pencil",function(){
    //对应文章页面，暂未写完，将来在写这里的跳转操作
    var position = $(this).attr("class").indexOf("top_id") + 6;
    var topic_id = $(this).attr("class").slice(position);
    $(window).attr('location','write.html?id='+topic_id);
}); 
$(document).on("click",".trash",function(){ //点删除图标后
    faCancle = $(this);
　　$("#mask").css("display","block"); 
　  $("#dialog").css("display","block"); 
}); 
//原生js绑定：
// document.onclick = function(e){
//     console.log(e)
//     that  = e.srcElement ? e.srcElement : e.target;
//     if(that.className == document.getElementsByClassName("dialog-cancle")[0].className){
//         success("删除已被取消");
//         document.getElementById("mask").style.display = "none";
//         document.getElementById("dialog").style.display = "none";
//     }
// }
$(document).on("click",".dialog-cancle",function(){ //取消删除
    success("删除已被取消");
　　$("#mask").css("display","none"); 
　  $("#dialog").css("display","none"); 
}); 
$(document).on("click",".dialog-confirm",function(){ //确认删除
    　　$("#mask").css("display","none"); 
    　  $("#dialog").css("display","none");            
        var position = faCancle.attr("class").indexOf("top_id") + 6;
        var topic_id = faCancle.attr("class").slice(position);
        var obj = {};
        obj["user_id"] = storage.user_id;
        obj["topic_id"] = parseInt(topic_id);
        var jsons = JSON.stringify(obj);
        $.ajax({
            url:'http://www.ftusix.com/static/data/delete.php',
            contentType: 'application/json',
            type: 'POST',
            timeout: 5000,
            dataType:'JSON',
            data: jsons,
            success:(res) =>{
                if(res.status == 1){
                    goPage(pageNow);
                    success("删除成功");
                }else{
                    err(res.info);
                }
            }
        });
    }); 
$(document).on("click","#logout",function(){
    //登出
    storage.clear();
    $(window).attr('location','login.html');
});