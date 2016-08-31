package com.j1.ec.tracker.dao;

import java.util.List;

import com.j1.ec.tracker.entity.PageView;

/**
 * 用户行为dao接口
 * 
 * @author renhengli
 */
public interface PageViewDao {

	public Long savePageView(PageView behaviorUser);

	public List<PageView> getUserBehaviorBySessionId(String sessionId);
}
