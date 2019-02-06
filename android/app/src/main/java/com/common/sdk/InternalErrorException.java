/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk;


/**
 * 内部库运行时错误抛出异常
 * @author linhx
 * @since 1.0
 */
public class InternalErrorException extends TelpoException {

	private static final long serialVersionUID = 8612451431999960519L;

	public InternalErrorException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InternalErrorException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
		// TODO Auto-generated constructor stub
	}

	public InternalErrorException(String detailMessage) {
		super(detailMessage);
		// TODO Auto-generated constructor stub
	}

	public InternalErrorException(Throwable throwable) {
		super(throwable);
		// TODO Auto-generated constructor stub
	}
	
	public String getDescription(){
		return "Unexpected error occur!";
	}
	
}
