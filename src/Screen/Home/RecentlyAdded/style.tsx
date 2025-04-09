import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../../Themes/Fonts';


const { width } = Dimensions.get('window');

export const getStyles=(language:String)=>  StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between', // Ensures even spacing
    marginBottom: 10, // Adds spacing between rows
  },
  Flatlist_Cont: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    padding: 3,
  },
  image: {
    width: width * 0.42, // Adjust image size according to screen width
    height: width * 0.42,
    resizeMode: 'contain',
    borderRadius:20
  },
  cate_txt: {
    marginTop: 7,
    fontSize: 12,
    fontFamily:Fonts.SF_Bold,
    
  },
});
