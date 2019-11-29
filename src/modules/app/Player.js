
import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import Video from '../_global/react-native-af-video-player'
//import Video from 'react-native-video';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import ProgressBar from '../_global/ProgressBar';
import RNBackgroundDownloader from 'react-native-background-downloader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

import changeNavigationBarColor, {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';

//const url = 'http://techslides.com/demos/sample-videos/small.mp4'
//const url = 'http://mastershe.ir/api/v1/get_download_link?episode_id=10&api_token=sMKQSkt5FMwmkv2fPUZBFMQydgtBfJEXUYUzZ4rem0882N4K1kYOjJAKOl3fFoMIjVwILvVxaxxOwGhZRjH1R6zztCuzgWgP1SsD'
class Player extends React.Component {

  state = {
    //cards: [1, 2, 3, 4],
    url: null,
    isLoading: true
  }

  componentDidAppear() {
    Alert.alert('I am Appearing')
    HideNavigationBar()
  }

  componentDidMount() {
    console.log('I am Appearing')
    this.setState({
      videoUrl: `${RNBackgroundDownloader.directories.documents}/video_${this.props.courseId}_${this.props.episodeId}.mp4`
    },()=>{
      this._video.play();
      // this._video.togglePlay();
      // Alert.alert(this.state.videoUrl)
    })
    // this.props.actions.retrieveVideoUrl(this.props.courseId, this.props.episodeId, this.props.token)
    HideNavigationBar()
  }
  componentWillUnmount() {
    ShowNavigationBar()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoUrl) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const episodes = this.props.myCourses[this.props.index].episodes.data
    return (
      <View style={[styles.container, { backgroundColor: 'black' }]}>
        {
          !this.state.videoUrl ?
            <ProgressBar />
            :
            <Video
              ref={(c)=>{this._video = c}}
              url={this.state.videoUrl}
              fullScreenOnly={true}
              onEnd={() => {
                this.props.actions.addToWatched(this.props.courseId, this.props.episodeId, episodes)
                //Alert.alert('Finished', 'Thank You')
              }} />
        }
        {/*
          <Video
            source={{ uri: url }}
            resizeMode={'contain'}
            style={{
              flex: 1
              //position: 'absolute',
              //top: 0,
              //left: 0,
              //bottom: 0,
              //right: 0,
            }} />
          */}
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    videoUrl: state.appReducer.videoUrl,
    token: state.authReducer.token,
    myCourses: state.appReducer.myCourses
    //allCoursesMeta: state.appReducer.allCoursesMeta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

/*'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from "../_global/theme";
import Video from 'react-native-video';
const url = 'http://techslides.com/demos/sample-videos/small.mp4'

export default class VideoPlayer extends Component {

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };

  video: Video;

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={(ref: Video) => { this.video = ref }}
            // For ExoPlayer
            // source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }}
            source={{ uri: url }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <Text style={{color:'white'}}>
                {this.state.currentTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 5,
    backgroundColor: colors.primary,//'#cccccc',
  },
  innerProgressRemaining: {
    height: 5,
    backgroundColor: '#cccccc'//'#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
*/
