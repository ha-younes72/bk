import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../_global/theme';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const cardWidth = 150;
const imgWidth = cardWidth - 10;
const margin = (deviceWidth - 2 * cardWidth) / 4;

const styles = StyleSheet.create({
	cardContainer: {
		//height: 231,
		width: cardWidth,
		justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: colors.primary,
		flexDirection: 'column',
		//marginRight: 10,
		marginHorizontal: margin,
		marginVertical: 7,
		borderRadius: 3,
		padding: 2
	},
	imgBack: {
        //flex: 8,
		//borderRadius: 5,
		//padding: 7,
        //width: 100,
        //backgroundColor: 'grey',
    },
	cardImage: {
		width: imgWidth,
		height: imgWidth-10,
		alignSelf: 'stretch',
        padding: 0,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3
	},
	cardTitleContainer: {
		flex: 1,
		paddingVertical: 7,
		justifyContent: 'center'
	},
	cardTitle: {
		color: 'white',
		fontSize: 15,
		fontWeight: '500',
		textAlign: 'center',
		paddingHorizontal: 1
	}
});

export default styles;
