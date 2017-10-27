/*函数功能：获取元素的属性
参数：三个参数，第一个为需要获取的元素对象，第二为需要获取元素的属性，第三个为回调函数
返回值：目标元素的目标属性
标注：一个步长（speed）用时30毫秒；
*/
function getStyle(obj, attr) {
    return obj.currentStyle ?
        obj.currentStyle[attr] :
        getComputedStyle(obj)[attr];
}

/*函数功能：将定位元素移动到相应位位置
参数：五个参数，第一个为移动的元素对象，第二为移动的方向'top'&'left'，第三个为移动的步长，第四个目标位置。第五个为回调函数
返回值：无返回值
*/
function move(obj, attr, speed, target, endFn) {
    clearInterval(obj.move_time);
    speed = parseInt(getStyle(obj, attr)) < target ? speed : -speed;
    obj.move_time = setInterval(function() {
        if (
            (speed >= 0 && parseInt(getStyle(obj, attr)) + speed > target) ||
            (speed < 0 && parseInt(getStyle(obj, attr)) + speed < target)
        ) {
            obj.style[attr] = target + "px";
            clearInterval(obj.move_time);
            endFn && endFn();
        } else {
            obj.style[attr] = parseInt(getStyle(obj, attr)) + speed + "px";
        }
    }, 30);
}

/*函数功能：将定位元素移动到相应位位置,速度逐渐变化
参数：五个参数，第一个为移动的元素对象，第二为移动的方向'top'&'left'，第三个为移动的步长，第四个目标位置。第五个为回调函数
返回值：无返回值
标注：要在全局为函数生成一个名为iTimer的空值
*/


function startMove(obj, iSpeed, iTarget, endFn) {
    var arr = [];
    var iSpeenRate = (iTarget - obj.offsetLeft) / iSpeed;
    clearInterval(iTimer);
    iTimer = setInterval(function() {
        var L = obj.offsetLeft + iSpeed;
        iSpeed = (iTarget - obj.offsetLeft) / iSpeenRate;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if ((iSpeed > 0 && L >= iTarget) || (iSpeed < 0 && L <= iTarget)) {
            L = iTarget;
            clearInterval(iTimer);
            endFn && endFn();
        }
        obj.style.left = L + "px";
    }, 30);
}

/*函数功能：将定位元素移动到进行抖动
参数：四个参数，第一个为移动的元素对象，第二为移动的方向'top'&'left'，第三个为抖动的最大距离，第四个为回调函数
返回值：无返回值
标注：一个步长（speed）用时30毫秒；
*/

function shake(obj, attr, min_distance, endFn) {
    if (obj.shake_onOff) {
        return;
    } else {
        obj.shake_onOff = true;

        var arry = [];
        var num = 0;
        clearInterval(obj.shake_time);
        for (var i = min_distance; i > 0; i -= 2) {
            arry.push(i, -i, -i, i);
        }
        arry.push(0);
        obj.shake_time = setInterval(function() {
            obj.style[attr] = parseInt(getStyle(obj, attr)) + arry[num] + "px";
            num++;
            if (num == arry.length) {
                clearInterval(obj.shake_time);
                obj.shake_onOff = false;
                endFn && endFn();
            }
        }, 30);
    }
}

/*函数功能：改元素的大小
参数：五个参数，第一个为移动的元素对象，第二为移动的方向'height'&'width'，第三个为改变时的步长，第四个为目标长度，第六个为回调函数
返回值：无返回值
标注：一个步长（speed）用时30毫秒；
*/

function changeSize(obj, attr, speed, target, endFn) {
    clearInterval(obj.changeSize_time);
    speed = parseInt(getStyle(obj, attr)) < target ? speed : -speed;
    obj.changeSize_time = setInterval(function() {
        if (
            (speed > 0 && target < parseInt(getStyle(obj, attr)) + speed) ||
            (speed < 0 && parseInt(getStyle(obj, attr)) + speed < target)
        ) {
            obj.style[attr] = target + "px";
            clearInterval(obj.changeSize_time);
            endFn && endFn();
        } else {
            obj.style[attr] = parseInt(getStyle(obj, attr)) + speed + "px";
        }
    }, 30);
}

/*函数功能：改元素的透明度
参数：五个参数，第一个为移动的元素对象，第二个为改变时的步长，第三个为目标透明度，第四个为回调函数
返回值：无返回值
标注：一个步长（speed）用时30毫秒；
*/
function changeTran(obj, speed, target, endFn) {
    clearInterval(obj.changeTran_time);
    speed = parseFloat(getStyle(obj, "opacity")) <= target ? speed : -speed;
    obj.changeTran_time = setInterval(function() {
        if (
            (speed > 0 && parseFloat(getStyle(obj, "opacity")) + speed > target) ||
            (speed < 0 && parseFloat(getStyle(obj, "opacity")) + speed < target)
        ) {
            obj.style.opacity = target;
            clearInterval(obj.changeTran_time);
            endFn && endFn();
        } else {
            obj.style.opacity = parseFloat(getStyle(obj, "opacity")) + speed;
        }
    }, 30);
}

