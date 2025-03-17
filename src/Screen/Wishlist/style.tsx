import {StyleSheet, Dimensions} from 'react-native';
import {Fonts} from '../../Themes/Fonts';
import {Colors} from '../../Themes/Colors';

const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  Header_Txt: {
    marginHorizontal: '5%',
    marginBottom: '3%',
    fontSize: 22,
    fontFamily: Fonts.SF_Bold,
    color: Colors.Green,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between', // Ensures even spacing
    marginBottom: 10, // Adds spacing between rows
  },
  Flatlist_Cont: {
    flex: 1,
    alignItems: 'center',
    margin: 6,
    borderRadius: 10,
    backgroundColor: Colors.White,
    elevation:3,
    shadowColor:"000",
    height: 240,
    overflow:'hidden'

  },
  image: {
    width: width * 0.45, // Adjust image size according to screen width
    height: width * 0.45,
    resizeMode: 'contain',
  },
  cate_txt: {
    marginVertical:7,
    fontSize: 13,
    fontFamily: Fonts.SF_Bold,
    color:Colors.Green,
  },
  Loc_Status_Cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  Loc_Cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LocationIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.Green,
  },
  location_txt: {
    fontSize: 11,
    color: 'green',
    fontFamily: Fonts.SF_Medium,
    lineHeight: 14,
    marginLeft: 5,
  },
  Status_Txt: {
    fontSize: 11,
    color: 'green',
    fontFamily: Fonts.SF_Medium,
    lineHeight: 16,
    marginLeft: 5,
  },
});
