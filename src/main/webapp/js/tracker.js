/**
 * @author renhengli
 * @version 1.0
 * @description being using for other project to get anlysis data.
 * @date 2016-08-31 
 */
var pageUrl ;
var country,province,city;
var begintime = new Date(); 
var pageTitle ;
var refferPage ;//网页来源地址
var buttonPosition;
var endUserId = "";
var domain = document.domain;
var fromWhere="直接访问";
var serachKeyWords="";
//var lastModified = document.lastModified;
var urlPrefix = {ga: "http://192.168.1.96:7777"};
$(function(){
	//判断用户是否登录,需要在植入代码的页面定义全局变量，并获取登录的用户的userID
	if(userId && userId != null && userId != ""){
		endUserId = userId;
	}
	//预处理数据，分析网站来源
	pageUrl = window.location.href;
	pageTitle = document.title;
	refferPage = document.refferPage;
	var str1=""; 
	var str2= ""; 
	var grep=null; 
	var str=null; 
	var keyword=null; 
	var skey="xx"; 
	var ykey=""; 
	//refferPage="https://www.sogou.com/web?query=iPhone7%E6%9B%9D%E5%85%89&_asf=www.sogou.com&from=index-nologin&_ast=&w=01015002&p=40040108&ie=utf8&oq=&ri=0&sourceid=sugg&suguuid=&sut=0&sst0=1472621418633&lkt=0%2C0%2C0&pid=sogou-wsse-af5baf594e9197b4-0001"; 
	if(refferPage && refferPage != null && refferPage != ""){
		var sosuo=refferPage.split(".")[1]; 
		switch (sosuo) {
		case "baidu":
			fromWhere = "百度搜索";
			grep = /wd\=.*\&/i;
			str = refer.match(grep)
			keyword = str.toString().split("=")[1].split("&")[0];
			//console.log(decodeURIComponent(keyword));
			ykey = decodeURIComponent(keyword);
			addCookie('key', decodeURIComponent(keyword), 1);
			//alert(decodeURIComponent(keyword));
			break;
		case "google":
			fromWhere = "谷歌搜索";
			grep = /&q\=.*\&/i;
			str = refer.match(grep)
			keyword = str.toString().split("&")[1].split("=")[1];
			//console.log(decodeURIComponent(keyword));
			ykey = decodeURIComponent(keyword);
			addCookie('key', decodeURIComponent(keyword), 1);
			break;
		case "sogou":
			fromWhere = "搜狗搜索";
			grep = /query\=.*\&/i;
			str = refer.match(grep)
			keyword = str.toString().split("&")[0].split("=")[1];
			//console.log(decodeURIComponent(keyword));
			ykey = decodeURIComponent(keyword);
			addCookie('key', decodeURIComponent(keyword), 1);
			//alert(decodeURIComponent(keyword));
			break;
		default:
			fromWhere = "直接访问";
			addCookie('key', '', 1);
		}
	}
	//var ckey = (getCookie('key'))
	//alert(ckey);
	//if (ykey.indexOf(skey) > -1) {
	//} else {
	//}
	function deleteCookie(name) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = name + "=v; expires=" + date.toGMTString();
	}
	function getCookie(name) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr[0] == name)
				return arr[1];
		}
		return "";
	}
	function addCookie(name, value, expiresHours) {
		var cookieString = name + "=" + escape(value);
		// 判断是否设置过期时间
		if (expiresHours > 0) {
			var date = new Date();
			date.setTime(date.getTime + expiresHours * 3600 * 1000);
			cookieString = cookieString + "; expires=" + date.toGMTString();
		}
		document.cookie = cookieString;
	}
	serachKeyWords = ykey;
	//document.write(ykey);
	
	//获取用户当前所在的地域信息
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(){
	    //console.log(remote_ip_info);
	    var obj = remote_ip_info;
	    country = obj.country;
	    province = obj.province;
	    city = obj.city;
	});
	
	
	//初始化数据埋点
	//1.处理带input=button的元素
	$(document).on("click","input[type='button']",function(){
		buttonPosition = $(this).val();
		gotracker(buttonPosition,'','buttonClick',endUserId,pageUrl,country,province,city,pageTitle,refferPage,fromWhere,serachKeyWords);
	})
	//处理a标签
	$(document).on("click","a",function(){
		var href = $(this).attr("href");
		var text = $(this).text();
		if(href && href != "" && href != null){
			gotracker('',text,'a_link',endUserId,pageUrl,country,province,city,pageTitle,refferPage,fromWhere,serachKeyWords);
		}
	});
