import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import AsyncStorage from '@react-native-community/async-storage';

export default function (state = initialState.app, action) {
	switch (action.type) {
		case types.RETRIEVE_APP_STATE:
			return action.appState

		case types.RETRIEVE_ALL_PARTS_SUCCESS:
			return {
				...state,
				parts: action.parts
			}
		case types.RETRIEVE_ALL_COURSES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				allCourses: action.data,
				allCoursesMeta: action.meta
			}))
			return {
				...state,
				allCourses: action.data,
				allCoursesMeta: action.meta
			}

		case types.RETRIEVE_MY_COURSES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				myCourses: state.myCourses.concat(action.data),
				myCoursesIds: state.myCoursesIds.concat(action.data.id),
				myCoursesRetrived: state.myCourses.length === action.total ? true : false,
				myCoursesTotal: action.total,
				//myCoursesMeta: action.meta
			}))
			return {
				...state,
				myCourses: state.myCourses.concat(action.data),
				myCoursesIds: state.myCoursesIds.concat(action.data.id),
				myCoursesRetrived: state.myCourses.length === action.total ? true : false,
				myCoursesTotal: action.total,
				//myCoursesMeta: action.meta
			}

		case types.RETRIEVE_MY_COURSES_NOTHING:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				myCourses: [],
				//myCoursesMeta: action.meta
			}))
			return {
				...state,
				myCourses: [],
				//myCoursesMeta: action.meta
			}

		case types.RETRIEVE_MY_COURCE_PARTS_SUCCESS:
			const parts = state.parts ? JSON.parse(JSON.stringify(state.parts)) : {}
			Object.keys(parts).includes(action.data.id)
				? null
				: parts[action.data.id] = action.data.episodes
			console.log(555, parts)
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				parts: parts
			}))
			return {
				...state,
				parts: parts,
			}

			/*AsyncStorage.getItem('appState')
				.then(result => {
					// console.log(555, result)
					const parts = state.parts ? JSON.parse(JSON.stringify(state.parts)) : {}
					Object.keys(parts).includes(action.data.id)
						? null
						: parts[action.data.id] = action.data.episodes
					console.log(555, parts)
					AsyncStorage.setItem('appState', JSON.stringify({
						...state,
						parts: parts
					})).then(() => {
						return {
							...state,
							parts: parts,
						}
					})
				})
				.catch(err => {
					const parts = state.parts ? JSON.parse(JSON.stringify(state.parts)) : {}
					Object.keys(parts).includes(action.data.id)
						? null
						: parts[action.data.id] = action.data.episodes
					console.log(666, parts)
					return {
						...state,
						// parts: parts
					}
				})
			return state*/
		// const storageParts = JSON.parse(AsyncStorage.getItem('appState').parts)

		case types.UPDATE_PARTS_EPISODES_SUCCESS:
			const tempparts = state.parts ? JSON.parse(JSON.stringify(state.parts)) : {}
			const tempkey = {};
			tempkey[action.data.key] = action.data.value;
			Object.keys(tempparts).includes(action.data.id)
				? tempparts[action.data.id] = {
					...tempparts[action.data.id],
					...tempkey
				}
				: tempparts[action.data.id] = tempkey;
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				parts: tempparts
			}))
			return {
				...state,
				parts: tempparts
			}

		case types.RETRIEVE_MY_FAVORITES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				favorites: action.data
			}))
			return {
				...state,
				favorites: action.data
			}

		case types.ADD_MY_FAVORITES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				favorites: state.favorites.concat(action.data)
			}))
			return {
				...state,
				favorites: state.favorites.concat(action.data)
			}

		case types.REMOVE_MY_FAVORITES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				favorites:
					state.favorites.length === 1
						?
						[]
						:
						state.favorites.findIndex((value) => (value === action.data)) === 0
							?
							state.favorites.slice(1, state.favorites.length)
							:
							state.favorites.findIndex((value) => (value === action.data)) === state.favorites.length - 1
								?
								state.favorites.slice(0, state.favorites.length - 1)
								:
								state.favorites.slice(0, index).concat(state.favorites.slice(index + 1, state.favorites.length))
			}))
			return {
				...state,
				favorites:
					state.favorites.length === 1
						?
						[]
						:
						state.favorites.findIndex((value) => (value === action.data)) === 0
							?
							state.favorites.slice(1, state.favorites.length)
							:
							state.favorites.findIndex((value) => (value === action.data)) === state.favorites.length - 1
								?
								state.favorites.slice(0, state.favorites.length - 1)
								:
								state.favorites.slice(0, index).concat(state.favorites.slice(index + 1, state.favorites.length))
			}

		case types.ADD_COMMENT_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state
			}))
			return {
				...state
			}

		case types.RETRIEVE_MY_FAVORITE_COURSES_NOTHING:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				myFavCourses: []
			}))
			return {
				...state,
				myFavCourses: []
			}

		case types.RETRIEVE_MY_FAVORITE_COURSES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				myFavCourses: state.myFavCourses.concat(action.data)
			}))
			return {
				...state,
				myFavCourses: state.myFavCourses.concat(action.data)
			}

		case types.REMOVE_MY_FAVORITE_COURSES_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				myFavCourses: []
			}))
			return {
				...state,
				myFavCourses: []
			}

		case types.RETRIEVE_VIDEO_URL_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				videoUrl: action.link,
				eId: action.eId,
				cId: action.cId
			}))
			return {
				...state,
				videoUrl: action.link,
				eId: action.eId,
				cId: action.cId
			}

		case types.RETRIEVE_VIDEO_URL_FAIL:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				message: action.message
			}))
			return {
				...state,
				message: action.message
			}

		case types.ADD_TO_WATCHED:
			temp = JSON.parse(JSON.stringify(state.watchedMovies))
			console.log('temp: ', temp)
			cId = action.cId
			eId = action.eId
			Object.keys(state.watchedMovies).includes(`${cId}`)
				?
				temp[cId] = state.watchedMovies[action.cId].concat(action.eId)
				:
				temp[cId] = [action.eId]
			allWatched = true
			action.episodes.map((ep, idx) => {
				if (!temp[cId].includes(ep.number)) {
					allWatched = false
				}
			})
			console.log('temp2: ', temp)
			AsyncStorage.setItem('allWatched', allWatched ? JSON.stringify([...state.allWatched, cId]) : JSON.stringify(state.allWatched))
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				watchedMovies: temp,
				allWatched: allWatched ? [...state.allWatched, cId] : state.allWatched
			}))
			return {
				...state,
				watchedMovies: temp,
				allWatched: allWatched ? [...state.allWatched, cId] : state.allWatched
			}

		case types.RETRIEVE_WATCHED_SUCCESS:
			AsyncStorage.setItem('appState', JSON.stringify({
				...state,
				watchedMovies: action.data,
				allWatched: action.all
			}))
			return {
				...state,
				watchedMovies: action.data,
				allWatched: action.all
			}

		case types.RETRIEVE_OBSERVATIONS_SUCCESS:
			return {
				...state,
				observations: action.observations
			}

		case types.RETRIEVE_NEW_OBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.newObservations,
				currentIndex: action.currentIndex
			}
		case types.ADD_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: [...state.newObservations, { img: 'file://' + action.imgUri }],
				currentIndex: state.currentIndex + 1
			}

		case types.ADD_TIME_AND_LOC_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: action.time,
						lon: action.lon,
						lat: action.lat
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: action.time,
							lon: action.lon,
							lat: action.lat
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					)
			}

		case types.ADD_HUMANS_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: state.newObservations[0].time,
						lon: state.newObservations[0].lon,
						lat: state.newObservations[0].lat,
						text: String(action.human[0].num) + ' ' + action.human[0].species,
						human: action.human,
						animal: state.newObservations[0].animal ? state.newObservations[0].animal : null
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: state.newObservations[state.currentIndex].time,
							lon: state.newObservations[state.currentIndex].lon,
							lat: state.newObservations[state.currentIndex].lat,
							text: String(action.human[0].num) + ' ' + action.human[0].species,
							human: action.human,
							animal: state.newObservations[state.currentIndex].animal ? state.newObservations[state.currentIndex].animal : null
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					)
			}

		case types.ADD_ANIMALS_TO_NEWOBSERVATIONS_SUCCESS:
			return {
				...state,
				newObservations: action.currentIndex === 0
					?
					[{
						img: state.newObservations[0].img,
						time: state.newObservations[0].time,
						lon: state.newObservations[0].lon,
						lat: state.newObservations[0].lat,
						text: String(action.animal[0].num) + ' ' + action.animal[0].species,
						animal: action.animal,
						human: state.newObservations[0].human ? state.newObservations[0].human : null
					}]
					:
					state.newObservations.slice(0, state.currentIndex).concat(
						[{
							img: state.newObservations[state.currentIndex].img,
							time: state.newObservations[state.currentIndex].time,
							lon: state.newObservations[state.currentIndex].lon,
							lat: state.newObservations[state.currentIndex].lat,
							text: String(action.animal[0].num) + ' ' + action.animal[0].species,
							animal: action.animal,
							human: state.newObservations[state.currentIndex].human ? state.newObservations[state.currentIndex].human : null
						}].concat(state.newObservations.slice(state.currentIndex + 1))
					)
			}

		case types.RETRIEVE_RECOMMENDED_OFFS_SUCCESS:
			return {
				...state,
				recommendedOffs: action.recommendedOffs
			};

		case types.RETRIEVE_POPULAR_OFFS_SUCCESS:
			return {
				...state,
				popularOffs: action.popularOffs
			};

		case types.RETRIEVE_PRODUCTS_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};

		case types.ADD_TO_WISHLIST:
			return {
				...state,
				wishlist: [...state.wishlist, { off: action.off, prf: action.prf }],
				wishlistCounter: state.wishlistCounter + 1
			}

		case types.REMOVE_FROM_WISHLIST:
			return {
				...state,
				wishlist: action.index === 0 ? state.wishlist.slice(1) : state.wishlist.slice(0, action.index).concat(state.wishlist.slice(action.index + 1)),//[state.wishlist.splice(0,action.index), state.wishlist.splice(action.index+1, state.wishlist.length)],
				wishlistCounter: state.wishlistCounter - 1
			}

		case types.RETRIEVE_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.categories
			};

		case types.RETRIEVE_CATEGORY_PRODUCTS_SUCCESS:
			return {
				...state,
				categoryOffs: action.categoryOffs
			};

		case types.RETRIEVE_OTHER_PRODUCTS_SUCCESS:
			return {
				...state,
				otherProducts: action.otherProducts
			};

		case types.RETRIEVE_SIMILAR_PRODUCTS_SUCCESS:
			return {
				...state,
				similarProducts: action.similarProducts
			};

		case types.RETRIEVE_PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				details: action.details
			};

		case types.ADD_TO_NOTIFS:
			return {
				...state,
				notifs: [...state.notifs, { notif: action.notif, appstate: action.appstate }],
				notifsCounter: state.notifsCounter + 1
			};

		default:
			return state;
	}
}
