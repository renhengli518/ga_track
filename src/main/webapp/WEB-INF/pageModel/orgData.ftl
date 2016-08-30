<table class="uk-table uk-table-hover uk-table-striped">
	<caption>...</caption>
	<thead>
		<tr>
			<th>渠道名称</th>
			<th>渠道号</th>
			<th>日期</th>
			<th>流量（PV）</th>
			<th>流量（UV）</th>
			<th>单量</th>
			<th>转换率</th>
			<th>未跳出UV</th>
			<th>平均访问深度</th>
			<th>跳出率</th>
		</tr>
	</thead>
	<tbody>
		<#list orgDatas as data>
			<#if data.unionLv1=="-1">
			<tr>
				<td>${data.mediaName}</td>
				<td>${data.unionLv1}</td>
				<td>${data.date}</td>
				<td>${data.pv}</td>
				<td>${data.uv}</td>
				<td>${data.orderPv}</td>
				<td><#if data.pv==0>0%<#else>${(data.orderPv/data.pv)?string.percent}</#if></td>
				<td>${data.secondClickCount}</td>
				<td>${data.accessDepth}</td>
				<td><#if data.uv==0>0%<#else>${((data.uv-data.secondClickCount)/data.uv)?string.percent}</#if></td>
			</tr>
			<#else>
			<tr>
				<td>${data.mediaName}</td>
				<td>${data.unionLv1}</td>
				<td>${data.date}</td>
				<td>${data.pv}</td>
				<td>${data.uv}</td>
				<td>${data.orderPv}</td>
				<td><#if data.pv==0>0%<#else>${(data.orderPv/data.pv)?string.percent}</#if></td>
				<td>${data.secondClickCount}</td>
				<td>${data.accessDepth}</td>
				<td><#if data.uv==0>0%<#else>${((data.uv-data.secondClickCount)/data.uv)?string.percent}</#if></td>
			</tr>
			</#if>
		</#list>
	</tbody>
</table>