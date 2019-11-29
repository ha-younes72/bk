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
	Image,
	PermissionsAndroid,
	StyleSheet
	//AsyncStorage,
	//Button
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
	Header,
	Title,
	StyleProvider,
	getTheme,
	Segment,
	Input,
	Item,
	Form,
	Textarea
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons';
//import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import customVariables from '../_global/variables';

import * as offsActions from './actions';
//import CardOne from './components/CardOne';
//import CardTwo from './components/CardTwo';
//import Card from "./components/Card";
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Home.style';
import { iconsMap } from '../../utils/AppIcons';
import { colors } from '../_global/theme';
import TopNav from './components/TopNav2';
import RNPicker from "rn-modal-picker";
//import firebase from 'react-native-firebase';
//import { MessageBar } from 'react-native-messages';
//import { showMessage } from 'react-native-messages';
import ImagePicker from 'react-native-image-picker';

class ObservationList extends React.Component {
	static get options() {
		return {
			topBar: {
				visible: false,
				drawBehind: true
			},
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			seg: 1,
			location: null,
			time: null,
			date: null,
			rows: [1],
			items: [{ species: '', num: 0 }],
			hrows: [1],
			hitems: [{ species: '', num: 0 }],
			dataSource: [
				{
					id: 1,
					name: "Jelly Fish"
				},
				{
					id: 2,
					name: "Whale"
				},
				{
					id: 3,
					name: "Dog"
				},
				{
					id: 4,
					name: "Wolf"
				},
				{
					id: 5,
					name: "Sheep"
				},
				{
					id: 6,
					name: "Donkey"
				},
				{
					id: 7,
					name: "Girrafe"
				},
				{
					id: 8,
					name: "Cow"
				},
				{
					id: 9,
					name: "Calf"
				},
				{
					id: 10,
					name: "Cat"
				},
				{
					id: 11,
					name: "Lion"
				},
				{
					id: 12,
					name: "Tiger"
				}
			],
			placeHolderText: "Enter Animals Here...",
			hdataSource: [
				{
					id: 1,
					name: "Jelly Fish"
				},
				{
					id: 2,
					name: "Whale"
				},
				{
					id: 3,
					name: "Dog"
				},
				{
					id: 4,
					name: "Wolf"
				},
				{
					id: 5,
					name: "Sheep"
				},
				{
					id: 6,
					name: "Donkey"
				},
				{
					id: 7,
					name: "Girrafe"
				},
				{
					id: 8,
					name: "Cow"
				},
				{
					id: 9,
					name: "Calf"
				},
				{
					id: 10,
					name: "Cat"
				},
				{
					id: 11,
					name: "Lion"
				},
				{
					id: 12,
					name: "Tiger"
				}
			],
			hplaceHolderText: "Enter Items Here...",
			selectedText: "",
			activityList: [
				{ name: 'ios-airplane' },
				{ name: 'ios-american-football' },
				{ name: 'ios-baseball' },
				{ name: 'ios-basketball' },
				{ name: 'ios-bicycle' },
				{ name: 'ios-body' },
				{ name: 'ios-brush' },
				{ name: 'ios-bug' },
				{ name: 'ios-cart' },
				{ name: 'ios-car' },
				{ name: 'ios-camera' },
				{ name: 'ios-cloudy-night' },
				{ name: 'ios-color-palette' },
				{ name: 'ios-easel' }
			],
			selectedActivity: []
		}


		//this._viewMovie = this._viewMovie.bind(this);
		//this._onRefresh = this._onRefresh.bind(this);
		Navigation.events().bindComponent(this);

		//this.MessageBar = React.createRef();
	}

	async componentDidMount() {
	}

