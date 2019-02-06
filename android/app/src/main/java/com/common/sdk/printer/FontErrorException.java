/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk.printer;
import com.common.sdk.TelpoException;

/**
 * 打印机字库异常类
 * @author linhx
 * @since 1.0
 */
public class FontErrorException extends TelpoException{
	private static final long serialVersionUID = -8249867105337904679L;
	
	public FontErrorException() {
		super();
	}

	public FontErrorException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public FontErrorException(String detailMessage) {
		super(detailMessage);
	}

	public FontErrorException(Throwable throwable) {
		super(throwable);
	}
	
	public String getDescription(){
		return "Printer font error!";
	}

}
