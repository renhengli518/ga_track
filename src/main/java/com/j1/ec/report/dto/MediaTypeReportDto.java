package com.j1.ec.report.dto;

public class MediaTypeReportDto {
	private String mediaTypeName;
	private int pv;
	private int uv;
	private int orderPv;
	private int secondClickCount;
	private int accessDepth;
	private String date;

	public int getPv() {
		return pv;
	}

	public void setPv(int pv) {
		this.pv = pv;
	}

	public int getUv() {
		return uv;
	}

	public void setUv(int uv) {
		this.uv = uv;
	}

	public int getOrderPv() {
		return orderPv;
	}

	public void setOrderPv(int orderPv) {
		this.orderPv = orderPv;
	}

	public int getSecondClickCount() {
		return secondClickCount;
	}

	public void setSecondClickCount(int secondClickCount) {
		this.secondClickCount = secondClickCount;
	}

	public int getAccessDepth() {
		return accessDepth;
	}

	public void setAccessDepth(int accessDepth) {
		this.accessDepth = accessDepth;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getMediaTypeName() {
		return mediaTypeName;
	}

	public void setMediaTypeName(String mediaTypeName) {
		this.mediaTypeName = mediaTypeName;
	}
}
