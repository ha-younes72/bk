import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

import styles from './styles/Casts';
import { API_URL } from '../../../constants/api';

const Casts = ({ info, getTabHeight }) => {
	let computedHeight = (80 + 15) * info.product.attributes.length; // (castImage.height + castContainer.marginBottom)
	computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)

	return (
		<View style={styles.container} onLayout={getTabHeight.bind(this, 'casts', computedHeight)}>
			{
				info.product.attributes.map(item => (
					
						<View key={item._id} style={styles.labelRow}>
							<Text style={styles.label}>{item.name}</Text>
							<Text style={styles.value}>{item.name}</Text>
							{/*<Image source={{ uri: `${API_URL}${item}` }} style={styles.castImage} />
						
						<View style={styles.characterContainer}>
							<Text style={styles.characterName}>
								{info.product.name}
							</Text>
							<Text style={styles.asCharacter}>
								{info.store.name && `as ${info.store.desc}`}
							</Text>
						</View>
						*/}
						</View>
						
					
				))
			}
		</View>
	);
};



export default Casts;
