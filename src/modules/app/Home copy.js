import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  RefreshControl,
  ScrollView,
  //Text,
  TouchableOpacity,
  //View,
  Platform,
  FlatList,
  Alert,
  //AsyncStorage,
  //Button
} from 'react-native';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  View,
  List,
  ListItem,
  Right,
  Left,
  Body,
  StyleProvider,
  getTheme,
  Thumbnail,
  Spinner,
  Fab
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
//import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import customVariables from '../_global/variables';
//import getTheme from '../_global/native-base-theme/components'; //' /native-base-theme/components';

import * as offsActions from './actions';
//import CardOne from './components/CardOne';
//import CardTwo from './components/CardTwo';
//import Card from "./components/Card";
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Home.style';
import { iconsMap } from '../../utils/AppIcons';
import { colors } from '../_global/theme';
import TopNav from './components/TopNav';

//import firebase from 'react-native-firebase';
//import { MessageBar } from 'react-native-messages';
//import { showMessage } from 'react-native-messages';

class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false
    };

    //this._viewMovie = this._viewMovie.bind(this);
    //this._onRefresh = this._onRefresh.bind(this);
    Navigation.events().bindComponent(this);

    //this.MessageBar = React.createRef();
  }


  async componentDidMount() {
    this.props.actions.retrieveObservations(this.props.status, this.props.user, this.props.token)
  }

  async componentDidAppear() {
  }

  async componentDidDisappear() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.observations) {
      this.setState({ isLoading: false });
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  async componentWillUnmount() {
  }

  render() {

    return (
      !this.props.observasions
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner large color="blue"></Spinner>
        </View>
        :
        <StyleProvider style={getTheme(customVariables)}>
          <Container>

            <Content
              contentContainerStyle={{
                //flex: 1,
                padding: 15,
              }}>
              <List>
                {this.props.observasions.map((data, i) => (
                  <ListItem
                    key={i}
                    style={{
                      marginLeft: 0,
                      marginBottom: 10,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.30,
                      shadowRadius: 4.65,
                      elevation: 4,
                      borderRadius: 7,
                    }}
                    thumbnail
                  >
                    <Left>
                      <Thumbnail square large size={120} source={data.img} />
                    </Left>
                    <Body style={{ paddingLeft: 10 }}>
                      <Text style={{ paddingBottom: 4 }} numberOfLines={1}>{data.text}</Text>
                      <Text numberOfLines={1} note>
                        {data.time}
                      </Text>
                      <Text style={{ paddingBottom: 4 }} numberOfLines={1} note>
                        {data.lon}  {data.lat}
                      </Text>
                      <TouchableOpacity>
                        <Text style={{ color: 'blue' }} note >View More</Text>
                      </TouchableOpacity>
                    </Body>
                    {
                      /*<Right>
                        <Button transparent>
                          <Text>View</Text>
                        </Button>
                      </Right>
                      */
                    }
                  </ListItem>
                ))}
                {this.props.newObservasions.map((data, i) => (
                  <ListItem
                    key={i}
                    style={{
                      marginLeft: 0,
                      marginBottom: 10,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.30,
                      shadowRadius: 4.65,
                      elevation: 4,
                      borderRadius: 7,
                    }}
                    thumbnail
                  >
                    <Left>
                      <Thumbnail square large size={120} source={{ uri: data.img }} />
                    </Left>
                    <Body style={{ paddingLeft: 10 }}>
                      <Text style={{ paddingBottom: 4 }} numberOfLines={1}>{data.text}</Text>
                      <Text numberOfLines={1} note>
                        {data.time}
                      </Text>
                      <Text style={{ paddingBottom: 4 }} numberOfLines={1} note>
                        {data.lon}  {data.lat}
                      </Text>
                      <TouchableOpacity>
                        <Text style={{ color: 'blue' }} note >View More</Text>
                      </TouchableOpacity>
                    </Body>
                    {
                      /*<Right>
                        <Button transparent>
                          <Text>View</Text>
                        </Button>
                      </Right>
                      */
                    }
                  </ListItem>
                ))}
              </List>
              <TouchableOpacity
                style={{
                  //alignSelf:'flex-end',
                  position: 'absolute',
                  right: 2,
                  top: 2,
                  backgroundColor: 'blue',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => {
                  Alert.alert('Syncing', 'I am symcing!')
                }}
              >
                <Icon name='ios-sync' style={{ color: 'white', fontSize: 24 }} />
              </TouchableOpacity>
            </Content>
            <Footer>
              <FooterTab style={{ borderBottomWidth: 4, borderBottomColor: 'blue' }}>
                <Button
                  /*onPress={() => {
                    Navigation.push('AppStack', {
                      component: {
                        name: 'app.NewSession',
                        options:{
                          topBar:{
                            visible:true,
                            drawBehind: false,
                            title:{
                              text: 'New Session'
                            }
                          }
                        }
                      }
                    })
                  }}*/
                  bordered
                  style={{
                    borderColor: 'white'
                  }} >
                  <Text >Sightings</Text>
                </Button>
              </FooterTab>
              <FooterTab >
                <Button
                  onPress={() => {
                    Navigation.push('AppStack', {
                      component: {
                        name: 'app.ObservationList',
                        passProps: {
                          sessionName: 'General'
                        },
                        options: {
                          topBar: {
                            visible: false,
                            drawBehind: true,
                          }
                        }
                      }
                    })
                  }}
                  bordered
                  style={{
                    borderColor: 'white'
                  }}
                >

                  <View
                    square
                    style={{
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: 'blue',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.30,
                      shadowRadius: 4.65,
                      elevation: 4,
                    }}
                  >
                    <Text style={{ fontSize: 13 }}>Log</Text>
                  </View>
                </Button>
              </FooterTab>
              <FooterTab>
                <Button
                  /*onPress={() => {
                    Navigation.push('AppStack', {
                      component: {
                        name: 'app.NewSession',
                        options:{
                          topBar:{
                            visible:true,
                            drawBehind: false,
                            title:{
                              text: 'New Session'
                            }
                          }
                        }
                        
                      }
                    })
                  }}*/
                  bordered
                  style={{
                    borderColor: 'white'
                  }} >
                  <Text>Profile</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider >
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    observasions: state.appReducer.observations,
    newObservasions: state.appReducer.newObservations,
    status: state.authReducer.status,
    user: state.authReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(offsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
<Content>
      <TopNav screenTitle={'Sessions'} />
      <List>
        {this.props.sessions.map((session, index) => {
          return (
            <ListItem key={index}>
              <Left style={{}}>
                <TouchableOpacity onPress={() => {
                  Navigation.push('AppStack', {
                    component: {
                      name: 'app.ObservationList',
                      passProps: {
                        sessionName: session.name
                      }
                    }
                  })
                }}>
                  <Text style={{ fontSize: 17 }}> {session.name} </Text>
                </TouchableOpacity>
              </Left>
              <Right style={{}}>
                <Button transparent>
                  <TouchableOpacity onPress={() => { Alert.alert('Editing') }}>
                    <Icon name='ios-create' style={{ fontSize: 25, color: colors.primary }}></Icon>
                  </TouchableOpacity>
                </Button>
              </Right>
              <Right style={{}}>
                <Button transparent>
                  <TouchableOpacity onPress={() => { Alert.alert('Deleting') }}>
                    <Icon name='ios-close-circle-outline' style={{ fontSize: 25, color: colors.primary }}></Icon>
                  </TouchableOpacity>
                </Button>
              </Right>
            </ListItem>
          )
        })
        }
      </List>
    </Content>
    */