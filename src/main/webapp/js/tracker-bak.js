/**用户行为记录*/ 
function gotracker(p, x, v, c) {//行为记录调用函数
	//alert("begin");
    var w = new TrackerContainer("1");
    if (x) {//行为记录点
        w.addParameter(new Parameter("buttonPosition", x))
    } else {
        w.addParameter(new Parameter("buttonPosition", "defaultButton"))
    }
    if (v) {//产品ID
        w.addParameter(new Parameter("productId", v))
    }
    if (p) {//扩展参数
    	w.addParameter(new Parameter("extField", p))
    }
    if (c) {//客户端类型
    	w.addParameter(new Parameter("clientType", c));
    }
    var m = getCurrPageInfo();
    //var u = m.pageType;
    //var s = m.pageValue;
    //w.addParameter(new Parameter("pageTypeId", u));
    //w.addParameter(new Parameter("pageValue", s));
    w.addParameter(new Parameter("pageValue", m));
    
    if (trackerGetCookie("hrd_uid")) {
        w.addParameter(new Parameter("endUserId", trackerGetCookie("hrd_uid")))
    }
    w.addParameter(new Parameter("clientTime", new Date().getTime()));
   
    sendImgUrl(w.toUrl())
}
function sendImgUrl(d) {//发送用户行为记录请求
    var c = "timg" + new Date().getTime();
    window[c] = new Image(1, 1);
    //alert(d);
    window[c].src = d
};
function Parameter(d, c) {//添加参数
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
function TrackerContainer(e) {//封装url
    var f = (typeof urlPrefix != "undefined" && urlPrefix.tracker) ? urlPrefix.tracker: "localhost:8080/ga_tracker";
    this.url = ("https:" == document.location.protocol ? "https://": "http://") + f + "/behavior.img?1=1";
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
            this.addParameter(new Parameter("attachedInfo", this.commonAttached.toTRACKERJSONString("attachedInfo")))
        }
    };
    var d = trackerGetCookie("newUserFlag");//新访客标识
    if (d) {
        this.addParameter(new Parameter("newUserFlag", d))
    }
    this.toUrl = function() {
        this.buildAttached();
        var a = "&bd={";
        for (var c = 0; c < this.parameterArray.length; c++) {
            var h = trackerSupportKey[this.parameterArray[c].key];
            var b = this.parameterArray[c].value;
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
function addPublicParameter(m, s) {//添加公共参数
    var q = window.location.href;
    m += "&w_url=" + encodeURIComponent(q);//当前页面URL
    m += "&s_iev=" + navigator.userAgent || "";//浏览器版本
    var t = "iPod|iTouch|iPhone";
    var p = /iPad/i;
    var l = "Android|BlackBerry|SymbianOS|SymbOS|Windows Phone OS|WAP|Kindle|pad|pod";
    
    var n = window.navigator.userAgent;
    var r = new RegExp(t, "i");
    var o = new RegExp(l, "i");
    if (r.test(n)) {
        m += "&s_plt=IOSSystem";//客户端系统
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
    m += "&s_rst=" + window.screen.width + "*" + window.screen.height;//客户端屏幕大小
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

function checkTpPage (a) {
    if (!a) {
        a = $("meta[name=tp_page]").attr("content");
        if (!a) {
            return null
        }
    }
    //var b = a.split(".");
    //return b.length == 2 ? b : null
    return a;
}
function getCurrPageInfo () {
    var a = checkTpPage();
    if (!a) {
        return null
    }
    //return {
    //    pageType: a[0],
    //    pageValue: a[1]
    //}
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
trackerSupportKey.clientType = "c_type";
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
trackerSupportKey.endUserId = "u_uid";
trackerSupportKey.firstLink = "w_flk";
trackerSupportKey.productId = "b_pid";//产品ID
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
trackerSupportKey.buttonPosition = "b_bp";//用户行为记录点
trackerSupportKey.adgroupKeywordID = "b_ak";
trackerSupportKey.extField = "b_ext";
trackerSupportKey.extField3 = "b_set";
trackerSupportKey.extField6 = "b_adt";
trackerSupportKey.extField7 = "b_pmi";
trackerSupportKey.extField8 = "b_tid";
trackerSupportKey.extField9 = "b_cid";
trackerSupportKey.extField10 = "s_and";
trackerSupportKey.pageTypeId = "w_pt";//页面类型
trackerSupportKey.unid = "w_un";
trackerSupportKey.pageValue = "w_pv";//页面ID
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
trackerSupportKey.newUserFlag = "b_nu";//新访客标识
trackerSupportKey.clientTime = "b_clt";//行为发生时间