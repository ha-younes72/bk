/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
var moment = require('moment');
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { API_URL } from '../../../constants/api';
import styles from './styles/CardThree.style';
import { colors } from '../../_global/theme';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

import { ActionSheet } from 'react-native-ui-lib'; //eslint-disable-line

import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';

import * as offsActions from '../actions';

class CardThree extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showActionSheet: false,
			pickedOption: ''
		}
	}

	pickOption(index) {
		console.log('Index: ', index);
		if (index && index !== 'cancel') {
			this.setState({
				pickedOption: index,
			}, () => {
				this.props.actions.addToWishlist(this.props.info, index, this.props.wishlistCounter);
			});
		}
	}

	render() {
		const { info, viewProduct, closebtn, index, prf } = this.props;
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewProduct.bind(this, info)}>
					<View style={styles.card}>
						<Image source={{ uri: `${API_URL}${(info.product.imgs[0] || info.poster)}` }} style={styles.cardImage} />
						<View style={styles.offrate}>
							<Image
								source={require('../../../../assets/images/off.png')}
								style={styles.offrateImg}
							/>

						</View>
						<View style={styles.cardDetails}>
							<Text
								style={styles.cardTitle}
								numberOfLines={3}>
								{info.product.name}
							</Text>
							<View style={styles.cardGenre}>
								<Text style={styles.cardGenreItem}>{info.category}</Text>
							</View>
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									{iconStar}
									<Text style={styles.cardStarRatings}>{4}</Text>
								</View>
								<Text style={styles.cardRunningHours} />
							</View>
							<Text style={styles.cardDescription} numberOfLines={3}>
								{info.product.desc}
							</Text>
						</View>

						{closebtn ?
							<View style={styles.cartButton}>
								<TouchableOpacity onPress={() => {
									this.props.actions.removeFromWishlist(index, this.props.wishlistCounter)
								}}>
									<Icon name="md-close" size={20} color="white" />
								</TouchableOpacity>
							</View>
							:
							<View style={styles.cartButton}>
								<TouchableOpacity onPress={() => { this.setState({ showActionSheet: !this.state.showActionSheet }) }}>
									<Icon name="md-cart" size={25} color="white" />
								</TouchableOpacity>
							</View>
						}

					</View>
					{
						prf ?
						<View>
							<Text> Preferences: {prf} </Text>
						</View> 
						:null
					}
				</TouchableOpacity>
				<ActionSheet
					title='Set preferences'
					message=''
					cancelButtonIndex={3}
					destructiveButtonIndex={0}
					//useNativeIOS={false}
					options={[
						{ label: 'Product and Store', onPress: () => this.pickOption('Product and Store') },
						{ label: 'Product', onPress: () => this.pickOption('Product') },
						{ label: 'Store', onPress: () => this.pickOption('Store') },
						{ label: 'cancel', onPress: () => this.pickOption('cancel') },
					]}
					visible={this.state.showActionSheet}
					onDismiss={() => this.setState({ showActionSheet: false })}
				/>
			</View>
		);
	}
}


function mapStateToProps(state, ownProps) {
	return {
		wishlistCounter: state.appReducer.wishlistCounter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(offsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThree);
