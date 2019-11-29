import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import _ from 'lodash';

import styles from './styles/Trailers';
import { API_URL } from '../../../constants/api';

const Trailers = ({ details, getTabHeight }) => {
	const trailers = details.product.imgs;
	let computedHeight = (90 + 10) * trailers.length; // (thumbnail.height + thumbnailContainer.marginBottom)
	computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)

	return (
		<View style={styles.container} onLayout={getTabHeight.bind(this, 'trailers', computedHeight)}>
			{
				trailers.map((item, index) => (
					<TouchableOpacity key={index}>
						<View style={styles.thumbnailContainer}>
							{/*<Image source={{ uri: `${API_URL}${item}` }} style={styles.thumbnail} />
							*/}
							<Text style={styles.title}>{item}</Text>
						</View>
					</TouchableOpacity>
				))
			}
		</View>
	);
};



export default Trailers;
