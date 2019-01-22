package com.efull_pay;

import android.app.Application;

import com.facebook.react.ReactApplication;
// import community.revteltech.nfc.NfcManagerPackage;
import com.react_native_zxing.ScannerReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.efull_pay.CustomToastPackage;
import com.efull_pay.LandiActivityPackage;
import com.efull_pay.LandiPaymentPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new LandiPaymentPackage(), new LandiActivityPackage(), new MainReactPackage(),
          // new NfcManagerPackage(),
          new ScannerReactPackage(), new CustomToastPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}
