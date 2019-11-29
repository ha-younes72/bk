import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome, goToAuth } from '../../utils/navigation';
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'
import { Alert } from 'react-native'
// Signin User
export function signinUserSuccess(res) {
	return {
		type: types.SIGNIN_USER_SUCCESS,
		user: res.user,//res.userInfo,
		token: res.token//res.token
	};
}

export function signinUserFail(res) {
	return {
		type: types.SIGNIN_USER_FAIL,
		message: res.msg,
	};
}

export function signinUser(user, offline) {
	console.log('User to be logged in: ', user)
	return function (dispatch) {
		if (!offline) {
			console.log(API_URL + 'login')
			axios.post(API_URL + 'login', {
				mobile: user.mobile,
				password: user.password
			})
				.then(res => {
					console.log('LoginResponse: ', res)
					console.log('LoginResponseData: ', res.data.data)
					dispatch(signinUserSuccess({ user: res.data.data, token: res.data.data.api_token }));
					_signInAsync({...res.data.data, password: user.password})
				})
				.catch(error => {
					console.log("Error Logging In: ", error.response ? error.response : error); //eslint-disable-line
					Alert.alert("Error Logging In: ", String(error))
					if (error.response) {
						if (error.response.status === 422) {
							dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
							Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
						}
						if (error.response.status === 403) {
							dispatch(signinUserFail({ msg: error.response.data.data.message }));
							Alert.alert('خطای سرور', error.response.data.data.message)
						}
					}
				});
		} else {
			dispatch(signinUserSuccess({ user: user, token: "OFFLINE" }));
			goHome();
			// _signInAsync(user);
		}
	};
}

_signInAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			console.log("The user has been stored locallkky")
			goHome();
		})
		.catch(err => {
			Alert.alert('Error in Saving Locally', err);
		})
};

// Signup User
export function signupUserSuccess(res) {
	return {
		type: types.SIGNUP_USER_SUCCESS,
		//message: 'SignedUp'//res.message
		user: res.user,
		token: res.token
	};
}

export function signupUserFail(res) {
	return {
		type: types.SIGNUP_USER_FAIL,
		message: res.message
	};
}

export function signupUser(user) {
	console.log('User to be signed up: ', user)
	return function (dispatch) {

		var body = new FormData();
		body.append('mobile', user.mobile)
		body.append('name', user.name)
		body.append('email', user.email)
		body.append('password', user.password)

		console.log(API_URL + 'register')
		axios.post(API_URL + 'register', body, { headers: { 'Accept': 'application/json' } })
			.then(res => {
				console.log('registerResponse: ', res)
				dispatch(signupUserSuccess({ user: res.data.data, token: res.data.data.api_token }));
				_signupAsync(user)
			})
			.catch(error => {
				console.log("Error registering: ", error.response ? error.response : error); //eslint-disable-line
				dispatch(signupUserFail({ message: 'خطای سرور' }));
				error.response && error.response.data && error.response.data.errors ?
					Alert.alert('خطا',
						error.response.data.errors.mobile ?
							error.response.data.errors.email ?
								`${error.response.data.errors.mobile[0]} \n ${error.response.data.errors.email[0]}`
								: error.response.data.errors.mobile[0]
							:
							error.response.data.errors.email ?
								error.response.data.errors.email[0]
								: ''
					)
					:
					Alert.alert('خطای سرور', 'خطایی در سرور رخ داده است \n' + JSON.stringify(error.response ? error.response : error))
			});
	};
}

_signupAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			//console.log("The user has been stored locally")
			goHome();
		})
		.catch(err => {
			Alert.alert('error: ', err);
		})
};

export function setStatusSuccess(status) {
	return {
		type: types.SET_STATUS,
		status: status
	}
}

export function setStatus(status) {
	return function (dispatch) {
		dispatch(setStatusSuccess(status));
	}
}


// Error Clear
export function updateUserSUCCESS(data) {
	return {
		type: types.UPDATE_USER_SUCCESS,
		field: data
		//message: null
	}
}

export function updateUserFail(errors) {
	return {
		type: types.UPDATE_USER_FAIL,
		errors: errors
	}
}

