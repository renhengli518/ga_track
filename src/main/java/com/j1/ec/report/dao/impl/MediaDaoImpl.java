package com.j1.ec.report.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.j1.ec.report.dao.MediaDao;
import com.j1.ec.report.entity.Media;

public class MediaDaoImpl extends SqlMapClientDaoSupport implements MediaDao {

	public List<Media> getAllMedia() {
		try {
			return getSqlMapClient().queryForList("ga-report-media.getAllMedia");
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

}
