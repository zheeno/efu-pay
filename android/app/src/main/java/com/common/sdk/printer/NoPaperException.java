/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk.printer;
import com.common.sdk.TelpoException;

/**
 * 打印机缺纸异常
 * @author linhx
 * @since 1.0
 */
public class NoPaperException extends TelpoException{

	private static final long serialVersionUID = 9004308459676928976L;

	public NoPaperException() {
		super();
	}

	public NoPaperException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public NoPaperException(String detailMessage) {
		super(detailMessage);
	}

	public NoPaperException(Throwable throwable) {
		super(throwable);
	}
	
	public String getDescription(){
		return "The printer paper out!";
	}
}
