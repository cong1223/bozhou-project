window.onload = function () {
    resize(1080, "x");
}

function resize(originSize, type) {
    // originSize = 750;
    // type = x
    type = type || "x";
    if (type == "x") {
        var width = document.documentElement.clientWidth;//设备的宽度
        var scale = width / originSize * 100 + "px";
        document.getElementsByTagName("html")[0].style.fontSize = scale;
    } else if (type == "y") {
        var height = document.documentElement.clientHeight;
        var scale = height / originSize + "px";
        document.getElementsByTagName("html")[0].style.fontSize = scale;
    }
}

resize(1080, "x");

window.onresize = function () {
    resize(1080, "x");
}


//龙哥朋友推荐【公司一般写活动页面用】
// {
//     (function () {
//         function o() {
//             document.documentElement.style.fontSize = (document.documentElement.clientWidth > 750 ? 750 : document.documentElement.clientWidth) / 15 + "px"
//         }
//
//         var e = null;
//         window.addEventListener("resize", function () {
//             clearTimeout(e), e = setTimeout(o, 300)
//         }, !1), o()
//     })(window);
// }

