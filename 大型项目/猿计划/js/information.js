var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
if(!storage.token){
    window.location = 'login.html';
}
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
$().ready(function(){   //ajax获取相关信息
    $("#header_nav").load("header-login.html",function(){
        $("#header_nav a").each(function(){  
            $this = $(this);  
            if($this[0].href==String(window.location.href)){  
                $this.addClass("now");  
            }  
        }); 
        let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
        $("#myPhone").html(storage.mobile);
        $("#name").val(storage.nick_name);
        if(storage.sex === "1"){
            $(".hidden-input[value=1]").prop("checked", true);
        }else if(storage.sex === "2"){
            $(".hidden-input[value=2]").prop("checked", true);
        }
        $("#pic").attr("src",path);
        $("#myImg").attr("src",path);
    });  
});
function formImgUpdate(){
    var formData = new FormData($('#form1')[0]);
    formData.append('id', storage.user_id);
    $.ajax({
        url: 'http://www.ftusix.com/static/data/upload.php',
        data: formData,
        dataType: 'JSON', 
        type: 'POST',
        contentType: false,
        processData: false,
        success:function(res){
            // console.log(res)
            if(res.status == 1){
                success(res.info);
                storage.setItem("avatar",res.data);
                let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
                $("#pic").attr("src",path);
                $("#myImg").attr("src",path);
            }else{
                err(res.info);
                let path = "http://www.ftusix.com/static/data/upload/"+storage.getItem("avatar");
                $("#myImg").attr("src",path);
            }
        }
    });
}
$("#avator").change(function(){   //头像上传
    var reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    var f= this.files[0];
    reader.onload = function(){
        if(!/image\/\w+/.test(f.type)){
            $(".error").html("请选择图片类型文件");
            $(".tips").css("top","40px");
            setTimeout(function(){$(".tips").css("top","-40px");},1000);  
            return false; 
        }else{
            formImgUpdate();    //头像用FormData和fileReader
            $("#myImg").attr("src",reader.result);
        }
    }
});
$("#sub").click(function(){     //信息更新
    //其他信息
    var sex = $('input:radio:checked').val();
    var nick_name = $("#name").val();
    var token = storage.token;
    var obj = {};
    obj["sex"] =  sex;
    obj["nick_name"] =  nick_name;
    obj["token"] =  token;
    jsons = JSON.stringify(obj);
    $.ajax({
        url:'http://www.ftusix.com/static/data/update.php',
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
                success("更新成功");
                storage.token = res.data.token;
                storage.nick_name = res.data.nick_name;
                storage.avatar = res.data.avatar;
                storage.mobile = res.data.mobile;
                storage.sex = res.data.sex;
                $("#myPhone").html(res.data.mobile);
                $("#name").val(res.data.nick_name);
                if(res.data.sex === "1"){
                    $(".hidden-input[value=1]").prop("checked", true);
                }else if(res.data.sex === "2"){
                    $(".hidden-input[value=2]").prop("checked", true);
                }
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