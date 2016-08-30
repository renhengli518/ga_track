package com.j1.ec.tracker.dao.impl;

import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.j1.ec.tracker.dao.PageViewDao;
import com.j1.ec.tracker.entity.PageView;

/**
 * 用户行为dao接口实现类
 * 
 * @author 五味子
 * @version 2014/4/4
 */
public class PageViewDaoImpl extends SqlMapClientDaoSupport implements
		PageViewDao {

	protected static final Logger logger = Logger
			.getLogger(PageViewDaoImpl.class);

	/**
	 * 数据写入MySQL
	 * 
	 * @param behaviorUser
	 *            用户行为实体
	 * @return
	 */
	public Long savePageView(PageView behaviorUser) {
		try {
			return (Long) getSqlMapClient().insert("ec-ga.saveUBD",behaviorUser);
		} catch (SQLException e) {
			try {
				return (Long) getSqlMapClient().insert("ec-ga.saveUBD", behaviorUser);
			} catch (SQLException e1) {
				logger.error(e, e);
			}
		}
		return 0l;
	}
}