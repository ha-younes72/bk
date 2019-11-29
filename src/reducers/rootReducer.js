import { combineReducers } from 'redux';
import appReducer from '../modules/app/reducer';
import authReducer from '../modules/authentication/reducer';
import { persistReducer, persistCombineReducers } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
	//whitelist: ['appReducer', 'authReducer']
};

const appPersistConfig = {
	key: 'app',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
	//whitelist: ['appReducer', 'authReducer']
};

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
	//whitelist: ['message', 'user']
};

const pReducer = persistCombineReducers(persistConfig, {
	appReducer: persistReducer(appPersistConfig, appReducer),
	authReducer: persistReducer(authPersistConfig, authReducer),
});

const rootReducer = combineReducers({
	appReducer,
	authReducer
});

export default pReducer;
