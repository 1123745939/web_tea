
//适配屏幕
/**(function (doc, win) {
   var docEl = doc.documentElement,
       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
       recalc = function () {
           var clientWidth = docEl.clientWidth;
           if (!clientWidth) return;
           if(clientWidth>=750){
               docEl.style.fontSize = '100px';
           }else{
               docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
           }
       };
   if (!doc.addEventListener) return;
   win.addEventListener(resizeEvt, recalc, false);
   doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/**
 * 获取当前时间
 */
function formatTime(date=new Date()) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//修改title
var setTitle = function(title){
	document.title = title
	var mobile = navigator.userAgent.toLowerCase()
	if (/iphone|ipad|ipod/.test(mobile)) {
		var iframe = document.createElement('iframe')
		iframe.style.display = 'none'
		// 替换成站标favicon路径或者任意存在的较小的图片即可
		iframe.setAttribute('src', 'static/assets/logo.png')
		var iframeCallback = function () {
			setTimeout(function () {
			iframe.removeEventListener('load', iframeCallback)
			document.body.removeChild(iframe)
		}, 0)
		}
		iframe.addEventListener('load', iframeCallback)
		document.body.appendChild(iframe)
	}
}

//验证手机
var regPhone = function(phone){   
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
	var flag = reg.test(phone); //true
	return flag;
};
//验证密码
var regPassword = function(pass){
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; //验证规则
	var flag = reg.test(pass); //true
	return flag;
}

