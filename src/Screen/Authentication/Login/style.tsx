import {StyleSheet} from 'react-native'
import { Colors } from '../../../Themes/Colors';
import { Fonts } from '../../../Themes/Fonts';

export const styles = StyleSheet.create({
    MainContainer: {
      backgroundColor: Colors.Bg,
      padding: 10,
      paddingHorizontal:'5%',
      paddingTop:'20%',
      flexGrow: 1,
    },
    H_Logo: {
      width: '70%',
      height:130,
      alignSelf: 'center',
    },
    Welcome_Txt: {
      fontSize: 24,
      fontFamily:Fonts.SF_Bold,
      color:Colors.Green,
      lineHeight:28,
      alignSelf: 'center',
    },
    SignUp_Txt: {
      fontSize: 16,
      color: Colors.Black2,
      fontFamily:Fonts.SF_Medium,
      alignSelf: 'center',
      lineHeight:20,
      marginTop:'1%'
     
    },
    InputContainer: {
      marginTop:'7%',
  
    },
    Input_Field: {
      flexDirection: 'row',
      alignItems: 'center',
      height:60,
      backgroundColor:Colors.White4,
      elevation:1,
      borderWidth:2,
      borderColor:Colors.grey1,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 14,
    },
    Active_Input_Field:{
       borderWidth:2,
       borderColor:Colors.Green,
       backgroundColor:Colors.White
  
    },
    Input_Icon: {
      width: 20,
      height: 20,
      marginRight: 10,
      tintColor: Colors.Grey9,
    },
    User_Input: {
      flex: 1,
      fontSize: 16,
      color: Colors.Black2,
    },

    SignUp_Btn:{
     marginVertical:'10%',
    },
    DropdownContainer: {
      backgroundColor: Colors.White,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRightWidth: 1,
      borderColor: Colors.Grey9,
      alignItems: "center",
      justifyContent: "center"
    },
    DropdownText: {
      fontSize: 16,
      color: Colors.Black2
    },
    CombinedText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.Black2
    }
    

    
  });
  

  