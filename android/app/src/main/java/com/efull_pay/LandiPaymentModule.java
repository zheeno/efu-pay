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
import com.arke.sdk.util.epms.SqliteDatabase;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class LandiPaymentModule extends ReactContextBaseJavaModule {

    private SharedPreferences settings = null;
    private SqliteDatabase mDatabase;

    private static final int PAYMENT_REQUEST = 467081;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PAYMENT_CANCELLED = "E_PAYMENT_CANCELLED";
    private static final String E_FAILED_TO_MAKE_PAYMENT = "E_FAILED_TO_MAKE_PAYMENT";
    private static final String E_NO_DATA_FOUND = "E_NO_DATA_FOUND";

    private Promise mPaymentPromise;
    private ReactApplicationContext reactContext;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == PAYMENT_REQUEST) {
                if (mPaymentPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPaymentPromise.reject(E_PAYMENT_CANCELLED, "Transaction was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        Uri uri = intent.getData();

                        if (uri == null) {
                            mPaymentPromise.reject(E_NO_DATA_FOUND, "No data found");
                        } else {
                            mPaymentPromise.resolve(uri.toString());
                        }
                    }

                    mPaymentPromise = null;
                }
            }

            // check that it is the EPMSActivity with an OK result
            // if (requestCode == 0) {
            // if (resultCode == Activity.RESULT_OK) {
            // // get String data from Intent
            // com.arke.sdk.util.epms.Transaction newTransaction =
            // (com.arke.sdk.util.epms.Transaction) data
            // .getSerializableExtra("response");
            // Log.d("LandiActivityModule", "stan = " + newTransaction.getStan());

            // mDatabase.saveEftTransaction(newTransaction);
            // // Activity activity = getCurrentActivity();
            // try {
            // com.arke.sdk.view.EPMSAdminActivity.printReceipt(newTransaction, activity);
            // } catch (Exception e) {
            // Log.e("LandiActivityModule", e.getLocalizedMessage());
            // }

            // if (newTransaction.getMode() == com.arke.sdk.util.epms.Constant.CHIP) {
            // com.arke.sdk.view.EPMSAdminActivity.removeCard(newTransaction, activity,
            // activity);
            // }

            // }
            // }
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
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPaymentPromise = promise;

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            Intent intent = new Intent(reactContext, com.arke.sdk.view.EPMSActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra("trantype", "" + 1);
            intent.putExtra("batchno", "" + 1);
            intent.putExtra("seqno", "" + 1);
            intent.putExtra("amount", "" + 10000);// always convert amount to long by
            // multiplying by 100 before passing as a
            // parameter
            // currentActivity.startActivityForResult(intent, PAYMENT_REQUEST);
            mPaymentPromise.resolve(E_PAYMENT_CANCELLED, "Payment works");
        } catch (Exception e) {
            mPaymentPromise.reject(E_FAILED_TO_MAKE_PAYMENT, e);
            mPaymentPromise = null;
        }

    }
}