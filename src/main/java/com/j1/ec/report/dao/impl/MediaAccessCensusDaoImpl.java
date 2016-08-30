package com.j1.ec.report.dao.impl;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.j1.ec.report.dao.MediaAccessCensusDao;
import com.j1.ec.report.entity.MediaAccessCensus;

public class MediaAccessCensusDaoImpl extends SqlMapClientDaoSupport implements MediaAccessCensusDao {

	@Override
	public List<MediaAccessCensus> getMediaAccessCensus(String startdate,String endDate) throws Exception {
		try {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("date_start", DateUtils.parseDate(startdate, new String[] {"yyyy-MM-dd"}));
			map.put("date_end", DateUtils.parseDate(endDate, new String[] {"yyyy-MM-dd"}));
			return getSqlMapClient().queryForList("ec-ga-report.getMediaAccessCensus", map);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

}
