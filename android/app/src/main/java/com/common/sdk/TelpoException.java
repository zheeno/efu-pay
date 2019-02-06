/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk;

/**
 * 定义天波SDK运行时异常基类
 * @author linhx
 * @version 1.0
 * @since 1.0
 */
public class TelpoException extends Exception{

	private static final long serialVersionUID = 1136193940236894072L;

	public TelpoException() {
		super();
	}

	public TelpoException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public TelpoException(String detailMessage) {
		super(detailMessage);
	}

	public TelpoException(Throwable throwable) {
		super(throwable);
	}
	
	public String getDescription(){
		return "Exception occur during telpo device operation!";
	}
}
