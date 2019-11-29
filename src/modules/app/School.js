import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, ScrollView, Animated, View, TouchableOpacity, Share, Alert } from "react-native";
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
  getTheme
} from "native-base";
import { Navigation } from 'react-native-navigation';
import customVariables from '../_global/variables';
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../images/profile.jpeg");
const cardImage = require("../../../images/index.jpeg");
import { colors } from "../_global/theme";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL } from "../../constants/api";
import ProgressBar from '../_global/ProgressBar';
import IconWithBadge from "../_global/Icons";
import { Input } from "react-native-elements";
import HTML from 'react-native-render-html';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';

class School extends Component {

  static options(passProps) {
    return {
      layout: {
        //direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
        //backgroundColor: 'white',
        orientation: ['portrait'] // An array of supported orientations
      },
    };
  }

  constructor(props) {
    super(props);
  }

  state = {
    cards: [1, 2],
    isLoading: true,
    maxHeight: 237,
    scrollViewMarginTop: 237 + 52,
    headerThreshold: 100,
    minHieght: 50,
    scrollY: new Animated.Value(0),
    showDefault: true,
    error: false
  }
  componentDidMount() {
    !this.props.myCoursesRetrived
    ? 
    this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
    : 
    null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCoursesTotal) {
      if (nextProps.myCourses.length === nextProps.myCoursesTotal){
        this.setState({
          isLoading: false,
          showMenu: false
        })   
      }
    }
    /*if (nextProps.myCoursesRetrived) {
      this.setState({
        isLoading: false,
        showMenu: false
      })
    }*/
  }

  render() {
    var image = this.state.showDefault ?
      require('../../../images/profile.jpeg') :
      this.state.error ? require('../../../images/profile.jpeg') : null
    myCoursesTest = [...this.props.myCourses, ...this.props.myCourses]
    const headerDistance = this.state.maxHeight - this.state.minHieght
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [this.state.maxHeight, this.state.minHieght],
      extrapolate: 'clamp',
    });
    const imageHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [200, this.state.minHieght],
      extrapolate: 'clamp',
    });
    const avatarMargin = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    });
    const avatarHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [140, 110],
      extrapolate: 'clamp',
    });
    const headerColor = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: ['rgba(77, 185, 197, 0.05)', 'rgba(77, 185, 197, 1)'],
      extrapolate: 'clamp',
    });

    return (
      <Container style={styles.container}>

        <Content
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            )
          }
          //scrollsToTop={headerHeight.__getValue() < 200 ? true : false}
          //scrollTo({x: 0, y: 0, animated: true})
          //enableAutomaticScroll
          //scrollEnabled={true}
          padder
          style={{ backgroundColor: colors.primaryBG }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            //style={{ marginTop: this.state.maxHeight }}
            //stickyHeaderIndices={0}
            scrollEventThrottle={16}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
              )
            }
            //scrollsToTop={headerHeight.__getValue() < 200 ? true : false}
            contentContainerStyle={{ marginTop: this.state.scrollViewMarginTop }}
          >
            {
              this.state.isLoading
                ?
                <ProgressBar color={'#D6B569'} />
                :
                this.props.myCourses.length > 0 ?
                  this.props.myCourses.map((item, index) => (
                    < Card key={index} style={styles.mb}>
                      <CardItem bordered>
                        <Thumbnail source={{ uri: IMG_URL + item.thumb }} />
                        <Body style={{ paddingLeft: 7, justifyContent: 'center' }}>
                          <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 12 }}>{item.title}</Text>
                          <Text note style={{ fontSize: 12, fontFamily: 'IRANSansMobile', textAlign: 'left' }}>
                            {item.time.split(' ')[0]}
                          </Text>
                        </Body>
                        <Right>
                          <Button
                            onPress={() => {
                              //Alert.alert('Id', String(item.id))
                              Navigation.push('AppStack', {
                                component: {
                                  name: 'app.CoursePreview',
                                  passProps: {
                                    index: index,
                                    type: 'buy'
                                  }
                                }
                              })
                              /*
                              Navigation.push('AppStack', {
                                component: {
                                  name: 'app.VideosList',
                                  passProps: {
                                    index: index
                                  }
                                }
                              })
                              */
                            }}
                            //iconLeft
                            style={{
                              backgroundColor: colors.primary
                            }}
                          >
                            {//<Icon name="play-circle" />
                            }
                            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 16 }}>مشاهده</Text>
                          </Button>
                        </Right>
                        {/*<Left>
                      <Thumbnail source={logo} />
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.time.split()[0]}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button
                        onPress={() => {
                          Navigation.push('AppStack', {
                            component: {
                              name:'app.VideosList',
                              passProps:{
                                index: index
                              }
                            }
                          })
                        }}
                        iconLeft
                        style={{
                          backgroundColor: colors.primary
                        }}
                      >
                        <Icon name="play-circle" />
                        <Text style={{ fontSize: 14 }}>تماشا</Text>
                      </Button>
                    </Right>*/
                        }
                      </CardItem>

                      <CardItem>
                        <Body>
                        <TouchableOpacity onPress={() => {
                                //Linking.openURL('https://mastershe.ir')
                                Navigation.push('AppStack', {
                                  component: {
                                    name: 'app.CoursePreview',
                                    passProps: {
                                      index: index,
                                      type: 'buy'
                                    }
                                  }
                                })
                              }}>
                          <Image
                            style={{
                              alignSelf: "center",
                              height: 150,
                              resizeMode: "cover",
                              width: deviceWidth / 1.18,
                              marginVertical: 5
                            }}
                            source={{ uri: IMG_URL + item.thumb }}
                          />
                          </TouchableOpacity>
                          
                          {//<HTML html={item.content}/>
                          }
                          {
                            <Text numberOfLines={7} style={{ fontFamily: 'IRANSansMobile', textAlign: 'justify' }}>
                              {item.content}
                              
                            </Text>
                          }
                        </Body>
                      </CardItem>
                      <CardItem bordered style={{ paddingVertical: 0 }}>
                        {/*
                    <Left>
                      <Button transparent>
                        <Icon name="thumbs-up" />
                        <Text>4,923 views</Text>
                      </Button>
                    </Left>
                  */}
                        <Right>
                          <Button
                            iconLeft
                            transparent
                            onPress={() => {
                              !this.props.favorites.includes(item.id)
                                ?
                                this.props.actions.addToMyFavorites(this.props.token, this.props.user.user_id, item.id)
                                :
                                this.props.actions.removeFromMyFavorites(this.props.token, this.props.user.user_id, item.id)
                            }}
                          >
                            <Icon
                              name={this.props.favorites.includes(item.id) ? "heart" : "heart-empty"}
                              style={{ color: !this.props.favorites.includes(item.id) ? colors.iconGray : colors.primary, fontSize: 20 }} />
                            <Text style={{ fontFamily: 'IRANSansMobile', color: colors.iconGray, fontSize: 16 }}>پسندیدم</Text>
                          </Button>
                        </Right>
                        <Right>
                          <Button
                            iconLeft
                            transparent
                            onPress={() => {
                              this.state.cIDCommented !== null && this.state.cIDCommented === item.id
                                ?
                                this.setState({
                                  cIDCommented: null
                                })
                                :
                                this.setState({
                                  cIDCommented: item.id
                                })
                            }}
                          >
                            <Icon name="text" style={{ color: colors.iconGray }} />
                            <Text style={{ fontFamily: 'IRANSansMobile', color: colors.iconGray, fontSize: 16 }}>نظر</Text>
                          </Button>
                        </Right>
                        <Right>
                          <Button
                            iconLeft
                            transparent
                            onPress={() => {
                              Share
                                .share({
                                  message: item.link,
                                  title: item.title
                                })
                                .then(res => {
                                  console.log('Share Result: ', res)
                                })
                                .catch(err => {
                                  console.log('Share Err: ', err)
                                })
                            }}
                          >
                            <Icon name="share-alt" style={{ color: colors.iconGray }} />
                            <Text style={{ fontFamily: 'IRANSansMobile', color: colors.iconGray, fontSize: 16 }}>بازنشر</Text>
                          </Button>
                        </Right>
                      </CardItem>
                      {
                        this.state.cIDCommented !== null && this.state.cIDCommented === item.id
                          ?
                          <CardItem bordered style={{ paddingVertical: 0 }}>
                            <Body>
                              <Input
                                inputStyle={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}
                                //placeholderStyle={{ color: 'green' }}
                                onChangeText={val => this.setState({ comment: val })}
                                placeholder={'نظر خود را وارد کنید'}
                                value={this.state.comment}
                              />
                            </Body>
                            <Button transparent onPress={() => {
                              //const text = event.nativeEvent.text
                              this.setState({
                                cIDCommented: null
                              }, () => {
                                console.log('Event: ', this.state.comment)
                                this.props.actions.addComment(
                                  this.props.token,
                                  this.state.comment,
                                  this.props.user.user_id,
                                  item.id
                                )
                              })
                            }}>
                              <Icon name="checkmark-circle-outline" style={{ color: colors.iconGray }} />
                            </Button>
                          </CardItem>
                          :
                          null
                      }
                      {/*<CardItem bordered style={{ paddingVertical: 0 }}>
                      <Left>
                        <Button iconLeft transparent onPress={() => this.setState({ liked: true })}>
                          <Icon name={this.state.liked ? "heart-empty" : "heart"} style={{ color: colors.iconGray, fontSize: 20 }} />
                          <Text style={{ color: colors.iconGray, fontSize: 16 }}>پسندیدم</Text>
                        </Button>
                      </Left>
                      <Body>
                        <Button iconLeft transparent>
                          <Icon name="text" style={{ color: colors.iconGray, fontSize: 20 }} />
                          <Text style={{ color: colors.iconGray, fontSize: 16 }}>نظر</Text>
                        </Button>
                      </Body>
                      <Right>
                        <Button iconLeft transparent>
                          <Icon name="share-alt" style={{ color: colors.iconGray, fontSize: 20 }} />
                          <Text style={{ color: colors.iconGray, fontSize: 16 }}>بازنشر</Text>
                        </Button>
                      </Right>
                      </CardItem>*/}
                    </Card>
                  ))
                  :
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ color: 'black' }}> لیست خالی است. </Text>
                  </View>
            }
          </ScrollView>
        </Content>

        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}>
          <Animated.View style={[{
            //position: 'absolute',
            //top: 0,
            //left: 0,
            backgroundColor: 'white', //"#00BFFF",
            height: 200,
          }, { height: imageHeight }]}>
            <Image style={{ width: '100%', height: '100%' }}
              source={require("../../../images/profileBanner.png")}
            ></Image>
          </Animated.View>
          {
            this.props.user.avatar === null ?
            <Animated.View
              style={[{
                width: 140,
                height: 140,
                borderRadius: 70,
                borderWidth: 2,
                borderColor: colors.primary,
                //marginBottom: 10,
                alignSelf: 'center',
                position: 'absolute',
                marginTop: 50,
                backgroundColor: 'lightgray',
                justifyContent: 'center',
                alignItems: 'center'
              }, { marginTop: avatarMargin, height: avatarHeight, width: avatarHeight }]} >
              <IconWithBadge name='ios-person' color={'white'} size={80} />
            </Animated.View>
            :
            <Animated.Image
              style={[{
                width: 140,
                height: 140,
                borderRadius: 70,
                borderWidth: 2,
                borderColor: colors.primary,
                //marginBottom: 10,
                alignSelf: 'center',
                position: 'absolute',
                marginTop: 50
              }, { marginTop: avatarMargin, height: avatarHeight, width: avatarHeight }]}
              source={image === null ? 
                { uri: !this.props.updated ? IMG_URL + this.props.user.avatar : this.props.user.avatar }
                : image
              }
              defaultSource={require('../../../images/profile.jpeg')}
              // onLoadStart={()=>this.setState({showDefault: true})}
              onLoadEnd={()=>this.setState({showDefault: false})}
              onError={()=>this.setState({error: true})}
              //{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }
            />
          }
          <View style={{ flexDirection: 'row', paddingBottom: 15, backgroundColor: 'white', justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'IRANSansMobile',
                color: 'black',
                //fontWeight: '600',
              }}>
              {this.props.user.name}
            </Text>
            {
              //<Text style={styles.job}>برنامه‌نویس اندروید</Text>
            }
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}>
          <Animated.View style={[{
            backgroundColor: headerColor,
            //headerHeight._value<this.state.headerThreshold ? `rgba(1, 1, 1, 1)` : `rgba(55, 88, 1, 0.6)`,
            width: '100%',
            height: this.state.maxHeight,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }, { /*opacity: headerHeight,*/ height: headerHeight }]}>
            <View >
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9 }}>
              <Title>دوره‌های من</Title>
            </View>
            {/*<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => {
                Navigation.push('AppStack', {
                  component: {
                    name: 'app.Favorites'
                  }
                })
              }}>
                <Icon name="heart" style={{ color: 'white' }} />
              </Button>
            </View>*/}
          </Animated.View>
          <View style={{ backgroundColor: colors.primaryBG, padding: 12 }}>
            <View
              style={{
                //marginHorizontal:15,
                //marginLeft: 12,
                //marginRight: 12,
                //width: '100%',
                backgroundColor: colors.secondaryBG,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingVertical: 7,
                position: 'relative',
                height: 40
              }}>
              <TouchableOpacity
                //active={this.state.seg === 1 ? true : false}
                onPress={() => {
                  Navigation.push('AppStack', {
                    component: {
                      name: 'app.About'
                    }
                  })
                }}
              >
                <Icon name='information-circle' style={{ color: colors.primary }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                //active={this.state.seg === 2 ? true : false}
                onPress={() => {
                  Navigation.push('AppStack', {
                    component: {
                      name: 'app.Profile'
                    }
                  })
                }}
              >
                <Icon name='person' style={{ color: colors.primary }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                //active={this.state.seg === 3 ? true : false}
                onPress={() => {
                  Navigation.push('AppStack', {
                    component: {
                      name: 'app.Favorites'
                    }
                  })
                }}
              >
                <Icon name='heart' style={{ color: colors.primary }}></Icon>
              </TouchableOpacity>
              {/*<TouchableOpacity
                //active={this.state.seg === 4 ? true : false}
                onPress={() => {
                  Navigation.push('AppStack', {
                    component: {
                      name: 'app.Tickets'
                    }
                  })
                }}
              >
                <Icon name='notifications' style={{ color: colors.primary }}></Icon>
              </TouchableOpacity>*/}
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
          <Button transparent onPress={() => this.state.showMenu ? this.props.actions.logOut(): null}>
            <Text style={{ fontFamily: 'IRANSansMobile', color: 'black' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
      </Container >
    );
  }
}


const styles = StyleSheet.create({
  container: {
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
    user: state.authReducer.user,
    userId: state.authReducer.user.user_id,
    myCourses: state.appReducer.myCourses,
    myCoursesMeta: state.appReducer.myCoursesMeta,
    favorites: state.appReducer.favorites,
    myCoursesRetrived : state.appReducer.myCoursesRetrived,
    myCoursesTotal : state.appReducer.myCoursesTotal,
    updated: state.authReducer.updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);