export function updateUser(videoSource, name, userId, token) {
	return function (dispatch) {
		// Alert.alert(JSON.stringify(name),JSON.stringify(videoSource))
		// Alert.alert('name',JSON.stringify(name))
		// Alert.alert('userId',JSON.stringify(userId))
		console.log(API_URL + 'userpanel/profiles/edit/' + userId)
		// console.log(newUser)

		if (videoSource !== null) {
			console.log('Video to be uploaded: ', videoSource)
			btoken = 'Bearer ' + token
			// console.log('Token:', this.props.token)


			RNFS
				.stat(videoSource.path)
				.then(statRes => {
					console.log('Stat1 Result: ', statRes)
				})
				.catch(err => {
					console.log('Stat Err: ', err)
				})
			var uploadUrl = API_URL + 'userpanel/profiles/update_avatar/' + userId;

			RNFetchBlob.fetch('POST', uploadUrl, {
				Authorization: btoken,
				//otherHeader : "foo",
				// this is required, otherwise it won't be process as a multipart/form-data request
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			}, [
				// append field data from file path
				{
					name: 'file',
					filename: videoSource.fileName, // this.state.videoSource.fileName,
					//filepath: this.state.videoSource.path,
					//name : 'avatar',
					//filename : 'avatar.png',
					// Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
					// Or simply wrap the file path with RNFetchBlob.wrap().
					data: RNFetchBlob.wrap(videoSource.path)
				},
				/*{
					name : 'ringtone',
					filename : 'ring.mp3',
					// use custom MIME type
					type : 'application/mp3',
					// upload a file from asset is also possible in version >= 0.6.2
					data : RNFetchBlob.wrap(RNFetchBlob.fs.asset('default-ringtone.mp3'))
				}*/
				// elements without property `filename` will be sent as plain text
				//	  text: JSON.stringify(this.state.content),
				//user_id: JSON.stringify(this.props.userId),
				//                          subject: JSON.stringify('ﻡﻮﺿﻮﻋ ﺖﺴﺗ'),
				//                            mobile: JSON.stringify(this.props.mobile)
				// { name: 'text', data: JSON.stringify(this.state.content) },
				// { name: 'subject', data: JSON.stringify(this.props.ctitle + "/" + this.props.title) },
				// { name: 'mobile', data: JSON.stringify(this.props.mobile) }
			])
				.uploadProgress((written, total) => {
					var percentage = Math.floor((written / total) * 100);
					console.log('uploaded', written / total)
				})
				.progress((received, total) => {
					console.log('progress', received / total)
				})
				.then((resp) => {
					console.log('Resp: ', resp)
					// Alert.alert('Ok', JSON.stringify(resp))
					dispatch(updateUserSUCCESS({ name: 'avatar', value: videoSource.uri }));
					Alert.alert('موفق', 'عکس شما با موفقیت آپلود شد.')
					// ...
				})
				.catch((err) => {
					console.log('Err: ', err)
					Alert.alert('نا موفق', 'آپلود با مشکل روبرو شد، لطفا مجددا تلاش فرمایید.')
				})
		}
		if (name !== null) {
			axios
				.post(API_URL + 'userpanel/profiles/edit/' + userId + '?api_token=' + token, {
					name: name,
					// account_bank: newUser[2].value,
					// account_owner: user.account_owner,
					// account_kart: newUser[3].value,
					// account_shaba: newUser[4].value,
				})
				.then(res => {
					console.log('UpdateUser:', res)
					Alert.alert('اطلاعات ثبت شد')
					dispatch(updateUserSUCCESS({ name: 'name', value: name }));
				})
				.catch(err => {
					console.log('UpdateUser Error:', err.response ? err.response : err)
					err.response ?
						Alert.alert('Error', JSON.stringify(err.response)) // dispatch(updateUserFail(err.response.data.errors))
						:
						Alert.alert('خطا در برقراری ارتباط با سرور')
				})
		}


	};
}

// Error Clear
export function clearErrorSUCCESS() {
	return {
		type: types.CLEAR_AUTH_ERROR,
		message: null
	}
}

export function clearError() {
	return function (dispatch) {
		dispatch(clearErrorSUCCESS());
	};
}

export function logOutSUCCESS() {
	return {
		type: types.LOG_OUT_SUCCESS,
		//message: null
	}
}

export function logOut() {
	return function (dispatch) {
		AsyncStorage.removeItem('userToken')
			.then(() => {
				dispatch(logOutSUCCESS())
				//console.log("The user has been stored locally")
				goToAuth();
			})
			.catch(err => {
				Alert.alert('خطا: ', err);
			})
	};
};
