var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
if(!storage.token){
    window.location = 'login.html';
}
var testEditor , isEdit = false , editTechType , editType;
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
$(function() {
    testEditor = editormd("test-editormd", {
        width   : "90%",
        height  : 600,
        syncScrolling : "single",
        path    : "../editor/lib/",
        saveHTMLToTextarea : true
    });    
});

$().ready(()=>{   
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
            if(window.location.href.indexOf("?") > 0){
                $(".input-select").css("display","none");
                $(".span-none").css("display","none");
                $(".icon").css("display","none");
                $(".list-right").css("display","none");
                $(".list-left").css("display","none");
                var pos = window.location.href.indexOf("=");
                var id = window.location.href.slice(pos+1);
                var obj = {
                    "user_id":storage.user_id,
                    "topic_id":id
                }
                $.ajax({
                    url:'http://www.ftusix.com/static/data/content.php',
                    type: 'get',
                    timeout: 5000,
                    dataType:'JSON',
                    data: obj,
                    success:(res) =>{
                        // console.log(res)
                        isEdit = true;
                        editType = res.data.type;
                        editTechType = res.data.tech_type;
                        if(res.status == 0){
                            err(res.info);
                            setTimeout(() => {
                                $(window).attr('location','myarticle.html');
                            }, 500);
                        }else{
                            $(".input-title").val(res.data.title);
                            console.log( document.getElementsByClassName("editormd-markdown-textarea")[0].innerText)
                            // $(".CodeMirror-code").html(res.data.md_content);
                            $(".markdown-body").html(res.data.content);
                        }
                    }
                });
            }
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
$('.input-select-first').blur(function(){
    setTimeout(function() {  //进行延时处理，因为focus比click先执行
        $('.list-left').css("display","none");
    }, 100)
}).focus(function(){
    $('.list-left').css("display","block");
});
$('.input-select-second').blur(function() {
    setTimeout(function() { 
        $('.list-right').css("display","none");
    }, 100)
}).focus(function(){
    $('.list-right').css("display","block");
});
$(".list-left p").click(function(){
    $(".input-select-first").val(this.innerHTML);
});
$(".list-right p").click(function(){
    $(".input-select-second").val(this.innerHTML);
});
$(".submit").click(function(){
    var md_content = testEditor.getMarkdown();       
    // var content = testEditor.getHTML();
    var content = testEditor.getPreviewedHTML();
    var type = !editType?$(".input-select-first").val():editType;
    var tech_type = !editTechType?$(".input-select-second").val():editTechType;
    switch(type){
        case '经验分享':
        type = 1 ;
        break;
        case '入门学习':
        type = 2 ;
        break;
        case '成果分享':
        type = 3 ;
        break;
        default:  break;
    }
    switch(tech_type){
        case 'HTML':
        tech_type = 1 ;
        break;
        case 'PHP':
        tech_type = 2 ;
        break;
        case 'JAVA':
        tech_type = 3 ;
        break;
        default:  break;
    }
    var obj = {
        "md_content":md_content,
        "content":content,
        "user_id":storage.user_id,                                     
        "nickname":storage.nick_name,                                      
        "type":type,     
        "tech_type":tech_type,                                            
        "title":$(".input-title").val(),                                   
        "isEdit": isEdit     
    };
    if(isEdit){ 
        var pos = window.location.href.indexOf("=");
        var id = window.location.href.slice(pos+1);
        obj["topic_id"] =  id;
    }
    // console.log(obj);
    var jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/writeArticle.php',
        type: 'post',
        timeout: 5000,
        data: jsons,
        success:(res) =>{
            // console.log(res)
            if(res.status == 1){
                success(res.info);
                setTimeout(() => {                 //发布成功跳转
                    $(window).attr('location','myarticle.html');
                }, 500);
            }else{
                switch(res.info){
                    case 'title为空':
                    res.info = '您未输入标题'
                    break;
                    case 'md_content为空':
                    res.info = '您未输入文章内容'
                    break;
                    case 'content为空':
                    res.info = '您未输入文章内容'
                    break;
                    case 'type为空':
                    res.info = '您未输入所属类别'
                    break;
                    case 'tech_type为空':
                    res.info = '您未输入技术类别'
                    break;
                    default:  break;
                }
                err(res.info);
            }
        }
    });
});