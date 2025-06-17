import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../Themes/Colors";
import { Fonts } from "../../../Themes/Fonts";

export const getStyles=(language:string) => StyleSheet.create({
    Main_Container:{
    flex:1, 
     backgroundColor:Colors.White,
     paddingHorizontal:24,
     paddingTop:Platform.OS==='ios'?0:30
    },
    Body:{
     marginTop:10
    },
    Register_Txt:{
    fontFamily:Fonts.SF_SemiBold,
    color:Colors.Green,
    fontSize:16,
    marginVertical:'3%'
    },
    InputContainer: {
        marginTop:'1%',
      },
      Input_Field: {
        alignItems: 'flex-start',
        height:45,
        backgroundColor:Colors.White,
        borderWidth:1,
        borderColor:Colors.grey1,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 8,
      },
      Active_Input_Field:{
         borderWidth:2,
         borderColor:Colors.Green,
         backgroundColor:Colors.White
      },
      User_Input: {
        flex: 1,
        width:"100%",
        fontSize: 14,
        color: Colors.Black2,
        lineHeight:18,
        textAlign:language==='en'?'left':'right'
      },
      label:{
        fontSize:14,
        color:'#000',
        fontFamily:Fonts.SF_Medium,
        marginBottom:3,
        marginLeft:4
      },
      Header_Txt:{
        fontSize:18,
        color:Colors.Green,
        fontFamily:Fonts.SF_Bold,
        marginVertical:4,
        marginLeft:4
      }
})