/**
 * Copyright (c) 2016 广东天波信息技术股份有限公司
 * @author linhx
 */

package com.common.sdk.printer;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import android.content.Context;
import android.graphics.Bitmap;

import com.common.sdk.InternalErrorException;
import com.common.sdk.TelpoException;
import com.common.sdk.DeviceNotFoundException;

import android.graphics.Bitmap;
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.MultiFormatWriter;
// import com.google.zxing.EncodeHintType;
// import com.google.zxing.WriterException;
// import com.google.zxing.common.BitMatrix;
import java.util.EnumMap;
import java.util.Map;
import android.util.Log;

import android.graphics.Paint;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Typeface;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 天波热敏打印机控制类
 * 
 * @author linhx
 * @version 1.0
 * @since 1.0
 */

public class ThermalPrinter {
	private ReactContext mContext = null;
	public static String version;
	public static String sdkversion;
	public static final String TAG = "Tps900";

	public ThermalPrinter(ReactContext reactContext) {
		mContext = reactContext;
	}

	/**
	 * 左对齐
	 */
	public final static int ALGIN_LEFT = 0;
	/**
	 * 居中对齐
	 */
	public final static int ALGIN_MIDDLE = 1;
	/**
	 * 右对齐
	 */
	public final static int ALGIN_RIGHT = 2;

	/**
	 * 走纸方向，向前
	 */
	public final static int DIRECTION_FORWORD = 0;
	/**
	 * 走纸方向，向后
	 */
	public final static int DIRECTION_BACK = 1;

	/**
	 * 点行走纸
	 */
	public final static int WALK_DOTLINE = 0;
	/**
	 * 字符行走纸
	 */
	public final static int WALK_LINE = 1;

	/**
	 * 打印机就绪
	 */
	public final static int STATUS_OK = 0;
	/**
	 * 打印机缺纸
	 */
	public final static int STATUS_NO_PAPER = 1;
	/**
	 * 打印机机芯过热
	 */
	public final static int STATUS_OVER_HEAT = 2;
	/**
	 * 打印机缓存已满
	 */
	public final static int STATUS_OVER_FLOW = 3;
	/**
	 * 打印机状态未知
	 */
	public final static int STATUS_UNKNOWN = 4;

	/**
	 * 打印机资源申请，必须先申请才能使用打印机相关操作，使用完需调用{@link ThermalPrinter#stop()}方法进行释放
	 * 
	 * @throws DeviceAlreadyOpenException 当资源已经申请时再申请产生
	 * @throws DeviceNotFoundException    当找不到设备时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void start() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}
		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("start");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 打印机重置，所有设置恢复默认设置，打印缓冲清空
	 * 
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void reset() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("reset");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 打印走纸
	 * 
	 * @param line 点行数,>0
	 * @throws IllegalArgumentException 当点行小于等于0时
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @throws DeviceOverFlowException  打印过程中打印机缓存满产生
	 * @throws NoPaperException         打印过程中打印机缺纸时产生
	 * @author linhx
	 * @version 1.0
	 * @throw OverHeatException 打印过程中打印机芯过热产生
	 * @since 1.0
	 */
	public synchronized void walkPaper(int line) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("walkPaper", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, line);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	// public void printQrcode(String str, int w, int h) throws TelpoException {
	// Bitmap bitmap = null;
	// try {
	// bitmap = CreateCode(str, BarcodeFormat.QR_CODE, w, h);
	// } catch (WriterException e) {
	// e.printStackTrace();
	// } // BarcodeFormat.QR_CODE
	// if (bitmap != null) {
	// Log.v(TAG, "Find the Bmp");
	// this.printLogo(bitmap);
	// }
	// }

