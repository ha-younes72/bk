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
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import RNBackgroundDownloader from 'react-native-background-downloader';

let task = null;

class School extends Component {

  state = {
    cards: {},
    isLoading: true,
  }
  async componentDidMount() {

    let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
    for (let lostTask of lostTasks) {
      // Alert.alert(`Task ${lostTask.id} was found!`);
      // this.setState({ expectedBytes: 1000 })
      lostTask.progress((percent) => {
        const cards = this.state.cards;
        cards[lostTask.id] = cards[lostTask.id] ?
          { ...cards[lostTask.id], percent: `${parseInt(percent * 100)}%` } : { percent: `${parseInt(percent * 100)}%` }
        this.setState({ cards: cards })
        this.props.actions.updateMyCourseParts(lostTask.id, 'percent', `${parseInt(percent * 100)}%`)
        // console.log(`Downloaded: ${percent * 100}%`);
      }).done(() => {
        const cards = this.state.cards;
        cards[lostTask.id] = cards[lostTask.id] ?
          { ...cards[lostTask.id], done: true, percent: `${1 * 100}%` } : { done: true, percent: `${1 * 100}%` }
        this.setState({ cards: cards })
        this.props.actions.updateMyCourseParts(lostTask.id, 'done', true)
        this.props.actions.updateMyCourseParts(lostTask.id, 'percent', `${1 * 100}%`)
        this.props.actions.updateMyCourseParts(lostTask.id, 'icon', `ios-play`)
        // this.setState({ done: true, percent: `${1 * 100}%` })
        // console.log('Downlaod is done!');
      }).error((error) => {
        this.props.actions.updateMyCourseParts(lostTask.id, 'error', true);
        var path = `${RNBackgroundDownloader.directories.documents}/video_${cId}_${eId}.mp4`;

        RNFS.unlink(path)
          .then(() => {
            console.log('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch((err) => {
            console.log(err.message);
          });
        Alert.alert('دانلود پشت زمینه دچار مشکل شد: ', JSON.stringify(error));
      });
    }

    if (this.props.parts && this.props.parts[this.props.id]) {
      this.props.parts[this.props.id].data.map((item, index) => {
        RNFS
          .stat(`${RNBackgroundDownloader.directories.documents}/video_${this.props.course_id}_${item.number}.mp4`)
          .then(statRes => {
            console.log(2222, statRes);
            const cards = this.state.cards;
            cards[`video_${this.props.course_id}_${item.number}`] = cards[`video_${this.props.course_id}_${item.number}`] ?
              { ...cards[`video_${this.props.course_id}_${item.number}`], exists: true } : { exists: true }
            this.setState({ cards: cards })
            this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'exists', true);
            this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'size', statRes.size);

          })
          .catch(err => {
            const cards = this.state.cards;
            cards[`video_${this.props.course_id}_${item.number}`] = cards[`video_${this.props.course_id}_${item.number}`] ?
              { ...cards[`video_${this.props.course_id}_${item.number}`], exists: false } : { exists: false }
            this.setState({ cards: cards })
            this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'exists', false);
            // Alert.alert('Stat Err: ', JSON.stringify(err))
          })
      })
      this.setState({ isLoading: false })
    } else {
      this.props.token !== "OFFLINE"
        ? this.props.actions.retrieveMyCourseParts(this.props.id)
        : Alert.alert('آفلاین', 'برای دریافت اطلاعات این دوره لطفا آنلاین شوید.')
    }
  }

  componentWillUpdate() {
    //console.log('Watched Movies: ', this.props.watchedMovies)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoUrl) {
      // console.log('')
      this.setState({
        videoUrlRetrieved: true
      }, () => {
        const cId = this.props.cId;
        const eId = this.props.eId
      })
    }
    if (nextProps.parts && nextProps.parts[this.props.id]) {
      this.setState({
        isLoading: false
      })
    }
    if (nextProps.parts[this.props.id]) {
      if (this.props.parts && this.props.parts[this.props.id]) {

      } else {
        nextProps.parts[this.props.id].data.map((item, index) => {
          RNFS
            .stat(`${RNBackgroundDownloader.directories.documents}/video_${this.props.course_id}_${item.number}.mp4`)
            .then(statRes => {
              console.log(11111, statRes);
              /*!this.state.cards[`video_${this.props.course_id}_${item.number}`].done ?
                this.setState({ expectedBytes: 1000, done: true })
                :
                null
              */
              const cards = this.state.cards;
              cards[`video_${this.props.course_id}_${item.number}`] = cards[`video_${this.props.course_id}_${item.number}`] ?
                { ...cards[`video_${this.props.course_id}_${item.number}`], exists: true } : { exists: true }
              this.setState({ cards: cards })
              // this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'exists', true);
              // this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'size', statRes.size);
              // Alert.alert('Stat Result: ', JSON.stringify(statRes))
            })
            .catch(err => {
              const cards = this.state.cards;
              cards[`video_${this.props.course_id}_${item.number}`] = cards[`video_${this.props.course_id}_${item.number}`] ?
                { ...cards[`video_${this.props.course_id}_${item.number}`], exists: false } : { exists: false }
              // this.setState({ cards: cards })
              // this.props.actions.updateMyCourseParts(`video_${this.props.course_id}_${item.number}`, 'exists', false);
              // Alert.alert('Stat Err: ', JSON.stringify(err))
            })
        })
        console.log('Yse')
        this.setState({
          isLoading: false
        })
      }
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

  async handleResume(number) {
    let currentTasks = await RNBackgroundDownloader.checkForExistingDownloads();
    for (let lostTask of currentTasks) {
      console.log(currentTasks)
      // task = lostTask;
      //Alert.alert(`Task ${lostTask.id} was found!`);
      // this.setState({ expectedBytes: 1000 })
      if (lostTask.id === `video_${this.props.course_id}_${number}`) {
        console.log('resume');
        lostTask.progress((percent) => {
          const cards = this.state.cards;
          cards[lostTask.id] = cards[lostTask.id] ?
            { ...cards[lostTask.id], percent: `${parseInt(percent * 100)}%` } : { percent: `${parseInt(percent * 100)}%` }
          this.setState({ cards: cards })
          // this.props.actions.updateMyCourseParts(lostTask.id, 'percent', `${parseInt(percent * 100)}%`)
          // console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
          const cards = this.state.cards;
          cards[lostTask.id] = cards[lostTask.id] ?
            { ...cards[lostTask.id], done: true, percent: `${1 * 100}%` } : { done: true, percent: `${1 * 100}%` }
          this.setState({ cards: cards })
          this.props.actions.updateMyCourseParts(lostTask.id, 'done', true)
          // this.props.actions.updateMyCourseParts(lostTask.id, 'percent', `${1 * 100}%`)
          this.props.actions.updateMyCourseParts(lostTask.id, 'icon', `ios-play`)
          // this.setState({ done: true, percent: `${1 * 100}%` })
          // console.log('Downlaod is done!');
        }).error((error) => {
          this.props.actions.updateMyCourseParts(lostTask.id, 'error', true);
          Alert.alert('دانلود پشت زمینه دچار مشکل شد: ', JSON.stringify(error));
        });
      }
    }
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>

          {/*<StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent >
                <Icon name="more" />
              </Button>
            </Left>
            <Body style={{alignItems:'flex-start'}}>
              <Title>{this.props.myCourses[this.props.index].title}</Title>
            </Body>
            <Right style={{alignItems:'flex-end', justifyContent:'flex-end', backgroundColor:'red'}}>
              <Button style={{alignItems:'center', justifyContent:'flex-start', backgroundColor:'green'}}>
                <Text>
                  Back
                </Text>
              </Button>
            </Right>
          </Header>
        </StyleProvider>
        */}
          {
            this.state.isLoading ?
              <View style={{ marginTop: 50, padding: 15 }}><ProgressBar /></View>
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

                { // <HTML html={this.props.content} imagesMaxWidth={Dimensions.get('window').width}/>
                }
                {
                  <Text style={{ fontFamily: 'IRANSansMobile', color: 'black', paddingVertical: 10 }}>
                    {this.props.content}
                  </Text>
                }
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    borderColor: colors.primary,
                    borderTopWidth: 1,
                    //borderBottomWidth: 1,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Text style={{ fontFamily: 'IRANSansMobile', color: 'black', paddingVertical: 5 }}>
                    لیست دروس:
                  </Text>
                </View>

                {
                  this.props.parts[this.props.id].data.map((item, index) => {
                    return (
                      < Card key={index} style={[styles.mb, { width: '100%' }]}>
                        {/*} <TouchableOpacity
                          // disabled={this.state.startDownload && !this.state.done ? true : false}
                          onPress={() => {
                            this.state.cards[`video_${this.props.course_id}_${item.number}`] && this.state.cards[`video_${this.props.course_id}_${item.number}`].exists && (!this.state.cards[`video_${this.props.course_id}_${item.number}`].percent || !this.state.cards[`video_${this.props.course_id}_${item.number}`].percent === '100%') ?
                              Navigation.showModal({
                                stack: {
                                  children: [{
                                    component: {
                                      name: 'app.VideoPlayer',
                                      passProps: {
                                        text: 'Pushed screen',
                                        index: this.props.index,
                                        courseId: this.props.course_id,
                                        episodeId: item.number
                                      },
                                      options: {
                                        topBar: {

                                        },
                                        layout: {
                                          backgroundColor: 'transparent',
                                        },
                                        //screenBackgroundColor: 'transparent',
                                        modalPresentationStyle: 'overFullscreen',
                                      },
                                    },
                                  }],
                                },

                              })
                              :
                              this.props.parts[`video_${this.props.course_id}_${item.number}`] && !this.props.parts[`video_${this.props.course_id}_${item.number}`].error ?
                                this.props.parts[`video_${this.props.course_id}_${item.number}`].expectedBytes ?
                                  !this.props.parts[`video_${this.props.course_id}_${item.number}`].done
                                    ?
                                    this.props.parts[`video_${this.props.course_id}_${item.number}`].paused
                                      ?
                                      this.setState({ paused: false }, async () => {
                                        this.props.actions.updateMyCourseParts(
                                          `video_${this.props.course_id}_${item.number}`,
                                          'paused', false);
                                        this.props.actions.updateMyCourseParts(
                                          `video_${this.props.course_id}_${item.number}`,
                                          'icon', 'ios-pause');
                                        // this.props.actions.updateMyCourseParts(lostTask.id, 'percent', `in_background`);
                                        // this.handleResume(item.number);
                                        // task.resume()
                                      })
                                      :
                                      this.setState({ paused: true }, async () => {
                                        this.props.actions.updateMyCourseParts(
                                          `video_${this.props.course_id}_${item.number}`,
                                          'paused', true);
                                        this.props.actions.updateMyCourseParts(
                                          `video_${this.props.course_id}_${item.number}`,
                                          'icon', 'ios-download');
                                        // let currentTasks = await RNBackgroundDownloader.checkForExistingDownloads();
                                        // for (let lostTask of currentTasks) {
                                        //Alert.alert(`Task ${lostTask.id} was found!`);
                                        // this.setState({ expectedBytes: 1000 })
                                        //   if (lostTask.id === `video_${this.props.course_id}_${item.number}`) {
                                        //   lostTask.pause();
                                        // }
                                        // }
                                      })
                                    :
                                    Navigation.showModal({
                                      stack: {
                                        children: [{
                                          component: {
                                            name: 'app.VideoPlayer',
                                            passProps: {
                                              text: 'Pushed screen',
                                              index: this.props.index,
                                              courseId: this.props.course_id,
                                              episodeId: item.number
                                            },
                                            options: {
                                              topBar: {

                                              },
                                              layout: {
                                                backgroundColor: 'transparent',
                                              },
                                              //screenBackgroundColor: 'transparent',
                                              modalPresentationStyle: 'overFullscreen',
                                            },
                                          },
                                        }],
                                      },

                                    })
                                  :
                                  this.setState({
                                    startDownload: this.state.startDownload ?
                                      this.state.startDownload.concat(`video_${this.props.course_id}_${item.number}`) :
                                      [`video_${this.props.course_id}_${item.number}`]
                                  }, () => this.props.actions.retrieveVideoUrl(this.props.course_id, item.number, this.props.token))
                                :
                                this.setState({
                                  startDownload: this.state.startDownload ?
                                    this.state.startDownload.concat(`video_${this.props.course_id}_${item.number}`) :
                                    [`video_${this.props.course_id}_${item.number}`]
                                }, () => this.props.actions.retrieveVideoUrl(this.props.course_id, item.number, this.props.token))
                          }}
                        >*/}
                        <CardItem bordered>
                          <Body style={{ flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'IRANSansMobile' }} numberOfLines={1} >{item.title}</Text>
                            <Text style={{ fontFamily: 'IRANSansMobile' }} note>{item.time}</Text>
                          </Body>
                          {
                            this.state.startDownload && this.state.startDownload.includes(`video_${this.props.course_id}_${item.number}`) && !this.props.parts[`video_${this.props.course_id}_${item.number}`] ?
                              <Text style={{ fontFamily: 'IRANSansMobile' }}>در حال دانلود</Text>
                              :
                              this.state.cards[`video_${this.props.course_id}_${item.number}`] && this.state.cards[`video_${this.props.course_id}_${item.number}`].exists && (!this.state.cards[`video_${this.props.course_id}_${item.number}`].percent || this.state.cards[`video_${this.props.course_id}_${item.number}`].percent === '100%')
                                ? <TouchableOpacity
                                  style={{ backgroundColor: colors.primary, padding: 7, borderRadius: 3, width: 75, alignItems: 'center' }}
                                  onPress={() => Navigation.showModal({
                                    stack: {
                                      children: [{
                                        component: {
                                          name: 'app.VideoPlayer',
                                          passProps: {
                                            text: 'Pushed screen',
                                            index: this.props.index,
                                            courseId: this.props.course_id,
                                            episodeId: item.number
                                          },
                                          options: {
                                            topBar: {

                                            },
                                            layout: {
                                              backgroundColor: 'transparent',
                                            },
                                            //screenBackgroundColor: 'transparent',
                                            modalPresentationStyle: 'overFullscreen',
                                          },
                                        },
                                      }],
                                    },

                                  })
                                  }>
                                  <Text style={{ fontFamily: 'IRANSansMobile', color: 'white' }}>نمایش</Text>
                                </TouchableOpacity>
                                : this.props.parts[`video_${this.props.course_id}_${item.number}`] && this.props.parts[`video_${this.props.course_id}_${item.number}`].icon
                                  ? this.props.parts[`video_${this.props.course_id}_${item.number}`].done ?
                                    <TouchableOpacity
                                      style={{ backgroundColor: colors.primary, padding: 7, borderRadius: 3, width: 75, alignItems: 'center' }}
                                      onPress={() => Navigation.showModal({
                                        stack: {
                                          children: [{
                                            component: {
                                              name: 'app.VideoPlayer',
                                              passProps: {
                                                text: 'Pushed screen',
                                                index: this.props.index,
                                                courseId: this.props.course_id,
                                                episodeId: item.number
                                              },
                                              options: {
                                                topBar: {

                                                },
                                                layout: {
                                                  backgroundColor: 'transparent',
                                                },
                                                //screenBackgroundColor: 'transparent',
                                                modalPresentationStyle: 'overFullscreen',
                                              },
                                            },
                                          }],
                                        },

                                      })
                                      }>
                                      <Text style={{ fontFamily: 'IRANSansMobile', color: 'white' }}>نمایش</Text>
                                    </TouchableOpacity>
                                    :
                                    this.props.parts[`video_${this.props.course_id}_${item.number}`].percent ?
                                      <Text style={{ fontFamily: 'IRANSansMobile' }}>{`در حال دانلود ${this.props.parts[`video_${this.props.course_id}_${item.number}`].percent} `}</Text> :
                                      <Text style={{ fontFamily: 'IRANSansMobile' }}>{`در حال دانلود 0%`}</Text>
                                  : <TouchableOpacity
                                    style={{ backgroundColor: colors.primary, padding: 7, borderRadius: 3, width: 75, alignItems: 'center' }}
                                    onPress={() => this.setState({
                                      startDownload: this.state.startDownload ?
                                        this.state.startDownload.concat(`video_${this.props.course_id}_${item.number}`) :
                                        [`video_${this.props.course_id}_${item.number}`]
                                    }, () => this.props.actions.retrieveVideoUrl(this.props.course_id, item.number, this.props.token))
                                    }>
                                    <Text style={{ fontFamily: 'IRANSansMobile', color: 'white' }}>{'دانلود'}</Text>
                                  </TouchableOpacity>
                          }

                          {/*
                              this.props.parts[`video_${this.props.course_id}_${item.number}`] && this.props.parts[`video_${this.props.course_id}_${item.number}`].percent ?
                                <Text style={{ fontFamily: 'IRANSansMobile' }} > {this.props.parts[`video_${this.props.course_id}_${item.number}`].percent} </Text> : null
                            
                            <IconWithBadge
                              name={
                                this.state.cards[`video_${this.props.course_id}_${item.number}`] && this.state.cards[`video_${this.props.course_id}_${item.number}`].exists ? 'ios-play' :
                                  this.props.parts[`video_${this.props.course_id}_${item.number}`] && this.props.parts[`video_${this.props.course_id}_${item.number}`].icon
                                    ? this.props.parts[`video_${this.props.course_id}_${item.number}`].icon
                                    : 'ios-download'}
                              color={colors.primary}
                              size={22}
                            />
                              */}

                        </CardItem>
                        {//</TouchableOpacity>
                        }
                      </Card>
                    )
                  })
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
            <View style={{ fontFamily: 'IRANSansMobile', justifyContent: 'center', alignItems: 'center', padding: 9, paddingLeft: 20, }}>
              <Title numberOfLines={1}>{this.props.title}</Title>
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
            // zindex: this.state.showMenu ? 2 : -1,
            opacity: this.state.showMenu ? 1 : 0
          }}>
          <Button transparent onPress={() => this.state.showMenu ? this.props.actions.logOut() : null}>
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
    allWatched: state.appReducer.allWatched,
    videoUrl: state.appReducer.videoUrl,
    parts: state.appReducer.parts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
