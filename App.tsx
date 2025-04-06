import React, { useEffect } from 'react'
import StackNavigation from './src/Navigation/StackNav.tsx/StackNavigation'
import './i18n'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux_toolkit/store';
import i18n from './i18n';
import { I18nManager } from 'react-native';


const App = () => {
  
  useEffect(() => {
    // Check language and force RTL if Arabic
    if (i18n.language === 'ar') {
      I18nManager.forceRTL(true);  // Force RTL if Arabic
    } else {
      I18nManager.forceRTL(false); // Default LTR for English or other languages
    }

    // Refresh layout after language change
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(i18n.language === 'ar'); // Force RTL whenever language changes
  }, [i18n.language]);  // Run effect whenever language changes



  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <StackNavigation />
    </PersistGate>
  </Provider>
      
    
  )
}

export default App

