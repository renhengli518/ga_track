/** 用户行为记录 */
function gotracker(productId, extField, pageCode, endUserId, newUserFlag,
		browserToken, referer, pageAmount, pt, exPt) {// 行为记录调用函数
	var w = new TrackerContainer("1");
	if (productId) {// 产品ID
		w.addParameter(new Parameter("productId", productId));
	}
	if (extField) {// 扩展参数
		w.addParameter(new Parameter("extField", extField));
	}
	if (pageCode) {// 当前页面值
		w.addParameter(new Parameter("pageCode", pageCode));
	}
	if (endUserId) {// 当前页面用户
		w.addParameter(new Parameter("endUserId", endUserId));
	}
	if (newUserFlag == true || newUserFlag == false) {// 新用户标识(browserToken取)
		w.addParameter(new Parameter("newUserFlag", newUserFlag));
	}
	if (browserToken) {// 客户唯一标识
		w.addParameter(new Parameter("browserToken", browserToken));
	}
	if (referer) {// 来源(request取)
		w.addParameter(new Parameter("referer", referer));
	}
	if (pageAmount) {// 页面产生金额
		w.addParameter(new Parameter("pageAmount", pageAmount));
	}
	if (pt) {// 当前页面token
		w.addParameter(new Parameter("pt", pt));
	}
	if (exPt) {// 前一个页面token
		w.addParameter(new Parameter("exPt", exPt));
	}
	// 触发时间
	w.addParameter(new Parameter("clientTime", new Date().getTime()));

	sendImgUrl(w.toUrl());
}
function sendImgUrl(d) {// 发送用户行为记录请求
	var c = "timg" + new Date().getTime();
	window[c] = new Image(1, 1);
	// alert(d);
	window[c].src = d
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
			: "localhost:8080/ga_tracker";
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
		return this.url + a
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
trackerSupportKey.infoPageId = "w_pif";
trackerSupportKey.tp = "w_tp";
trackerSupportKey.tc = "w_tc";
trackerSupportKey.guid = "guid";
trackerSupportKey.attachedInfo = "b_ai";
trackerSupportKey.tracker_u = "b_tu";
trackerSupportKey.tracker_type = "b_trt";
trackerSupportKey.ip = "u_ip";
trackerSupportKey.infoTrackerSrc = "w_ts";
trackerSupportKey.infoTrackerSrc = "w_ts";
trackerSupportKey.cookie = "w_ck";
trackerSupportKey.orderCode = "b_oc";
trackerSupportKey.firstLink = "w_flk";
trackerSupportKey.curMerchantId = "u_cm";
trackerSupportKey.provinceId = "u_pid";
trackerSupportKey.fee = "b_fee";
trackerSupportKey.edmActivity = "b_ea";
trackerSupportKey.edmEmail = "b_ee";
trackerSupportKey.edmJobId = "b_ejb";
trackerSupportKey.internalKeyword = "b_ik";
trackerSupportKey.resultSum = "b_rs";
trackerSupportKey.currentPage = "b_scp";
trackerSupportKey.linkPosition = "b_lp";
trackerSupportKey.adgroupKeywordID = "b_ak";
trackerSupportKey.extField3 = "b_set";
trackerSupportKey.extField6 = "b_adt";
trackerSupportKey.extField7 = "b_pmi";
trackerSupportKey.extField8 = "b_tid";
trackerSupportKey.extField9 = "b_cid";
trackerSupportKey.extField10 = "s_and";
trackerSupportKey.unid = "w_un";
trackerSupportKey.refPageTypeId = "w_rpt";
trackerSupportKey.refUnid = "w_run";
trackerSupportKey.refPageValue = "w_rpv";
trackerSupportKey.eventId = "b_ei";
trackerSupportKey.labelId = "b_li";
trackerSupportKey.filterInfo = "b_fi";
trackerSupportKey.activityId = "b_aci";
trackerSupportKey.listCategoryId = "b_lci";
trackerSupportKey.pmStatusTypeId = "b_pms";
trackerSupportKey.container = "s_ct";
trackerSupportKey.containerVersion = "s_ctv";
trackerSupportKey.platVersion = "s_pv";
trackerSupportKey.phoneType = "s_pt";
trackerSupportKey.provider = "s_pro";
trackerSupportKey.netType = "s_nt";
trackerSupportKey.tpa = "w_tpa";
trackerSupportKey.tpc = "w_tpc";
trackerSupportKey.tpi = "w_tpi";
trackerSupportKey.tcs = "w_tcs";
trackerSupportKey.tcsa = "w_tca";
trackerSupportKey.tcdt = "w_tct";
trackerSupportKey.tcd = "w_tcd";
trackerSupportKey.tci = "w_tci";
trackerSupportKey.tce = "w_tce";
trackerSupportKey.positionTypeId = "b_pyi";
trackerSupportKey.scrollTop = "w_st";
trackerSupportKey.abtestValue = "b_abv";
trackerSupportKey.productId = "b_pid";// 产品ID
trackerSupportKey.extField = "b_ext";
trackerSupportKey.pageCode = "w_pv";// 页面ID
trackerSupportKey.endUserId = "u_uid";
trackerSupportKey.clientType = "c_type";
trackerSupportKey.newUserFlag = "b_nu";// 新访客标识
trackerSupportKey.clientTime = "b_clt";// 行为发生时间
trackerSupportKey.browserToken = "b_btk";// 客户唯一标识
trackerSupportKey.referer = "b_ref";// 来源
trackerSupportKey.pageAmount = "u_amt";// 页面上金额
trackerSupportKey.pt = "pt";// 页面上金额
trackerSupportKey.exPt = "exPt";// 页面上金额