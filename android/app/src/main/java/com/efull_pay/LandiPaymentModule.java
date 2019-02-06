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
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.net.Uri;
import com.arke.sdk.util.epms.SqliteDatabase;

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

public class LandiPaymentModule extends ReactContextBaseJavaModule {

    private SharedPreferences settings = null;
    private SqliteDatabase mDatabase;
    private Bundle mBundle;

    private static final int PAYMENT_REQUEST = 467081;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PAYMENT_CANCELLED = "E_PAYMENT_CANCELLED";
    private static final String E_FAILED_TO_MAKE_PAYMENT = "E_FAILED_TO_MAKE_PAYMENT";
    private static final String E_NO_DATA_FOUND = "E_NO_DATA_FOUND";

    private Promise mPaymentPromise;
    private ReactApplicationContext reactContext;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity Activity, int requestCode, int resultCode, Intent intent) {
            if (resultCode != Activity.RESULT_CANCELED && requestCode == PAYMENT_REQUEST && mPaymentPromise != null) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    mPaymentPromise.reject(E_PAYMENT_CANCELLED, "Transaction was cancelled");
                } else if (resultCode == Activity.RESULT_OK) {
                    WritableMap map = new WritableNativeMap();
                    map.putString("message", "Hello world");
                    mPaymentPromise.resolve(map);
                }
                mPaymentPromise = null;
            }
        }
    };

    public LandiPaymentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "LandiPay";
    }

    @ReactMethod
    public void payWithATM(Promise promise) {
        mPaymentPromise = promise;
        try {
            Intent intent = new Intent(getReactApplicationContext(), com.arke.sdk.view.EPMSActivity.class);
            mBundle = new Bundle();
            mBundle.putString("trantype", "" + 1);
            mBundle.putString("batchno", "" + 1);
            mBundle.putString("seqno", "" + 1);
            mBundle.putString("amount", "" + 150000);

            intent.putExtras(mBundle);
            reactContext.startActivityForResult(intent, PAYMENT_REQUEST, mBundle);
            // return result of the transaction
            WritableMap map = new WritableNativeMap();
            map.putString("message", "PaiyWithATM Fired");
            mPaymentPromise.resolve(map);
        } catch (Exception e) {
            mPaymentPromise.reject(E_FAILED_TO_MAKE_PAYMENT, e);
            mPaymentPromise = null;
        }
    }
}