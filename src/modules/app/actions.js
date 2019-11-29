import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome, goToAuth } from '../../utils/navigation'
import { ToastAndroid, Alert } from "react-native";
import { Navigation } from 'react-native-navigation';
//import * as authActions from '../authentication/actions';
import AsyncStorage from '@react-native-community/async-storage';
import RNBackgroundDownloader from 'react-native-background-downloader';
var RNFS = require('react-native-fs');

export function retrieveAllCoursesSuccess(res) {
	return {
		type: types.RETRIEVE_ALL_COURSES_SUCCESS,
		data: res.data,
		meta: res.meta
	};
}

export function retrieveAllCoursesFail(res) {
	return {
		type: types.RETRIEVE_ALL_COURSES_FAIL,
		message: res.msg,
	};
}

export function retrieveAppState(appState) {
	return {
		type: types.RETRIEVE_APP_STATE,
		appState: appState,
	};
}

export function retrieveAllPartsSuccess(parts) {
	return {
		type: types.RETRIEVE_ALL_PARTS_SUCCESS,
		parts: parts
	}
}

export function retrieveAllCourses(offline) {
	return async function (dispatch) {
		if (offline !== 'OFFLINE') {
			/*const appState = await AsyncStorage.getItem('appState');
			if (appState !== null) {
				const jsonAppState = JSON.parse(appState);
				jsonAppState.parts
					? dispatch(retrieveAllPartsSuccess(jsonAppState.parts))
					: null
			}*/
			console.log(API_URL + 'courses/get_all_courses')
			axios.get(API_URL + 'courses/get_all_courses')
				.then(res => {
					console.log('AllCoursesResponse: ', res)
					dispatch(retrieveAllCoursesSuccess({ data: res.data.data, meta: res.data.meta }));
				})
				.catch(error => {
					console.log("Error AllCoursesResponse: ", error.response); //eslint-disable-line
					dispatch(retrieveAllCoursesFail({ msg: 'قادر به دریافت تمامی دوره ها نبودیم ' }));
					Alert.alert('خطای سرور', 'قادر به دریافت تمامی دوره ها نبودیم ')
				});
		} else {
			const appState = await AsyncStorage.getItem('appState');
			console.log(appState)
			dispatch(retrieveAppState(JSON.parse(appState)));
		}
	};
}

export function retrieveMyCoursesSuccess(res) {
	return {
		type: types.RETRIEVE_MY_COURSES_SUCCESS,
		data: res.data,
		total: res.total
		//meta: res.meta
	};
}

export function retrieveMyCoursesNothing() {
	return {
		type: types.RETRIEVE_MY_COURSES_NOTHING,
		//data: res.data,
		//meta: res.meta
	};
}

export function retrieveMyCoursesFail(res) {
	return {
		type: types.RETRIEVE_MY_COURSES_FAIL,
		message: res.msg,
	};
}

async function retrieveDetails(urls) {
	//crss = []
	crss = await urls.map((crs, index) => {
		console.log(API_URL + 'courses/' + crs.course_id)
		axios
			.get(API_URL + 'courses/' + crs.course_id)
			.then(res => {
				//crss.concat(res.data.data)
				console.log('Crs Response: ', res.data.data)
				return res.data.data
			})
			.catch(error => {
				console.log('Crs Error: ', error.response ? error.response : error)
			})
	})
	return crss
}

