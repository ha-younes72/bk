import React from 'react'
import {
  Alert,
  //View,
  //	Text,
  //	TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView
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
//import { NetInfo } from 'react-native'
//import { RadioGroup, CheckBox } from "react-native-btr";

class SignUp extends React.Component {
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

    const mobileError = validate('mobile', this.state.mobile)
    const passwordError = validate('password', this.state.password)
    const nameError = validate('name', this.state.name)
    const emailError = validate('email', this.state.email)

    this.setState({
      mobileError: mobileError,
      passwordError: passwordError,
      nameError: nameError,
      emailError: emailError
    })

    if (!mobileError && !passwordError && !emailError && !nameError) {
      var user = {
        password: this.state.password,
        mobile: this.state.mobile,
        name: this.state.name,
        email: this.state.email
      }

      this.setState({
        passwordError: '',
        mobileError: '',
        nameError: '',
        emailError: '',
        isSubmiting: true
      }, () => {
        if (this.props.status) { this.props.actions.signupUser(user) }
        else {
          Alert.alert('آفلاین',
            'لطفا ارتباط حود را کنترل کنید و دوباره تلاش کنید')
        }
      })
    }
  }

  render() {
    return (

      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: 'white' }]}>
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
            //opacity: this.state.isFocused ? 0.3 : 1
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

          <Input
            inputStyle={{ fontFamily: 'IRANSansMobile' }}
            onChangeText={val => this.onChangeText('name', val)}
            onFocus={() => this.setState({ isFocused: true })}
            placeholder='نام شما'
            value={this.state.name}
            onBlur={() => {
              this.setState({
                nameError: validate('name', this.state.name)
              })
            }}

            leftIcon={
              <IconWithBadge
                style={{ margin: 0 }}
                name='ios-person'
                size={24}
                color={colors.primary}
              />
            }

            errorStyle={{ color: 'red' }}
            errorMessage={this.state.nameError ? this.state.nameError : null}
          ></Input>
          <Input
            inputStyle={{ fontFamily: 'IRANSansMobile' }}
            onChangeText={val => this.onChangeText('email', val)}
            placeholder='پست الکترونیکی'
            onFocus={() => this.setState({ isFocused: true })}
            value={this.state.email}
            onBlur={() => {
              this.setState({
                emailError: validate('email', this.state.email)
              })
            }}

            leftIcon={
              <IconWithBadge
                style={{ margin: 0 }}
                name='ios-mail'
                size={24}
                color={colors.primary}
              />
            }

            errorStyle={{ color: 'red' }}
            errorMessage={this.state.emailError ? this.state.emailError : null}
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
                ? this.props.submittingFinished
                  ? <Text style={{ color: 'white', fontSize: 20, fontFamily: 'IRANSansMobile' }}>ثبت‌نام</Text>
                  : <ProgressBar />
                : <Text style={{ color: 'white', fontSize: 20, fontFamily: 'IRANSansMobile' }}>ثبت‌نام</Text>

            }
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
