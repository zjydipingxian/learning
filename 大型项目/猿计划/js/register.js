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
$("#mes").click(() => {
    var mobile = $("#mobile").val();
    var pwd = $("#pwd").val();
    var pwd_copy = $("#pwd_copy").val();
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if(!myreg.test(mobile)){
        err("请输入正确的手机号");
        return;
    }
    if(pwd === ""||pwd.length < 6){
        err("请输入正确的密码格式");
        return;
    }
    if(pwd !== pwd_copy){
        err("两次输入密码不匹配");
        return;
    }
    var obj = {};
    obj["mobile"] =  parseInt(mobile);
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
                    //这里因为用arguments，外部不能用箭头函数
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
$(".for_button").click(() => {
    $(".for_button").attr("disabled",false);  
    var mobile = $("#mobile").val();
    var pwd = $("#pwd").val();
    var pwd_copy = $("#pwd_copy").val();
    var message = $("#message").val();
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if(!myreg.test(mobile)){
        err("请输入正确的手机号码");
        return;
    }
    if(pwd === ""||pwd.length < 6){
        err("请输入正确的密码格式");
        return;
    }
    if(pwd !== pwd_copy){
        err("两次输入密码不匹配");
        return;
    }
    if(message !== ajaxMessage){
        err("请输入正确的短信验证码");
        return;
    }
    var obj = {};
    obj["mobile"] =  mobile;
    obj["pwd"] =  pwd;
    obj["sms_code"] =  message;
    jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/register.php',
        contentType: 'application/json',
        type: 'POST',
        timeout: 5000,
        dataType:'JSON',
        data: jsons,
        success: function (res) {   
            // console.log(res);
            if(res.info === "用户名已注册"){
                err("用户名已注册");
                $("#mobile").focus();
                $(".for_button").attr("disabled",true);  
            }
            if(res.status === 1){
                success("注册成功,正在跳转到登录页面...");
                setTimeout(() => {
                    $(window).attr('location','login.html');
                }, 1500);
            }
        },
        Error: function (xhr, type, errorThrown) {
            err("当前状态无法注册");
            $(".for_button").attr("disabled",true);  
        }
    });
});