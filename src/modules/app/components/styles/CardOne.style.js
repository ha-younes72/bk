import { StyleSheet } from 'react-native';
import { colors } from '../../../_global/theme';

const styles = StyleSheet.create({
	linearGradient: {
		top: 0,
		left: 0,
		right: 0,
		height: 248,
		position: 'absolute'
	},
	imageBackdrop: {
		// flex: 1,
		height: 248,
		backgroundColor: 'black'
	},
	cardContainer: {
		position: 'absolute',
		top: 32,
		right: 16,
		left: 16,
		flexDirection: 'row'
	},
	cardImage: {
		height: 184,
		width: 135,
		borderRadius: 3
	},
	offrate: {
		//position: 'absolute',
		//top: 0,
		//left: 0,
		//padding: 5,
		position: 'absolute',
		top: -15,
		left: -10,
		//backgroundColor:'rgba(0,0,0,0.2)',
		//backgroundColor: 'white',
		//transparent: 0.5,
		//width: 20,
		//height: 15,
		//borderRadius: 3,
		//borderWidth: 2,
		transform: [{ rotate: '-35deg' }],
		flexDirection: 'row'
	},
	offrateImg:{
		width: 70,
		height: 70
	},
	offrateText: {
		color: 'red',
		fontSize: 17
	},
	date: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		paddingVertical: 7,
		paddingRight: 15,
		paddingLeft: 15,
		backgroundColor: 'rgba(0,0,0, 0.1)'
	},
	dateText: {
		color: colors.primary,
		fontSize: 17
	},
	cardDetails: {
		paddingLeft: 10,
		flex: 1
	},
	cardTitle: {
		color: 'white',
		fontSize: 19,
		fontWeight: '500',
		paddingTop: 10
	},
	cardGenre: {
		flexDirection: 'row'
	},
	cardGenreItem: {
		fontSize: 11,
		marginRight: 5,
		color: 'white'
	},
	cardDescription: {
		color: '#f7f7f7',
		fontSize: 13,
		marginTop: 5
	},
	cardNumbers: {
		flexDirection: 'row',
		marginTop: 5
	},
	cardStar: {
		flexDirection: 'row'
	},
	cardStarRatings: {
		marginLeft: 5,
		fontSize: 12,
		color: 'white'
	},
	cardRunningHours: {
		marginLeft: 5,
		fontSize: 12
	},
	viewButton: {
		justifyContent: 'center',
		padding: 10,
		borderRadius: 3,
		backgroundColor: colors.primary,
		// width: 100,
		height: 30,
		marginTop: 10
	},
	viewButtonText: {
		color: 'white'
	}
});

export default styles;
