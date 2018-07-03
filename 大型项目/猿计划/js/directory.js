var storage = window.localStorage.length==0?window.sessionStorage:window.localStorage;
$().ready(function(){   
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
            $("#logout").click(function(){  //登出
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

