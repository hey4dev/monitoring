// 'use client';

import { combineReducers, createStore } from '@reduxjs/toolkit';
import configReducer from './config/configSlice';
import trackerDataReducer from './tracker/dataSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'config',
    storage,
    // storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, configReducer);
const reducers = combineReducers({
    TrackerData: persistReducer(
        {
            key: 'trackerData',
            storage,
        },
        trackerDataReducer
    ),
    config: persistReducer(
        {
            key: 'config',
            storage,
        },
        configReducer
    ),
});

export const store = createStore(reducers);
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
