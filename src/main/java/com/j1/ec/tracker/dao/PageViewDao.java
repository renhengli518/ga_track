package com.j1.ec.tracker.dao;

import com.j1.ec.tracker.entity.PageView;

/**
 * 用户行为dao接口
 * 
 * @author 五味子
 * @version 2014/4/4
 */
public interface PageViewDao {

	public Long savePageView(PageView behaviorUser);
}
