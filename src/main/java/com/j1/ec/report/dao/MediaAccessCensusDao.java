package com.j1.ec.report.dao;

import java.util.List;

import com.j1.ec.report.entity.MediaAccessCensus;

public interface MediaAccessCensusDao {
	List<MediaAccessCensus> getMediaAccessCensus(String startdate,String endDate) throws Exception;
}
