import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice/cartSlice'
import favReducer from './favouriteSlice/favouriteSlice'
import userReducer from './userSlice/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  cartStore: cartReducer,
  favStore: favReducer,
  userStore: userReducer,

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)