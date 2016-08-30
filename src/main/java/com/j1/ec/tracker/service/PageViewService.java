package com.j1.ec.tracker.service;

import com.j1.ec.tracker.entity.PageView;

/**
 * 用户行为服务接口
 * 
 * @author 五味子
 * @version 2014/04/04
 */
public interface PageViewService {

	public Long savePageViewInfoToDB(PageView behaviorUser);
}
