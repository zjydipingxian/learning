

//滚轮事件兼容
function onWheel(obj,eFn){
	if(obj.addEventListener){//判断是不是主流浏览器
		var oDiv = document.createElement('div');
		if(oDiv.onmousewheel === null){//其他主流浏览器
			obj.addEventListener('mousewheel',fn);
		}else{//火狐浏览器
			obj.addEventListener('DOMMouseScroll',fn);
		}
	}else{//ie8及以下
		obj.attachEvent('onmousewheel',fn);
	}
	function fn(e,d){
		e = e || window.event;
		d = e.wheelDelta/120 || -e.detail/3;
		eFn.call(obj,e,d);
		if(e.preventDefault) //清除默认滚轮事件
			e.preventDefault();
		else
			return false;
	}
}

//事件监听和绑定的兼容
function addEvent(obj,str,eFn){
	function fn(e){
		e = e || window.event;
		eFn.call(obj,e);
	}
	if(obj.addEventListener){//主流浏览器
		obj.addEventListener(str,fn);
	}else{//ie678
		obj.attachEvent('on'+str,fn);
	}
	return fn;
}
function removeEvent(obj,str,fn){
	if(obj.addEventListener){//主流浏览器
		obj.removeEventListener(str,fn);
	}else{//ie678
		obj.dettachEvent('on'+str,fn);
	}
}


//拖拽事件