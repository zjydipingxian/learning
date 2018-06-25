function move(obj,json,tar_t,callback){
	//请求动画兼容
	window.requestAnimationFrame=window.requestAnimationFrame||
	function(fn){ return settimeout(fn,1000/60);}
	//清除动画兼容
	window.cancelAnimationFrame=window.cancelAnimationFrame||
	clearTimeout;
	//获取样式兼容
	var getStyle=getComputedStyle?getComputedStyle(obj):obj.currentStyle;
	
	var init={},S={}  //存放初始值用的东西
	for(var key in json){
		init[key]=parseFloat(getStyle[key]); //获取初始值
		S[key]=json[key]-init[key]; //获取总路程
		if (!S[key]) {
        delete init[key];
        delete json[key];
    	}
	}
	/*var  curr=json[key]<init[key]; //先判断谁大
	if(curr){
		tar_t=-tar_t;	
	}*/
	var STime=new Date(); //获取开始的时间
	
	(function run(){
		var nTime = new Date()-STime;//当前时间
		var prop =nTime/Math.abs(tar_t); //时间比例
		cancelAnimationFrame(run);
		if(prop>=1){
			prop=1;//判断是否停止
		}else{
			requestAnimationFrame(run);
		}
		/*(curr? init[key] <= json[key]:init[key]>= json[key])?init[key] = tar_time:requestAnimationFrame(run);*/
		for(var key in init){
			  if(key==="opacity"){
            var value = S[key]*prop + init[key];
            obj.style[key] = value;
            obj.style.filter = "alpha(opacity="+ value*100 +")"
        }else{
            obj.style[key] = S[key]*prop + init[key] + "px";
        	}
		}
		 if(prop===1){callback && callback()}
	})();
}