/*函数功能：将数字星期转换为字符串
参数：两个个参数，第一个为数字的星期几，第二个为回调函数
返回值：返回字符串星期
标注：一个步长（speed）用时30毫秒；
*/
function week(weeknum, endFn) {
    if (weeknum == 1) return "Monday";
    if (weeknum == 2) return "Tuesday";
    if (weeknum == 3) return "Wednesday";
    if (weeknum == 4) return "Thursday";
    if (weeknum == 5) return "Friday";
    if (weeknum == 6) return "Saturday";
    if (weeknum == 0) return "Sunday";
    alert("日期错误");
    endFn && endFn();
}
/*函数功能：随机生成两个数之间的数
参数：两个个参数
返回值：返回一个两个数之间的正整数值
标注：
*/
function stochasticInteger(stochasticInteger_min, stochasticInteger_max) {
    if (stochasticInteger_min < stochasticInteger_max) {
        stochasticInteger_min ^= stochasticInteger_max;
        stochasticInteger_max ^= stochasticInteger_min;
        stochasticInteger_min ^= stochasticInteger_max;
    }
    return (
        stochasticInteger_min +
        Math.round(Math.random() * (stochasticInteger_max - stochasticInteger_min))
    );
}

/*函数功能：选择class的标签
参数：三个参数，第一个为子级的范围，第二个为元素的类型，第三个为class名
返回值：返回字数组
标注：
*/
function getElementsByClassNme(parent, tagName, className) {
    //parent:范围   tagName：元素类型    className:class名
    var arr = [];
    var aEls = parent.getElementsByTagName(tagName);
    var aClssName;
    for (var i = 0; i < aEls.length; i++) {
        aClssName = aEls[i].className.split(" ");
        for (var j = 0; j < aClssName.length; j++)
            if (aClssName[j] == className) {
                arr.push(aEls[i]);
                break;
            }
    }
    console.log(arr);
    return arr;
}

/*函数功能：添加class属性
参数：两个参数，第一个为要添加标签，第二个为class类名
返回值：无返回值
标注：
*/
function addClass(addClass_obj, addClass_className) {
    if (addClass_obj.className == "") {
        //没有class
        addClass_obj.className = addClass_className;
    } else {
        //有class
        if (arrIndexClass(addClass_obj.className.split(" "), addClass_className)) {
            addClass_obj.className += " " + addClass_className;
        }
    }
}

function arrIndexClass(arr, v) {
    //判断class值是否存在
    for (var i = 0; i < arr.length; i++) {
        if (v == arr[i]) {
            return false;
        }
    }
    return true;
}

/*函数功能：删除class属性
参数：两个参数，第一个为要待删除class 属性的元素，第二个为class类名
返回值：无返回值
标注：
*/
function removeClss(removeClass_obj, removeClass_className) {
    //如果没有class
    var removeClass_class = removeClass_obj.className.split(" ");
    if (removeClass_obj.className == "") {
        return 0;
    } else {
        for (var i = 0; i < removeClass_class.length; i++) {
            if (removeClass_class[i] == removeClass_className) {
                removeClass_class.splice(i, 1);
                break;
            }
        }
        removeClass_obj.className = removeClass_class.join(" ");
    }
}

/*函数功能：拖动效果
参数：两个参数，第一个为拖动的元素 ，第二个范围的元素
返回值：无返回值
标注：加值可实现吸附效果
*/
function drag(drag_obj, drag_obj1) {
    drag_obj.onmousedown = function(ev) {
        var ev = ev || event;

        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        document.onmousemove = function(ev) {
            var ev = ev || event;
            var L = ev.clientX - disX;
            var T = ev.clientY - disY;
            if (L <= drag_obj1.offsetLeft + 50) {
                //+50为磁性吸附效果

                L = drag_obj1.offsetLeft;
            }
            if (T <= drag_obj1.offsetTop) {
                T = drag_obj1.offsetTop;
            }
            if (
                L >=
                drag_obj1.offsetLeft +
                parseInt(getStyle(drag_obj1, "width")) -
                parseInt(getStyle(drag_obj, "width"))
            ) {
                L =
                    drag_obj1.offsetLeft +
                    parseInt(getStyle(drag_obj1, "width")) -
                    parseInt(getStyle(drag_obj, "width"));
            }
            if (
                T >=
                drag_obj1.offsetTop +
                parseInt(getStyle(drag_obj1, "height")) -
                parseInt(getStyle(drag_obj, "height"))
            ) {
                T =
                    drag_obj1.offsetTop +
                    parseInt(getStyle(drag_obj1, "height")) -
                    parseInt(getStyle(drag_obj, "height"));
            }
            drag_obj.style.left = L + "px";
            drag_obj.style.top = T + "px";
            return false;
        };

        document.onmouseup = function() {
            document.onmousemove = document.onmousedown = null;
        };
    };
}

