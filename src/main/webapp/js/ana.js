/**
 * 切割url中的参数
 * 
 * @param url
 * @param paramName
 * @returns {String}
 */
var splitParam = function(url, paramName) {
	var paramValue = '';
	if (null != url && url.indexOf(paramName) > 0) {
		var param = url.substring(url.indexOf("#"), url.length);
		paramValue = param.substring(param.indexOf(paramName + "=")
				+ paramName.length + 1, param.length);
	}
	return paramValue;
};

/**
 * 生成随机数,以防缓存
 */
var generateMixed = function(n) {
	var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
			'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
			'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
	var res = "";
	for ( var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
};

/**
 * startWith
 * 
 * @param str
 * @returns
 */
String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};

/**
 * uuid生成器
 */
// Private array of chars to use
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		.split('');

Math.uuidFast = function() {
	var chars = CHARS, uuid = new Array(36), rnd = 0, r;
	for ( var i = 0; i < 36; i++) {
		if (i == 8 || i == 13 || i == 18 || i == 23) {
			uuid[i] = '-';
		} else if (i == 14) {
			uuid[i] = '4';
		} else {
			if (rnd <= 0x02)
				rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
			r = rnd & 0xf;
			rnd = rnd >> 4;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('');
};

/**
 * 修改以前的Bug上线后一个月可以删掉
 * 
 * 
 * 判断是否有两个相同的Cookie,如果有两个则当前域的设置为过期
 */
function repairCookie() {

	var cookies = document.cookie;
	var cookieArray = cookies.split("; ");

	// UUID的数量
	var uuidNum = 0;
	// sessionId数量
	var sessionIdNum = 0;
	for ( var i = 0; i < cookieArray.length; i++) {
		var ck = cookieArray[i].split("=");
		if (ck[0] == '_utmb') {
			uuidNum++;
		} else if (ck[0] == 'sessionId') {
			sessionIdNum++;
		}
	}

	if (uuidNum >= 2) {
		delTrackerCookie("_utmb");
	}
	if (sessionIdNum >= 2) {
		delTrackerCookie("sessionId");
	}
}

// 删除cookie
function delTrackerCookie(name) {
	document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}

// 获取指定名称的cookie的值
function getTrackerCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for ( var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName)
			return unescape(temp[1]);
	}
	return "";
}

// 添加Cookie
function addTrackerCookie(objName, objValue, exp, path, domain) { // 添加cookie
	var str = objName + "=" + escape(objValue);

	// 设置path
	if (typeof (path) == 'string' && path) { // 为时不设定过期时间，浏览器关闭时cookie自动消失
		str += "; path=" + path;
	}

	// 设置domain
	if (typeof (domain) == 'string' && domain) { // 为时不设定过期时间，浏览器关闭时cookie自动消失
		str += "; domain=" + domain;
	}

	// 设置exp
	if (typeof (exp) == 'object' && exp) { // 为时不设定过期时间，浏览器关闭时cookie自动消失
		str += "; expires=" + exp.toGMTString();
	}
	document.cookie = str;
}

/**
 * 检查提交订单是否是第一次提交 如果是第一次提交则收集 以后的订单则不收集
 */
function isFirstCommitOrder(refer) {
	if (refer && refer.indexOf('myec/confirm') >= 0) {
		return true;
	}
	return false;
}

/**
 * 是否是第一次注册
 * 
 * @param refer
 * @returns {Boolean}
 */
function isFirstReister(refer) {
	if (refer) {
		return true;
	}
	return false;
}

/**
 * 主方法
 */
