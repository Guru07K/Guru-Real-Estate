import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import {  persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './slices/authSlice'
import listSlice from './slices/listSlice'

const reducer = combineReducers({
    authState  : authSlice,
    listState : listSlice,

})

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store)
export default store