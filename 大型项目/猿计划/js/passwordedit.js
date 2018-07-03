var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
var ajaxMessage;   //前端存储短信验证码
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
$().ready(() => {   //ajax获取相关信息
    $("#header_nav").load("header-login.html",function(){
        $("#header_nav a").each(function(){  
            $this = $(this);  
            if($this[0].href==String(window.location.href)){  
                $this.addClass("now");  
            }  
        }); 
        let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
        $("#pic").attr("src",path);
        $("#mobile").html(storage.mobile);
    });
    // console.log(storage)
});
$("#mes").click(() => {    //获取验证码
    var mobile = $("#mobile").html();
    var obj = {};
    obj["mobile"] =  mobile;
    jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/sendsms.php',
        contentType: 'application/json',
        type: 'POST',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success: function (res) {   
            let count = 60 , str;
            ajaxMessage = res.data.code; 
            console.log(res);
            success("短信验证码已发送");
            $("#mes").attr("disabled","disabled");  
            $("#mes").css("background-color","gray");
            setTimeout(function(){
                if(count >= 2){
                    count--;
                    str = count+"秒后重新获取" ;
                    $("#mes").val(str);
                    setTimeout(arguments.callee,1000);
                }else{
                    $("#mes").css("background-color","#28c928");
                    $("#mes").val("获取验证码");
                    $("#mes").attr("disabled",false);  
                }
            },1000);
        }
    }); 
});
$("#sub").click(function(){     //信息更新
    var mobile = $("#mobile").html();
    var pwd = $("#newPwd").val();
    var pwd2 = $("#newPwd-repeat").val();
    var sms_code = $("#msg").val();
    if(pwd === ""){
        err("请输入正确的密码格式");
        return;
    }
    if(pwd.length < 6){
        err("请输入6位以上密码");
        return;
    }
    if(pwd !== pwd2){
        err("两次输入密码不匹配");
        return;
    }
    if(sms_code !== ajaxMessage){
        err("请输入正确的短信验证码");
        return;
    }
    var obj = {};
    obj["mobile"] =  mobile;
    obj["pwd"] = pwd;
    obj["pwd2"] = pwd2;
    obj["sms_code"] = sms_code;
    jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/reset.php',
        contentType: 'application/json',
        type: 'POST',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success: function (res) {   
            // console.log(res)
            if(res.status === 0){
                err(res.info);
            }else{
                success(res.info);
                storage.clear();
                setTimeout(() => {
                    $(window).attr('location','login.html');
                }, 1500);
            }
        },
        Error: function (xhr, type, errorThrown) {
            err(res.info);
        }
    });
});
$(document).on("click","#logout",function(){
    //登出
    storage.clear();
    $(window).attr('location','login.html');
});