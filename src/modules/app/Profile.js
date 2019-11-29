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
  TextInput
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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Input,
  //	Button,
  //	CheckBox,
  //	Icon,
  //	Text
} from 'react-native-elements';

import customVariables from '../_global/variables';

import styles from './styles/Profile.style'
import TopNav from './components/TopNav';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../authentication/actions';
import { IMG_URL } from '../../constants/api';
import { colors } from '../_global/theme';
import IconWithBadge from '../_global/Icons';
import { Navigation } from 'react-native-navigation'
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
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
    this.state = {
      saveChanges: true,
      isEditing: false,
      showMenu: false,
      showDefault: true,
      error: false
      //isLoading: true,
      //isRefreshing: false
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

  onChangeName = (name) => {
    this.setState({
      name: name
    })
  }

  onChangeText = (userInfo, index, value) => {
    if (this.state.userInfo) {
      var temp = this.state.userInfo
      temp[index].value = value
      this.setState(
        {
          userInfo: temp
        }
      )
    } else {
      var temp = userInfo
      temp[index].value = value
      this.setState(
        {
          userInfo: temp
        }
      )
    }
    //if (this.props.message) this.rmError()
  }

  render() {
    var image = this.state.showDefault ?
      require('../../../images/profile.jpeg') :
      this.state.error ? require('../../../images/profile.jpeg') : null
    const userInfo = [
      {
        name: 'ایمیل',
        field: 'email',
        editable: false,
        value: this.props.user.email
      },
      {
        name: 'موبایل',
        field: 'mobile',
        editable: false,
        value: this.props.user.mobile
      },
      /*{
        name: 'بانک',
        field: 'account_bank',
        editable: true,
        value: this.props.user.account_bank
      },
      {
        name: 'کارت',
        field: 'account_kart',
        editable: true,
        value: this.props.user.account_kart
      },
      {
        name: 'شبا',
        field: 'account_shaba',
        editable: true,
        value: this.props.user.account_shaba
      },
      {
        name: 'اعتبار',
        field: 'credit',
        editable: false,
        value: this.props.user.credit
      },
      */

    ]
    const name = this.props.user.name
    return (
      <View style={{ flex: 1 }}>
        {/*
        <StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" />
              </Button>
            </Left>
            <Body>
              <Title>پروفایل</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.actions.logOut()}>
                <Text style={{ color: 'white' }}>خروج</Text>
                <Icon name="log-out" />
              </Button>
            </Right>
          </Header>
        </StyleProvider>
        */}

        <ScrollView
          style={styles.container}
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
                    }*/>
          <View style={styles.container}>
            {/*<View style={styles.header}>
              <Image style={{ width: '100%', height: '100%' }}
                source={require("../../../images/profileBanner.png")}
              ></Image>
            </View>
            */}
            {
              this.props.user.avatar === null ?
                <View style={[styles.avatar, { backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }]} >
                  <IconWithBadge name='ios-person' color={'white'} size={80} />
                </View>
                :
                <Image
                  style={[styles.avatar]}
                  source={image === null ?
                    {
                      uri: !this.state.videoSource ?
                        !this.props.updated ? IMG_URL + this.props.user.avatar : this.props.user.avatar
                        : this.state.videoSource.uri
                    } : image}
                  defaultSource={require('../../../images/profile.jpeg')}
                  // onLoadStart={()=>this.setState({showDefault: true})}
                  onLoadEnd={() => this.setState({ showDefault: false })}
                  onError={() => this.setState({ error: true })}
                //Ionicons.getImageSource('ios-person', 80, 'white')
                //}
                //{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }
                //{ uri: IMG_URL + this.props.user.avatar }
                />
              /*</View>*/
            }
            {this.state.isEditing ?
              <TouchableOpacity
                style={[styles.buttonContainer, { marginBottom: 5 }]}
                onPress={() => {

                  const options = {
                    title: 'Select Video',
                    mediaType: 'image',
                    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                    storageOptions: {
                      skipBackup: true,
                      path: 'images',
                    },
                  };

                  /**
                   * The first arg is the options object for customization (it can also be null or omitted for default options),
                   * The second arg is the callback which sends object: response (more info in the API Reference)
                   */
                  ImagePicker.launchImageLibrary(options, (response) => {
                    //console.log('Response = ', response);

                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log('User tapped custom button: ', response.customButton);
                    } else {
                      console.log('Image Response: ', response)
                      const source = {
                        uri: response.uri,
                        fileName: response.fileName,
                        fileSize: response.fileSize,
                        type: response.type,
                        path: response.path,
                      }
                      //Alert.alert('Image Picked', response.uri)
                      // You can also display the image using data:
                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                      this.setState({
                        videoSource: source,
                      });
                    }
                  });

                }}
              >
                {
                  <Text style={[styles.buttontext, {fontFamily: 'IRANSansMobile'}]}>انتخاب عکس</Text>

                }

              </TouchableOpacity>

              :
              null
            }
            <View style={styles.body}>
              <View style={styles.infoContent}>
                <View style={{ flexDirection: 'row', paddingBottom: 15 }}>

                  {
                    !this.state.isEditing ?
                      <Text style={[styles.name, { fontFamily: 'IRANSansMobile' }]}>{name}</Text>
                      :
                      <Input
                        onChangeText={val => this.onChangeName(val)}
                        // placeholder={}
                        value={this.state.name ? this.state.name : name}
                      // onFocus={() => { this.setState({ name: name }) }}
                      /*
                      onBlur={() => {
                        this.setState({
                          mobileError: validate('mobile', this.state.mobile)
                        })
                      }}
                      */
                      ></Input>
                  }
                </View>
                <View style={styles.seperator}></View>
                {
                  this.props.errors
                    ?
                    <View style={{ flex: 1 }}>
                      {Object.keys(this.props.errors).map((key, index) => (
                        <Text style={{ fontFamily: 'IRANSansMobile', color: 'red' }}>{this.props.errors[key][0]}</Text>
                      ))
                      }
                    </View>
                    :
                    null
                }
                {
                  this.state.userInfo ?
                    this.state.userInfo.map((item, index) => (
                      <View key={'Rows' + index} style={{ width: '100%', alignItems: 'flex-start' }}>
                        <View style={styles.row}>
                          <View style={styles.left}>
                            <Text style={[styles.leftText, { fontFamily: 'IRANSansMobile' }]}>
                              {item.name}:
                          </Text>
                          </View>
                          <View style={styles.right}>
                            {this.state.isEditing && item.editable === true
                              ?
                              <Input
                                onChangeText={val => this.onChangeText(userInfo, index, val)}
                                placeholder={String(item.value)}
                                value={
                                  this.state.userInfo
                                    ?
                                    String(this.state.userInfo[index].value)
                                    :
                                    String(userInfo[index].value)
                                }
                              /*
                              onBlur={() => {
                                this.setState({
                                  mobileError: validate('mobile', this.state.mobile)
                                })
                              }}
                              */
                              ></Input>
                              :
                              <Text style={[styles.rightText, { fontFamily: 'IRANSansMobile' }]}>
                                {item.value}
                              </Text>
                            }

                          </View>
                        </View>
                      </View>
                    ))
                    :
                    userInfo.map((item, index) => (
                      <View key={'Rows' + index} style={{ width: '100%', alignItems: 'flex-start' }}>
                        <View style={styles.row}>
                          <View style={styles.left}>
                            <Text style={[styles.leftText, { fontFamily: 'IRANSansMobile' }]}>
                              {item.name}:
                          </Text>
                          </View>
                          <View style={styles.right}>
                            {this.state.isEditing && item.editable === true
                              ?
                              <Input
                                onChangeText={val => this.onChangeText(userInfo, index, val)}
                                placeholder={String(item.value)}
                                value={
                                  this.state.userInfo
                                    ?
                                    String(this.state.userInfo[index].value)
                                    :
                                    String(userInfo[index].value)
                                }
                              /*
                              onBlur={() => {
                                this.setState({
                                  mobileError: validate('mobile', this.state.mobile)
                                })
                              }}
                              */
                              ></Input>
                              :
                              <Text style={[styles.rightText, { fontFamily: 'IRANSansMobile' }]}>
                                {item.value}
                              </Text>
                            }

                          </View>
                        </View>
                      </View>
                    ))
                }
                <View style={[styles.seperator, { marginTop: 20 }]}></View>
                {
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                      this.setState({
                        isEditing: !this.state.isEditing
                      }, () => {
                        !this.state.isEditing
                          ?
                          this.props.actions.updateUser(
                            this.state.videoSource ? this.state.videoSource : null,
                            this.state.name ? this.state.name : null,
                            this.props.userId,
                            this.props.token
                          )
                          :
                          null
                      })
                    }}
                  >
                    {
                      this.state.isEditing
                        ?
                        <Text style={[styles.buttontext, {fontFamily: 'IRANSansMobile'}]}>ثبت اطلاعات</Text>
                        :
                        <Text style={[styles.buttontext, {fontFamily: 'IRANSansMobile'}]}>ویرایش اطلاعات</Text>
                    }

                  </TouchableOpacity>

                }
              </View>
            </View>
          </View>
        </ScrollView>
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
          <Button transparent onPress={() => this.state.showMenu ? this.props.actions.logOut() : null}>
            <Text style={{ fontFamily: 'IRANSansMobile', color: 'black' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
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
            <View >
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9 }}>
              <Title>پروفایل</Title>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => {
                Navigation.pop(this.props.componentId)
              }}>
                <Icon name="arrow-back" style={{ color: 'white' }} />
              </Button>
            </View>
          </View>
        </View>
      </View>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    //allCourses: state.appReducer.allCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    token: state.authReducer.token,
    userId: state.authReducer.user.user_id,
    user: state.authReducer.user,
    errors: state.authReducer.errors,
    updated: state.authReducer.updated,
    //myCourses: state.appReducer.myCourses,
    //myCoursesMeta: state.appReducer.myCoursesMeta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

//export default Profile;
