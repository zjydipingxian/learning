//封装滚轮事件
function mousewheel(obj, Fn) {
    function eFn(e) {
        e = e || window.event;
        //假事件函数执行，来判断是否需要阻止默认事件
        if (Fn.call(this, e, e.wheelDelta / 120 || -e.detail / 3) === false) {
            !-[1, ] ? e.returnValue = false: e.preventDefault();
        }

    }
    //判断是否是火狐，如果是，则用火狐的方法添加，不是就直接添加
    document.onmousewheel === null ? obj.onmousewheel = eFn : obj.addEventListener("DOMMouseScroll", eFn);
}