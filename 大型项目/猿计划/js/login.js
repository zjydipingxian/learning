var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
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
$().ready(function(){
    $("#header_nav").load("header.html",function(){
        $("#header_nav a").each(function(){  
            $this = $(this);  
            if($this[0].href==String(window.location.href)){  
                $this.addClass("now");  
            }  
        }); 
    });    
});
$(".for_button").click(function(){
    if(storage.token){
        err("您已处于登录状态，正在跳转...");
        setTimeout(() => {
            $(window).attr('location','article.html');
        }, 1500);
        return;
    }   
    var remember = $("input:checkbox").prop('checked');
    var mobile = $("#mobile").val();
    var pwd = $("#pwd").val();
    if(mobile === ""){
        err("请输入手机号");
        return;
    }
    if(pwd === ""){
        err("请输入密码");
        return;
    }
    var obj = {};
    obj["mobile"] =  mobile;
    obj["pwd"] =  pwd;
    jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/login.php',
        type: 'POST',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success: function (res) {   
            console.log(res)
            if(res.status === 0){
                err(res.info);
            }else{
                if(remember){
                    window.localStorage.setItem("token",res.data[0].token);
                    window.localStorage.setItem("nick_name",res.data[0].nick_name);
                    window.localStorage.setItem("avatar",res.data[0].avatar);
                    window.localStorage.setItem("mobile",res.data[0].mobile);
                    window.localStorage.setItem("sex",res.data[0].sex);
                    window.localStorage.setItem("user_id",res.data[0].user_id);
                    // console.log(storage)
                    $(window).attr('location','information.html');
                }else{
                    window.sessionStorage.setItem("token",res.data[0].token);
                    window.sessionStorage.setItem("nick_name",res.data[0].nick_name);
                    window.sessionStorage.setItem("avatar",res.data[0].avatar);
                    window.sessionStorage.setItem("mobile",res.data[0].mobile);
                    window.sessionStorage.setItem("sex",res.data[0].sex);
                    window.sessionStorage.setItem("user_id",res.data[0].user_id);
                    $(window).attr('location','information.html');
                }
            } 
        },
        Error: function (xhr, type, errorThrown) {
            err("当前状态无法登录");
        }
    });
});
