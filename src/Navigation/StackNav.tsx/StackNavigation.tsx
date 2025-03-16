import React from 'react';
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


type RootStackParamList = {
  SplashBlank: undefined;
  Splash: undefined;
  Onboarding:undefined;
  Login: undefined;
  Home: undefined;
  BottomTab:undefined;
  Otp:undefined;
  SearchScreen:undefined;
  DetailScreen:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='BottomTab'  screenOptions={{headerShown:false}}  >
        <Stack.Screen name='SplashBlank' component={Splash_Blank} />
        <Stack.Screen name='Splash' component={Splash_Screen} />
        <Stack.Screen name='Onboarding' component={OnBoarding} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Otp' component={Otp} />
        <Stack.Screen name='BottomTab' component={Bottom} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='DetailScreen' component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

