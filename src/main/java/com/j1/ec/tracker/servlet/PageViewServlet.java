package com.j1.ec.tracker.servlet;

import java.net.URLDecoder;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.j1.ec.tracker.entity.PageView;
import com.j1.ec.tracker.service.PageViewService;
import com.j1.ec.tracker.util.PageViewUtil;

/**
 * 网站用户行为数据收集action类
 * 
 * @author 五味子
 * @version 2014/4/4
 */
public class PageViewServlet extends HttpServlet {

	private static final long serialVersionUID = 1405586932831167454L;

	private PageViewService pageViewService;

	/**
	 * 获取前端JS参数，并传入数据库
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		/**
		 * 获取封装参数
		 */
		Map<String, String> parameterMap = new HashMap<String, String>();
		Enumeration<String> params = request.getParameterNames();
		try {
			while (params.hasMoreElements()) {
				String paramName = params.nextElement();
				parameterMap.put(paramName, URLDecoder.decode(request.getParameter(paramName), "utf-8"));
//				System.out.println(paramName + ":" + URLDecoder.decode(request.getParameter(paramName), "utf-8"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String userurgent = parameterMap.get("s_iev");// 浏览器版本
		String sessionId = request.getSession().getId();
		String ip = PageViewUtil.getIpAddr(request);// IP地址
		ip = PageViewUtil.getStringInLength(ip, 32);
		String bd_str = parameterMap.get("bd");// 行为记录参数
		Map<String, String> bd_map = new HashMap<String, String>();
		if (bd_str != null && !"".equals(bd_str)) {
			bd_str = bd_str.substring(1, bd_str.length() - 1);
			String str_array[] = bd_str.split("\\|");
			for (String temp_str : str_array) {
				bd_map.put(temp_str.split("\\=")[0], temp_str.split("=")[1]);
			}
		}
		String buttonPosition = bd_map.get("b_bp");
		String productId = bd_map.get("b_pid");
		String extField = bd_map.get("b_ext");
		String pageTypeId = bd_map.get("w_pt");
		String pageValue = bd_map.get("w_pv");
		String endUserId = bd_map.get("u_uid");
		String clientType = bd_map.get("c_type");
		Date clientTime = new Date(Long.parseLong(bd_map.get("b_clt")));
		String newUserFlag = bd_map.get("b_nu");

		/**
		 * 添加记录，写入MySQL
		 */
		PageView behaviorUser = new PageView(buttonPosition, ip, sessionId,
				productId, extField, pageTypeId, pageValue, endUserId,
				clientType, clientTime, newUserFlag, userurgent);
		this.pageViewService.savePageViewInfoToDB(behaviorUser);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		doGet(request, response);
	}

	@Override
	public void init() throws ServletException {
		super.init();
		ServletContext servletContext = this.getServletContext();
		WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
		pageViewService = (PageViewService) ctx.getBean("pageViewService");
	}
}