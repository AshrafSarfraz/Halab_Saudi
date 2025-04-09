import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../Themes/Colors';
import { Full_logo_w } from '../../../Themes/Images';


type SplashScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Splash_Screen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.Main_Container}>
      <View style={styles.Body}>
        <Image source={Full_logo_w} style={styles.Logo_Img} />
       
      </View>

    </View>
  );
};

export default Splash_Screen;

const styles = StyleSheet.create({
  Main_Container: {
    flex: 1,
    backgroundColor: Colors.Green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  Logo_Img: {
    width: '70%',
    height: '90%',
    resizeMode: 'contain',
  },

  
});