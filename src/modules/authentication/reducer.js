import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.auth, action) {
    switch (action.type) {

        case types.SIGNIN_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token,
                submittingFinished: true
            };

        case types.SIGNIN_USER_FAIL:
            return {
                ...state,
                message: action.message,
                submittingFinished: true
            };

        case types.SIGNUP_USER_SUCCESS:
            return {
                ...state,
		    //message: action.message,
                submittingFinished: true,
                token: action.token,
		    user: action.user
            };

        case types.SIGNUP_USER_FAIL:
            return {
                ...state,
                message: action.message,
                submittingFinished: true
            };

        case types.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case types.CLEAR_AUTH_ERROR:
            return {
                ...state,
                message: action.message
            };

        case types.UPDATE_USER_SUCCESS:
            let temp = JSON.parse(JSON.stringify(state.user))
            temp[action.field.name] = action.field.value
            return {
                ...state,
                user: temp,
                updated: action.field.name === 'avatar' ? true : state.updated
            }

        case types.UPDATE_USER_FAIL:
            return {
                ...state,
                errors: action.errors
            }
        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                //user: null,
                //token: null
            }

        case types.ADD_TO_FAVORITE_CATEGORIES_SUCCESS:
            return {
                ...state,
                favCats: [...state.favCats, action.cat]
            }

        case types.REMOVE_FROM_FAVORITE_CATEGORIES_SUCCESS:
            return {
                ...state,
                favCats: action.index === 0 ? state.favCats.slice(1) : state.favCats.slice(0, action.index).concat(state.favCats.slice(action.index + 1)),
            }

        default:
            return state;
    }
}