	async componentDidAppear() {
		this.GetTime()
		await this.requestLocationPermission().then(()=>{
		Geolocation.getCurrentPosition(
			(position) => {
				this.setState({ location: position })
				//Alert.alert(String(this.state.location.coords.longitude))
				console.log(position);
			},
			(error) => {
				// See error code charts below.
				Alert.alert(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);})

		/*navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000}
		);
		*/
	}

	async componentDidDisappear() {
	}

	componentWillReceiveProps(nextProps) {
		/*if (nextProps.recommendedOffs && nextProps.popularOffs && nextProps.categories) {
			this.setState({ isLoading: false });
		}*/
	}

	GetTime() {
		// Creating variables to hold time.
		var date, TimeType, hour, minutes, seconds, fullTime, fullDate;
		// Creating Date() function object.
		date = new Date();

		//var temp = date.toLocaleString().strip;
		fullDate = date.toDateString()//temp[1] + ' ' + temp[2] + ', '+temp[3]
		this.setState({ date: fullDate })
		//Alert.alert(String(date.getFullYear()))
		//Alert.alert(date.toLocaleString())
		//Alert.alert(date.toDateString())
		//Alert.alert(date.toString())
		// Getting current hour from Date object.
		hour = date.getHours();
		// Checking if the Hour is less than equals to 11 then Set the Time format as AM.
		if (hour <= 11) {
			TimeType = 'AM';
		}
		else {
			// If the Hour is Not less than equals to 11 then Set the Time format as PM.
			TimeType = 'PM';
		}
		// IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
		if (hour > 12) {
			hour = hour - 12;
		}
		// If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
		if (hour == 0) {
			hour = 12;
		}
		// Getting the current minutes from date object.
		minutes = date.getMinutes();
		// Checking if the minutes value is less then 10 then add 0 before minutes.
		if (minutes < 10) {
			minutes = '0' + minutes.toString();
		}
		//Getting current seconds from date object.
		seconds = date.getSeconds();
		// If seconds value is less than 10 then add 0 before seconds.
		if (seconds < 10) {
			seconds = '0' + seconds.toString();
		}
		// Adding all the variables in fullTime variable.
		fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();


		// Setting up fullTime variable in State.
		this.setState({

			time: fullTime

		});
	}

	async requestLocationPermission() {
		//Alert.alert('IN')
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					'title': 'Location Permission',
					'message': 'This App needs access to your location ' +
						'so we can know where you are.'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use locations ")
			} else {
				console.log("Location permission denied")
			}
		} catch (err) {
			console.warn(err)
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

	_selectedValue(index, name, iindex) {
		var items = this.state.items
		items[index] = { species: name, num: items[index].num }
		this.setState({
			items: items
		})
		//this.setState({ selectedText: name });
	}

	_hselectedValue(index, name, iindex) {
		var items = this.state.hitems
		items[index] = { species: name, num: items[index].num }
		this.setState({
			hitems: items
		})
		//this.setState({ selectedText: name });
	}

	render() {
		return (
			<StyleProvider style={getTheme(customVariables)}>
				<Container>
					<TopNav screenTitle='Observations'></TopNav>
					<Segment>
						<Button
							first
							active={this.state.seg === 1 ? true : false}
							onPress={() => this.setState({ seg: 1 })}
						>
							<Text>1. Image</Text>
						</Button>
						<Button
							active={this.state.seg === 2 ? true : false}
							onPress={() => this.setState({ seg: 2 })}
						>
							<Text>2. Animals</Text>
						</Button>
						<Button
							active={this.state.seg === 3 ? true : false}
							onPress={() => this.setState({ seg: 3 })}
						>
							<Text>3. Humans</Text>
						</Button>
						<Button
							last
							active={this.state.seg === 4 ? true : false}
							onPress={() => this.setState({ seg: 4 })}
						>
							<Text>4. Activity</Text>
						</Button>
					</Segment>
					{
						this.state.seg === 1 ?
							<Content
								contentContainerStyle={{
									flex: 1,
									paddingHorizontal: 20,
									paddingVertical: 30,
									backgroundColor: colors.gray
								}}
							>
								<View style={{ flex: 1 }}>

									<Text>Add a photo of what you saw</Text>

									{

										this.props.wantToAddPhoto === true
											?
											<View
												style={{
													flex: 1,
													//flexDirection: 'row',
													//justifyContent: 'space-between',
													paddingVertical: 20
												}}>
												<Image
													source={{ uri: this.props.newObservations[this.props.currentIndex].img }}
													style={{
														height: '100%',
														//width: '100%',
														//height: 720
													}}
												/>
											</View>
											:
											<View
												style={{
													flex: 1,
													flexDirection: 'row',
													justifyContent: 'space-between',
													paddingVertical: 20
												}}
											>
												<TouchableOpacity
													onPress={() => {

														const options = {
															title: 'Select Avatar',
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
															console.log('Response = ', response);

															if (response.didCancel) {
																console.log('User cancelled image picker');
															} else if (response.error) {
																console.log('ImagePicker Error: ', response.error);
															} else if (response.customButton) {
																console.log('User tapped custom button: ', response.customButton);
															} else {
																const source = { uri: response.uri };
																this.props.actions.addPhoto(response.uri, this.props.user)
																//Alert.alert('Image Picked', response.uri)
																// You can also display the image using data:
																// const source = { uri: 'data:image/jpeg;base64,' + response.data };

																this.setState({
																	avatarSource: source,
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
														flex: 1,
														backgroundColor: 'white',
														justifyContent: 'center',
														alignItems: 'center',
														aspectRatio: 1,
														marginRight: 10,
														borderWidth: 2,
														borderRadius: 5,
														borderStyle: 'dashed',
														borderColor: 'blue'
													}}
												>
													<Icon name='ios-cloud-outline' style={{ fontSize: 80 }}></Icon>
													<Text>Tap to upload</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() => {

														const options = {
															title: 'Select Avatar',
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
														ImagePicker.launchCamera(options, (response) => {
															console.log('Response = ', response);

															if (response.didCancel) {
																console.log('User cancelled image picker');
															} else if (response.error) {
																console.log('ImagePicker Error: ', response.error);
															} else if (response.customButton) {
																console.log('User tapped custom button: ', response.customButton);
															} else {
																const source = { uri: response.uri };
																this.props.actions.addPhoto(response.uri, this.props.user)
																//Alert.alert('Image Picked', response.uri)
																// You can also display the image using data:
																// const source = { uri: 'data:image/jpeg;base64,' + response.data };

																this.setState({
																	avatarSource: source,
																});
															}
														});
														/*Navigation.push(this.props.componentId, {
															component: {
																name: 'app.Camera',
																options: {
																	topBar: {
																		visible: false
																	}
																}
															}
														})*/
													}}
													style={{
														flex: 1,
														justifyContent: 'center',
														alignItems: 'center',
														aspectRatio: 1,
														backgroundColor: 'white',
														marginLeft: 10,
														borderWidth: 2,
														borderRadius: 5,
														borderStyle: 'dashed',
														borderColor: 'blue'
													}}
												>
													<Icon name='ios-camera' style={{ fontSize: 80 }}></Icon>
													<Text>Take a photo</Text>
												</TouchableOpacity>
											</View>

									}

								</View>
								<View style={{ flex: 1, justifyContent: 'space-between', paddingTop: 20 }}>
									<View>
										<Text>{this.state.time ? this.state.time : ''}, {this.state.date ? this.state.date : ''}</Text>
										<Text>
											{this.state.location !== null ? String(this.state.location.coords.longitude) : ''},
											{this.state.location !== null ? ' ' + String(this.state.location.coords.latitude) : ''}
										</Text>
									</View>
									<Button
										style={{ backgroundColor: '#3F51B5', justifyContent: 'center', alignItems: 'center' }}
										primary
										onPress={() => {
											seg = this.state.seg + 1
											this.setState({
												seg: seg
											}, () => {
												this.props.newObservations.length > 0
													?
													this.props.actions.addTimeandLoc(
														this.state.time + this.state.date,
														this.state.location.coords.longitude,
														this.state.location.coords.latitude,
														this.props.user,
														this.props.currentIndex
													)
													:
													null
											})
										}}
									//transparent={false}
									//primary
									>

										<Text style={{ color: 'white' }}>Next Step</Text>

									</Button>
								</View>

							</Content>
							:
							null
					}
					{
						this.state.seg === 2
							?
							<Content
								contentContainerStyle={{
									flex: 1,
									paddingHorizontal: 20,
									paddingVertical: 30,
									backgroundColor: colors.gray
								}}
							>
								<View
									style={{
										backgroundColor: 'white',
										padding: 7,
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
								>
									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'space-between',
											paddingBottom: 5
										}}
									>
										<Text>
											Species
										</Text>
										<Text>
											Amount
										</Text>
									</View>

									{
										this.state.rows.map((val, index) => (
											<View
												style={{
													width: '100%',
													flexDirection: 'row',
													justifyContent: 'space-between',
													paddingBottom: 5
												}}
											//key={index}
											>
												<Form style={{ flex: 4, paddingRight: 3 }}>
													<RNPicker
														dataSource={this.state.dataSource}
														dummyDataSource={this.state.dataSource}
														defaultValue={false}
														pickerTitle={"Animals Picker"}
														showSearchBar={true}
														disablePicker={false}
														changeAnimation={"none"}
														searchBarPlaceHolder={"Search....."}
														showPickerTitle={true}
														searchBarContainerStyle={Styles.searchBarContainerStyle}
														pickerStyle={Styles.pickerStyle}
														selectedLabel={this.state.items[index].species}
														placeHolderLabel={this.state.placeHolderText}
														selectLabelTextStyle={Styles.selectLabelTextStyle}
														placeHolderTextStyle={Styles.placeHolderTextStyle}
														dropDownImageStyle={Styles.dropDownImageStyle}
														//dropDownImage={require("./res/ic_drop_down.png")}
														selectedValue={(iindex, name) => this._selectedValue(index, name, iindex)}
													/>
													{/*
													<Item regular style={{ borderRadius: 7, backgroundColor: colors.gray }}>
														<Input
															placeholder="Enter item here"
															onChangeText={(species) => {
																//Alert.alert(String(val), String(index))
																var items = this.state.items
																items[index] = { species: species, num: items[index].num }
																this.setState({
																	items: items
																})
															}}
														/>
													</Item>
													*/}
												</Form>
												<Form style={{ flex: 1, paddingLeft: 3 }}>
													<Item regular style={{ borderRadius: 7, backgroundColor: colors.gray }}>
														<Input
															placeholder="0"
															onChangeText={(num) => {
																var items = this.state.items
																items[index] = { species: items[index].species, num: num }
																this.setState({
																	items: items
																})
															}}
														/>
													</Item>
												</Form>
											</View>
										))
									}

									<TouchableOpacity
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'flex-start',
											alignItems: 'center'
										}}
										onPress={() => {
											this.setState({
												rows: this.state.rows.concat([1]),
												items: this.state.items.concat([{ species: '', num: 0 }])
											})
										}}
									>
										<Icon style={{ color: '#3F51B5', fontSize: 20, paddingRight: 4 }} name="ios-add" />
										<Text style={{ color: '#3F51B5', fontSize: 13 }} >add new</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										borderColor: '#3F51B5',
										borderWidth: 2,
										borderRadius: 7,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 7,
										marginTop: 10
									}}
								>
									<Text
										style={{ color: '#3F51B5', fontSize: 16, textAlign: 'center' }}>
										If you didn't see any animals, continue with nothing entered.
									</Text>
								</View>
							</Content>
							:
							null
					}
					{
						this.state.seg === 2
							?
							<Footer>
								<FooterTab style={{ backgroundColor: '#3F51B5' }}>
									<Button
										onPress={() => {
											seg = this.state.seg + 1
											this.setState({
												seg: seg
											})
											this.props.actions.addAnimalstoNewObservation(this.state.items, this.props.user, this.props.currentIndex)
										}}
									>
										<Text style={{ color: 'white', fontSize: 16.5 }}>Next Step</Text>
									</Button>
								</FooterTab>
							</Footer>
							:
							null
					}

					{
						this.state.seg === 3
							?
							<Content
								contentContainerStyle={{
									flex: 1,
									paddingHorizontal: 20,
									paddingVertical: 30,
									backgroundColor: colors.gray
								}}
							>
								<View
									style={{
										backgroundColor: 'white',
										padding: 7,
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
								>
									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'space-between',
											paddingBottom: 5
										}}
									>
										<Text>
											Item
										</Text>
										<Text>
											Amount
										</Text>
									</View>

									{
										this.state.hrows.map((val, index) => (
											<View
												style={{
													width: '100%',
													flexDirection: 'row',
													justifyContent: 'space-between',
													paddingBottom: 5
												}}
											>
												<Form style={{ flex: 4, paddingRight: 3 }}>
													<RNPicker
														dataSource={this.state.hdataSource}
														dummyDataSource={this.state.hdataSource}
														defaultValue={false}
														pickerTitle={"Items Picker"}
														showSearchBar={true}
														disablePicker={false}
														changeAnimation={"none"}
														searchBarPlaceHolder={"Search....."}
														showPickerTitle={true}
														searchBarContainerStyle={Styles.searchBarContainerStyle}
														pickerStyle={Styles.pickerStyle}
														selectedLabel={this.state.hitems[index].species}
														placeHolderLabel={this.state.hplaceHolderText}
														selectLabelTextStyle={Styles.selectLabelTextStyle}
														placeHolderTextStyle={Styles.placeHolderTextStyle}
														dropDownImageStyle={Styles.dropDownImageStyle}
														//dropDownImage={require("./res/ic_drop_down.png")}
														selectedValue={(iindex, name) => this._hselectedValue(index, name, iindex)}
													/>
													{
														/*
													<Item regular style={{ borderRadius: 7, backgroundColor: colors.gray }}>
														<Input
															placeholder="Enter item here"
															onChangeText={(species) => {
																//Alert.alert(String(val), String(index))
																var items = this.state.hitems
																items[index] = { species: species, num: items[index].num }
																this.setState({
																	hitems: items
																})
															}}
														/>
													</Item>
													*/}
												</Form>
												<Form style={{ flex: 1, paddingLeft: 3 }}>
													<Item regular style={{ borderRadius: 7, backgroundColor: colors.gray }}>
														<Input
															placeholder="0"
															onChangeText={(num) => {
																//Alert.alert(String(val), String(index))
																var items = this.state.hitems
																items[index] = { species: items[index].species, num: num }
																this.setState({
																	hitems: items
																})
															}}
														/>
													</Item>
												</Form>
											</View>
										))
									}
									<TouchableOpacity
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'flex-start',
											alignItems: 'center'
										}}
										onPress={() => {
											this.setState({
												hrows: this.state.hrows.concat([1]),
												hitems: this.state.hitems.concat([{ species: '', num: 0 }])
											})
										}}
									>
										<Icon style={{ color: '#3F51B5', fontSize: 20, paddingRight: 4 }} name="ios-add" />
										<Text style={{ color: '#3F51B5', fontSize: 13 }} >add new</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										borderColor: '#3F51B5',
										borderWidth: 2,
										borderRadius: 7,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 7,
										marginTop: 10
									}}
								>
									<Text
										style={{ color: '#3F51B5', fontSize: 16, textAlign: 'center' }}>
										If you didn't see any items, continue with nothing entered.
									</Text>
								</View>
							</Content>
							:
							null
					}
					{
						this.state.seg === 3
							?
							<Footer>
								<FooterTab style={{ backgroundColor: '#3F51B5' }}>
									<Button
										onPress={() => {
											seg = this.state.seg + 1
											this.setState({
												seg: seg
											})
											this.props.actions.addHumanstoNewObservation(this.state.hitems, this.props.user, this.props.currentIndex)
										}}
									>
										<Text style={{ color: 'white', fontSize: 16.5 }}>Next Step</Text>
									</Button>
								</FooterTab>
							</Footer>
							:
							null
					}