//验证车牌
var regVehicleNumber = function(vehicleNumber) { 
    var result = false;
    if (vehicleNumber.length == 7){
       var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
       result = express.test(vehicleNumber);
    }
    return result;
};
//验证身份证
var regIdCard = function(card){
	var result = false;
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   result = reg.test(card);
   
   return result;  
}  
//function changeTitle(title){
//	var arr = ['']
//	var body = document.getElementsByTagName('body')[0];
//	document.title = title;
//	
//	var iframe = document.createElement("iframe");
//	iframe.setAttribute("src", "/favicon.ico");
//
//	iframe.addEventListener('load', function() {
//		setTimeout(function() {
//			iframe.removeEventListener('load');
//			document.body.removeChild(iframe);
//		}, 0);
//	});
//	document.body.appendChild(iframe);
//}
//
//window.onhashchange = function(){
//	console.log(location)
//	var title = location.hash;
//	changeTitle(title);
//}
 var scrollToBottom = {
    getScrollTop:function(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    getScrollHeight:function(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    getClientHeight:function(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    onScrollEvent:function(callback){
        var This = this;
        window.onscroll = function(){
            if(This.getScrollTop() + This.getClientHeight() >= This.getScrollHeight()){
                typeof callback == "function" && callback.call(this);
            }
        }
    }
};
//var str = "token=qwe&name=xiaotong"
function stringToObject(str){
	var _object = {};
	if(str.indexOf('&')>0){  //有多个值
		var arr = str.split('&');
		for (var i = 0;i<arr.length;i++) {
			var _arr = arr[i].split('=')
			_object[_arr[0]] = _arr[1]
		}
	}else{  //只有一个值
		var _arr = str.split('=')
		_object[_arr[0]] = _arr[1]
	}
	return _object;
}
function objectToString(data){
	var str = '';
	for (var i in data) {
		str += i + '=' + data[i] + '&'
	}
	str = str.substring(0,str.lastIndexOf('&'))
	return str;
}
//function paging(page,arr){
//	if(page == 0){
//		this.historyList = [];  //清空之前的数组里的数据
//		if(data.infor.totalCount != 0){
//			for(var i = 0;i<data.infor.listItems.length;i++){
//				this.historyList.push(data.infor.listItems[i])
//			}
//		}
//	}else{ //如果有分页,不是第一页
//		if(data.infor.totalCount != 0){
//			for(var i = 0;i<data.infor.listItems.length;i++){
//				this.historyList.push(data.infor.listItems[i])
//			}
//		}
//	}
//	page++;
//	return {
//		page,
//		_arr
//	}
//}
//发送验证码
function sendCode(sendBtn,that){
	var T = 60;
	function countDown(){
	    sendBtn.innerText = T +'s后重新发送';
	    T = T - 1;
	    that.disabled = true;
	    let handle = setTimeout(function(){
	    	countDown();
	    }, 1000);
	    if (T < 0) {
	        clearTimeout(handle);
	        sendBtn.innerText = '发送验证码';
	        that.disabled = false;
	    }
	}
	//执行函数
	countDown();
	//后续提示框.....
}
//历史记录
function getHistory(name){
	var historySearch = JSON.parse(localStorage.getItem(name)) || [];
	return historySearch;
}
function setHistory(data,name){
  var arr = []
  var historySearch = JSON.parse(localStorage.getItem(name));
  if (historySearch) {
    for (var i = 0; i < historySearch.length; i++) {
      if (data == historySearch[i]) {
        continue;
      }
      arr.push(historySearch[i])
    }
  }
  arr.unshift(data);
  localStorage.setItem(name,JSON.stringify(arr));
}
function clearHistory(name){
	localStorage.removeItem(name);
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "="+ escape (cvalue) + ";expires=" + expires;
    console.log(document.cookie);
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();

        if(c.indexOf(name) == 0)
            return decodeURIComponent(c.substring(name.length, c.length));
    }
    return "";
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//根据开始日期和结束日期获取所有日期的方法
function getStartEndAllTime(day1, day2) {  
    var getDate = function(str) {  
       var tempDate = new Date();  
       var list = str.split("-");  
       tempDate.setFullYear(list[0]);  
       tempDate.setMonth(list[1] - 1);  
       tempDate.setDate(list[2]);  
       return tempDate;  
    }  
   var date1 = getDate(day1);  
   var date2 = getDate(day2);  
   if (date1 > date2) {  
       var tempDate = date1;  
       date1 = date2;  
       date2 = tempDate;  
   }  
   date1.setDate(date1.getDate() + 1);  
   var dateArr = [];  
   var i = 0;  
   while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {  
       var dayStr =date1.getDate().toString();  
       if(dayStr.length ==1){  
           dayStr="0"+dayStr;  
       }  
       dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"  + dayStr;  
       i++;  
       date1.setDate(date1.getDate() + 1);  
   }  
   dateArr.splice(0,0,day1)
   dateArr.push(day2);
   return dateArr;  
}
//两个日期的差值(d1 - d2).2017-10-02
function DateDiff(d1,d2){
  var daytime = 24 * 60 * 60 *1000;
  var starttime = new Date(d1).getTime();
  var endtime = new Date(d2).getTime();
  var day = (endtime - starttime)/daytime;
  return day;
}
 var ultZeroize = function (v, l) {
        var z = "";
        l = l || 2;
        v = String(v);
        for (var i = 0; i < l - v.length; i++) {
            z += "0";
        }
        return z + v;
 };
function dateToStr(d) {
        console.log(typeof d)
        if (typeof (d) == "string") d = new Date(d * 1000);
        return (d.getFullYear() + "-" + ultZeroize(d.getMonth() + 1) + "-" + ultZeroize(d.getDate()) + " " + ultZeroize(d.getHours()) + ":" + ultZeroize(d.getMinutes()) + ":" + ultZeroize(d.getSeconds()));
};

function compareDate(d1,d2){
    var day = 24 * 60 * 60 *1000;
    var dateArr = d1.split("-");
    var checkDate = new Date();
    checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
    var checkTime = checkDate.getTime();

    var dateArr2 = d2.split("-");
    var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
    var checkTime2 = checkDate2.getTime();
    if(checkTime < checkTime2){
    	return true;
    }
    return false;
}
export default {
    regPhone,
    regPassword,
	setTitle,
	regVehicleNumber,
	regIdCard,
	scrollToBottom,
	stringToObject,
	objectToString,
	sendCode,
	setCookie,
	getCookie,
	formatTime,
	setHistory,
	getHistory,
	clearHistory,
	getStartEndAllTime,
	DateDiff,
	compareDate,
    dateToStr
}