export function retrieveMyCourses(token, id) {
	return function (dispatch) {
		if (token !== 'OFFLINE') {
			console.log(API_URL + 'userpanel/get_user_courses/' + id + '?api_token=' + token)
			axios.get(API_URL + 'userpanel/get_user_courses/' + id + '?api_token=' + token)
				.then(res => {
					//(async () => {
					//	crss = ['jkh']
					if (res.data.data.learnings.data.length > 0) {
						res.data.data.learnings.data.map((crs, index) => {
							console.log(API_URL + 'courses/' + crs.course_id + '?api_token=' + token)
							axios
								.get(API_URL + 'courses/' + crs.course_id + '?api_token=' + token)
								.then(res1 => {
									dispatch(retrieveMyCoursesSuccess({ data: res1.data.data, total: res.data.data.learnings.data.length }));
									//crss.concat(res.data.data)
									// console.log('Crs Response: ', res1.data.data)
									//crss.concat(res.data.data)
								})
								.catch(error => {
									// console.log('Crs Error: ', error.response ? error.response : error)
								})
						})
					} else {
						dispatch(retrieveMyCoursesNothing());
					}
					//console.log('CRSS: ', crss)
					//return crss
					//})
					//().then((res1) => {
					console.log('MyCoursesResponse: ', res)
					//console.log('MyRetrieveResponse: ', res1)
					//dispatch(retrieveMyCoursesSuccess({ data: res1 }));
					//})
					/*
					retrieveDetails(res.data.data.learnings.data)
						.then(res1 => {
							console.log('MyRetrieveResponse: ', res1)
							dispatch(retrieveMyCoursesSuccess({ data: res1 }));
						})
					*/
				})
				.catch(error => {
					console.log("Error MyCoursesResponse: ", error.response ? error.response : error); //eslint-disable-line
					dispatch(retrieveMyCoursesFail({ msg: 'قادر به دریافت دوره های شما نبودیم ' }));
					Alert.alert('خطای سرور', 'قادر به دریافت دوره های شما نبودیم ')

					/*if (error.response.status === 422) {
						dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
						Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
					}
					if (error.response.status === 403) {
						dispatch(signinUserFail({ msg: error.response.data.data.message }));
						Alert.alert('خطای سرور', error.response.data.data.message)
					}*/
				});
		}
	};
}

export function retrieveMyCoursePartsSuccess(res) {
	return {
		type: types.RETRIEVE_MY_COURCE_PARTS_SUCCESS,
		data: res,
		//meta: res.meta
	};
}

export function retrieveMyCourseParts(id) {
	return function (dispatch) {
		console.log(API_URL + 'parts/' + id)
		axios
			.get(API_URL + 'parts/' + id)
			.then(res => {
				console.log('Part Res: ', res)
				dispatch(retrieveMyCoursePartsSuccess({ id: id, episodes: res.data.data.episodes }));
				/*this.setState({
          episodes: res.data.data.episodes,
          isLoading: false
        })*/
			})
			.catch(err => {
				console.log('Part Errr: ', err.response ? err.response : err)
			})
	}
}

export function updateMyCoursePartsSuccess(res) {
	return {
		type: types.UPDATE_PARTS_EPISODES_SUCCESS,
		data: res,
		//meta: res.meta
	};
}

export function updateMyCourseParts(id, key, value) {
	return function (dispatch) {
		dispatch(updateMyCoursePartsSuccess({ id: id, key: key, value: value }));
	}
}

export function retrieveMyFavoritesSuccess(res) {
	return {
		type: types.RETRIEVE_MY_FAVORITES_SUCCESS,
		data: res,
		//meta: res.meta
	};
}

export function retrieveMyFavorites(token) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/favorates/get_favorates' + '?api_token=' + token)
		axios.get(API_URL + 'userpanel/favorates/get_favorates' + '?api_token=' + token)
			.then(res => {
				console.log(' Fav Res: ', res.data.data.map((val) => (val.course_id)))
				dispatch(retrieveMyFavoritesSuccess(res.data.data.map((val) => (val.course_id))))
			})
			.catch(error => {
				console.log(' Fav Err: ', error.response ? error.response : error)
			})
	}
}

export function addToMyFavoritesSuccess(res) {
	return {
		type: types.ADD_MY_FAVORITES_SUCCESS,
		data: res,
		//meta: res.meta
	};
}

export function addToMyFavorites(token, uId, cId) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/favorates/add_tolist')
		axios
			.post(
				API_URL + 'userpanel/favorates/add_tolist',
				{
					user_id: uId,
					course_id: cId
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			)
			.then(res => {
				console.log('Add to Fav Res: ', res.data)
				dispatch(addToMyFavoritesSuccess(cId))
			})
			.catch(error => {
				console.log('Add to Fav Err: ', error.response ? error.response : error)
			})
	}
}

export function removeFromMyFavoritesSuccess(res) {
	return {
		type: types.REMOVE_MY_FAVORITES_SUCCESS,
		data: res,
		//meta: res.meta
	};
}

export function removeFromMyFavorites(token, uId, cId) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/favorates/delete_item')
		axios
			.post(
				API_URL + 'userpanel/favorates/delete_item',
				{
					user_id: uId,
					course_id: cId
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			)
			.then(res => {
				console.log('Rm From Fav Res: ', res.data)
				dispatch(removeFromMyFavoritesSuccess(cId))
			})
			.catch(error => {
				console.log('Rm from Fav Err: ', error.response ? error.response : error)
			})
	}
}

