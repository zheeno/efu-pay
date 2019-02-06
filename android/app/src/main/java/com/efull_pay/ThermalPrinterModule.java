package com.efull_pay;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.content.Intent;
import android.app.Activity;
import android.util.*;
import android.widget.*;
import android.view.View.*;

import com.common.sdk.TelpoException;
import com.common.sdk.printer.ThermalPrinter;
// import com.google.zxing.BarcodeFormat;
// import com.google.zxing.EncodeHintType;
// import com.google.zxing.MultiFormatWriter;
// import com.google.zxing.WriterException;
// import com.google.zxing.common.BitMatrix;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Map;
import java.util.HashMap;
import java.util.ResourceBundle;

import javax.annotation.Nullable;

public class ThermalPrinterModule extends ReactContextBaseJavaModule {

    private String printVersion;
    // private final int PRINTIT = 1;
    private final int ENABLE_BUTTON = 2;
    private final int NOPAPER = 3;
    private final int LOWBATTERY = 4;
    private final int PRINTVERSION = 5;
    private final int PRINTBARCODE = 6;
    private final int PRINTQRCODE = 7;
    private final int PRINTPAPERWALK = 8;
    private final int PRINTCONTENT = 9;
    private final int CANCELPROMPT = 10;
    private final int PRINTERR = 11;
    private final int OVERHEAT = 12;
    private final int MAKER = 13;
    private final int PRINTPICTURE = 14;
    private final int EXECUTECOMMAND = 15;
    private final int PRINTMIX = 16;
    private final int GB2312TESTPRINT = 17;
    private final int ASCIITESTPRINT = 18;

    private boolean stop = false;
    private static final String TAG = "ConsoleTestActivity";

    SharedPreferences preferences;
    SharedPreferences.Editor editor;

    private EditText editTextLeftDistance;
    // private EditText editTextRightDistance;
    private EditText editTextCharSpace;
    private EditText editTextAlign;
    private EditText editTextLineDistance;
    private EditText editTextWordFont;
    private EditText editTextPrintGray;
    private EditText editTextBarcode;
    private EditText editTextQrcode;
    private EditText editTextPaperWalk;
    private EditText editTextContent;
    private EditText edittext_maker_direction;
    private EditText edittext_maker_search_distance;
    private EditText edittext_maker_walk_distance;
    private EditText edittext_input_command;

    private Promise mPaymentPromise;
    private ReactApplicationContext reactContext;
    private ThermalPrinter thermalPrinter;

    public static final String DURATION_SHORT_KEY = "SHORT";
    public static final String DURATION_LONG_KEY = "LONG";

    public ThermalPrinterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.thermalPrinter = new ThermalPrinter(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "printer";
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        // print example text
        @ReactMethod
        public void printText(Promise promise) throws TelpoException {
            mPaymentPromise = promise;
            try {
                String str = "Print Test:\n" + "Device Base Information\n" + "-----------------------------\n"
                        + "Printer Version:\n" + "  V05.2.0.3\n" + "Printer Gray: 3\n" + "Soft Version:\n"
                        + "  TPDemo.G50.0.Build140313\n" + "Battery Level: 100%\n" + "CSQ Value: 24\n"
                        + "IMEI:86378902177527" + "\n" + "\n\n" + "Device Base Information\n"
                        + "--------------0---------------\n" + "Printer Version:\n" + "  V05.2.0.3\n"
                        + "Printer Gray: 3\n" + "Soft Version:\n" + "  TPDemo.G50.0.Build140313\n"
                        + "Battery Level: 100%\n" + "CSQ Value: 24\n" + "IMEI:86378902177527" + "\n"
                        + "Device Base Information\n" + "--------------1---------------\n" + "Printer Version:\n"
                        + "  V05.2.0.3\n" + "Printer Gray: 3\n" + "Soft Version:\n" + "  TPDemo.G50.0.Build140313\n"
                        + "Battery Level: 100%\n" + "CSQ Value: 24\n" + "IMEI:86378902177527" + "\n" + "\n\n"
                        + "Device Base Information\n" + "--------------2---------------\n" + "Printer Version:\n"
                        + "  V05.2.0.3\n" + "Printer Gray: 3\n" + "Soft Version:\n" + "  TPDemo.G50.0.Build140313\n"
                        + "Battery Level: 100%\n" + "CSQ Value: 24\n" + "IMEI:86378902177527" + "\n" + "\n"
                        + "Device Base Information\n" + "--------------3---------------\n";
                // editTextContent.setText(str);
                thermalPrinter.addString(str);
                thermalPrinter.printString();
                thermalPrinter.clearString();
                thermalPrinter.walkPaper(20);
                WritableMap map = new WritableNativeMap();
                map.putString("text", str);
                mPaymentPromise.resolve(map);
            } catch (Exception e) {
                mPaymentPromise.reject("s", e);
                mPaymentPromise = null;
            }
        }
    };

    @ReactMethod
    public void toast(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

}