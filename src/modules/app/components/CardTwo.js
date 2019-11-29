import React from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import styles from './styles/CardTwo.style';
import { API_URL } from '../../../constants/api';
const temp = 'https://cryptic-bastion-18400.herokuapp.com/public/61URaCFWKwL._SL1500_.jpg';


const CardTwo = ({ info, viewOffsList }) => (

	<TouchableOpacity activeOpacity={0.8} onPress={viewOffsList.bind(this, info.name, info.name)}>
		<View style={styles.cardContainer}>
			<View style={styles.imgBack}>
				<Image
					source={{ uri: temp/*`${API_URL}${info.poster}`*/ }}
					style={styles.cardImage} />

			</View>

			<View style={styles.cardTitleContainer}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.name}
				</Text>
			</View>
		</View>
	</TouchableOpacity>
);

export default CardTwo;
