package com.j1.ec.report.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.j1.ec.report.dao.MediaAccessCensusDao;
import com.j1.ec.report.dto.MediaTypeReportDto;
import com.j1.ec.report.entity.MediaAccessCensus;
import com.j1.ec.report.service.ReportService;

public class ReportServiceImpl implements ReportService {

	private static Map<String, Integer> mediaTypeMap;
	private static Map<Integer, String> mediaTypeNameMap;

	static {
		mediaTypeMap = new HashMap<String, Integer>();
		mediaTypeMap.put("99999", 6);
		mediaTypeMap.put("1", 1);
		mediaTypeMap.put("2", 1);
		mediaTypeMap.put("3", 1);
		mediaTypeMap.put("4", 1);
		mediaTypeMap.put("5", 1);
		mediaTypeMap.put("6", 1);
		mediaTypeMap.put("7", 1);
		mediaTypeMap.put("8", 1);
		mediaTypeMap.put("10", 1);
		mediaTypeMap.put("11", 1);
		mediaTypeMap.put("13", 2);
		mediaTypeMap.put("14", 2);
		mediaTypeMap.put("15", 2);
		mediaTypeMap.put("16", 2);
		mediaTypeMap.put("17", 3);
		mediaTypeMap.put("18", 2);
		mediaTypeMap.put("23", 2);
		mediaTypeMap.put("450", 5);
		mediaTypeMap.put("500", 4);
		mediaTypeMap.put("501", 4);
		mediaTypeMap.put("502", 4);
		mediaTypeMap.put("503", 4);
		mediaTypeMap.put("504", 4);
		mediaTypeMap.put("505", 4);
		mediaTypeMap.put("90001", 0);
		mediaTypeMap.put("90002", 0);
		mediaTypeMap.put("90003", 0);
		mediaTypeMap.put("90004", 0);
		mediaTypeMap.put("90005", 0);
		mediaTypeMap.put("90006", 0);
		mediaTypeMap.put("90007", 0);
		mediaTypeMap.put("90008", 0);
		mediaTypeMap.put("90009", 0);
		mediaTypeMap.put("90010", 0);
		mediaTypeMap.put("0", 0);
		mediaTypeMap.put("90011", 0);

		mediaTypeNameMap = new HashMap<Integer, String>();
		mediaTypeNameMap.put(1, "网盟");
		mediaTypeNameMap.put(2, "直投");
		mediaTypeNameMap.put(3, "BD");
		mediaTypeNameMap.put(4, "SEM");
		mediaTypeNameMap.put(5, "SEO");
		mediaTypeNameMap.put(6, "直接访问");
		mediaTypeNameMap.put(7, "其他");
	}

	@Autowired
	private MediaAccessCensusDao mediaAccessCensusDao;

	public List<MediaAccessCensus> getDailyMediaReport(String startdate,String endDate) throws Exception {
		return mediaAccessCensusDao.getMediaAccessCensus(startdate,endDate);
	}

	public List<MediaTypeReportDto> getDailyMediaReportGroupByMediaType(String startdate,String endDate) throws Exception {
		List<MediaAccessCensus> mediaAccessCensuss = mediaAccessCensusDao.getMediaAccessCensus(startdate,endDate);

		List<MediaTypeReportDto> result = new ArrayList<MediaTypeReportDto>();
		Map<Integer, MediaTypeReportDto> logicMap = new HashMap<Integer, MediaTypeReportDto>();

		for (MediaAccessCensus mediaAccessCensus : mediaAccessCensuss) {
			String unionLv1 = mediaAccessCensus.getUnionLv1();
			// 去除总计数据
			if ("-1".equals(unionLv1)) {
				continue;
			}
			Integer mediaType = mediaTypeMap.get(unionLv1);
			// 取不到就是“其他”
			if (mediaType == null || mediaType == 0) {
				mediaType = 7;
			}
			MediaTypeReportDto reportDto = logicMap.get(mediaType);
			if (reportDto == null) {
				reportDto = new MediaTypeReportDto();
				String mediaTypeName = mediaTypeNameMap.get(mediaType);
				if (mediaTypeName == null) {
					mediaTypeName = "未知";
				}
				reportDto.setMediaTypeName(mediaTypeName);
				reportDto.setDate(mediaAccessCensus.getDate());
				logicMap.put(mediaType, reportDto);
			}
			reportDto.setPv(reportDto.getPv() + mediaAccessCensus.getPv());
			reportDto.setUv(reportDto.getUv() + mediaAccessCensus.getUv());
			reportDto.setOrderPv(reportDto.getOrderPv() + mediaAccessCensus.getOrderPv());
			reportDto.setSecondClickCount(reportDto.getSecondClickCount() + mediaAccessCensus.getSecondClickCount());
			reportDto.setAccessDepth(reportDto.getAccessDepth() + mediaAccessCensus.getAccessDepth());
		}
		Set<Map.Entry<Integer, MediaTypeReportDto>> entryseSet = logicMap.entrySet();
		for (Map.Entry<Integer, MediaTypeReportDto> entry : entryseSet) {
			result.add(entry.getValue());
		}
		return result;
	}
}