export function addCommentSuccess() {
	return {
		type: types.ADD_COMMENT_SUCCESS,
		//data: res,
		//meta: res.meta
	};
}

export function addComment(token, comment, uId, cId) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/courses/send_comment')
		axios
			.post(
				API_URL + 'userpanel/courses/send_comment',
				{
					comment: comment,
					user_id: uId,
					course_id: cId
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			)
			.then(res => {
				console.log('Add Comment: ', res.data)
				dispatch(addCommentSuccess())
			})
			.catch(error => {
				console.log('Add Comment Err: ', error.response ? error.response : error)
			})
	}
}

export function retrieveVideoUrlSuccess(res) {
	return {
		type: types.RETRIEVE_VIDEO_URL_SUCCESS,
		link: res.link,
		eId: res.eId,
		cId: res.cId
	}
}

export function retrieveVideoUrlFail(message) {
	return {
		type: types.RETRIEVE_VIDEO_URL_FAIL,
		message: message
	}
}

export function retrieveVideoUrl(cId, eId, token) {
	return function (dispatch) {
		if (token !== "OFFLINE") {
			console.log(API_URL + 'get_download_link' + '?course_id=' + cId + '&episode_number=' + eId + '&api_token=' + token)
			axios.get(API_URL + 'get_download_link' + '?course_id=' + String(cId) + '&episode_number=' + String(eId) + '&api_token=' + token)
				.then(res => {
					console.log('DownloadLink: ', res)
					//Alert.alert('Link', res.data)
					dispatch(retrieveVideoUrlSuccess({ link: res.data, cId: cId, eId: eId }))
					task = RNBackgroundDownloader.download({
						id: `video_${cId}_${eId}`,
						url: res.data,
						destination: `${RNBackgroundDownloader.directories.documents}/video_${cId}_${eId}.mp4`
					}).begin((expectedBytes) => {
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'expectedBytes',
							value: expectedBytes
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'error',
							value: false
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'paused',
							value: false
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'done',
							value: false
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'icon',
							value: 'ios-pause'
						}));
					}).progress((percent) => {
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'percent',
							value: `${parseInt(percent * 100)}%`
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'icon',
							value: 'ios-pause'
						}));
					}).done(() => {
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'percent',
							vaue: `${1 * 100}%`
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'done',
							value: true
						}));
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'icon',
							value: 'ios-play'
						}));
					}).error((error) => {
						dispatch(updateMyCoursePartsSuccess({
							id: `video_${cId}_${eId}`,
							key: 'error',
							value: true
						}));
						//`${RNBackgroundDownloader.directories.documents}/video_${cId}_${eId}.mp4`
						// RNFS.dele
						var path = `${RNBackgroundDownloader.directories.documents}/video_${cId}_${eId}.mp4`;

						RNFS.unlink(path)
							.then(() => {
								console.log('FILE DELETED');
							})
							// `unlink` will throw an error, if the item to unlink does not exist
							.catch((err) => {
								console.log(err.message);
							});
						Alert.alert('خطا در دانلود:', JSON.stringify(error));
					});
				})
				.catch(error => {
					console.log("Erorr DownloadLink: ", error.response ? error.response : error); //eslint-disable-line
					dispatch(retrieveVideoUrlFail('قادر به دریافت لینک دوره های شما نبودیم '));
					//Alert.alert('خطای سرور', 'قادر به دریافت دوره های شما نبودیم ')
				});
		}
	};
}

export function retrieveMyFavoriteCoursesSuccess(crs) {
	return {
		type: types.RETRIEVE_MY_FAVORITE_COURSES_SUCCESS,
		data: crs
	}
}

export function retrieveMyFavoriteCoursesNothing() {
	return {
		type: types.RETRIEVE_MY_FAVORITE_COURSES_NOTHING,
		//data: crs
	}
}

