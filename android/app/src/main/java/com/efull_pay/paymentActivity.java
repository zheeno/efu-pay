package com.efull_pay;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.util.*;


import com.arke.sdk.util.epms.SqliteDatabase;
import android.content.SharedPreferences;
import android.widget.TextView;
//import android.preference.PreferenceManager;
//
//import javax.annotation.Nonnull;

public class paymentActivity extends AppCompatActivity {

    private SharedPreferences settings = null;
    private SqliteDatabase mDatabase;

    private Integer transType;
    private Integer batchNo;
    private Integer seqNo;
    private Double amount;

    public final static String EXTRA_PURCHASE_ACTION = "makePayment";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // get intent from explicit activity
        Intent intent = getIntent();
            String action = intent.getStringExtra("action");
            switch (action) {
            case EXTRA_PURCHASE_ACTION:
                this.transType = intent.getIntExtra("transType", 1);
                this.batchNo = intent.getIntExtra("batchNo", 1);
                this.seqNo = intent.getIntExtra("seqNo", 1);
                this.amount = intent.getDoubleExtra("amount", 10000);
                final TextView amountText = (TextView) findViewById(R.id.amountView);
                amountText.setText(this.amount.toString());
                break;

            default:
                break;
            }
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG).setAction("Action", null)
                        .show();
            }
        });
    }

    public void payWithATM(View view) {
        Intent intent = new Intent("com.arke.sdk.POSTerminal");
        intent.putExtra("trantype", "" + this.transType);
        intent.putExtra("batchno", "" + this.batchNo);
        intent.putExtra("seqno", "" + this.seqNo);
        intent.putExtra("amount", this.amount.toString());
        startActivityForResult(intent, 0);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // check that it is the EPMSActivity with an OK result
        if (requestCode == 0) {
            if (resultCode == Activity.RESULT_OK) {
                // get String data from Intent
                com.arke.sdk.util.epms.Transaction newTransaction = (com.arke.sdk.util.epms.Transaction) data
                        .getSerializableExtra("response");
                // Log.d("paymentActivity", "stan = " + newTransaction.getStan());
                // mDatabase.saveEftTransaction(newTransaction);

                // try {
                // com.arke.sdk.view.EPMSAdminActivity.printReceipt(newTransaction,
                // paymentActivity.this);
                // } catch (Exception e) {
                // Log.e("paymentActivity", e.getLocalizedMessage());
                // }

                // if (newTransaction.getMode() == com.arke.sdk.util.epms.Constant.CHIP) {
                // com.arke.sdk.view.EPMSAdminActivity.removeCard(newTransaction,
                // paymentActivity.this,
                // paymentActivity.this);
                // }

            }
        }
    }
}
