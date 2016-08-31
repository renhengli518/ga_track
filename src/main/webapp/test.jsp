<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.text.*"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	Calendar calendar = Calendar.getInstance();
	calendar.add(Calendar.DATE, -1);
	String todayStr = df.format(calendar.getTime());
	calendar.add(Calendar.DATE, -7);
	String lastWeekTodayStr = df.format(calendar.getTime());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>资本报表系统</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="uikit-2.3.1/css/uikit.gradient.min.css">
<link rel="stylesheet" type="text/css" href="uikit-2.3.1/css/addons/uikit.addons.min.css">
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="uikit-2.3.1/js/uikit.min.js"></script>
<script type="text/javascript" src="uikit-2.3.1/js/addons/notify.min.js"></script>
<script type="text/javascript" src="js/sammy-latest.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<!-- 图表JS -->
<script src="./js/echarts/esl.js" type="text/javascript"></script>
<script src="./js/echarts/bootstrap.min.js"></script>
<!-- 业务JS -->
<script type="text/javascript" src="js/ga/ga_report.js"></script>


<script type="text/javascript">
	var urlPrefix = {ga: "http://192.168.1.96:7777"};
</script> 
</head>
<body>
	<input type="hidden" id="reportType" value="dailyReport"/>
	<input type="hidden" id="dataType" value="chart"/>
	<div style="width: 800px; margin-top: 10px; margin-left: auto; margin-right: auto; text-align: center;">
		<h2>网站流量报表</h2>
	</div>
	<div style="width: 900px; margin-left: auto; margin-right: auto;">
		<nav class="uk-navbar">
		<ul class="uk-navbar-nav">
			<li class="uk-active"><a href="#dailyReport">日报表</a></li>
			<!-- 			<li class="uk-parent"><a href="#weeklyReport">周报表</a></li> -->
		</ul>
		</nav>
		<ul class="uk-subnav uk-subnav-pill">
			<li><a href="#changeDataType/chart">图表</a></li>
			<li><a href="#changeDataType/orgData">原始数据</a></li>
			<li><a target="_blank" href="index.jsp">test</a></li>
		</ul>
	</div>
	<div id="inputUI">
		<hr style="width: 900px; margin-left: auto; margin-right: auto;">
		<fieldset class="uk-form" style="width: 880px; margin-left: auto; margin-right: auto;">
			<div class="uk-form-icon">
				<label class="uk-form-label" for="txt_reportDate">报表日期</label>
				<div class="uk-form-icon">
					<i class="uk-icon-calendar"></i><input id="txt_reportDate" type="text" value="<%=todayStr%>"
						onFocus="WdatePicker({isShowClear:false,readOnly:true,maxDate:'%y-%M-%d'})" />
				</div>
			</div>
			<div class="uk-form-icon">
				<label class="uk-form-label" for="txt_referDate">对比日期</label>
				<div class="uk-form-icon">
					<i class="uk-icon-calendar"></i><input id="txt_referDate" type="text" value="<%=todayStr%>"
						onFocus="WdatePicker({isShowClear:false,readOnly:true,maxDate:'%y-%M-%d'})" />
				</div>
			</div>
			<div class="uk-form-icon">
				<button class="uk-button uk-button-primary uk-button-large" id="reportRefresh" onclick="reportRefresh()">刷新</button>
			</div>
		</fieldset>
	</div>
	<div id="reportUI_chart">
		<div style="height: 400px; width: 1200px; margin-left: auto; margin-right: auto;">
			<div id="main"
				style="width: 45%; height: 400px; float: left; margin-right: 0px; padding-right: 0px; border-right-width: 0px; background-color: transparent; cursor: default;"></div>
			<div id="main2"
				style="width: 50%; height: 400px; margin-left: 0px; padding-left: 0px; border-left-width: 0px; background-color: transparent; cursor: default;"></div>
		</div>
	</div>
	<div id="reportUI_orgData" style="width: 1200px; margin-left: auto; margin-right: auto;">
	</div>
</body>
</html>
