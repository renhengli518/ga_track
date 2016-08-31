package com.j1.ec.tracker.entity;

import java.io.Serializable;
import java.util.Date;

import com.j1.ec.tracker.util.ID;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = false)
public class PageView implements Serializable {

	private static final long serialVersionUID = -6840359962079020848L;
	private Long id;// 记录ID
	private String buttonPosition;// 行为记录出发点名称（input type=button）
	private String linkPosition;//行为记录出发点名称（a标签）
	private String viewType;//"pageView","buttonClick","a_link"
	private String ip;// 客户端ip地址
	private String sessionId;// sessionid
	private String endUserId;// 当前页面用户
	private Date clientTime;// 触发时间
	private String newUserFlag;// 新用户访问标识
	private String userurgent;// 用户浏览器版本
	private String pageUrl;// 访问页面地址
	private String country;// 用户所在国家
	private String province;// 用户所在省份
	private String city;// 用户所在城市
	private String stayTime;// 浏览页面时间（00:01:42）
	private Long stayTimeMilSeconds;// 浏览页面毫秒数
	private String pageTitle;// 当前页面title
	private String refferPage;// 网页来源地址
	private String clientSystem;// 客户端系统
	private String clientResolution;// 客户端分辨率
	private String clientPageType;// 客户端页面类型
	private String fromWhere;//百度搜索，谷歌搜索，搜狗搜索，雅虎搜索，直接访问，外链
	private String serachKeyWords;//搜索关键字

	/**
	 * 构造方法
	 * 
	 * @param sessionId
	 * @param uuid
	 * @param memberId
	 * @param refPage
	 * @param firstPage
	 * @param initTime
	 * @param orderId
	 * @param currentTime
	 * @param currentPage
	 * @param isNewVisit
	 */

	public PageView() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param buttonPosition
	 * @param ip
	 * @param sessionId
	 * @param endUserId
	 * @param clientTime
	 * @param newUserFlag
	 * @param userurgent
	 * @param pageUrl
	 * @param country
	 * @param province
	 * @param city
	 * @param stayTime
	 * @param stayTimeMilSeconds
	 * @param pageTitle
	 * @param refferPage
	 */
	public PageView(String buttonPosition, String linkPosition, String viewType, String ip, String sessionId, String endUserId, Date clientTime,
			String newUserFlag, String userurgent, String pageUrl, String country, String province, String city,
			String stayTime, Long stayTimeMilSeconds, String pageTitle, String refferPage, String clientSystem,
			String clientResolution, String clientPageType, String fromWhere, String serachKeyWords) {
		super();
		this.id = ID.getInstanse().getID(18);
		this.buttonPosition = buttonPosition;
		this.linkPosition = linkPosition;
		this.viewType = viewType;
		this.ip = ip;
		this.sessionId = sessionId;
		this.endUserId = endUserId;
		this.clientTime = clientTime;
		this.newUserFlag = newUserFlag;
		this.userurgent = userurgent;
		this.pageUrl = pageUrl;
		this.country = country;
		this.province = province;
		this.city = city;
		this.stayTime = stayTime;
		this.stayTimeMilSeconds = stayTimeMilSeconds;
		this.pageTitle = pageTitle;
		this.refferPage = refferPage;
		this.clientSystem = clientSystem;
		this.clientResolution = clientResolution;
		this.clientPageType = clientPageType;
		this.fromWhere = fromWhere;
		this.serachKeyWords = serachKeyWords;
	}

}
