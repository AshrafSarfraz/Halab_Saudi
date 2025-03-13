import { StyleSheet } from "react-native";
import { Colors } from "../../Themes/Colors";
import { Fonts } from "../../Themes/Fonts";



export const styles = StyleSheet.create({
    Container:{
      backgroundColor:Colors.White4,
      paddingHorizontal:'4%'
    },
    header:{
    paddingHorizontal:"4%",
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
 
    },
    logo:{
     width:130,height:60,resizeMode:'contain'
    },
    language_Cont:{
       width:60,
       flexDirection:"row",
       justifyContent:"space-between",
       alignItems:"center",
    },
    language_Icon:{
        width:23,height:23,resizeMode:'contain',
        tintColor:'#000'
    },
 
    Scope_Icon:{
       width:25,height:25,resizeMode:'contain',
       tintColor:"#000"
    },
    Categories_Cont:{
      marginTop:5
    },
    Categories_Txt:{
      fontSize:18,
      fontFamily:Fonts.SF_Bold,
      color:Colors.Green,
      lineHeight:22,
      marginLeft:'4%',
      marginBottom:2
    },
    BestSeller_Cont:{
      marginTop:14
    },
    BestSeller_Txt:{
      fontSize:18,
      fontFamily:Fonts.SF_Bold,
      color:Colors.Green,
      lineHeight:22,
      marginLeft:'4%',
    
    }
 });