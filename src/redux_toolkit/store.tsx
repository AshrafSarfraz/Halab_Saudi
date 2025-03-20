import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import languageReducer, { loadLanguage } from './languageSlice';

// ✅ Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

export const persistor = persistStore(store);

// ✅ Load stored language when app starts
const loadStoredLanguage = async () => {
  const lang = await AsyncStorage.getItem('language');
  if (lang) {
    store.dispatch(loadLanguage(lang)); // Load saved language into Redux
  }
};

loadStoredLanguage();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