export function retrieveMyFavoriteCourses(token) {
	return async function (dispatch) {
		console.log(API_URL + 'userpanel/favorates/get_favorates' + '?api_token=' + token)
		axios.get(API_URL + 'userpanel/favorates/get_favorates' + '?api_token=' + token)
			.then(res => {
				console.log(' Fav Res: ', res.data.data.map((val) => (val.course_id)))
				if (res.data.data.length > 0) {
					res.data.data.map((crs, index) => {
						console.log(API_URL + 'courses/' + crs.course_id + '?api_token=' + token)
						axios
							.get(API_URL + 'courses/' + crs.course_id + '?api_token=' + token)
							.then(res1 => {
								dispatch(retrieveMyFavoriteCoursesSuccess(res1.data.data))
								//dispatch(retrieveMyCoursesSuccess({ data: res1.data.data }));
								//crss.concat(res.data.data)
								console.log('Fav Crs Response: ', res1.data.data)
								//crss.concat(res.data.data)
							})
							.catch(error => {
								console.log('Fav Crs Error: ', error.response ? error.response : error)
							})
					})
				} else {
					dispatch(retrieveMyFavoriteCoursesNothing());
				}
			})
			.catch(error => {
				console.log(' Fav Err: ', error.response ? error.response : error)
			})
	}
}

export function removeMyFavoriteCoursesSuccess() {
	return {
		type: types.REMOVE_MY_FAVORITE_COURSES_SUCCESS,
		//data: crs
	}
}

export function removeMyFavoriteCourses() {
	return async function (dispatch) {
		dispatch(removeMyFavoriteCoursesSuccess())
	}
}

export function addToWatchedSuccess(cId, eId, episodes) {
	return {
		type: types.ADD_TO_WATCHED,
		cId: cId,
		eId: eId,
		episodes: episodes
	}
}

export function addToWatched(cId, eId, episodes) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem('watchedCourses')
		var data = JSON.parse(jdata)
		console.log('Watch Local: ', data)
		if (jdata === null) {
			temp = {}
			temp[cId] = [eId]
			await AsyncStorage.setItem('watchedCourses', JSON.stringify(temp))
		} else {
			if (Object.keys(data).includes(`${cId}`)) {
				data[`${cId}`] = data[`${cId}`].concat(eId)
				console.log('Watch Local1: ', data[`${cId}`])
				await AsyncStorage.setItem('watchedCourses', JSON.stringify(data))
			} else {
				data[`${cId}`] = [eId]
				console.log('Watch Local2: ', data)
				await AsyncStorage.setItem('watchedCourses', JSON.stringify(data))
			}
		}
		dispatch(addToWatchedSuccess(cId, eId, episodes))
	}
}

export function retrieveWatchedCoursesSuccess(data, all) {
	return {
		type: types.RETRIEVE_WATCHED_SUCCESS,
		data: data,
		all: all
	}
}

export function retrieveWatchedCourses() {
	return async function (dispatch) {
		const data = await AsyncStorage.getItem('watchedCourses')
		const all = await AsyncStorage.getItem('allWatched')
		if (data === null) {
			if (all === null) {
				dispatch(retrieveWatchedCoursesSuccess({}, []))
			} else {
				dispatch(retrieveWatchedCoursesSuccess({}, JSON.parse(all)))
			}
		} else {
			if (all === null) {
				dispatch(retrieveWatchedCoursesSuccess(JSON.parse(data), []))
			} else {
				dispatch(retrieveWatchedCoursesSuccess(JSON.parse(data), JSON.parse(all)))
			}
		}
	}
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

export function addPhotoSuccess(imgUri) {
	return {
		type: types.ADD_TO_NEWOBSERVATIONS_SUCCESS,
		imgUri: imgUri
	}
}

export function addPhoto(img, user) {
	return async function (dispatch) {
		const data = await AsyncStorage.getItem(user.email);
		if (data === null) {
			await AsyncStorage.setItem(user.email, JSON.stringify({
				newObservations: [{
					img: 'file://' + img
				}]
			}))
				.then(() => {
					console.log("The observation has been stored locallkky")
					dispatch(addPhotoSuccess(img));
					//goHome();
				})
				.catch(err => {
					Alert.alert('Could not save locally', err);
				})
		} else {
			if (data.newObservations) {
				data.newObservations = [...data.newObservations, { img: 'file://' + img }]
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
			} else {
				data.newObservations = [{ img: 'file://' + img }]
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
			}
		}
	};
}

export function addTimeandLocSuccess(time, lon, lat) {
	return {
		type: types.ADD_TIME_AND_LOC_TO_NEWOBSERVATIONS_SUCCESS,
		time: time,
		lon: lon,
		lat: lat
	}
}

export function addTimeandLoc(time, lon, lat, user, currentIndex) {
	return async function (dispatch) {
		//= null
		var jdata = await AsyncStorage.getItem(user.email)

		//console.log('data: ',data)
		const data = JSON.parse(jdata)
		//console.log('jdata: ',jdata)
		if (data === null) {
			console.log('Nothing')
		}
		//console.log('jdata newobservation: ',jdata.newObservations)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: time,
				lon: lon,
				lat: lat
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: time,
					lon: lon,
					lat: lat
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}

		dispatch(addTimeandLocSuccess(time, lon, lat));
	};
}


