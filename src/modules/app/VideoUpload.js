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
import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');

class VideoUpload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [1, 2],
      isLoading: true
    }
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    //this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
  }

  componentWillUpdate() {
    console.log('Watched Movies: ', this.props.watchedMovies)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCourses) {
      this.setState({
        isLoading: false
      })
    }
    /*if (nextProps.watchedMovies) {
      console.log('You watched again')
      var allWatched = true
      this.props.myCourses[this.props.index].episodes.data.map((item, index) => {
        console.log('Watched Movies: ', this.props.watchedMovies)
        if (this.props.watchedMovies[this.props.myCourses[this.props.index].id].includes(item)) {
          console.log(item + ' Watched!!!!!!!')
          this.setState({
            allWatched
          })
        } else {
          allWatched = false
          this.setState({
            allWatched
          })
        }
      })
    }*/
  }

  render() {
    return (
      <Container style={styles.container}>
        <StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent >
                <Icon name="more" />
              </Button>
            </Left>
            <Body>
              <Title>ارسال نمونه کار</Title>
            </Body>
          </Header>
        </StyleProvider>

        <ScrollView contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: colors.gray,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }} //style={{ flex: 1, justifyContent : 'center', alignItems: 'center' }}
        >

          <Text style={{ fontFamily: 'IRANSansMobile', paddingBottom: 7 }}>ویدیو و نظر مربوط به کار خود را وارد نموده و آپلود کنید.</Text>

          {

            <TouchableOpacity
              onPress={() => {

                const options = {
                  title: 'Select Video',
                  mediaType: 'video',
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
                /*Navigation.push(this.props.componentId, {
                  component: {
                    name: 'app.Gallery',
                    options: {
                      topBar: {
                        visible: false
                      }
                    }
                  }
                })*/
              }}
              style={{
                //flex: 1,
                width: '45%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: 1,
                //marginRight: 10,
                borderWidth: 2,
                borderRadius: 5,
                borderStyle: 'dashed',
                borderColor: colors.primary
              }}
            >
              <Icon name='ios-cloud-outline' style={{ fontSize: 76, color: colors.primary }}></Icon>
              <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14 }}>فایل خود را انتخاب کنید</Text>
            </TouchableOpacity>

          }
          {
            this.state.videoSource ?
              <Text style={{ fontFamily: 'IRANSansMobile' }}>
                {this.state.videoSource.path}
              </Text>
              :
              null
          }
          {
            this.state.percentage ?
              <View style={{ width: '100%' }}>
                <Animated.View
                  style={{
                    marginTop: 10,
                    width: '' + this.state.percentage + '%',
                    height: 5,
                    backgroundColor: colors.primary
                  }}>
                </Animated.View>
              </View>
              :
              null
          }
          <View
            style={{
              //width: '100%',
              //flex: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5,
              marginTop: 10
            }}
          >
            <Form style={{ flex: 1, paddingRight: 3 }}>
              <Textarea
                onChangeText={(val) => {
                  this.setState({
                    content: val
                  })
                }}
                rowSpan={7}
                bordered
                placeholder="توضیحات خود را وارد نمایید"
                style={{
                  borderRadius: 7,
                  backgroundColor: 'white'
                }}
              />
            </Form>
          </View>


        </ScrollView>
        <TouchableOpacity
          style={{
            //flex: 1,
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 50,
            marginTop: 40,
            backgroundColor: colors.primary,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 7
          }}
          onPress={() => {
            if (!this.state.content) {
              Alert.alert('خطا', 'لطفا توضیحات خود را وارد نمایید')
              return false
            }
            if (!this.state.videoSource) {
              Alert.alert('خطا', 'لطفا ویدیو را انتخاب نمایید')
              return false
            }
            console.log('Video to be uploaded: ', this.state.videoSource)
            token = 'Bearer ' + this.props.token
            RNFS
              .stat(this.state.videoSource.path)
              .then(statRes => {
                console.log('Stat Result: ', statRes)
              })
              .catch(err => {
                console.log('Stat Err: ', err)
              })
            var uploadUrl = API_URL + 'userpanel/tickets/store';

            var files = [{
              name: 'file',
              filename: 'TestFile', // this.state.videoSource.fileName,
              filepath: this.state.videoSource.path,
              //filetype: this.state.videoSource.type
            }];

            var uploadBegin = (response) => {
              var jobId = response.jobId;
              console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
              //Alert.alert('UPLOAD HAS BEGUN! JobId: ' + jobId);
            };

            var uploadProgress = (response) => {
              var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
              this.setState({
                percentage
              })
              console.log('UPLOAD IS ' + percentage + '% DONE!');
            };

            // upload files
            RNFS.uploadFiles({
              toUrl: uploadUrl,
              files: files,
              method: 'POST',
              headers: {
                //'Accept': 'application/json',
                'Authorization': token
              },
              fields:
              {
                content: JSON.stringify(this.state.content),
                user_id: JSON.stringify(this.props.userId),
                subject: JSON.stringify('موضوع تست'),
                mobile: JSON.stringify(this.props.mobile)
              },
              begin: uploadBegin,
              progress: uploadProgress
            }).promise.then((response) => {
              if (response.statusCode == 200) {
                console.log('FILES UPLOADED!', response); // response.statusCode, response.headers, response.body
                //newObservations[currentIndex].img = newObservations[currentIndex].img.uri
                //dispatch(uploadNewObservationSuccess(newObservations[currentIndex], currentIndex))
                //Alert.alert('Success', 'Observation Uploaded!')
                //console.log('Put New Response: ', response)
              } else {
                //dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
                //Alert.alert('SERVER ERROR', JSON.stringify(response))
                console.log('SERVER ERROR');
              }
            })
              .catch((err) => {
                if (err.description === "cancelled") {
                  console.log('Upload Cancelled')
                  // cancelled by user
                }
                //dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
                //Alert.alert('ERROR', JSON.stringify(err))
                console.log('Err Uploading: ', err);
              });
          }}>
          <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 20, color: 'white' }}>
            ارسال
            </Text>
        </TouchableOpacity>


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
    mobile: state.authReducer.user.mobile,
    userId: state.authReducer.user.user_id,
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoUpload);
