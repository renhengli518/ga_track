package com.j1.ec.tracker.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.j1.ec.tracker.dao.impl.PageViewDaoImpl;

public class PageViewUtil {
	protected static final Logger logger = Logger
			.getLogger(PageViewDaoImpl.class);

	/**
	 * 获取客户端ip
	 * 
	 * @param request
	 * @return 思路： request.getRemoteAddr()这种方法在大部分情况下都是有效的。但是在通过了Apache,
	 *         Squid等反向代理软件就不能获取到客户端的真实IP地址了。
	 *         如果使用了反向代理软件，将http://192.168.1.110:2046/
	 *         的URL反向代理为http://www.xxx.com/
	 *         的URL时，用request.getRemoteAddr()方法获取的IP地址是
	 *         ：127.0.0.1　或　192.168.1.110，而并不是客户端的真实ＩＰ。
	 *         经过代理以后，由于在客户端和服务之间增加了中间层，
	 *         因此服务器无法直接拿到客户端的IP，服务器端应用也无法直接通过转发请求的地址返回给客户端
	 *         。但是在转发请求的HTTP头信息中，增加了X
	 *         －FORWARDED－FOR信息用以跟踪原有的客户端IP地址和原来客户端请求的服务器地址。
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	public static String getIp2(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)) {
			// 多次反向代理后会有多个ip值，第一个ip才是真实ip
			int index = ip.indexOf(",");
			if (index != -1) {
				return ip.substring(0, index);
			} else {
				return ip;
			}
		}
		ip = request.getHeader("X-Real-IP");
		if (StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)) {
			return ip;
		}
		return request.getRemoteAddr();
	}

	/**
	 * url取参数
	 */
	public static String getStringInLength(String orgStr, int length) {
		if (null != orgStr && !"".equals(orgStr) && orgStr.length() > length) {
			return orgStr.substring(0, length);
		} else {
			return orgStr;
		}

	}

	/**
	 * url取参数
	 */
	public static String getParam(String page, String paramName) {

		String paramValue = "";
		try {
			if (null != page && page.contains(paramName)) {
				String param = page.substring(page.indexOf("?"), page.length());
				String[] strs = param.split("&");
				for (int i = 0; i < strs.length; i++) {
					if (strs[i].contains(paramName)) {
						paramValue = strs[i].substring(
								strs[i].indexOf(paramName + "=")
										+ paramName.length() + 1,
								strs[i].length());
					}
				}
			}
		} catch (Exception e) {
			logger.error("page:" + page);
			logger.error(e);
		}
		return paramValue;
	}

	/**
	 * cookie参数取值
	 */
	public static String splitParam(String page, String paramName) {

		String paramValue = "";
		try {
			if (null != page && page.contains(paramName)) {
				String[] strs = page.split("&");
				for (int i = 0; i < strs.length; i++) {
					if (strs[i].contains(paramName)) {
						paramValue = strs[i].substring(
								strs[i].indexOf(paramName + "=")
										+ paramName.length() + 1,
								strs[i].length());
					}
				}
			}
		} catch (Exception e) {
			logger.error("page:" + page);
			logger.error(e);
		}
		return paramValue;
	}

	/**
	 * 后台生成的cookie，后台取
	 * 
	 * @return
	 */
	public static String getCookie(Cookie[] cookies, String cookieName) {
		String cpsCookie = "";
		if (null != cookies) {
			for (int j = 0; j < cookies.length; j++) {
				if (cookies[j].getName().equals(cookieName)) {// CPS
					cpsCookie = cookies[j].getValue();
					break;
				}
			}
		}
		return cpsCookie;
	}
}
