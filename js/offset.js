(function(){
    window.offsetVal = function(ele){
        var josn = {
            "x":ele.offsetLeft,
            "y":ele.offsetTop,
        }
        while(ele = ele.offsetParent){
            // console.log(ele);
            //能力检测
            if(window.getComputedStyle){
                josn.x += parseFloat(getComputedStyle(ele)["border-left-width"]);
                josn.y += parseFloat(getComputedStyle(ele)["border-top-width"]);
            }else{
                josn.x += parseFloat(ele.currentStyle["border-left-width"]);
                josn.y += parseFloat(ele.currentStyle["border-top-width"]);
            }
            josn.x += ele.offsetLeft;
            josn.y += ele.offsetTop;
        }
        return josn;
    }
})()