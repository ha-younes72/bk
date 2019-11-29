import React from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
var moment = require('moment');
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/CardOne.style';
import { API_URL } from '../../../constants/api';
import { colors } from '../../_global/theme';
import { ActionSheet } from 'react-native-ui-lib'; //eslint-disable-line

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from '../actions';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

class CardOne extends React.Component {
	//const CardOne = ({ info, viewProduct }) => {
	constructor(props) {
		super(props);
		this.state = {
			showActionSheet: false,
			pickedOption: ''
		}
	}

	pickOption(index) {
		console.log('Index: ', index);
		if (index && index!== 'cancel'){
			this.setState({
				pickedOption: index,
			}, ()=>{
				this.props.actions.addToWishlist(this.props.info, index, this.props.wishlistCounter);
			});
		}
	}

	render() {
		const { info, viewProduct } = this.props;
		console.log("Card One: ", `${API_URL}${(info.product.imgs[0] || info.poster)}`);
		return (
			<View style={{ position: 'relative' }}>
				<Image source={{ uri: `${API_URL}${(info.product.imgs[0] || info.poster)}` }} style={styles.imageBackdrop} />
				<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
				<View style={styles.cardContainer}>
					<Image source={{ uri: `${API_URL}${info.product.imgs[0]}` }} style={styles.cardImage} />
					<View style={styles.offrate}>
						<Image
							source={require('../../../../assets/images/off.png')}
							style={styles.offrateImg}
						/>

					</View>
					<View style={styles.date}>
						<Text style={styles.dateText}>
							{moment(info.startdate).format('MM-DD')} to {moment(info.enddate).format('MM-DD')}
						</Text>
					</View>
					<View style={styles.cardDetails}>
						<Text style={styles.cardTitle} numberOfLines={2}>
							{info.product.name}
						</Text>
						<View style={styles.cardGenre}>
							<Text style={styles.cardGenreItem}>{info.category}</Text>
						</View>
						<View style={styles.cardNumbers}>
							<View style={styles.cardStar}>
								{iconStar}
								<Text style={styles.cardStarRatings}>4.5</Text>
							</View>
							<Text style={styles.cardRunningHours} >
								${info.price}
							</Text>
						</View>
						<Text style={styles.cardDescription} numberOfLines={3}>
							{info.product.desc}
						</Text>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<TouchableOpacity activeOpacity={0.9} onPress={viewProduct.bind(this, info)}>
								<View style={styles.viewButton}>
									<Text style={styles.viewButtonText}>View Details</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({ showActionSheet: !this.state.showActionSheet})}>
								<View style={[styles.viewButton, { marginLeft: 7 }]}>
									{/* <Text style={styles.viewButtonText}>Add to Wishlist</Text>*/}
									<Icon name="md-cart" size={20} color="white" />
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
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
		)
	}
};


function mapStateToProps(state, ownProps) {
	return {
		//recommendedOffs: state.appReducer.recommendedOffs,
		//popularOffs: state.appReducer.popularOffs,
		//token: state.authReducer.token
		wishlistCounter: state.appReducer.wishlistCounter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(offsActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(CardOne);
