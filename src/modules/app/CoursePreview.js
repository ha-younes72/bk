//import _ from 'lodash';
import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Animated,
  Linking,
  Dimensions,
  Alert
} from 'react-native'

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body,
  StyleProvider,
  getTheme,
  Segment,
} from "native-base";
import customVariables from '../_global/variables';

import styles from './styles/About.style'
import TopNav from './components/TopNav';
import { colors } from '../_global/theme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL, API_URL } from "../../constants/api";
import IconWithBadge from "../_global/Icons";
const deviceWidth = Dimensions.get("window").width;
import { Navigation } from 'react-native-navigation'
import axios from 'axios';
//import API_URL from '../../constants/api'
import HTML from 'react-native-render-html';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';

class CoursePreview extends Component {
  static options(passProps) {
    return {
      layout: {
        //direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
        backgroundColor: 'white',
        orientation: ['portrait'] // An array of supported orientations
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      saveChanges: true,
      //isLoading: true,
      //isRefreshing: false
      maxHeight: 50,
      scrollViewMarginTop: 50 + 66,
      headerThreshold: 100,
      minHieght: 50,
      scrollY: new Animated.Value(0),
    };
  }
  componentDidAppear() {
  }

  componentDidDisappear() {
  }

  componentDidMount() {
    if (this.props.type !== 'buy') {
      const id = this.props.type !== 'fav'
        ? course = this.props.allCourses[this.props.index].id
        : course = this.props.myFavCourses[this.props.index].id
      axios
        .get(API_URL + 'courses/' + id + '?api_token=' + this.props.token)
        .then(res => {
          //crss.concat(res.data.data)
          this.setState({
            course: res.data.data
          })
          console.log('Crs Response: ', res.data.data)
          //return res.data.data
        })
        .catch(error => {
          Alert.alert('خطا', 'متاسفانه قادر به دریافت اطلاعات دوره نبودیم')
          console.log('Crs Error: ', error.response ? error.response : error)
        })
    } else {
      this.setState({
        course: this.props.myCourses[this.props.index]
      }, () => console.log('Course: ', this.state.course))
    }
  }

  componentWillReceiveProps(nextProps) {

  }



  render() {
    var course = null
    this.props.type !== 'fav'
      ?
      this.props.type !== 'buy'
        ?
        course = this.props.allCourses[this.props.index]
        :
        course = this.props.myCourses[this.props.index]
      :
      course = this.props.myFavCourses[this.props.index]
    //allCoursesTest = [...this.props.allCourses, ...this.props.allCourses]
    const headerDistance = this.state.maxHeight - this.state.minHieght
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [this.state.maxHeight, this.state.minHieght],
      extrapolate: 'clamp',
    });
    const imageHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    });
    const avatarOpacity = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    const avatarMargin = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    });
    const avatarHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [120, 120],
      extrapolate: 'clamp',
    });
    const avatarTop = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [-70, -70],
      extrapolate: 'clamp',
    });
    const headerColor = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: ['rgba(1, 1, 1, 1)', 'rgba(1, 1, 1, 1)'],
      extrapolate: 'clamp',
    });

    const headerBtnColor = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: ['rgba(1, 1, 1, 0.1)', colors.primary],
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
          //padder
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView
            //style={[styles.container, { backgroundColor: null }]}
            showsVerticalScrollIndicator={false}
            /*refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    colors={[colors.primary]}
                    tintColor="white"
                    title="loading..."
                    titleColor="white"
                    progressBackgroundColor="white"
                />
            }*/
            scrollEventThrottle={16}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
              )
            }
            //scrollsToTop={headerHeight.__getValue() < 200 ? true : false}
            contentContainerStyle={{ marginTop: this.state.scrollViewMarginTop }}
          >
            <View
              style={{
                backgroundColor: 'white',
                //flex: 1,
                width: deviceWidth,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Card style={{
                marginBottom: 15,
                width: '100%'
              }}>
                <CardItem style={{}}>
                  <Body>
                    <Image
                      style={{
                        alignSelf: "center",
                        height: 150,
                        resizeMode: "cover",
                        width: '100%', //deviceWidth / 1.18,
                        marginVertical: 5
                      }}
                      source={{ uri: IMG_URL + course.thumb }}
                    />
                    {//<HTML html={course.content}/>
                    // <View style={{width: '100%', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                    //  <Text style={{fontSize: 16, fontFamily: 'IRANSansMobile'}}>قیمت دوره(ریال):</Text>
                    //  <Text style={{fontSize: 16, fontFamily: 'IRANSansMobile'}}>{'    '}{course.price}{'    '}</Text>
                    // </View>
                    }
                    
                    {
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'IRANSansMobile',
                        textAlign: 'justify',
                        paddingTop: 20,
                        color: 'black'
                      }}>
                      {course.content}
                    </Text>
                    }
                  </Body>
                </CardItem>
              </Card>
              {/*<View style={{
                flex: 1,
                padding: 15,
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ fontSize: 16, textAlign: 'justify', paddingTop: 20, color: 'black' }}>
                  {course.content}
                </Text>
            </View>*/}
              {
                /*this.state.course && this.state.course.parts.data.length > 0 &&
                <View
                  style={{
                    width: '100%',
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.primary,
                    //borderTopColor: colors.primary,
                    //borderTopWidth: 1,
                    marginBottom: 10
                  }}>
                  <Text style={{ fontSize: 20, color: 'black' }}>سر فصل‌ها</Text>
                </View>
                */
              }
              <View style={{ paddingHorizontal: 15, width: '100%', justifyContent: 'flex-start', paddingBottom: 20 }}>
                {
                  this.state.course ?
                    this.state.course.parts.data.map((ep, idx) => (
                      <Card
                        key={idx}
                        style={{
                          //fontSize: 16,
                          //color: 'gray',
                          margin: 15,
                          marginTop: 20,
                          //borderWidth: 1,
                          //borderColor: colors.primary,
                          //borderRadius: 4
                        }}>
                        <CardItem style={{ paddingTop: 0 }}>
                          <TouchableOpacity
                            style={{ width: '100%' }}
                            onPress={() => {
                              this.props.type !== 'buy'
                                ?
                                Alert.alert('خطا', 'برای مشاهد ویدیوها باید ابتدا دوره را خریداری نمایید!')
                                :
                                Navigation.push('AppStack', {
                                  component: {
                                    name: 'app.VideosList',
                                    passProps: {
                                      index: this.props.index,
                                      partNumber: ep.number,
                                      course_id: ep.course_id,
                                      title: ep.title,
                                      ctitle: course.title,
                                      content: ep.content,
                                      id: ep.id
                                    }
                                  }
                                })
                            }}
                          >
                            <View
                              style={{
                                position: 'relative',
                                top: -20,
                                right: 0,
                                padding: 5,
                                width: '50%',
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                //fontSize: 19,
                                //color: 'white',
                                //paddingBottom: 5,
                                backgroundColor: colors.primary,
                              }}
                            >
                              <Text
                                style={{
                                  //position: 'relative',
                                  //top: -25,
                                  //right: 0,
                                  fontSize: 17,
                                  fontFamily: 'IRANSansMobile',
                                  color: 'white',
                                  //paddingBottom: 5,
                                  //backgroundColor: colors.primary,
                                }} >
			    {`فصل ${idx+1}`}
                              </Text>
                            </View>

                            {//<HTML html={ep.content}/>
                            }
                            
                            <Text
                              numberOfLines={3}
                              style={{
                                fontSize: 16,
                                fontFamily: 'IRANSansMobile',
                                color: 'gray',
                                padding: 10,
                                //margin: 15,
                                //marginTop: 10,
                                borderWidth: 2,
                                borderStyle: 'dotted',
                                borderColor: colors.primary,
                                borderRadius: 4,
                                textAlign: 'justify'
                              }} >
                              {ep.title}
                            </Text>
                            
                          </TouchableOpacity>
                        </CardItem>
                      </Card>
                    ))
                    :
                    null
                }
              </View>
              {
                this.state.course
                  ?
                  <Card style={{ width: '100%', padding: 20 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                      <View
                        style={{
                          width: '40%',
                          aspectRatio: 1,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: colors.primary,
                          marginBottom: 10
                        }}
                      >
                        <Image
                          //large
                          style={{ width: '100%', height: '100%', borderRadius: 100 }}
                          source={{
                            uri: course.teacher_avatar !== null ? IMG_URL + course.teacher_avatar : IMG_URL + course.thumb
                          }}
                        //defaultSource={{ uri: IMG_URL + course.thumb }}
                        />
                      </View>
                      <View style={{ paddingLeft: 7, justifyContent: 'center', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 19, fontFamily: 'IRANSansMobile', color: 'black' }}>استاد دوره: </Text>
                        <Text note style={{ fontFamily: 'IRANSansMobile', fontSize: 17 }}>{this.state.course.teacher}</Text>
                      </View>
                    </View>
                  </Card>
                  : null
              }
            </View>
          </ScrollView>


        </Content>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}>
          <View style={[{
            backgroundColor: 'rgba(77, 185, 197, 1)',//headerColor,
            //headerHeight._value<this.state.headerThreshold ? `rgba(1, 1, 1, 1)` : `rgba(55, 88, 1, 0.6)`,
            width: '100%',
            height: this.state.minHeight,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }, { /*opacity: headerHeight,*/}]}>
            {/*<View >
              <Button transparent  onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>*/}
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9, paddingLeft: 20, }}>
              <Title>درباره دوره</Title>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => Navigation.pop(this.props.componentId)}>
                <Icon name="arrow-back" style={{ color: 'white' }} />
              </Button>
            </View>
          </View>
          <View transparent style={{
            //marginBottom: 15,
            width: '100%',
            borderWidth: 0,
            margin: 0
          }}>
            <CardItem bordered style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Thumbnail source={{ uri: IMG_URL + course.thumb }} />
              <Body style={{ paddingLeft: 7, justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'IRANSansMobile', fontSize: this.props.type === 'buy' ? 17 : 15, fontWeight: 'bold' }}>
                  {course.title}
                </Text>
                {//<Text style={{fontFamily:'IRANSansMobile'}} note>{course.time}</Text>
                }
              </Body>
              {
                this.props.type !== 'buy' ?
                  <Body
                    style={{
                      //backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Button
                      textStyle={{ padding: 0 }}
                      style={{
                        backgroundColor: colors.primary,
                        padding: 0,
                        width: '80%',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => {
                        //Linking.openURL('https://mastershe.ir')
                        Linking.openURL(course.link)
                      }}
                    >
                      {/*<Icon name="pricetags" />*/}
                      <Text style={{ fontSize: 18, fontFamily: 'IRANSansMobile', color: 'white' }}>خرید دوره</Text>
                    </Button>
                  </Body>
                  :
                  null
              }
            </CardItem>
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
            <Text style={{ color: 'black', fontFamily: 'IRANSansMobile' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
      </Container >
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});
*/
function mapStateToProps(state, ownProps) {
  return {
    allCourses: state.appReducer.allCourses,
    myFavCourses: state.appReducer.myFavCourses,
    myCourses: state.appReducer.myCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    user: state.authReducer.user,
	  token: state.authReducer.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePreview);
