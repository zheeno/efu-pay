package com.efull_pay;

import android.os.Bundle;
import android.content.Intent;
import android.app.Activity;
import com.arke.sdk.util.epms.SqliteDatabase;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ActivityEventListener;

import java.util.Map;
import java.util.HashMap;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class LandiActivityModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final ReactApplicationContext mReactContext;
    private Callback mCallback;

    private SharedPreferences mPreferences;
    private SqliteDatabase mDatabase;
    private Bundle mBundle;
    private ActivityEventListener mActivityResultListener;
    private ReactApplicationContext reactContext;

    public LandiActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        mReactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "Landi";
    }

    @ReactMethod
    void adminSetup() {
        Intent intent = new Intent("com.arke.sdk.POSConfig");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }

    @ReactMethod
    public void payWithATM(Integer trantype, @Nonnull Integer amount, Callback callback) {
        mCallback = callback;
        Intent intent = new Intent("com.arke.sdk.TransactParser");
        // intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("trantype", trantype);
        intent.putExtra("batchno", 1);
        intent.putExtra("seqno", 2);
        intent.putExtra("amount", amount);
        intent.putExtra("action", "makePayment");
        intent.putExtra("appName", "Efull Fuel Pay");
        intent.putExtra("domainName", "com.efull_pay");

        Bundle mBundle = new Bundle();
        mBundle.putString("origin", "com.efull_pay");
        mBundle.putString("action", "makePayment");
        mBundle.putInt("trantype", trantype);
        mBundle.putInt("batchno", 1);
        mBundle.putInt("seqno", 2);
        mBundle.putInt("amount", amount);
        mBundle.putString("appName", "Efull Fuel Pay");
        mBundle.putString("domainName", "com.efull_pay");

        // intent.putExtras(mBundle);
        // mReactContext.startActivity(intent);
        mReactContext.startActivityForResult(intent, 0, mBundle);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == 0 && resultCode == Activity.RESULT_OK && data != null) {
            mCallback.invoke("json data goes here");
            Log.d("DATA", "Hello World");
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
    }
}