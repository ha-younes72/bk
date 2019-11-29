import React from 'react'
import {
	Alert,
	//View,
	//	Text,
	//	TextInput,
	TouchableOpacity,
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
//import { NetInfo } from 'react-native'
//import { RadioGroup, CheckBox } from "react-native-btr";

class Register extends React.Component {
	state = {
		password: '',
		email: '',
		emailError: '',
		passwordError: '',
		gpsPermission: false,
		cameraPermission: false,
		isRegistering: false,
		isSubmiting: false,
		showPass: false,
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

	submit = (btn) => {

		if (btn === 'logIn') {
			this.setState({
				isRegistering: false
			})
			//Alert.alert('IN')
		}
		if (btn === 'register') {
			this.setState({
				isRegistering: true
			})
			//Alert.alert('UP')
		}

		const emailError = validate('email', this.state.email)
		const passwordError = validate('password', this.state.password)
		//const fnameError = validate('firstname', this.state.fname)

		this.setState({
			emailError: emailError,
			passwordError: passwordError,
			//fnameError: fnameError
		})

		if (!emailError && !passwordError) {
			var user = {
				password: this.state.password,
				email: this.state.email,
				gpsPermission: this.state.gpsPermission,
				cameraPermission: this.state.cameraPermission
			}

			this.setState({
				passwordError: '',
				emailError: '',
				isSubmiting: true
			}, () => {

				if (this.state.isRegistering) {
					if (this.props.status) { this.props.actions.signupUser(user, this.props.status) }
					else {
						this.props.actions.signupUser(user, this.props.status)
						Alert.alert('Offline', 'You are offline, we will register you when you are online. All data is stored locally.')
					}
				}
				else {
					if (this.props.status) { this.props.actions.signinUser(user, this.props.status) }
					else {
						this.props.actions.signinUser(user, this.props.status)
						Alert.alert('Offline',
							'The data you will see is from last session, you can sync it as soon as you are connected')
					}
				}
			})
		}
	}

	rmError() {
		this.setState({
			isRegistering: false,
		})
		this.props.actions.clearError();
	}

	render() {
		return (
			<Container>
				<Content
					//padder
					contentContainerStyle={styles.container}
				>
					<Form
						style={{
							width: '90%'
						}}
					>
						<Input
							onChangeText={val => this.onChangeText('email', val)}
							placeholder='Mail'
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

						<Input
							onChangeText={val => this.onChangeText('password', val)}
							placeholder='Password'
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
					<List style={{ paddingVertical: 15 }}>
						<ListItem style={{ borderBottomWidth: 0 }}>
							<CheckBox
								checked={this.state.gpsPermission}
								color={colors.primary}
								onPress={() => this.setState({
									gpsPermission: !this.state.gpsPermission
								})}
							>
							</CheckBox>
							<Text style={{
								paddingLeft: 7
							}}>
								GPS
							</Text>
						</ListItem>
						<ListItem style={{ borderBottomWidth: 0 }}>
							<CheckBox
								checked={this.state.cameraPermission}
								color={colors.primary}
								onPress={() => this.setState({
									cameraPermission: !this.state.cameraPermission
								})}
							>
							</CheckBox>
							<Text style={{
								paddingLeft: 7
							}}>
								Camera
							</Text>
						</ListItem>
					</List>
					<View style={{
						//flex:1,
						width: '90%',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
					}}
					>
						<Button
							bordered
							rounded
							iconLeft
							small
							style={{ borderColor: colors.primary }}
							disabled={this.state.isSubmiting}
						//disabled={true}
						//style={{ marginHorizontal: 20 }}
						>
							<TouchableOpacity
								onPress={() => this.submit('logIn')}
								style={{ flexDirection: 'row' }}
							>
								<Icon
									name='ios-log-in'
									style={{ color: colors.primary }}
								//style={{ fontSize: 25, padding: 5 }}
								/>

								<Text style={{ color: colors.primary }}>Sing In</Text>
							</TouchableOpacity>
						</Button>
						<Button
							bordered
							rounded
							iconLeft
							small
							disabled={this.state.isSubmiting}
							//color={colors.primary}
							style={{ borderColor: colors.primary }}
						>
							<TouchableOpacity
								onPress={() => this.submit('register')}
								style={{ flexDirection: 'row' }}
							>
								<Icon
									name='ios-person-add'
									//color={colors.primary}
									style={{ color: colors.primary }}
								/>
								<Text style={{ color: colors.primary }} >Register</Text>
							</TouchableOpacity>
						</Button>
					</View>
				</Content>
			</Container>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		message: state.authReducer.message,
		status: state.authReducer.status
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

{
	/*
		<View style={styles.container}>
				<View style={styles.btnHolder}>
					<Button 
						containerStyle={
							{width:'30%'}
						}
						icon={
							<Icon
								name='ios-person-add'
								type="ionicons"
								size={15}
								color={colors.primary}
							/>
						}
						title="Register"
						type="outline"
						loading={this.state.isSubmiting}
					/>
					<Button 
						containerStyle={
							{width:'30%'}
						}
						icon={
							<Icon
								name='ios-log-in'
								type="ionicons"
								size={15}
								color={colors.primary}
							/>
						}
						title="Log In"
						type="outline"
						loading={this.state.isSubmiting}
					/>
				</View>
			</View>	
		
		
		
	*/
}


{/*
		<ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
				<View style={styles.inputMainContainer}>
					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.input}
						onChangeText={val => this.onChangeText('email', val)}
						placeholder='Mail'
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
								color='black'
							/>
						}
						errorStyle={{ color: 'red' }}
						errorMessage={this.state.emailError ? this.state.emailError : null}
					/>

					<Input
						containerStyle={styles.inputContainer}
						inputContainerStyle={styles.input}
						onChangeText={val => this.onChangeText('password', val)}
						placeholder='Password'
						value={this.state.password}
						onBlur={() => {
							this.setState({
								passwordError: validate('password', this.state.password)
							})
						}}
						secureTextEntry={!this.state.showPass}
						leftIcon={
							<Icon
								name='key'
								size={24}
								color='black'
							/>
						}
						rightIcon={
							<TouchableOpacity onPress={() => {
								if (this.state.showPass) {
									this.setState({
										showPass: false
									})
								} else {
									this.setState({
										showPass: true
									})
								}
							}}>
								<Icon
									name='eye'
									size={24}
									color='black'
								/>
							</TouchableOpacity>
						}
						errorStyle={{ color: 'red' }}
						errorMessage={this.state.passwordError ? this.state.passwordError : null}
					/>

					<View
						style={[{
							alignSelf: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							paddingLeft: 30
						}]}>
						<RadioGroup
							color={'white'}
							style={{ flexDirection: 'row', padding: 5 }}
							labelStyle={{ fontSize: 14 }}
							radioButtons={
								[
									{
										label: 'GPS',
										value: 'RealTimeNotifYes',
										checked: false,
										color: 'white',
										flexDirection: 'row',
										size: 10
									},
									{
										label: 'No',
										value: 'RealTimeNotifNo',
										checked: false,
										color: 'white',
										flexDirection: 'row',
										size: 10
									}
								]
							}
							onPress={
								radioButtons => {
									if (radioButtons[0].checked) {
										this.setState({
											owner: true
										}, () => {
											console.log('Yes')
										})
									} else {
										this.setState({
											owner: false
										}, () => {
											console.log('No')
										})
									}
								}
							}
						/>
					</View>
				</View>

				{this.state.isSubmiting ?
					<View style={styles.progressBar}>
						<ProgressBar color={'white'} />
						<Toast visible={this.props.message ? true : false} message={this.props.message} />
					</View>
					:
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={this.submit}>
							<View style={styles.buttonInner}>
								<Text style={styles.buttontext}>Sign Up</Text>
							</View>
						</TouchableOpacity>
					</View>
				}
			</ScrollView>
			*/
}