					{
						this.state.seg === 4
							?
							<Content
								contentContainerStyle={{
									flex: 1,
									paddingHorizontal: 20,
									paddingVertical: 30,
									backgroundColor: colors.gray
								}}
							>
								<View
									style={{
										//flex: 3,
										backgroundColor: 'white',
										padding: 7,
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
								>
									<FlatList
										//style={{ flex: 1 }}
										contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={this.state.activityList}
										renderItem={({ item }) => {
											//Alert.alert(item.name)
											return (
												<TouchableOpacity
													onPress={() => {
														this.setState({
															//selectedActivity : this.state.selectedActivity.concat(item),=
															selectedActivityName: item.name
														})
													}}
													//key={index}
													style={{
														justifyContent: 'center',
														alignItems: 'center',
														width: 50,
														height: 50,
														backgroundColor: item.name === this.state.selectedActivityName ? colors.primary : colors.gray,
														margin: 5,
														borderRadius: 50,
														borderColor: colors.primary,
														borderWidth: 1
													}}>
													<Icon
														name={item.name}
														style={{
															color: item.name === this.state.selectedActivityName ? 'white' : colors.primary,
															fontSize: 30
														}}
													/>
												</TouchableOpacity>
											)
										}}
									>
									</FlatList>
									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'space-between',
											paddingBottom: 5
										}}
									>
										<Text>
											What were you doing?
										</Text>
									</View>

									<View
										style={{
											width: '100%',
											flexDirection: 'row',
											justifyContent: 'space-between',
											paddingBottom: 5
										}}
									>
										<Form style={{ flex: 1, paddingRight: 3 }}>
											<Textarea
												rowSpan={5}
												bordered
												placeholder="e.g. I was out on my boat"
												style={{
													borderRadius: 7,
													backgroundColor: colors.gray
												}}
											/>
										</Form>
									</View>
								</View>
							</Content>
							:
							null
					}
					{
						this.state.seg === 4
							?
							<Footer>
								<FooterTab style={{ backgroundColor: '#3F51B5' }}>
									<Button
										onPress={() => {
											Navigation.popToRoot("AppStack")
										}}
									>
										<Text style={{ color: 'white', fontSize: 16.5 }}>Submit</Text>
									</Button>
								</FooterTab>
							</Footer>
							:
							null
					}
				</Container>
			</StyleProvider>
		);
	}
}