//	setTimeout(function(){
//		gotracker('','','pageView',endUserId,pageUrl,country,province,city,pageTitle,refferPage);
//	},500);
	
});
window.onunload = function(){
	gotracker('','','pageView',endUserId,pageUrl,country,province,city,pageTitle,refferPage,fromWhere,serachKeyWords);
}


/** 用户行为记录 */
function gotracker( buttonPosition,linkPosition,viewType, endUserId, 
		 pageUrl, country,  province, city, pageTitle, refferPage,fromWhere,serachKeyWords) {// 行为记录调用函数
	//首先判断是否是新访客
	var endtime = new Date();
	var waittime = endtime.getTime() - begintime.getTime();
	var seconds = Math.round(waittime/1000);
	var min = Math.floor(seconds/60);
	var hours = Math.floor(min/60);
	var seconds_1 =  seconds%60;
	if(seconds_1 == 0){
		seconds_1 = '00';
	}else if(seconds_1 < 10){
		seconds_1 = '0'+seconds_1;
	}else{}
	var min_1 =  min%60;
	if(min_1 == 0){
		min_1 = '00';
	}else if(min_1 < 10){
		min_1 = '0'+min_1;
	}else{}
	var hours_1 =  hours%60;
	if(hours_1 == 0){
		hours_1 = '00';
	}else if(hours_1 < 10){
		hours_1 = '0'+hours_1;
	}else{}
	var stayTime =  hours_1+":"+min_1+":"+seconds_1;
	var w = new TrackerContainer("1");
	if (buttonPosition) {// 按钮名称
		w.addParameter(new Parameter("buttonPosition", buttonPosition));
	}
	if (pageUrl) {// 网页地址
		w.addParameter(new Parameter("pageUrl", pageUrl));
	}
	if (endUserId) {// 当前页面用户
		w.addParameter(new Parameter("endUserId", endUserId));
	}
//	if (newUserFlag == true || newUserFlag == false) {// 新用户标识(browserToken取)
//		w.addParameter(new Parameter("newUserFlag", newUserFlag));
//	}
//	if (browserToken) {// 客户唯一标识
//		w.addParameter(new Parameter("browserToken", browserToken));
//	}
	if (country) {
		w.addParameter(new Parameter("country", country));
	}
	if (province) {
		w.addParameter(new Parameter("province", province));
	}
	if (city) {
		w.addParameter(new Parameter("city", city));
	}
	if (pageTitle) {// 页面title
		w.addParameter(new Parameter("pageTitle", pageTitle));
	}
	if (linkPosition) {
		w.addParameter(new Parameter("linkPosition", linkPosition));
	}
	if (viewType) {
		w.addParameter(new Parameter("viewType", viewType));
	}
	if (refferPage) {// 上一个浏览地址（网页来源url）
		w.addParameter(new Parameter("refferPage", refferPage));
	}
	if (serachKeyWords) {// 搜索关键字
		w.addParameter(new Parameter("serachKeyWords", serachKeyWords));
	}
	if (fromWhere) {// 网页来源
		w.addParameter(new Parameter("fromWhere", fromWhere));
	}
	// 触发时间
	w.addParameter(new Parameter("clientTime", new Date().getTime()));
	w.addParameter(new Parameter("stayTime", stayTime));
	w.addParameter(new Parameter("stayTimeMilSeconds", waittime));
    //console.log(w.toUrl());
	sendImgUrl(w.toUrl());
}
function sendImgUrl(d) {// 发送用户行为记录请求
	var c = "timg" + new Date().getTime();
	window[c] = new Image(1, 1);
	// alert(d);
	window[c].src = d;
};
function Parameter(d, c) {// 添加参数
	this.key = d;
	if (this.key == "internalKeyword") {
		this.value = encodeURIComponent(c)
	} else {
		this.value = c
	}
	this.toJSONString = function() {
		return "{" + this.key + "=" + this.value + "}"
	}
}
function TrackerContainer(e) {// 封装url
	var f = (typeof urlPrefix != "undefined" && urlPrefix.tracker) ? urlPrefix.tracker
			: "192.168.1.96:7777";
	this.url = ("https:" == document.location.protocol ? "https://" : "http://")
			+ f + "/behavior.img?1=1";
	this.url = addPublicParameter(this.url, e);
	this.parameterArray = [];
	this.stockArray = [];
	this.commonAttached = [];
	this.addParameter = function(a) {
		this.parameterArray.push(a)
	};
	this.addStock = function(a, b) {
		this.stockArray.push(new Parameter(a, b))
	};
	this.addCommonAttached = function(b, a) {
		this.commonAttached.push(new Parameter(b, a))
	};
	this.buildAttached = function() {
		if (this.stockArray.length > 0) {
			this.commonAttached.push(new Parameter("1", this.stockArray))
		}
		if (this.commonAttached.length > 0) {
			this.addParameter(new Parameter("attachedInfo", this.commonAttached
					.toTRACKERJSONString("attachedInfo")))
		}
	};
	this.toUrl = function() {
		this.buildAttached();
		var a = "&bd={";
		for (var c = 0; c < this.parameterArray.length; c++) {
			var h = trackerSupportKey[this.parameterArray[c].key];
			var b = encodeURI(encodeURI(this.parameterArray[c].value));
			if (h) {
				a += h + "=" + b;
				if (c < this.parameterArray.length - 1) {
					a += "|"
				}
			}
		}
		a += "}";
		return this.url + a;
	}
}
function addPublicParameter(m, s) {// 添加公共参数
	var q = window.location.href;
	m += "&w_url=" + encodeURIComponent(q);// 当前页面URL
	m += "&s_iev=" + navigator.userAgent || "";// 浏览器版本
	var t = "iPod|iTouch|iPhone";
	var p = /iPad/i;
	var l = "Android|BlackBerry|SymbianOS|SymbOS|Windows Phone OS|WAP|Kindle|pad|pod";

	var n = window.navigator.userAgent;
	var r = new RegExp(t, "i");
	var o = new RegExp(l, "i");
	if (r.test(n)) {
		m += "&s_plt=IOSSystem";// 客户端系统
		m += "&s_ct=H5"
	} else {
		if (p.test(n)) {
			m += "&s_plt=iPad-PC";
			m += "&s_ct=" + navigator.platform || ""
		} else {
			if (o.test(n)) {
				m += "&s_plt=AndroidSystem";
				m += "&s_ct=H5"
			} else {
				m += "&s_plt=" + navigator.platform || ""
			}
		}
	}
	m += "&s_rst=" + window.screen.width + "*" + window.screen.height;// 客户端屏幕大小
	var u = v("glTrueReffer");
	if (u && u.match(/http(s)?:\/\/.+/)) {
		m += "&w_rfu=" + encodeURIComponent(u)
	} else {
		m += "&w_rfu=" + encodeURIComponent(document.referrer || "")
	}
	return m;
	function v(b) {
		var a = new RegExp("(^|\\?|&)" + b + "=([^&]*)(\\s|&|$)", "i");
		if (a.test(window.location.href)) {
			return unescape(RegExp.$2.replace(/\+/g, " "))
		} else {
			return ""
		}
	}
}