var trackerMethod = function() {

	var senMsg = function sendMsg() {
		// 来源页
		var _ref = document.referrer || '';
		_ref = encodeURIComponent(_ref);

		var _currentURL = "";

		try {
			if (typeof this.href === "undefined") {
				_currentURL = document.location.toString().toLowerCase();
			} else {
				_currentURL = this.href.toString().toLowerCase();
			}
		} catch (e) {
		}

		// 购物车数据收集 ---------------------start
		var _shopCartList = window['_shopCartItem'] || [];
		var _shopItem = "";

		if (_shopCartList.length > 0) {
			for ( var i = 0; i < _shopCartList.length; i++) {
				var _item = "";
				_item += _shopCartList[i].goodsId + "_";
				_shopItem += _item;
			}
		}
		// 购物车数据收集 ---------------------end

		// 添加购物车事件数据收集 ---------------------start
		var _addshopCatrt = '';
		var _shopCartAdd = window['_shopCartAddItem'] || {};
		if (_shopCartAdd.goodsId && _shopCartAdd.unitPrice
				&& _shopCartAdd.orderAmount) {
			_addshopCatrt = _shopCartAdd.goodsId + "_";
		}
		// 添加购物车事件数据收集 ---------------------end

		// 购物车数据确认 ---------------------start
		var _shopConfirmList = window['_shopCartConfirm'] || [];
		var _shopConfirmItem = "";

		if (_shopConfirmList.length > 0) {
			for ( var i = 0; i < _shopConfirmList.length; i++) {
				var _confirmItem = "";
				_confirmItem += _shopConfirmList[i].goodsId + "_";
				_shopConfirmItem += _confirmItem;
			}
		}
		// 购物车数据确认 ---------------------end

		// 订单数据收集------------------ Start
		// 订单ID
		var _orderId = window['_oid'] || '';
		// 订单金额
		var _orderSales = window['_oidPrice'] || '';

		// 订单数据收集------------------ End

		// 标记是否是新会员
		var _newMember = window['_newMember'] || '';
		if (_newMember && !isFirstReister(_ref)) {
			_newMember = '';
		}

		// -- sessionID start --//
		// -- sessionId start --//
		var uuidExp = new Date();
		uuidExp.setTime(uuidExp.getTime() + 365 * 24 * 60 * 60 * 1000);

		// ------UUID//
		// 用来检测该域名下uuid以及sessionId的个数
		// repairCookie();
		var _sessionId = getTrackerCookie('sessionId');

		try {
			if (!_sessionId) {
				_sessionId = Math.uuidFast();
				// $.cookie('sessionId',
				// _sessionId,{path:"/",domain:".j1.com"});
				addTrackerCookie('sessionId', _sessionId, null, "/", ".j1.com");
				// addTrackerCookie('sessionId', _sessionId, null, "/");
			}
		} catch (e) {
		}
		// -- END --//
		// 系统平台
		var _platform = navigator.platform || '';
		// 浏览器
		var _browser = navigator.appVersion || '';

		var height = window.screen.height || '';

		var width = window.screen.width || '';
		// 分辨率
		var _rst = width + '*' + height;

		// 会员ID
		var _memberId = window['_uid'] || '';

		// 记录登陆状态
		var _uuidMdKey = getTrackerCookie('uuidMdKey');

		// 新老访客标识
		var _is_new_visit = '0';
		var _utmb = getTrackerCookie('_utmb');
		if (!_utmb) {
			_is_new_visit = '1';
			_utmb = Math.uuidFast();
			// $.cookie('_utmb', _utmb,
			// {expires:365,path:"/",domain:".j1.com"});
			addTrackerCookie('_utmb', _utmb, uuidExp, "/", ".j1.com");
			// addTrackerCookie('_utmb', _utmb, uuidExp, "/");
		}
		// ---------END-----------------//

		var _position = '';
		try {

			if (_currentURL.indexOf('#position') > 0) {
				_position = splitParam(_currentURL, '#position');
			}
			_currentURL = encodeURIComponent(_currentURL);
		} catch (e) {
		}
		// 随机数
		var _random = generateMixed(6);

		var img = new Image();

		if (!_sessionId) {
			_sessionId = Math.uuidFast();
		}

		// 为了修复currentUrl为null的情况,导致订单丢失
		if (_orderId && !_currentURL) {
			_currentURL = encodeURIComponent('http://www.j1.com/myec/commit-0.html');
		}

		img.src = "http://ga.j1.com/behavior.img?_uuid=" + _utmb
				+ "&_memberId=" + _memberId + "&_orderId=" + _orderId
				+ "&_ref=" + _ref + "&_currentURL=" + _currentURL
				+ "&_is_new_visit=" + _is_new_visit + "&_platform=" + _platform
				+ "&_browser=" + _browser + "&_rst=" + _rst + "&_sessionId="
				+ _sessionId + "&_position=" + _position + "&_uuidMdKey="
				+ _uuidMdKey + "&_shopCart=" + _shopItem + "&_shopCartConfirm="
				+ _shopConfirmItem + "&_orderSales=" + _orderSales
				+ "&_newMember=" + _newMember + "&_addshopCatrt="
				+ _addshopCatrt + "&" + _random;
		// img.src =
		// "http://172.31.90.75:8080/ec_ga_tracker/behavior.img?_uuid=" + _utmb
		// + "&_memberId=" + _memberId + "&_orderId=" + _orderId + "&_ref="
		// + _ref + "&_currentURL=" + _currentURL + "&_is_new_visit="
		// + _is_new_visit + "&_platform=" + _platform + "&_browser="
		// + _browser + "&_rst=" + _rst + "&_sessionId=" + _sessionId
		// + "&_position=" + _position + "&_uuidMdKey=" + _uuidMdKey
		// + "&_shopCart=" + _shopItem + "&_shopCartConfirm="
		// + _shopConfirmItem + "&_orderSales=" + _orderSales + "&_newMember="
		// + _newMember + "&_addshopCatrt=" + _addshopCatrt + "&" + _random;
	};
	return senMsg;
};
trackerMethod()();
