import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import {createEpicMiddleware} from 'redux-observable';
import rootEpic from './epics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));

const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export {store, persistor};
