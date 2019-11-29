import React from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Image
} from 'react-native'

import { Navigation } from "react-native-navigation";
//import { RNCamera } from 'react-native-camera';

import { colors, fonts } from '../../_global/theme'
import IconWithBadge from '../../_global/Icons';
import { iconsMap } from '../../../utils/AppIcons';

class TopNav extends React.Component {

	render() {
		const { screenTitle } = this.props
		return (
			<View style={styles.container}>
				{
					/*<TouchableOpacity style={styles.menuTrigger} onPress={() => { this.openDrawer() }}>
							<View style={styles.menuTriggerInner}>
									<IconWithBadge name={'ios-menu'} size={37} color={'white'} ></IconWithBadge>
							</View>
					</TouchableOpacity>
					*/
				}
				<TouchableOpacity style={styles.menuTrigger} onPress={() => { }}>
					<View style={styles.menuTriggerInner}>
						<Image source={require('../../../../images/flashAuto.png')} />
					</View>
				</TouchableOpacity>

			</View>
		);
	}

	sync() {
		Alert.alert('I am syncing')
	}

	openCamera() {
		Navigation.push('AppStack', {
			component: {
				name: 'app.Camera',
			},
		})
	}
}


const styles = StyleSheet.create({
	container: {
		position: 'relative',
		top: 0,
		left: 0,
		height: 45,
		backgroundColor: 'black',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'row',
	},
	title: {
		flex: 5,
		alignItems: 'center',
		paddingHorizontal: 7
	},
	titleText: {
		fontSize: 21,
		color: 'black',
		fontFamily: fonts.primary,
	},
	barcode: {
		flex: 1,
		alignItems: 'flex-end',
		paddingHorizontal: 7
	},
	menuTrigger: {
		paddingLeft: 7
	}
})


export default TopNav