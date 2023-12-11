import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from './authSlice';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    // transforms: [transformCircular],
};

// import ...Slice here
const reducer = combineReducers({
    auth: AuthSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
