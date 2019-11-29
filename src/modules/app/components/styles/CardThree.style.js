import { StyleSheet } from 'react-native';
import { colors } from '../../../_global/theme';

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		marginHorizontal: 7,
		marginVertical: 5
	},
	card: {
		backgroundColor: colors.primary,
		borderRadius: 3,
		minHeight: 148,
		flexDirection: 'row',
		paddingRight: 16,
		overflow: 'hidden'
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
	offrateImg: {
		width: 70,
		height: 70
	},
	cardDetails: {
		paddingLeft: 10,
		flex: 1
	},
	cardImage: {
		height: 163,
		width: 120,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3
	},
	cardTitle: {
		color: 'white',
		fontSize: 13,
		fontWeight: '500',
		paddingTop: 10
	},
	cardGenre: {
		color: 'white',
		flexDirection: 'row'
	},
	cardGenreItem: {
		fontSize: 11,
		marginRight: 5
	},
	cardDescription: {
		color: 'white',
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
		color: 'white',
		marginLeft: 5,
		fontSize: 12
	},
	cardRunningHours: {
		marginLeft: 5,
		fontSize: 12
	},
	cartButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		flex: 1,
		padding: 7,
		backgroundColor: 'transparent'
	},
	closeButton:{
		position: 'absolute',
		width: 25,
		height: 25,
		top: 0,
		right: 0,
		flex: 1,
		//padding: 3,
		borderBottomLeftRadius: 30,
		//borderBottomRadius: 30,
		//borderColor: colors.primary
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
});

export default styles;