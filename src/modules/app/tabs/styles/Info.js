import { StyleSheet } from 'react-native';

import { colors } from "../../../_global/theme";

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 16,
		paddingBottom: 25
	},
	overview: {
		marginBottom: 15
	},
	overviewText: {
		color: 'white',//'#d2d2d2',
		fontSize: 14,
		paddingTop: 10,
		lineHeight: 22
	},
	label: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500'
	},
	value: {
		color: 'white',//'#d2d2d2',
		fontSize: 14
	},
	labelRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10
	},
	listHeading: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		marginTop: 30
	},
	listHeadingLeft: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	},
	flatListCats:{
		flex:1,
		backgroundColor: colors.gray
	},
});

export default styles;