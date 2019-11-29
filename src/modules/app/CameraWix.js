import React, { Component } from 'react';
import {
	Alert,
	TouchableOpacity,
	View,
	Text,
	Image
} from 'react-native';
import { CameraKitCamera } from 'react-native-camera-kit';
import { colors } from "../_global/theme";
import { Navigation } from 'react-native-navigation';
import TopNav from './components/TopNavCamera';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';

class CameraScreen extends Component {
	static get options() {
		return {
			topBar: {
				visible: false,
				drawBehind: true
			},
		};
	}

	async componentDidAppear() {
		this.GetTime()
	}

	onBottomButtonPressed(event) {
		const captureImages = JSON.stringify(event.captureImages);
		Alert.alert(
			`${event.type} button pressed`,
			`${captureImages}`,
			[
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false }
		)
	}
	GetTime() {
		// Creating variables to hold time.
		var date, TimeType, hour, minutes, seconds, fullTime, fullDate;
		// Creating Date() function object.
		date = new Date();

		//var temp = date.toLocaleString().strip;
		fullDate = date.toDateString()//temp[1] + ' ' + temp[2] + ', '+temp[3]
		this.setState({ date: fullDate })
		//Alert.alert(String(date.getFullYear()))
		//Alert.alert(date.toLocaleString())
		//Alert.alert(date.toDateString())
		//Alert.alert(date.toString())
		// Getting current hour from Date object.
		hour = date.getHours();
		// Checking if the Hour is less than equals to 11 then Set the Time format as AM.
		if (hour <= 11) {
			TimeType = 'AM';
		}
		else {
			// If the Hour is Not less than equals to 11 then Set the Time format as PM.
			TimeType = 'PM';
		}
		// IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
		if (hour > 12) {
			hour = hour - 12;
		}
		// If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
		if (hour == 0) {
			hour = 12;
		}
		// Getting the current minutes from date object.
		minutes = date.getMinutes();
		// Checking if the minutes value is less then 10 then add 0 before minutes.
		if (minutes < 10) {
			minutes = '0' + minutes.toString();
		}
		//Getting current seconds from date object.
		seconds = date.getSeconds();
		// If seconds value is less than 10 then add 0 before seconds.
		if (seconds < 10) {
			seconds = '0' + seconds.toString();
		}
		// Adding all the variables in fullTime variable.
		fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();


		// Setting up fullTime variable in State.
		this.setState({

			time: fullTime

		});
	}
	render() {
		return (
			/*
			<View style={{flex:1}}>
				<CameraKitCameraScreen
					actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
					onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
					scanBarcode={false}
					laserColor={"blue"}
					frameColor={"yellow"}

					//onReadQRCode={((event) => Alert.alert("Qr code found"))} //optional
					hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
					showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
					offsetForScannerFrame={10}   //(default 30) optional, offset from left and right side of the screen
					heightForScannerFrame={300}  //(default 200) optional, change height of the scanner frame
					colorForScannerFrame={'red'} //(default white) optional, change colot of the scanner frame
				/>
			</View>
			*/
			/*
			<CameraKitCameraScreen
					actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
					onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
					flashImages={{
							on: require('../../../images/flashOn.png'),
							off: require('../../../images/flashOff.png'),
							auto: require('../../../images/flashAuto.png')
					}}
					cameraFlipImage={require('../../images/cameraFlipIcon.png')}
					captureButtonImage={require('../../images/cameraButton.png')}
			/>
			*/
			<View style={{ flex: 1 }}>
				<TopNav screenTitle='Observations'></TopNav>

				<View style={{ flex: 14 }}>
					<CameraKitCamera
						ref={cam => this.camera = cam}
						style={{
							flex: 1,
							backgroundColor: 'white'
						}}
						cameraOptions={{
							flashMode: 'off',             // on/off/auto(default)
							focusMode: 'on',               // off/on(default)
							zoomMode: 'on',                // off/on(default)
							//ratioOverlay: '1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
							//ratioOverlayColor: '#00000077' // optional
						}}
						//onReadQRCode={(event) => console.log(event.nativeEvent.qrcodeStringValue)} // optional
						onBottomButtonPressed={this.onBottomButtonPressed}
					/>
				</View>
				<View style={{ flex: 3, backgroundColor: 'black' }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-end' }}>
							<Text style={{ color: 'white' }}>
								Video
							</Text>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ color: 'yellow' }}>
								Photo
							</Text>
						</View>
						<View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>

						</View>
					</View>
					<View style={{ flex: 3, flexDirection: 'row' }}>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10 }}>
							<Text style={{ color: 'white' }}>Cancel</Text>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
							<TouchableOpacity
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center'
								}}
								onPress={() => {
									const image = this.camera.capture(true);
									/*image.then(function (value) {
										console.log(value)
									})*/
									console.log(image)
									image.then((value) => {
										//Alert.alert(value.uri)
										console.log(value)
										this.props.actions.addPhoto(value.uri, this.props.user)
										Navigation.pop(this.props.componentId)
									})
									.catch((err)=>{
										console.log(err)
									})
								}}>
								<Image source={require('../../../images/cameraButton.png')} />
							</TouchableOpacity>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 10 }}>
							<Image source={require('../../../images/cameraFlipIcon.png')} />
						</View>
					</View>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		newObservations: state.appReducer.newObservations,
		user: state.authReducer.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(appActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);