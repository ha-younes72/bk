import React from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native'

/*import {
    Toast
} from 'native-base'*/

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const cardWidth = 150;
const imgWidth = cardWidth - 10;
const margin = 7//(deviceWidth - 2 * cardWidth) / 4;

import Icon from 'react-native-vector-icons/Ionicons';
import { API_URL } from '../../../constants/api';
//import IconWithBadge from './Icons';
import { colors, fonts } from '../../_global/theme'
import { ActionSheet } from 'react-native-ui-lib';
//import console = require('console');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from '../actions';


/*
class InfoRow extends React.Component {
    render() {
        const { title, info } = this.props;
        return (
            <View style={[styles.infoRow, this.props.style]}>
               
               <View style={styles.titleView}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        {info}
                    </Text>
                </View>
            </View>
        )
    }
}
*/
/*
<InfoRow style={{flex:1}} title={"Name"} info={src.name}/>
                <InfoRow style={{flex:1}} title={"Price"} info={src.price}/>
                <InfoRow style={{flex:1}} title={"Off"} info={src.offrate}/>
                <InfoRow style={{flex:1}} title={"Store"} info={src.store}/>
*/
/*
<InfoRow style={{ flex: 1 }} title={"Name"} info={src.name} />
                <InfoRow style={{ flex: 1 }} title={"Price"} info={src.price} />
                <InfoRow style={{ flex: 1 }} title={"Off"} info={src.offrate+'%'} />
                <InfoRow style={{ flex: 1 }} title={"Store"} info={src.store} />
                
*/
class Card extends React.Component {
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
                this.props.actions.addToWishlist(this.props.off, index, this.props.wishlistCounter);
            });
        }
    }

    render() {
        const { off, viewProduct } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imgBack}>

                    <Image style={styles.img}
                        source={{ uri: `${API_URL}${(off.product.imgs[0] || off.poster)}` }}>
                    </Image>
                    <View style={styles.offrate}>
                        <Image
                            source={require('../../../../assets/images/off.png')}
                            style={styles.offrateImg}
                        />

                    </View>
                    {/*
                        <View style={{

                            
                            position: 'absolute',
                            top: 5,
                            left: -10,
                            backgroundColor: 'white',
                            transparent: 0.5,
                            //width: 20,
                            //height: 15,
                            borderRadius: 3,
                            borderWidth: 2,
                            transform: [{ rotate: '-45deg' }],
                            //borderColor: colors.primary,
                            //backgroundColor: 'white',
                        }}>
                            <Text style={{ color: 'red', paddingHorizontal: 5 }}>{off.offrate}% Off</Text>
                        </View>
                    */}
                </View>

                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'flex-start',

                }}>
                    <View style={[styles.textView, styles.nameView]}>
                        <Text numberOfLines={1} style={styles.text}>
                            {off.product.name}
                        </Text>
                    </View>


                    <View style={[
                        styles.textView,
                        styles.priceView,
                        {
                            backgroundColor: 'white',
                            justifyContent: 'space-between'
                        }]}>
                        <Text style={[styles.text, { paddingLeft: 10, color: 'red', fontSize: 13 }]}>
                            {off.price}$
                        </Text>
                        {/*
                            <Text style={styles.text}>
                                - {src.offrate} % =>
                        </Text>*/
                        }
                        <Text style={[styles.text, { paddingRight: 10, color: 'green', fontSize: 17 }]}>
                            {JSON.parse(off.price) - JSON.parse(off.price) * (JSON.parse(off.offrate) / 100)}$
                        </Text>
                    </View>
                    <View style={styles.textView} >
                        <Text numberOfLines={1} style={styles.text}>
                            {off.store.name}- {off.store.desc}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            showActionSheet: true
                        })
                        //this.props.actions.addToWishlist(off);

                        /*if (screenProps.Counter) {
                            screenProps.Counter = screenProps.Counter + 1
                            console.log("screenProps.Counter", screenProps.Counter)
                            screenProps.cartProducts.push(off)
                        } else {
                            console.log("screenProps.Counter does not exist")
                            screenProps.Counter = 1
                            console.log("screenProps.Counter", screenProps.Counter)
                            screenProps.cartProducts = [off]
                        }
                        console.log("screenProps", screenProps)
                        //console.log("Counter", screenProps.Counter)
                        //alert("Succesfully added to wishlist")
                        Toast.show({
                            text: "Succesfully added to wishlist",
                            buttonText: "Okay",
                            type: 'success',
                            duration: 1000
                        })*/
                    }}>
                        {
                            /*
                            <View style={styles.infoRow}>
                                <Icon style={{
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    padding: 2
                                }}
                                    name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                                    color="white"
                                    size={14}
                                />
                                <Text style={styles.title}>
                                    Add to Wishlist
                            </Text>
                            </View>
                            */
                        }
                        <View style={styles.infoRow}>
                            <Icon style={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                padding: 2,
                                marginRight: 10
                            }}
                                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                                color="white"
                                size={17}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={viewProduct.bind(this, off)}>
                        <View style={styles.infoRow}>
                            {/*<Icon style={{
                                alignItems: 'center',
                                alignSelf: 'center',
                                padding: 2
                            }}
                                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                                color="white"
                                size={14}
                            />
                        */}
                            <Text style={styles.title}>
                                View Details
                            </Text>
                        </View>

                    </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    container: {
        padding: 3,
        backgroundColor: colors.primary,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: cardWidth,
        marginHorizontal: margin,
        marginVertical: 5,
        zIndex: 1000
    },
    imgBack: {
        flex: 8,
        borderRadius: 5,
        //width: 100,
        backgroundColor: 'grey',
    },
    img: {
        position: 'relative',
        height: imgWidth - 10,
        width: imgWidth,
        alignSelf: 'stretch',
        padding: 7
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
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center'
        //alignItems: 'flex-start',
        //justifyContent: 'space-between'
    },
    titleView: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    textView: {
        flex: 1,
        //width: '100%',
        justifyContent: 'flex-start'
    },
    title: {
        color: colors.textColor,
        //fontFamily: fonts.primary,
        fontSize: 13,
        textAlign: 'left'
        //alignSelf: 'flex-start'
        //fontWeight: 'bold'
    },
    text: {
        color: colors.textColor,
        //fontFamily: fonts.primary,
        fontSize: 12,
        fontWeight: 'normal',
        //textAlign: 'right'
    },
    nameView: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 3
    },
    priceView: {
        flexDirection: 'row'
    }
})

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


export default connect(mapStateToProps, mapDispatchToProps)(Card);

//export default Card

