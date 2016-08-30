package com.j1.ec.report.dto;

import java.io.Serializable;

public class MediaAccessCensusDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private String mediaName;
	private int id;
	private String unionLv1;
	private int pv;
	private int uv;
	private int orderPv;
	private int secondClickCount;
	private int accessDepth;
	private String date;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUnionLv1() {
		return unionLv1;
	}

	public void setUnionLv1(String unionLv1) {
		this.unionLv1 = unionLv1;
	}

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

	public String getMediaName() {
		return mediaName;
	}

	public void setMediaName(String mediaName) {
		this.mediaName = mediaName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
