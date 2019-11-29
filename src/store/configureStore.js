/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import pReducer from '../reducers/rootReducer';
import { persistStore } from 'redux-persist';

/*import { persistStore, persistReducer, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);
*/

let middleware = [thunk];

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export function configureStore(initialState) {
	return createStore(
		pReducer,
		undefined,
		composeWithDevTools(
			applyMiddleware(...middleware),
			//applyMiddleware(autoRehydrate)	
			// other store enhancers if any
		)
		//applyMiddleware(...middleware)
	);
}

const store = configureStore();
export const persistor = persistStore(store, null, ()=>{
	store.getState()
});