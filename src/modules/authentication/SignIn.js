import React from 'react'
import {
  Alert,
  //View,
  //	Text,
  //	TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  //Alert
  //ScrollView
} from 'react-native'

import {
  Container,
  Content,
  Text,
  View,
  Button,
  Body,
  ListItem,
  CheckBox,
  Icon,
  List,
  Form,
  Item,
  //Input,
  Label
} from 'native-base'

//import Toast from "../_global/Toast";
import { colors } from '../_global/theme'
import ProgressBar from "../_global/ProgressBar";

import {
  Input,
  //	Button,
  //	CheckBox,
  //	Icon,
  //	Text
} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from "../_global/Icons";

import styles from './styles/auth.style'
import uuidV4 from 'uuid/v4'
import validate from './validators/validate_wrapper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions';
import NetInfo from "@react-native-community/netinfo";

//import { NetInfo } from 'react-native'
//import { RadioGroup, CheckBox } from "react-native-btr";

class SignIn extends React.Component {
  state = {
    password: '',
    mobile: '',
    mobileError: '',
    passwordError: '',
    //gpsPermission: false,
    //cameraPermission: false,
    //isRegistering: false,
    isSubmiting: false,
    textSecure: false,
    isFocused: false
    //showPass: false,
  }


  onChangeText = (key, value) => {
    this.setState(
      {
        [key]: value,
        isSubmiting: false
      }
    )
    //if (this.props.message) this.rmError()
  }

  submit = () => {

    /*NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      //Alert.alert(String(state.isConnected), String(state.type))
      //Alert.alert("Is connected?", String(state.isConnected))
    })
    */

    const mobileError = validate('mobile', this.state.mobile)
    const passwordError = validate('password', this.state.password)
    //const fnameError = validate('firstname', this.state.fname)

    this.setState({
      mobileError: mobileError,
      passwordError: passwordError,
      //fnameError: fnameError
    })

    if (!mobileError && !passwordError) {
      var user = {
        password: this.state.password,
        mobile: this.state.mobile,
        //gpsPermission: this.state.gpsPermission,
        //cameraPermission: this.state.cameraPermission
      }

      this.setState({
        passwordError: '',
        mobileError: '',
        isSubmiting: true
      }, () => {
        if (this.props.status) { this.props.actions.signinUser(user) }
        else {
          //this.props.actions.signinUser(user, this.props.status)
          this.setState({
            isSubmiting: false
          })
          Alert.alert('آفلاین',
            'لطفا ارتباط حود را کنترل کنید و دوباره تلاش کنید')
        }
      })
    }
  }

  render() {
    return (
      <Container>
        {/*<ImageBackground source={require('../../../images/banner_5.jpg')}
          style={{
            width: '100%',
            height: '100%',
            //justifyContent: 'flex-end',
            //alignItems: 'flex-end'
          }}>
            */}
        <Content
          //padder
          contentContainerStyle={styles.container}
        >
          {
            <Image
              source={require('../../../images/logomastershe.png')}
              style={{
                //position: 'absolute',
                //top: 5,
                //left: 0,
                width: '100%',
                height: 120,
                resizeMode: 'contain',
                opacity: 0.8,
                marginBottom: 25
              }}
            />
          }
          <Form
            style={{
              width: '90%',
              backgroundColor: this.state.isFocused ? 'white' : null,
            }}
          >
            <Input
              inputStyle={{ fontFamily: 'IRANSansMobile' }}
              onChangeText={val => this.onChangeText('mobile', val)}
              placeholder='شماره موبایل'
              onFocus={() => this.setState({ isFocused: true })}
              value={this.state.mobile}
              onBlur={() => {
                this.setState({
                  mobileError: validate('mobile', this.state.mobile)
                })
              }}

              leftIcon={
                <IconWithBadge
                  style={{ margin: 0 }}
                  name='ios-phone-portrait'
                  size={24}
                  color={colors.primary}
                />
              }

              errorStyle={{ color: 'red' }}
              errorMessage={this.state.mobileError ? this.state.mobileError : null}
            ></Input>

            <Input
              inputStyle={{ fontFamily: 'IRANSansMobile' }}
              onChangeText={val => this.onChangeText('password', val)}

              contentContainerStyle={{ backgroundColor: 'red' }}
              style={{ backgroundColor: 'green' }}
              //textContentType={'newPassword'}
              placeholder='رمز عبور'
              onFocus={() => this.setState({ isFocused: true, textSecure: true })}
              secureTextEntry={this.state.textSecure}
              value={this.state.password}
              onBlur={() => {
                this.setState({
                  passwordError: validate('password', this.state.password)
                })
              }}

              leftIcon={
                <IconWithBadge
                  style={{ margin: 0 }}
                  name='ios-key'
                  size={24}
                  color={colors.primary}
                />
              }

              errorStyle={{ color: 'red' }}
              errorMessage={this.state.passwordError ? this.state.passwordError : null}
            ></Input>

          </Form>
          <View style={{
            //flex:1,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 35
          }}
          >

            <TouchableOpacity
              onPress={() => this.submit()}
              style={{
                width: '50%',
                padding: 10,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary
              }}
            >
              {
                this.state.isSubmiting
                  ? this.props.submittingFinished ?
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'IRANSansMobile' }}>ورود</Text> : <ProgressBar />
                  : <Text style={{ color: 'white', fontSize: 20, fontFamily: 'IRANSansMobile' }}>ورود</Text>

              }
            </TouchableOpacity>
          </View>
        </Content>
        {/*</ImageBackground>*/}
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    message: state.authReducer.message,
    status: state.authReducer.status,
    submittingFinished: state.authReducer.submittingFinished
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
