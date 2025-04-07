import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../../Themes/Fonts";
import { Colors } from "../../../Themes/Colors";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal:Platform.OS==='ios'?"3%":'1%'   ,
      marginTop:10
    },
    Flatlist_Cont:{
      width:240,
      height:100,
      backgroundColor:Colors.White,
      marginRight:10,
      borderRadius:10,
      flexDirection:"row",
      alignItems:'center',
      paddingHorizontal:'2%',
      paddingVertical:"1%"
     
    },
    image:{
       width:70,
       height:70,
       borderRadius:40,
    },
    bestSeller_Detail:{
     width:140,
     marginLeft:10,
     textAlign:'justify'
    },
    title_txt:{
      fontSize:16,
      fontFamily:Fonts.SF_Bold,
      color:Colors.Green,
      lineHeight:22,
      letterSpacing:0.3
    },
    desc_txt:{
      fontSize:12,
      fontFamily:Fonts.SF_Regular,
      lineHeight:13,
      letterSpacing:0.2,
      marginTop:2,
      color:Colors.Black,
      textAlign:"justify",
    }
  });
  
  export default styles;
  