import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer,persistStore } from "redux-persist";


const rootReducer=combineReducers({
  user:userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
reducer: persistedReducer,

  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializablecheck:false}),
  
})

export const persistor=persistStore(store)
