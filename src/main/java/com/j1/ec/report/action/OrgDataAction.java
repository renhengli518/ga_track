package com.j1.ec.report.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.j1.ec.report.dto.MediaAccessCensusDto;
import com.j1.ec.report.entity.MediaAccessCensus;
import com.j1.ec.report.service.ReportService;

@Controller
@RequestMapping("/orgData")
public class OrgDataAction {
	
	@Autowired
	ReportService reportService;
	
	
	private static Map<String, String> mediaTypeMap;
	static {
		mediaTypeMap = new HashMap<String, String>();
		mediaTypeMap.put("0", "未知来源渠道");
		mediaTypeMap.put("1", "亿起发");
		mediaTypeMap.put("2", "成果网");
		mediaTypeMap.put("3", "领克特");
		mediaTypeMap.put("4", "51返利");
		mediaTypeMap.put("5", "51比购");
		mediaTypeMap.put("6", "多麦");
		mediaTypeMap.put("7", "唯一");
		mediaTypeMap.put("8", "360购物");
		mediaTypeMap.put("10", "什么值得买");
		mediaTypeMap.put("11", "天上掉馅饼");
		mediaTypeMap.put("13", "2345");
		mediaTypeMap.put("14", "1616");
		mediaTypeMap.put("15", "114la");
		mediaTypeMap.put("16", "Vizury");
		mediaTypeMap.put("17", "平安付");
		mediaTypeMap.put("18", "寻医问药");
		mediaTypeMap.put("23", "MediaV");
		mediaTypeMap.put("500", "baidu SEO");
		mediaTypeMap.put("450", "baidu SEM");
		mediaTypeMap.put("501", "sogou");
		mediaTypeMap.put("502", "google");
		mediaTypeMap.put("503", "360");
		mediaTypeMap.put("504", "BING");
		mediaTypeMap.put("505", "互动百科");
		mediaTypeMap.put("90001", "一淘");
		mediaTypeMap.put("90002", "okpush");
		mediaTypeMap.put("90003", "极效营销平台17glink.com");
		mediaTypeMap.put("90004", "搜狐TV");
		mediaTypeMap.put("90005", "医卡通");
		mediaTypeMap.put("90006", "乐视网");
		mediaTypeMap.put("90007", "平安健康商圈");
		mediaTypeMap.put("90008", "杜蕾斯官网(durex.com.cn)");
		mediaTypeMap.put("90009", "宝宝树");
		mediaTypeMap.put("90010", "妈妈网");
		mediaTypeMap.put("90011", "赚客吧");
		mediaTypeMap.put("99999", "直接访问");
		mediaTypeMap.put("-1", "总计");
	}

	private static final Logger logger = Logger.getLogger(OrgDataAction.class);
	@RequestMapping(value = "/dailyReport/{reportDate}/{referDate}", method = RequestMethod.GET)
	public ModelAndView dailyReport(@PathVariable("reportDate") String reportDate,
			@PathVariable("referDate") String referDate) throws Exception {
		ModelAndView mv = new ModelAndView("orgData");
		List<MediaAccessCensus> orgDatas = reportService.getDailyMediaReport(reportDate,referDate);
		
		List<MediaAccessCensusDto> results = new ArrayList<MediaAccessCensusDto>();
		for (MediaAccessCensus data : orgDatas) {
			MediaAccessCensusDto dto = new MediaAccessCensusDto();
			String mediaName = mediaTypeMap.get(data.getUnionLv1());
			if (StringUtils.isEmpty(mediaName)) {
				mediaName = "未知_" + dto.getUnionLv1();
			}
			dto.setMediaName(mediaName);
			BeanUtils.copyProperties(dto, data);
			results.add(dto);
		}
		mv.addObject("orgDatas", results);
		return mv;
	}
}