function checkTpPage(a) {
	if (!a) {
		a = $("meta[name=tp_page]").attr("content");
		if (!a) {
			return null
		}
	}
	// var b = a.split(".");
	// return b.length == 2 ? b : null
	return a;
}
function getCurrPageInfo() {
	var a = checkTpPage();
	if (!a) {
		return null
	}
	// return {
	// pageType: a[0],
	// pageValue: a[1]
	// }
	return a;
}
function trackerGetCookie(i) {
	var g = document.cookie;
	var f = g.split("; ");
	for (var h = 0; h < f.length; h++) {
		var j = f[h].split("=");
		if (j[0] == i) {
			return j[1]
		}
	}
	return null
}
var trackerSupportKey = new Object();
trackerSupportKey.pageUrl = "pageUrl";
trackerSupportKey.country = "country";
trackerSupportKey.province = "province";
trackerSupportKey.city = "city";
trackerSupportKey.pageTitle = "title";
trackerSupportKey.refferPage = "refferPage";
trackerSupportKey.buttonPosition = "buttonPosition";
trackerSupportKey.stayTime = "stayTime";
trackerSupportKey.stayTimeMilSeconds = "stayTimeMilSeconds";
trackerSupportKey.pageTitle = "pageTitle";
trackerSupportKey.newUserFlag = "b_nu";// 新访客标识
trackerSupportKey.clientTime = "b_clt";// 行为发生时间
trackerSupportKey.linkPosition = "linkPosition";
trackerSupportKey.viewType = "viewType";
trackerSupportKey.serachKeyWords = "serachKeyWords";
trackerSupportKey.fromWhere = "fromWhere";
trackerSupportKey.endUserId = "endUserId";

