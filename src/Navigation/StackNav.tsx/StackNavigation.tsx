import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash_Blank from '../../Screen/Authentication/Splash/Splash_Blank';
import Splash_Screen from '../../Screen/Authentication/Splash/SplashScreen';
import OnBoarding from '../../Screen/OnBoarding';
import Home from '../../Screen/Home';
import Login from '../../Screen/Authentication/Login';
import Bottom from '../BottomNav/Bottom_Navigation';
import Otp from '../../Screen/Authentication/EnterOtp';
import SearchScreen from '../../Screen/SearchScreen';
import DetailScreen from '../../Screen/detail_Screen';
import Reedem_His from '../../Screen/Reedem_Histroy';
import SelectedCategories from '../../Screen/selected_categories';
import SelectedVenues from '../../Screen/selected_venues';
import auth from '@react-native-firebase/auth';
import AccountScreen from '../../Screen/AccountScreen';

type RootStackParamList = {
  SplashBlank: undefined;
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Home: undefined;
  BottomTab: undefined;
  OTP: undefined;
  SearchScreen: undefined;
  DetailScreen: undefined;
  ReedemHistroy: undefined;
  CategoriesScreen: undefined;
  SelectedVenue: undefined;
  AccountScreen:undefined;
};
type SplashScreenProps = {
  navigation?: any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log("USER:", user); // Debug: check user
      if (user) {
        setInitialRoute('BottomTab'); // User is logged in
      } else {
        setInitialRoute('BottomTab'); // User not logged in
      }
    });

    return unsubscribe; // Cleanup
  }, []);

  if (!initialRoute) {
    // Auth status still checking – show splash or loader
    return <Splash_Screen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashBlank' component={Splash_Blank} />
        <Stack.Screen name='Splash' component={Splash_Screen} />
        <Stack.Screen name='Onboarding' component={OnBoarding} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='OTP' component={Otp} />
        <Stack.Screen name='BottomTab' component={Bottom} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='DetailScreen' component={DetailScreen} />
        <Stack.Screen name='ReedemHistroy' component={Reedem_His} />
        <Stack.Screen name='CategoriesScreen' component={SelectedCategories} />
        <Stack.Screen name='SelectedVenue' component={SelectedVenues} />
        <Stack.Screen name='AccountScreen' component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
