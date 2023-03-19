import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice/cartSlice'
import favReducer from './favouriteSlice/favouriteSlice'
import userReducer from './userSlice/userSlice';
import menuReducer from './menuSlice/menuSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['menu', 'favStore', 'cartStore']
}
const favPersistConfig = {
  key: 'favStore',
  storage,
  blacklist: ['isOpen']
}

const cartPersistConfig = {
  key: 'cartStore',
  storage,
  blacklist: ['isOpen']
}

const rootReducer = combineReducers({
  cartStore: persistReducer(cartPersistConfig, cartReducer),
  favStore: persistReducer(favPersistConfig, favReducer),
  userStore: userReducer,
  menu: menuReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)