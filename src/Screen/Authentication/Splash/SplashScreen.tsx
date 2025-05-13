import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
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
        <StatusBar hidden={true} translucent={true} animated={true} />
      <View style={styles.Body}>
      <View style={styles.Img_Box} >
      <Image source={Full_logo_w} style={styles.Logo_Img} />
      </View>
      <View style={styles.Footer} >
      <Text style={styles.Txt} >This Discount Application is Exclusively for Saudi Visitors</Text>
      </View>
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
  Img_Box:{
    flex:0.55,
    width:"100%",
    justifyContent:"flex-end",
    alignItems:'center'
  },
  Logo_Img: {
    width: '80%',
    height: 70,
    resizeMode: 'contain',
  },
  SaudiFlag_Logo:{
  width:170,height:120,
  resizeMode:"contain"
  },
  Footer:{
    flex:0.45,
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom:"10%"

  },
  Txt:{
    color:Colors.White,
    fontSize:14,
    fontWeight:"600",
    marginBottom:"2%",
    marginTop:"-3%",
    alignSelf:"center",
    width:"80%",
    textAlign:'center'
  }

  
});