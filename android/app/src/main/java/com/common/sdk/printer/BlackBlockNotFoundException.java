/**
 * Copyright (c) 2014 广东天波信息技术股份有限公司
 * @author linhx
 */
package com.common.sdk.printer;
import com.common.sdk.*;



/**
 * 打印机缺纸异常
 * @author linhx
 * @since 1.0
 */
public class BlackBlockNotFoundException extends TelpoException{

	private static final long serialVersionUID = 9004308459676928976L;

	public BlackBlockNotFoundException() {
		super();
	}

	public BlackBlockNotFoundException(String detailMessage, Throwable throwable) {
		super(detailMessage, throwable);
	}

	public BlackBlockNotFoundException(String detailMessage) {
		super(detailMessage);
	}

	public BlackBlockNotFoundException(Throwable throwable) {
		super(throwable);
	}
	
	public String getDescription(){
		return "Cannot find the black block!";
	}
}
