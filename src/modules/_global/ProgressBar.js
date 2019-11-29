import React from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Platform
} from 'react-native';

import { colors } from "./theme";

const ProgressBar = (color) => (
	<View style={styles.progressBar}>
		<ActivityIndicator size="large" color={color ? color : colors.primary} />
	</View>
);

const styles = StyleSheet.create({
	progressBar: {
		flex: 1,
		justifyContent: 'center'
	}
});

export default ProgressBar;
