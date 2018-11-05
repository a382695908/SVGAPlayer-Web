
function isltIE10() {
    //判断是否小于IE10 ，ie9支持canvas 但是不支持ajax加载二进制文件
    return (navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10)
}

if(!isltIE10()){
    module.exports = require('./svgaplayer.js')

}else{
    var SVGA = require('./svgaplayer.ie.js');
    
    module.exports = SVGA || window.SVGA;
}

