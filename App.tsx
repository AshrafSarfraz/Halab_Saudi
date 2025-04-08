import React, { useEffect } from 'react'
import StackNavigation from './src/Navigation/StackNav.tsx/StackNavigation'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux_toolkit/store';



const App = () => {
  
  

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <StackNavigation />
    </PersistGate>
  </Provider>
      
    
  )
}

export default App

