package com.j1.ec.tracker.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.j1.ec.tracker.dao.PageViewDao;
import com.j1.ec.tracker.entity.PageView;
import com.j1.ec.tracker.service.PageViewService;

/**
 * 用户行为主表服务接口实现类
 * 
 * @author 五味子
 * @version 2014/04/04
 */
public class PageViewServiceImpl implements PageViewService {

	@Autowired
	private PageViewDao pageViewDao;

	public Long savePageViewInfoToDB(PageView pageView) {
		return this.pageViewDao.savePageView(pageView);
	}
}
