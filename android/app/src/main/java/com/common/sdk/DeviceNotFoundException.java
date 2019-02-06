/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk;

/**
 * 找不到设备异常
 * @author linhx
 * @since 1.0
 */
public class DeviceNotFoundException extends TelpoException{

	private static final long serialVersionUID = 1L;

	public DeviceNotFoundException() {
		super();
	}

	public DeviceNotFoundException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public DeviceNotFoundException(String detailMessage) {
		super(detailMessage);
	}

	public DeviceNotFoundException(Throwable throwable) {
		super(throwable);
	}
	
	public String getDescription(){
		return "Cannot find device!";
	}
}
