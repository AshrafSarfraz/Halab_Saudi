import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../../Themes/Fonts";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal:"3%",
      marginTop:10,
    },
    Flatlist_Cont:{
      marginRight:6,
      alignItems:'center',
      marginBottom:20
    },
    image:{
       width:80,
       height:100,
       borderRadius:10
    },
    cate_txt:{
      fontSize:12,
      fontFamily:Fonts.SF_Medium,
      marginTop:5,
      lineHeight:16,
      letterSpacing:0.3
    }
  });
  
  export default styles;
  