package com.j1.ec.report.action;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.j1.ec.report.dto.MediaTypeReportDto;
import com.j1.ec.report.entity.Person;
import com.j1.ec.report.service.ReportService;

@Controller
public class ChartReportAction {

	@Autowired
	ReportService reportService;

	/** 日志实例 */
	private static final Logger logger = Logger.getLogger(ChartReportAction.class);

	@RequestMapping(value = "/chart/dailyReport/{reportDate}/{referDate}", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, List<MediaTypeReportDto>> dailyReport(@PathVariable("reportDate") String reportDate,
			@PathVariable("referDate") String referDate) throws Exception {
		// 参数校验
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		if (StringUtils.isEmpty(reportDate) || reportDate.equals("null")) {
			Date now = new Date();
			reportDate = df.format(now);
		}
		if (StringUtils.isEmpty(referDate) || referDate.equals("null")) {
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DATE, -7);
			referDate = df.format(calendar.getTime());
		}

		Map<String, List<MediaTypeReportDto>> result = new HashMap<String, List<MediaTypeReportDto>>();
		List<MediaTypeReportDto> reportData = reportService.getDailyMediaReportGroupByMediaType(reportDate,referDate);
		List<MediaTypeReportDto> referData = reportService.getDailyMediaReportGroupByMediaType(referDate,referDate);
		result.put("reportData", reportData);
		result.put("referData", referData);

		return result;
	}

	@RequestMapping(value = "/weeklyReport/{reportDate}/{referDate}", method = RequestMethod.GET)
	public @ResponseBody
	Person weeklyReport(@PathVariable("reportDate") String reportDate, @PathVariable("referDate") String referDate) {
		System.out.println(reportDate + "_" + referDate);
		Person person = new Person();
		person.setName("张三");
		person.setSex("男");
		person.setAge(30);
		person.setId(11);
		return person;
	}
}