export function addHumanstoNewObservationSuccess(human) {
	return {
		type: types.ADD_HUMANS_TO_NEWOBSERVATIONS_SUCCESS,
		human: human
	}
}

export function addHumanstoNewObservation(human, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);

		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(human[0].num) + ' ' + human[0].species,
				human: human,
				animal: data.newObservations[0].animal ? data.newObservations[0].animal : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(human[0].num) + ' ' + human[0].species,
					human: human,
					animal: data.newObservations[currentIndex].animal ? data.newObservations[currentIndex].animal : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addHumanstoNewObservationSuccess(human));
	};
}

export function addAnimalstoNewObservationSuccess(animal) {
	return {
		type: types.ADD_ANIMALS_TO_NEWOBSERVATIONS_SUCCESS,
		animal: animal
	}
}
export function addAnimalstoNewObservation(animal, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);
		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(animal[0].num) + ' ' + animal[0].species,
				animal: animal,
				human: data.newObservations[0].human ? data.newObservations[0].human : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(animal[0].num) + ' ' + animal[0].species,
					animal: animal,
					human: data.newObservations[currentIndex].human ? data.newObservations[currentIndex].human : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addAnimalstoNewObservationSuccess(animal));
	};
}

// Signin User
export function retrieveNewObservationsSuccess(res, index) {
	return {
		type: types.RETRIEVE_NEW_OBSERVATIONS_SUCCESS,
		newObservations: res,
		currentIndex: index
	};
}

export function retrieveObservationsSuccess(res) {
	return {
		type: types.RETRIEVE_OBSERVATIONS_SUCCESS,
		observations: res
	};
}

export function retrieveObservations(status, user, token) {
	return async function (dispatch) {
		if (!status) {
			//online

			//console.log(API_URL + 'observations')
			var config = {
				headers: { 'Authorization': token }
			};

			var bodyParameters = {

			};
			axios.get(API_URL + 'observations', bodyParameters, config)
				.then(res => {
					console.log('Observations: ', res)
					dispatch(retrieveObservationsSuccess(res.meta));
					_saveObservations(res.meta, user)
					//goHome();
				})
				.catch(async (error) => {
					Alert.alert('Server Err', 'We could not retrieve the observations.')
					//_loadObservations(user)
					const jdata = await AsyncStorage.getItem(user.email)
					const data = JSON.parse(jdata)
					console.log('Load Obsrv: ', data)
					if (data === null) {
						Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
					} else {
						if (data.observations) {
							dispatch(retrieveObservationsSuccess(data.observations))
						}
						if (data.newObservations) {
							dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
						}
					}
					console.log(error); //eslint-disable-line
				});

		} else {
			//offline
			Alert.alert('Offline', 'We could not retrieve the observations.')
			//_loadObservations(user)
			const jdata = await AsyncStorage.getItem(user.email)
			if (jdata === null) {
				Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
			} else {
				const data = JSON.parse(jdata)
				console.log('Load Obsrv: ', data)
				if (data.observations) {
					dispatch(retrieveObservationsSuccess(data.observations))
				}
				if (data.newObservations) {
					dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
				}
			}
		}
	};
}

async function _saveObservations(data, user) {
	await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
		.then(() => {
			//console.log("The user has been stored locallkky")
			//goHome();
		})
		.catch(err => {
			//alert('error: jhggkj', err);
		})
}

export function _loadObservations(user) {
	//Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email)
			.then(() => {
				console.log('Read')
				const data = JSON.parse(jdata)
				console.log('Load Obsrv: ', data)
				if (data === null) {
					Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
				} else {
					if (data.observations) {
						dispatch(retrieveObservationsSuccess(data.observations))
					}
					if (data.newObservations) {
						dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
					}
				}
			})
			.catch((err) => {
				console.log('Err Read: ', err)
			})
	}
}
