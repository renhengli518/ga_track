package com.j1.ec.tracker.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.j1.ec.tracker.dao.PageViewDao;
import com.j1.ec.tracker.entity.PageView;
import com.j1.ec.tracker.service.PageViewService;

/**
 * 用户行为主表服务接口实现类
 * 
 * @author renhengli
 */
public class PageViewServiceImpl implements PageViewService {

	@Autowired
	private PageViewDao pageViewDao;

	public Long savePageViewInfoToDB(PageView pageView) {
		return this.pageViewDao.savePageView(pageView);
	}
	
	public List<PageView> getUserBehaviorBySessionId(String sessionId){
		return this.pageViewDao.getUserBehaviorBySessionId(sessionId);
	}
}
