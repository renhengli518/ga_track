package com.j1.ec.report.service;

import java.util.List;

import com.j1.ec.report.dto.MediaTypeReportDto;
import com.j1.ec.report.entity.MediaAccessCensus;

public interface ReportService {
	List<MediaAccessCensus> getDailyMediaReport(String startdate,String endDate) throws Exception;
	
	List<MediaTypeReportDto> getDailyMediaReportGroupByMediaType(String startdate,String endDate) throws Exception;
	
	List<MediaTypeReportDto> getMediaAccessCensusByTime(String date);
}
