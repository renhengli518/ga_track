package com.j1.ec.tracker.entity;

import java.io.Serializable;
import java.util.Date;

import com.j1.ec.tracker.util.ID;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * 用户行为参数实体类
 * 
 * @author 五味子
 * @version 2014/04/04
 */
@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = false)
public class PageView implements Serializable {

	private static final long serialVersionUID = -6840359962079020848L;
	private Long id;// 记录ID
	private String buttonPosition;//行为记录出发点名称
	private String  ip;//客户端ip地址
	private String  sessionId;//sessionid
	private String  productId;//产品ID
	private String  extField;//扩展字段
	private String  pageTypeId;//当前页面ID
	private String  pageValue;//当前页面值
	private String  endUserId;//当前页面用户
	private String  clientType;//客户端类型
	private Date  clientTime;//触发时间
	private String newUserFlag;//新用户访问标识
	private String userurgent;//用户浏览器版本

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

	public PageView () {
		super();
	}
	public PageView (String buttonPosition,String  ip,String  sessionId,String  productId,String 
			extField,String  pageTypeId,String  pageValue,String  endUserId,String  clientType,Date 
			clientTime,String  newUserFlag,String userurgent) {
		this.id = ID.getInstanse().getID(18);
		this.buttonPosition = buttonPosition;
		this.ip = ip;
		this.sessionId = sessionId;
		this.productId = productId;
		this.extField = extField;
		this.pageTypeId = pageTypeId;
		this.pageValue = pageValue;
		this.endUserId = endUserId;
		this.clientType = clientType;
		this.clientTime = clientTime;
		this.newUserFlag = newUserFlag;
		this.userurgent = userurgent;
	}
}
