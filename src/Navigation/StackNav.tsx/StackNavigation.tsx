import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash_Blank from '../../Screen/Authentication/Splash/Splash_Blank';
import Splash_Screen from '../../Screen/Authentication/Splash/SplashScreen';
import OnBoarding from '../../Screen/OnBoarding';
import Home from '../../Screen/Home/Home';

type RootStackParamList = {
  SplashBlank: undefined;
  Splash: undefined;
  Onboarding:undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='Home'  screenOptions={{headerShown:false}}  >
        <Stack.Screen name='SplashBlank' component={Splash_Blank} />
        <Stack.Screen name='Splash' component={Splash_Screen} />
        <Stack.Screen name='Onboarding' component={OnBoarding} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

