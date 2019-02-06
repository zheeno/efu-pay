/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk.printer;
import com.common.sdk.TelpoException;

/**
 * 打印机过热异常
 * @author linhx
 * @since 1.0
 */
public class OverHeatException extends TelpoException {

	private static final long serialVersionUID = 8044094932145456087L;

	public OverHeatException() {
		super();
	}

	public OverHeatException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public OverHeatException(String detailMessage) {
		super(detailMessage);
	}

	public OverHeatException(Throwable throwable) {
		super(throwable);
	}

	public String getDescription(){
		return "The printer is overheating!";
	}
}