function mapStateToProps(state, ownProps) {
	return {
		newObservations: state.appReducer.newObservations,
		currentIndex: state.appReducer.currentIndex,
		user: state.authReducer.user,
		wantToAddPhoto: state.appReducer.wantToAddPhoto
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(offsActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(ObservationList);

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},

	searchBarContainerStyle: {
		marginBottom: 10,
		flexDirection: "row",
		height: 40,
		backgroundColor: colors.gray,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 7,
		/*
		shadowOpacity: 1.0,
		shadowRadius: 5,
		shadowOffset: {
			width: 1,
			height: 1
		},
		backgroundColor: "rgba(255,255,255,1)",
		shadowColor: "#d3d3d3",
		borderRadius: 10,
		elevation: 3,
		marginLeft: 10,
		marginRight: 10
		*/
	},

	selectLabelTextStyle: {
		color: 'black',
		textAlign: "left",
		width: "99%",
		padding: 10,
		flexDirection: "row"
	},
	placeHolderTextStyle: {
		color: 'black', //"#D3D3D3",
		padding: 10,
		textAlign: "left",
		width: "99%",
		flexDirection: "row"
	},
	dropDownImageStyle: {
		marginLeft: 10,
		width: 10,
		height: 10,
		alignSelf: "center"
	},

	pickerStyle: {
		marginLeft: 18,
		//elevation: 3,
		paddingRight: 25,
		marginRight: 10,
		marginBottom: 2,
		backgroundColor: colors.gray,
		/*
		shadowOpacity: 1.0,
		shadowOffset: {
			width: 1,
			height: 1
		},
		borderWidth: 1,
		shadowRadius: 10,
		backgroundColor: "rgba(255,255,255,1)",
		shadowColor: "#d3d3d3",
		*/
		borderRadius: 5,
		flexDirection: "row"
	}
});