	// public Bitmap CreateCode(String str, com.google.zxing.BarcodeFormat type,
	// int bmpWidth, int bmpHeight) throws WriterException {
	// String utf8Str = null;
	// //
	// 生成二维矩阵,编码时要指定大小,不要生成了图片以后再进行缩放,以防模糊导致识别失败
	// Map<EncodeHintType,Object> hints = new
	// EnumMap<EncodeHintType,Object>(EncodeHintType.class);
	// hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
	// BitMatrix matrix = new MultiFormatWriter().encode(str, type, bmpWidth,
	// bmpHeight, hints);
	// int width = matrix.getWidth();
	// int height = matrix.getHeight();
	// // 二维矩阵转为一维像素数组（一直横着排）
	// int[] pixels = new int[width * height];
	// for (int y = 0; y < height; y++) {
	// for (int x = 0; x < width; x++) {
	// if (matrix.get(x, y)) {
	// pixels[y * width + x] = 0xff000000;
	// } else {
	// pixels[y * width + x] = 0xffffffff;
	// }
	// }
	// }
	// Bitmap bitmap = Bitmap.createBitmap(width, height,
	// Bitmap.Config.ARGB_8888);
	// // 通过像素数组生成bitmap,具体参考api
	// bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
	// return bitmap;
	// }

