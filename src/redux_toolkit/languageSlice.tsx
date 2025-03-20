import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  language: 'en', // Default language
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      AsyncStorage.setItem('language', action.payload); // Save to AsyncStorage
    },
    loadLanguage: (state, action) => {
      state.language = action.payload; // Load language from storage
    },
  },
});

export const { setLanguage, loadLanguage } = languageSlice.actions;
export default languageSlice.reducer;
