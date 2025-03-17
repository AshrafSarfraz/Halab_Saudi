import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../Themes/Colors";
import { Fonts } from "../../Themes/Fonts";

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginVertical:Platform.OS==='ios'?'1%':'8%',
    },
    HeaderCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '3%',
    },
    HeartStyle: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      tintColor: Colors.Green,
    },
    Body_Cont: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: '2.5%',
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: Platform.OS==='ios'?20:16,
    },
    title: {
      fontSize: 22,
      fontFamily: Fonts.SF_Bold,
      color: '#000',
      lineHeight: 28,
      marginBottom: Platform.OS==='ios'?10:6,
    },
    description: {
      fontSize: 14,
      fontFamily: Fonts.SF_Medium,
      lineHeight: 18,
      textAlign: 'justify',
      width: '90%',
      marginVertical: Platform.OS==='ios'?"3%":'2%',
    },
    discount: {
      fontSize: 26,
      color: Colors.Green,
      fontFamily: Fonts.SF_Bold,
      marginVertical: Platform.OS==='ios'?'3%':'2%',
    },
    pin: {
      fontSize: 16,
      color: 'gray',
    },
  });
  