	/**
	 * 释放打印机，不使用打印机时必须释放
	 * 
	 * @author linhx
	 * @version 1.0
	 * @throws TelpoException
	 * @since 1.0
	 */
	public synchronized void stop() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("stop");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 检测打印机状态
	 * 
	 * @return 返回值见<BR>
	 *         {@link ThermalPrinter#STATUS_OK}<BR>
	 *         {@link ThermalPrinter#STATUS_NO_PAPER}<BR>
	 *         {@link ThermalPrinter#STATUS_OVER_HEAT}<BR>
	 *         {@link ThermalPrinter#STATUS_OVER_FLOW}<BR>
	 *         {@link ThermalPrinter#STATUS_UNKNOWN}
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @author linhx
	 * @since 1.0
	 */
	public synchronized int checkStatus() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;
		int iResult = 0;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("checkStatus");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			iResult = (Integer) method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
		return iResult;
	}

	/**
	 * 打印字体宽高放大
	 * 
	 * @param widthMultiple  1-2倍，打印机初始状态为1
	 * @param heightMultiple 1-2倍，打印机初始状态为1
	 * @throws IllegalArgumentException 当倍数小于1或者大于2时产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void enlargeFontSize(int widthMultiple, int heightMultiple) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("enlargeFontSize", new Class[] { int.class, int.class });
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, widthMultiple, heightMultiple);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置字体
	 * 
	 * @param type 字号设置，1-2，默认为2号字体 <BR>
	 *             对于单字节字符 1号字体大小为 8*16 2号字体大小为12*24 <BR>
	 *             
	 * 
	 *             对于双字节字符 1号字体大小为 16*16 2号字体大小为24*24 <BR>
	 *             
	 * 
	 *
	 * @throws IllegalArgumentException 当倍数小于1或者大于2时产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setFontSize(int type) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setFontSize", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, type);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置是否反白
	 * 
	 * @param mode true,允许反白打印 <BR>
	 *             false,禁止反白，默认状态
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setHighlight(boolean mode) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setHighlight", boolean.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, mode);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置打印灰度值
	 * 
	 * @param level 0-12,默认为4
	 * @throws IllegalArgumentException 当灰度值小于0或者大于15时产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setGray(int level) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setGray", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, level);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	public void textAsBitmap(String text, boolean fontGrande, boolean negrito, boolean invertido) {
		try {
			this.reset();
			this.setGray(7);
		} catch (Exception e) {
			e.printStackTrace();
		}

		Paint paint = new Paint();
		paint.setStyle(Paint.Style.FILL);
		paint.setColor(Color.WHITE);
		if (invertido)
			paint.setColor(Color.BLACK);
		paint.setFakeBoldText(negrito);
		paint.setTextAlign(Paint.Align.LEFT);
		paint.setTypeface(Typeface.MONOSPACE);
		paint.setTextSize(20);
		float baseline = -paint.ascent(); // ascent() is negative
		int width = (int) (paint.measureText(text) + 0.5f); // round
		int height = (int) (baseline + paint.descent() + 0.5f);

		// Log.v(TAG, "width: " + width);
		// Log.v(TAG, "height: " + height);
		// Log.v(TAG, "baseline: " + baseline);
		// Log.v(TAG, "paint.measureText(text): " + paint.measureText(text));
		// Log.v(TAG, "paint.descent(): " + paint.descent());

		Bitmap image = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
		Canvas canvas = new Canvas(image);
		canvas.drawPaint(paint);
		paint.setColor(Color.BLACK);
		if (invertido)
			paint.setColor(Color.WHITE);
		canvas.drawText(text, 0, baseline, paint);

		try {
			if (fontGrande)
				this.printLogo(Bitmap.createScaledBitmap(image, width, height * 2, false));
			else
				this.printLogo(image);
			;
			// this.printLogo(createBlackAndWhite(image));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Bitmap createBlackAndWhite(Bitmap src) {
		int width = src.getWidth();
		int height = src.getHeight();
		// create output bitmap
		Bitmap bmOut = Bitmap.createBitmap(width, height, src.getConfig());
		// color information
		int A, R, G, B;
		int pixel;

		// scan through all pixels
		for (int x = 0; x < width; ++x) {
			for (int y = 0; y < height; ++y) {
				// get pixel color
				pixel = src.getPixel(x, y);
				A = Color.alpha(pixel);
				R = Color.red(pixel);
				G = Color.green(pixel);
				B = Color.blue(pixel);
				int gray = (int) (0.2989 * R + 0.5870 * G + 0.1140 * B);

				// use 128 as threshold, above -> white, below -> black
				if (gray > 128)
					gray = 255;
				else
					gray = 0;
				// set new pixel color to output bitmap
				bmOut.setPixel(x, y, Color.argb(A, gray, gray, gray));
			}
		}
		return bmOut;
	}

	/**
	 * 设置打印对齐方式
	 * 
	 * @param mode 对齐方式 <BR>
	 *             {@link ThermalPrinter#ALGIN_LEFT} 左对齐 <BR>
	 *             {@link ThermalPrinter#ALGIN_MIDDLE} 居中对齐 <BR>
	 *             {@link ThermalPrinter#ALGIN_RIGHT} 右对齐
	 * @throws IllegalArgumentException 当对齐方式参数 <tt>mode</tt>
	 *                                  法时产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setAlgin(int mode) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setAlgin", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, mode);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 添加打印内容
	 * 
	 * @param content 要打印的内容
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @throws NullPointerException   当参数<tt>content</tt>为空时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void addString(String content) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("addString", String.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, content);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 清除已添加的打印内容
	 * 
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @version 1.0
	 * @author linhx
	 * @since 1.0
	 */
	public synchronized void clearString() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("clearString");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 启动打印，打印完不走纸
	 * 
	 * @throws DeviceNotOpenException  当资源或设备未申请或打开时产生
	 * @throws DeviceOverFlowException 打印过程中打印机缓存满产生
	 * @throws NoPaperException        打印过程中打印机缺纸时产生
	 * @author linhx
	 * @version 1.0
	 * @throw OverHeatException 打印过程中打印机芯过热产生
	 * @since 1.0
	 */
	public synchronized void printString() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("printString");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 启动打印并走纸
	 * 
	 * @param direction 打印完后走纸方向 <BR>
	 *                  {@link ThermalPrinter#DIRECTION_FORWORD},向前走纸<BR>
	 *                  {@link ThermalPrinter#DIRECTION_BACK},向后走纸
	 * @param mode      走纸模式 <BR>
	 *                  {@link ThermalPrinter#WALK_DOTLINE},点行<BR>
	 *                  {@link ThermalPrinter#WALK_LINE},字符行
	 * @param lines     走纸行数，1-255
	 * @throws IllegalArgumentException 参数不正确导致
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @throws DeviceOverFlowException  打印过程中打印机缓存满产生
	 * @throws NoPaperException         打印过程中打印机缺纸时产生
	 * @author linhx
	 * @version 1.0
	 * @throw OverHeatException 打印过程中打印机芯过热产生
	 * @since 1.0
	 */
	public synchronized void printStringAndWalk(int direction, int mode, int lines) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("printStringAndWalk", new Class[] { int.class, int.class, int.class });
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, direction, mode, lines);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置行间距
	 * 
	 * @param lineSpace 行间距,单位点行,0-255
	 * @throws IllegalArgumentException 当行间距<tt>lineSpace</tt>小于1或者大于255时候产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setLineSpace(int lineSpace) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setLineSpace", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, lineSpace);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置字符间距
	 * 
	 * @param charSpace 字符间距,单位点行,0-255
	 * @throws IllegalArgumentException 当字符间距间距<tt>lineSpace</tt>小于1或者大于255时候产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 2.0
	 * @date 2016-01-20
	 * @since 2.0
	 */
	public synchronized void setCharSpace(int charSpace) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setCharSpace", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, charSpace);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置左边距
	 * 
	 * @param space 左边距,单位0.125mm,0-255
	 * @throws IllegalArgumentException 当行间距<tt>space</tt>小于1或者大于255时候产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @author linhx
	 * @version 1.0
	 * @since 1.0
	 */
	public synchronized void setLeftIndent(int space) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setLeftIndent", int.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, space);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 打印图片，不加入缓冲队列直接打印
	 * 
	 * @param image Bitmap对象，宽必须小于或等于384个像素点，如果设置了左间距，则左间距加上宽需要小于384
	 * @throws NullPointerException     当参数<tt>image</tt>为空时
	 * @throws IllegalArgumentException 当图片的宽高不符合要求的时候产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @throws DeviceOverFlowException  打印过程中打印机缓存满产生
	 * @throws NoPaperException         打印过程中打印机缺纸时产生
	 * @throws OverHeatException        打印过程中打印机芯过热产生
	 * @author linhx
	 * @version 1.0
	 * 
	 * @since 1.0
	 */
	public synchronized void printLogo(Bitmap image) throws TelpoException {
		printLogo(image, false);
	}

	/**
	 * 打印图片
	 * 
	 * @param image    Bitmap对象，宽必须小于或等于384个像素点，如果设置了左间距，则左间距加上宽需要小于384
	 * @param isBuffer 是否将图片数据加入缓冲队列，true加入缓冲队列(文字图片混排时保持流畅)，false不加入缓冲队列直接打印
	 * @throws NullPointerException     当参数<tt>image</tt>为空时
	 * @throws IllegalArgumentException 当图片的宽高不符合要求的时候产生
	 * @throws DeviceNotOpenException   当资源或设备未申请或打开时产生
	 * @throws DeviceOverFlowException  打印过程中打印机缓存满产生
	 * @throws NoPaperException         打印过程中打印机缺纸时产生
	 * @throws OverHeatException        打印过程中打印机芯过热产生
	 * @author linhx
	 * @version 2.0
	 * @since 2.0
	 */
	public synchronized void printLogo(Bitmap image, boolean isBuffer) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("printLogo", new Class[] { Bitmap.class, boolean.class });
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, image, isBuffer);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	public synchronized String getVersion() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;
		String version = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("getVersion");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			version = (String) method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
		return version;
	}

	/*
	 * 获取SDK打印模块版本号
	 */
	public String getSDKVersion() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;
		String sdkVersion = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("getSDKVersion");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			sdkVersion = (String) method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
		return sdkVersion;
	}

	/**
	 * 搜索黑标
	 * 
	 * @param direction       搜索方向<BR>
	 *                        {@link DIRECTION_FORWORD}　向前搜索<BR>
	 *                        {@link DIRECTION_BACK} 向后搜索<BR>
	 * @param search_disdance 最大搜索距离，0~255，单位mm，1mm = 8点行
	 * @param walk_disdance   搜索到黑标后的走纸距离，0~255，单位mm，1mm = 8点行
	 *                        
	 * 
	 * 
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 * @throws InternalErrorException 内部库运行错误
	 */
	public void searchMark(int direction, int search_disdance, int walk_disdance) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("searchMark", new Class[] { int.class, int.class, int.class });
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, direction, search_disdance, walk_disdance);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	public void paperCut() throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("paperCut");
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}

	/**
	 * 设置加粗
	 * 
	 * @param isBold true 加粗；false 不加粗
	 * @throws DeviceNotOpenException 当资源或设备未申请或打开时产生
	 */
	public void setBold(boolean isBold) throws TelpoException {
		Class<?> thermalPrinter = null;
		Method method = null;
		Object obj = null;

		try {
			thermalPrinter = Class.forName("com.common.sdk.thermalprinter.ThermalPrinterServiceManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		obj = mContext.getSystemService("ThermalPrinter");
		try {
			method = thermalPrinter.getMethod("setBold", boolean.class);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		}

		try {
			method.invoke(obj, isBold);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			throw new InternalErrorException();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			Exception targetExp = (Exception) e.getTargetException();
			if (targetExp instanceof TelpoException) {
				throw (TelpoException) targetExp;
			}
		}
	}
}