/*函数功能：设置cookie
参数：三个参数，第一个为设置cookie的名称 ，第二个为设置cookie的值，第三个为有效期
返回值：无返回值
标注：
*/
function setCookie(cookie_name, value, t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie =
        cookie_name + "=" + value + ";expires=" + oDate.toGMTString();
}
/*函数功能：获取cookie
参数：一个参数，第一个为获取cookie的名称
返回值：找到返回对应cookie值的字符串，为找到返回false
标注：
*/
function getCookie(cookie_name) {
    var str_cookie = document.cookie;
    var arr_cookie = str_cookie.split("; ");
    for (var i = 0; i < arr_cookie.length; i++) {
        var arr_cookie2 = arr_cookie[i].split("=");
        if (arr_cookie2[0] == cookie_name) {
            return arr_cookie2[1];
        }
    }
    return false;
}
/*函数功能：删除cookie
参数：一个参数，第一个为待删除cookie的名称
返回值：无返回值
标注：
*/

function removeCookie(remove_name) {
    setCookie(remove_name, "", -1);
}

/*函数功能：任意值的渐变效果
参数：四个参数个参数，第一个为obj元素，第二参数为待变的属性，第三个为变化的目标；第四个参数为回调函数
返回值：无返回值
标注：
*/
function startMove(obj, attr, iTarget, endFn) {
    clearInterval(obj.iTimer);
    obj.iTimer = setInterval(function() {
        var iCur =
            attr == "opacity" ?
            parseFloat(getStyle(obj, attr)) * 100 :
            parseInt(getStyle(obj, attr));
        var iSpeed = (iTarget - iCur) / 16;

        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        var W = iCur + iSpeed;

        if ((W >= iTarget && iSpeed >= 0) || (W <= iTarget && iSpeed <= 0)) {
            clearInterval(obj.iTimer);
            W = iTarget;
            obj.style[attr] = attr == "opacity" ? W / 100 : W + "PX";
            endFn&&endFn();
        } else {
            obj.style[attr] = attr == "opacity" ? W / 100 : W + "PX";
        }
    }, 30);
}
/*函数功能：获取元素的属性
参数：三个参数，第一个为需要获取的元素对象，第二为需要获取元素的属性，第三个为回调函数
返回值：目标元素的目标属性
标注：一个步长（speed）用时30毫秒；
*/
function getStyle(obj, attr) {
    return obj.currentStyle ?
        obj.currentStyle[attr] :
        getComputedStyle(obj)[attr];
}


/*函数功能：任意值的渐变效果（完美版）
参数：四个参数个参数，第一个为obj元素，第二参数为待变的属性和目标的json对象，第三个为变化的变化速度的比率（反比）；第四个参数为回调函数
返回值：无返回值
标注：
*/
function startMove(obj, json, iSpeedRate, endFn) {
    clearInterval(obj.iTimer);
    if (!iSpeedRate) { iSpeedRate = 8; }
    obj.iTimer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var iCur = attr == "opacity" ? parseFloat(getStyle(obj, attr)) * 100 : parseInt(getStyle(obj, attr));
            var iSpeed = (json[attr] - iCur) / iSpeedRate;

            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            var W = iCur + iSpeed;

            if ((W >= json[attr] && iSpeed >= 0) || (W <= json[attr] && iSpeed <= 0)) {
                W = json[attr];
                obj.style[attr] = attr == "opacity" ? W / 100 : W + "PX";
            } else {
                bStop = false;
                obj.style[attr] = attr == "opacity" ? W / 100 : W + "PX";
            }
        }
        if (bStop) {
            clearInterval(obj.iTimer);
            if (endFn) { endFn(); }
        }

    }, 30);
}

/*函数功能：服务器获取内容
参数：四个参数个参数，第一个为传输的方式（get&post），第二参数为传输的地址，第三个为传输的内容；第四个参数为回调函数
返回值：无返回值
标注：
*/
function Ajax(Method, Url, Data,success) {
    var xhr = new XMLHttpRequest();
    if (Method == 'get' || Method == "GET") {
        Url += '?' + Data + '&' + Math.round();
    }
    xhr.open(Method, Url, true);
    if (Method == 'get' || Method == "GET") {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(Data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
               success&&success(xhr.responseText);
            }
        }
    }
}