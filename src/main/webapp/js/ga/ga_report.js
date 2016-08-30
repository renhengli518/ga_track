var echarts;
var developMode = false;
if (developMode) {
	// for develop
	require.config({
		packages : [ {
			name : 'echarts',
			location : './js/echarts/src',
			main : 'echarts'
		}, {
			name : 'zrender',
			// location: 'http://ecomfe.github.io/zrender/src',
			location : './js/echarts/zrender',
			main : 'zrender'
		} ]
	});
} else {
	// for echarts online home page
	var fileLocation = './js/echarts/echarts';
	require.config({
		paths : {
			echarts : fileLocation,
			'echarts/chart/line' : fileLocation,
			'echarts/chart/bar' : fileLocation,
			'echarts/chart/scatter' : fileLocation,
			'echarts/chart/k' : fileLocation,
			'echarts/chart/pie' : fileLocation,
			'echarts/chart/radar' : fileLocation,
			'echarts/chart/map' : fileLocation,
			'echarts/chart/chord' : fileLocation,
			'echarts/chart/force' : fileLocation,
			'echarts/chart/gauge' : fileLocation,
			'echarts/chart/funnel' : fileLocation
		}
	});
}

// 按需加载
require([ 'echarts'// ,
// 'echarts/chart/line',
// 'echarts/chart/bar',
// 'echarts/chart/scatter',
// 'echarts/chart/k',
// 'echarts/chart/radar',
// 'echarts/chart/force',
// 'echarts/chart/chord',
// 'echarts/chart/gauge',
// 'echarts/chart/funnel',
// 'echarts/chart/pie'
], requireCallback);
var mediaTypeCountPieChart;
var mediaTypeOrderCountBarChart;
function requireCallback(ec) {
	echarts = ec;
	app.run();
}

option = {
	title : {
		text : '外部流量汇总',
		subtext : '健一网',
		x : 'center'
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	legend : {
		orient : 'vertical',
		x : 'left',
		data : []
	},
	calculable : true
};

option2 = {
	title : {
		text : '外部流量订单数',
		subtext : '健一网',
		x : 'center'
	},
	legend : {
		orient : 'vertical',
		x : 'left',
		data : [ "单量", "流量PV", "对比单量", "对比流量PV" ]
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			type : 'shadow'
		}
	},
	calculable : true,
	xAxis : [ {
		type : 'category',
		data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
	} ],
	yAxis : [ {
		type : 'value',
		name : '单量',
		max : 10000,
		splitArea : {
			show : true
		}
	}, {
		type : 'value',
		name : '流量PV'
	} ],
	grid : {
		x : 150,
		x2 : 50
	}
};

setTimeout(function() {
	window.onresize = function() {
		mediaTypeCountPieChart.resize();
		mediaTypeOrderCountBarChart.resize();
	};
}, 200);

function showReport(reportName) {
	$("div[id^=reportUI_]").hide();
	$("#reportUI_" + reportName).show();
}

// ;(function($) {
var app = $.sammy(function() {
	this.get('#:reportType/:reportDate/:referDate/:dataType', routePath);
	this.get('#changeDataType/:dataType', routePath);
	this.get('', routePath);
});
// })(jQuery);

function routePath() {
	var reportType = this.params.reportType;
	var reportDate = this.params.reportDate;
	var referDate = this.params.referDate;
	var dataType = this.params.dataType;

	if (reportType == undefined) {
		reportType = $("#reportType").val();
	}
	if (reportDate == undefined) {
		reportDate = $("#txt_reportDate").val();
	}
	if (referDate == undefined) {
		referDate = $("#txt_referDate").val();
	}
	if (dataType == undefined) {
		dataType = $("#dataType").val();
	}
	$("#reportType").attr("value", reportType);
	$("#txt_reportDate").attr("value", reportDate);
	$("#txt_referDate").attr("value", referDate);
	$("#dataType").attr("value", dataType);

	$("div[id^=reportUI_]").hide();
	$("#reportUI_" + dataType).show();
	if (dataType == "chart") {
		loadChartData(reportType, reportDate, referDate, dataType);
	}
	if (dataType == "orgData") {
		loadOrgData(reportType, reportDate, referDate, dataType);
	}
}

function loadOrgData(reportType, reportDate, referDate, dataType) {
	$.ajax({
		url : urlPrefix.ga + "/mvc/" + dataType + "/" + reportType + '/' + reportDate + '/' + referDate,
		type : 'GET',
		dataType : 'html'
	}).done(function(data, status, xhr) {
		$("#reportUI_orgData").html(data);
	});
}
function loadChartData(reportType, reportDate, referDate, dataType) {
	$.ajax({
		url : urlPrefix.ga + "/mvc/" + dataType + "/" + reportType + '/' + reportDate + '/' + referDate,
		type : 'GET',
		dataType : 'json'
	}).done(function(data, status, xhr) {
		var pieSeries = [ {
			name : '访问来源',
			type : 'pie',
			radius : '55%',
			center : [ '50%', 225 ],
			data : []
		} ];
		var barSeries = [];
		var mediaTypeNames = [];

		var reportData = data["reportData"];
		var referData = data["referData"];

		var barData = {
			name : "单量",
			type : 'bar',
			data : []
		};
		var barData2 = {
			name : '流量PV',
			type : 'line',
			yAxisIndex : 1,
			data : []
		};
		var barReferData = {
			name : "对比单量",
			type : 'bar',
			data : []
		};
		var barReferData2 = {
			name : '对比流量PV',
			type : 'line',
			yAxisIndex : 1,
			data : []
		};
		for (var i = 0; i < reportData.length; i++) {
			var mediaTypeName = reportData[i].mediaTypeName;
			mediaTypeNames.push(mediaTypeName);
			var pieData = 0;

			pieData = reportData[i].pv;
			barData.data.push(reportData[i].orderPv);
			barData2.data.push(reportData[i].pv);
			pieSeries[0].data.push({
				name : mediaTypeName,
				value : pieData
			});
		}
		barSeries.push(barData);
		barSeries.push(barData2);
		for (var i = 0; i < referData.length; i++) {
			barReferData.data.push(referData[i].orderPv);
			barReferData2.data.push(referData[i].pv);
		}
		barSeries.push(barReferData);
		barSeries.push(barReferData2);

		option.legend.data = mediaTypeNames;
		option2.xAxis[0].data = mediaTypeNames;

		mediaTypeCountPieChart = echarts.init(document.getElementById('main'));
		mediaTypeCountPieChart.setOption(option);
		mediaTypeCountPieChart.setSeries(pieSeries);
		mediaTypeOrderCountBarChart = echarts.init(document.getElementById('main2'));
		mediaTypeOrderCountBarChart.setOption(option2);
		mediaTypeOrderCountBarChart.setSeries(barSeries);

		mediaTypeCountPieChart.connect(mediaTypeOrderCountBarChart);
		mediaTypeOrderCountBarChart.connect(mediaTypeCountPieChart);
	}).fail(function(xhr, status, error) {
		$.UIkit.notify("请求失败！", {
			status : 'danger',
			timeout : 2000
		});
	});
}

function reportRefresh() {
	app.runRoute("get", "#" + $("#reportType").val() + "/" + $("#txt_reportDate").val() + "/"
			+ $("#txt_referDate").val() + "/" + $("#dataType").val());
}