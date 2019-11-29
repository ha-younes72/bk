import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity, Alert, View, ScrollView, Animated } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  StyleProvider,
  getTheme,
  Form,
  Textarea
} from "native-base";
import customVariables from '../_global/variables';
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../images/profile.jpeg");
const cardImage = require("../../../images/index.jpeg");
import { colors } from "../_global/theme";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL, API_URL } from "../../constants/api";
import ProgressBar from '../_global/ProgressBar';
import IconWithBadge from "../_global/Icons";
import { Navigation } from 'react-native-navigation';
import Axios from "axios";
import ImagePicker from 'react-native-image-picker';
//var RNFS = require('react-native-fs');
//import RNFetchBlob from 'rn-fetch-blob'

class School extends Component {

  state = {
    cards: [],
    isLoading: true
  }
  componentDidMount() {

    Axios.get(API_URL + 'userpanel/tickets/get_tickets?api_token=' + this.props.token)
      .then(restick => {
        console.log('ticket responses: ', restick)
        restick.data.data.map(t => {
          Axios.get(API_URL + 'userpanel/tickets/' + t.id + '?api_token=' + this.props.token)
            .then(res => {
              console.log('ttRes', res)
              this.setState({
                cards: this.state.cards.concat(res.data.data),
                isLoading: false
              })
            })
            .catch(err => {
              console.log('ttErr', err)
              Alert.alert('خطا', 'قادر به دریافت نمونه کار  نبوده ایم!')
            })
        })
      })
      .catch(errtick => {
        console.log('ticket error: ', errtick.respones ? errtick.response : errtick)
        Alert.alert('خطا', 'قادر به دریافت نمونه کار ها نبوده ایم!')
      })
    //this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
  }

  componentWillUpdate() {
    //console.log('Watched Movies: ', this.props.watchedMovies)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCourses) {
      this.setState({
        isLoading: false
      })
    }

  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>


          {
            this.state.isLoading ?
              <ProgressBar />
              :
              //<Content padder>
              <ScrollView
                contentContainerStyle={{
                  padding: 15,
                  marginTop: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {
                  this.state.cards.map((card, index) => (
                    <Card style={{width:'100%'}}>
                      <CardItem>
                        <Left>
                          <Text>
                            کد:
                          </Text>
                        </Left>
                        <Body>
                          <Text>
                            {card.code}
                          </Text>
                        </Body>
                      </CardItem>
                      <CardItem>
                        <Left>
                          <Text>
                            موضوع:
                          </Text>
                        </Left>
                        <Body>
                          <Text>
                            {String(card.subject)}
                          </Text>
                        </Body>
                      </CardItem>
			  <CardItem>
                        <Left>
                          <Text>
                            وضعیت:
                          </Text>
                        </Left>
                        <Body>
                          <Text>
                            {card.status===0 ? 'در انتظار بررسی' : card.status===1 ? "در دست اقدام" :card.status===2 ? "پاسخ پشتیبانی" :card.status===3 ? "پاسخ کاربر" : ""}
                          </Text>
                        </Body>
                      </CardItem>

                    </Card>
                  ))
                }

              </ScrollView>
            //</Content>
          }

        </ScrollView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}>
          <View style={[{
            backgroundColor: 'rgba(1, 1, 1, 1)',
            //headerHeight._value<this.state.headerThreshold ? `rgba(1, 1, 1, 1)` : `rgba(55, 88, 1, 0.6)`,
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          },]}>
            <View >
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9 }}>
              <Title numberOfLines={1}>اعلان‌ها</Title>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => Navigation.pop(this.props.componentId)}>
                <Icon name="arrow-back" style={{ color: 'white' }} />
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 10,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.primary,
            //height: 25,
            backgroundColor: 'white',
            //backfaceVisibility: 'hidden',
            opacity: this.state.showMenu ? 1 : 0
          }}>
          <Button transparent onPress={() => this.props.actions.logOut()}>
            <Text style={{ color: 'black', fontFamily: 'IRANSansMobile' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});

//export default School;
function mapStateToProps(state, ownProps) {
  return {
    //allCourses: state.appReducer.allCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    token: state.authReducer.token,
    userId: state.authReducer.user.user_id,
    mobile: state.authReducer.user.mobile,
    myCourses: state.appReducer.myCourses,
    myCoursesMeta: state.appReducer.myCoursesMeta,
    watchedMovies: state.appReducer.watchedMovies,
    allWatched: state.appReducer.allWatched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
