package com.bkelas;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.eko.RNBackgroundDownloaderPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.thebylito.navigationbarcolor.NavigationBarColorPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;


import com.thebylito.navigationbarcolor.NavigationBarColorPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
			    new AsyncStoragePackage(),
          new VectorIconsPackage(),
          //new RNCameraKitPackage(),
          //new RNFusedLocationPackage(),
          new NetInfoPackage(),
          new ImagePickerPackage(),
          new ReactVideoPackage(),
          new KCKeepAwakePackage(),
          new OrientationPackage(),
          new LinearGradientPackage(),
          new ReactSliderPackage(),
          new NavigationBarColorPackage(),
	  new RNFSPackage(),
	  new RNFetchBlobPackage(),
	  new RNBackgroundDownloaderPackage()
        );
    }
  
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}

/*public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBackgroundDownloaderPackage(),
            new RNFetchBlobPackage(),
            new NetInfoPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new NavigationBarColorPackage(),
            new ReactSliderPackage(),
            new LinearGradientPackage(),
            new OrientationPackage(),
            new KCKeepAwakePackage(),
            new ReactVideoPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
            new VectorIconsPackage()
      );
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
    SoLoader.init(this,  false);
  }
}
*/
