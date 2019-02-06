package com.efull_pay;

import android.os.Bundle;
// import android.support.design.widget.FloatingActionButton;
// import android.support.design.widget.Snackbar;
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

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ActivityEventListener;

import java.util.Map;
import java.util.HashMap;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class LandiActivityModule extends ReactContextBaseJavaModule {

    private SharedPreferences settings = null;
    private SqliteDatabase mDatabase;
    private Bundle mBundle;
    private ActivityEventListener mActivityResultListener;
    private ReactApplicationContext reactContext;

    public LandiActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "Landi";
    }

    // if any oissue arise due to the onCreate function below
    // move the snippet to the onCreate function of MainActivity.ja
    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    // super.onCreate(savedInstanceState);
    // setContentView(R.layout.activity_main);

    // settings =
    // PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
    // mDatabase = new SqliteDatabase(getApplicationContext());

    // Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    // setSupportActionBar(toolbar);

    // FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
    // fab.setOnClickListener(new View.OnClickListener() {
    // @Override
    // public void onClick(View view) {
    // Snackbar.make(view, "Replace with your own action",
    // Snackbar.LENGTH_LONG).setAction("Action", null).show();
    // }
    // });

    // Button purchase = (Button) findViewById(R.id.purchase);
    // purchase.setOnClickListener(new OnClickListener() {

    // public void onClick(View v) {
    // Intent intent = new Intent(LandiActivityModule.this,
    // com.arke.sdk.view.EPMSActivity.class);
    // intent.putExtra("trantype", "" + 1);
    // intent.putExtra("batchno", "" + 1);
    // intent.putExtra("seqno", "" + 1);
    // intent.putExtra("amount", ""+10000);
    // startActivityForResult(intent, 0);

    // }
    // });

    // end of custom editting
    // Button admin = (Button) findViewById(R.id.admin);
    // admin.setOnClickListener(new OnClickListener() {

    // public void onClick(View v) {
    // Intent intent = new Intent(LandiActivityModule.this,
    // com.arke.sdk.view.EPMSAdminActivity.class);
    // // intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    // startActivity(intent);

    // }
    // });

    // }

    @ReactMethod
    void adminSetup() {
        Intent intent = new Intent(reactContext, com.arke.sdk.view.EPMSAdminActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void payWithATM(Integer seqno, Integer batchno, Integer trantype, @Nonnull Double amount) {
        amount = amount * 100;
        Intent intent = new Intent(reactContext, paymentActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("origin", "com.efull_pay");
        intent.putExtra("action", "makePayment");
        intent.putExtra("trantype", trantype);
        intent.putExtra("batchno", batchno);
        intent.putExtra("seqno", seqno);
        intent.putExtra("amount", amount);
        reactContext.startActivity(intent);
    }

    // @Override
    // public boolean onCreateOptionsMenu(Menu menu) {
    // Inflate the menu; this adds items to the action bar if it is present.
    // getMenuInflater().inflate(R.menu.menu_main, menu);
    // return true;
    // }

    // @Override
    // public boolean onOptionsItemSelected(MenuItem item) {
    // Handle action bar item clicks here. The action bar will
    // automatically handle clicks on the Home/Up button, so long
    // as you specify a parent activity in AndroidManifest.xml.
    // int id = item.getItemId();

    // noinspection SimplifiableIfStatement
    // if (id == R.id.action_settings) {
    // return true;
    // }

    // return super.onOptionsItemSelected(item);
    // }
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            // super.onActivityResult(requestCode, resultCode, data);
            // check that it is the EPMSActivity with an OK result
            if (requestCode == 0) {
                if (resultCode == Activity.RESULT_OK) {
                    // get String data from Intent
                    com.arke.sdk.util.epms.Transaction newTransaction = (com.arke.sdk.util.epms.Transaction) data
                            .getSerializableExtra("response");
                    Log.d("LandiActivityModule", "stan = " + newTransaction.getStan());

                    // mDatabase.saveEftTransaction(newTransaction);
                    // Activity activity = getCurrentActivity();
                    // try {
                    // com.arke.sdk.view.EPMSAdminActivity.printReceipt(newTransaction, activity);
                    // } catch (Exception e) {
                    // Log.e("LandiActivityModule", e.getLocalizedMessage());
                    // }

                    // if (newTransaction.getMode() == com.arke.sdk.util.epms.Constant.CHIP) {
                    // com.arke.sdk.view.EPMSAdminActivity.removeCard(newTransaction, activity,
                    // activity);
                    // }

                }
            }
        }
    };
}