//trackerSupportKey.infoPageId = "w_pif";
//trackerSupportKey.tp = "w_tp";
//trackerSupportKey.tc = "w_tc";
//trackerSupportKey.guid = "guid";
//trackerSupportKey.attachedInfo = "b_ai";
//trackerSupportKey.tracker_u = "b_tu";
//trackerSupportKey.tracker_type = "b_trt";
//trackerSupportKey.ip = "u_ip";
//trackerSupportKey.infoTrackerSrc = "w_ts";
//trackerSupportKey.infoTrackerSrc = "w_ts";
//trackerSupportKey.cookie = "w_ck";
//trackerSupportKey.orderCode = "b_oc";
//trackerSupportKey.firstLink = "w_flk";
//trackerSupportKey.curMerchantId = "u_cm";
//trackerSupportKey.provinceId = "u_pid";
//trackerSupportKey.fee = "b_fee";
//trackerSupportKey.edmActivity = "b_ea";
//trackerSupportKey.edmEmail = "b_ee";
//trackerSupportKey.edmJobId = "b_ejb";
//trackerSupportKey.internalKeyword = "b_ik";
//trackerSupportKey.resultSum = "b_rs";
//trackerSupportKey.currentPage = "b_scp";
//trackerSupportKey.linkPosition = "b_lp";
//trackerSupportKey.adgroupKeywordID = "b_ak";
//trackerSupportKey.extField3 = "b_set";
//trackerSupportKey.extField6 = "b_adt";
//trackerSupportKey.extField7 = "b_pmi";
//trackerSupportKey.extField8 = "b_tid";
//trackerSupportKey.extField9 = "b_cid";
//trackerSupportKey.extField10 = "s_and";
//trackerSupportKey.unid = "w_un";
//trackerSupportKey.refPageTypeId = "w_rpt";
//trackerSupportKey.refUnid = "w_run";
//trackerSupportKey.refPageValue = "w_rpv";
//trackerSupportKey.eventId = "b_ei";
//trackerSupportKey.labelId = "b_li";
//trackerSupportKey.filterInfo = "b_fi";
//trackerSupportKey.activityId = "b_aci";
//trackerSupportKey.listCategoryId = "b_lci";
//trackerSupportKey.pmStatusTypeId = "b_pms";
//trackerSupportKey.container = "s_ct";
//trackerSupportKey.containerVersion = "s_ctv";
//trackerSupportKey.platVersion = "s_pv";
//trackerSupportKey.phoneType = "s_pt";
//trackerSupportKey.provider = "s_pro";
//trackerSupportKey.netType = "s_nt";
//trackerSupportKey.tpa = "w_tpa";
//trackerSupportKey.tpc = "w_tpc";
//trackerSupportKey.tpi = "w_tpi";
//trackerSupportKey.tcs = "w_tcs";
//trackerSupportKey.tcsa = "w_tca";
//trackerSupportKey.tcdt = "w_tct";
//trackerSupportKey.tcd = "w_tcd";
//trackerSupportKey.tci = "w_tci";
//trackerSupportKey.tce = "w_tce";
//trackerSupportKey.positionTypeId = "b_pyi";
//trackerSupportKey.scrollTop = "w_st";
//trackerSupportKey.abtestValue = "b_abv";
//trackerSupportKey.productId = "b_pid";// 产品ID
//trackerSupportKey.extField = "b_ext";
//trackerSupportKey.pageCode = "w_pv";// 页面ID
//trackerSupportKey.endUserId = "u_uid";
//trackerSupportKey.clientType = "c_type";
//trackerSupportKey.browserToken = "b_btk";// 客户唯一标识
//trackerSupportKey.referer = "b_ref";// 来源
//trackerSupportKey.pageAmount = "u_amt";// 页面上金额
//trackerSupportKey.pt = "pt";// 页面上金额
//trackerSupportKey.exPt = "exPt";// 页面上金额

