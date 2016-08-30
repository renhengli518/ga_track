package com.j1.ec.report.entity;

import java.io.Serializable;

public class Media implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5830727914433646478L;
	private int id;
	private String mediaName;
	private String mediaCode;
	private String unionLv1;
	private String unionLv2;
	private String unionLv3;
	private int type;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMediaName() {
		return mediaName;
	}

	public void setMediaName(String mediaName) {
		this.mediaName = mediaName;
	}

	public String getMediaCode() {
		return mediaCode;
	}

	public void setMediaCode(String mediaCode) {
		this.mediaCode = mediaCode;
	}

	public String getUnionLv1() {
		return unionLv1;
	}

	public void setUnionLv1(String unionLv1) {
		this.unionLv1 = unionLv1;
	}

	public String getUnionLv2() {
		return unionLv2;
	}

	public void setUnionLv2(String unionLv2) {
		this.unionLv2 = unionLv2;
	}

	public String getUnionLv3() {
		return unionLv3;
	}

	public void setUnionLv3(String unionLv3) {
		this.unionLv3 = unionLv3;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
}
