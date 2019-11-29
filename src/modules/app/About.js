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
  Animated
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
import { IMG_URL } from "../../constants/api";
import IconWithBadge from "../_global/Icons";
import { Navigation } from "react-native-navigation";

class AboutUs extends Component {

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
      showMenu: false,
      //isLoading: true,
      //isRefreshing: false
      maxHeight: 237,
      scrollViewMarginTop: 55,
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

  }

  componentWillReceiveProps(nextProps) {

  }



  render() {
    const userInfo = { fname: 'یونس', lname: 'حسنی عبداللهی', email: 'ha.younes72@gmail.com' };
    const name = userInfo.fname.toUpperCase() + ' ' + userInfo.lname.toUpperCase()
    //allCoursesTest = [...this.props.allCourses, ...this.props.allCourses]
    const headerDistance = this.state.maxHeight - this.state.minHieght
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [this.state.maxHeight, this.state.minHieght],
      extrapolate: 'clamp',
    });
    const imageHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [200, 0],
      extrapolate: 'clamp',
    });
    const avatarOpacity = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    const avatarMargin = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    });
    const avatarHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [140, 120],
      extrapolate: 'clamp',
    });
    const avatarTop = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [0, -70],
      extrapolate: 'clamp',
    });
    const headerColor = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: ['rgba(1, 1, 1, 0.05)', 'rgba(0.3, 0.72, 0.77, 1)'],
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
            <View style={[styles.container, { backgroundColor: 'white' }]}>
              <View style={[styles.header, { backgroundColor: null }]}>
                <Image
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                  source={require("../../../images/logomastershe.png")}>
                </Image>
              </View>
              <View style={{
                flex: 1,
                padding: 15,
                paddingTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={[styles.seperator, { width: 1000, marginTop: 20 }]}></View>
                <Text style={{ fontSize: 16, textAlign: 'justify', paddingTop: 20, color: 'black',fontFamily:'IRANSansMobile' }}>
                بیکلاس بستری برای آموزش در فضای مجازی است که با هدف توسعه عدالت آموزشی و امکان آموزش تحصیلی رایگان برای دانش آموزان در هر نقطه ای از ایران ایجاد شده است. فعالیت بی کلاس با تولید ساعت ها فیلم آموزشی مطالب کتاب‌های درسی  آغاز شد. اما آرزوهای ما محدود به فیلم‌های آموزشی تحصیلی نیست. در آینده‌ای نزدیک با توسعه زیرساخت‌های لازم، خدمات خود را گسترش خواهیم داد تا هر کس در هرکجا که هست بتواند بدون نیاز به کلاس، کتاب و معلم، به سادگی به مطالب آموزشی دسترسی داشته باشد.
              </Text >
              
              <Text style={{ fontSize: 16, textAlign: 'justify', color: 'black',fontFamily:'IRANSansMobile' }}>
              https://bkelas.ir/
              </Text>
              </View>
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
            backgroundColor: 'rgba(77, 185, 197, 1)',
            //headerHeight._value<this.state.headerThreshold ? `rgba(1, 1, 1, 1)` : `rgba(55, 88, 1, 0.6)`,
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          },]}>
            {/*<View >
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>*/}
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9, paddingLeft: 20, }}>
              <Title numberOfLines={1}>درباره ما</Title>
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
          <Button transparent onPress={() => this.state.showMenu ? this.props.actions.logOut(): null}>
            <Text style={{ color: 'black', fontFamily: 'IRANSansMobile' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
      
        </Container >
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    //allCourses: state.appReducer.allCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    user: state.authReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
