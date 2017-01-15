/**
 * lunbotu
 */
var banner = utils.getElesByClass('banner')[0];
var bannerInner = utils.getElesByClass('bannerInner',banner)[0];
var focusList = utils.children(banner,'ul')[0];
var imgs = bannerInner.getElementsByTagName('img');
console.log(imgs);
var lis = focusList.getElementsByTagName('li');

;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+new Date().getTime(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState ==  4 && xhr.status ==200){
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();

(function (){
    if(window.data){
        var strImg = '';
        var strLi = '';
        for(var i=0; i<data.length; i++){
            strImg += '<div><img src="" realSrc="'+data[i].src+'"></div>';
            strLi += i === 0 ? '<li class="selected"></li>' :'<li></li>';
        }
        bannerInner.innerHTML = strImg;
        focusList.innerHTML = strLi;
    }
})();

(function (){
    for(var i=0; i<imgs.length; i++){
        (function (i){
            var curImg = imgs[i];
            var tempImg = new Image();
            tempImg.src = curImg.getAttribute('realSrc');
            tempImg.onload = function (){
                curImg.src = this.src;
                utils.css(curImg,'display','block');
                if(i === 0 ){
                    utils.css(curImg.parentNode,'zIndex',1);
                    animate(curImg.parentNode,{opacity:0.9},300);
                }
            }
        })(i);
    }
})();


var timer = window.setInterval(autoMove,2000);
var step = 0;
function autoMove(){
    step++;
    if(step == data.length){
        step = 0;
    }
    setImg();
}
function setImg(){
    for(var i=0; i<imgs.length; i++){
        var curImg = imgs[i];
        if(i === step){
            utils.css(curImg.parentNode,'zIndex',1);
            animate(curImg.parentNode,{opacity : 1},500,function (){
                var siblings = utils.siblings(this);
                for(var i=0; i<siblings.length; i++){
                    utils.css(siblings[i],'opacity',0);
                }
            });
        }else{
            utils.css(curImg.parentNode,'zIndex',0);
        }
    }

    for(var i=0; i<lis.length; i++){
        lis[i].className = i === step ? 'selected' : '';
    }
}
;(function (){
    for(var i=0; i<lis.length; i++){
        var curLi = lis[i];
        curLi.index = i;
        curLi.onmousemove = function (){
            step  = this.index;
            setImg();
        }
    }
})();





