import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../Themes/Fonts";
import { Colors } from "../../../Themes/Colors";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal:"3%",
      marginTop:10
    },
    Flatlist_Cont:{
      width:240,
      height:100,
      backgroundColor:'#fff',
      marginRight:10,
      elevation:10,
      shadowColor:'#000',
      borderRadius:10,
      flexDirection:"row",
      alignItems:'center',
      paddingHorizontal:'3%'
     
    },
    image:{
       width:80,
       height:80,
       borderRadius:40
    },
    bestSeller_Detail:{
     width:140,
     marginLeft:10,
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
      color:Colors.Black
    }
  });
  
  export default styles;
  