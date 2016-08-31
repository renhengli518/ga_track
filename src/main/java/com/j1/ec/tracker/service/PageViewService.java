package com.j1.ec.tracker.service;

import java.util.List;

import com.j1.ec.tracker.entity.PageView;

/**
 * 用户行为服务接口
 * @author renhengli
 */
public interface PageViewService {

	public Long savePageViewInfoToDB(PageView behaviorUser);
	
	public List<PageView> getUserBehaviorBySessionId(String sessionId);
}
