'use strict';
import React, { Component } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { RNCamera } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';

//import QRCodeScanner from 'react-native-qrcode-scanner';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Camera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //console.log(barcodes);  
            this._signUpAsync(barcodes)
          }}
        />
        {<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={ () => this.close()/*this.takePicture.bind(this)*/} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Close </Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }

  close() {
    Navigation.pop(this.props.componentId)
  }

  _signUpAsync =  async (barcodes) => {
    await AsyncStorage.setItem('barCode', JSON.stringify(barcodes))
      .then(() => console.log('barcode stored'))
      .catch(err => {
        console.log('error: ', err);
      })
    //await AsyncStorage.setItem('userToken', {user});
    this.props.navigation.navigate('Product')
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: deviceWidth,//*(2/3),
    height: deviceHeight,//*(2/3),
    //height: 100,
    //marginVertical: deviceHeight*(1/6),
    //marginHorizontal: deviceWidth*(1/6),
    alignSelf: 'center',
    //marginRight: 20,
    //marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  preview: {
    width: '100%',
    height: '100%',
    //flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  capture: {
    flex: 1,
    position:'absolute',
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera

/*
class ScanScreen extends Component {
  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen
*/