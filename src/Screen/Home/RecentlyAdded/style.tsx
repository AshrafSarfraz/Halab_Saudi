import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../../Themes/Fonts';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
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
    width: width * 0.4, // Adjust image size according to screen width
    height: width * 0.4,
    resizeMode: 'contain',
  },
  cate_txt: {
    marginTop: 7,
    fontSize: 12,
    fontFamily:Fonts.SF_Bold,
    
  },
});
