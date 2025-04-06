import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../Themes/Colors';
import {Fonts} from '../../Themes/Fonts';
import i18n from '../../../i18n';

const isArabic = i18n.language === 'ar';
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: Platform.OS === 'ios' ? '1%' : '11%',
    marginBottom: Platform.OS === 'ios' ? '1%' : '6%',
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
    justifyContent: 'center',
    marginVertical: '2.5%',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  Type_Cont: {
    backgroundColor: '#D0A700',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: '2%',
    marginBottom: '3%',
    borderRadius: 5,
  },
  Type_Text: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.White,
    fontFamily: Fonts.SF_Medium,
  },
  
  Title_Cont: {
    flexDirection:"row",
    alignItems: 'center',
    width:'100%',
    justifyContent:"space-between",
  },
  title: {
    fontSize:isArabic?16:22,
    lineHeight:isArabic?38:26,
    color: Colors.Black,
    letterSpacing:0.5,
    fontFamily: Fonts.SF_Bold,
  },
  call_cont:{
    flexDirection:"row",
    alignItems:"center",
   },
   Phone_Icon:{
     width:22,height:22,
     resizeMode:"contain"
   },
   
   call_txt: {
       fontSize: 12,
       lineHeight: 15,
       color: Colors.Black,
       fontFamily: Fonts.SF_Bold,
   },
  //  Address_Cont: {
  //   flexDirection: 'row',
  //   alignItems: "center",
  //   marginTop: "1%",

  // },
  // Address_Img: {
  //   width: 14, height: 20,
  //   resizeMode: 'contain',
  //   marginRight: "1%",
  //   tintColor:Colors.Green,
  // },
  // Address: {
  //   fontSize: 12,
  //   lineHeight: 15,
  //   color: Colors.Black,
  //   fontFamily: Fonts.SF_Bold,
  // },

  Desc_Cont: {

  },

  Dis_Cont: {
    marginVertical: "3%",
    backgroundColor: Colors.White,
    padding: "3%",
    paddingVertical:"4%",
    borderRadius: 10,
    flexDirection:"row"
  },
  Discount: {
    fontSize: isArabic?16:20,
    color: Colors.Green,
    fontFamily: Fonts.SF_Bold,
    letterSpacing:0.4,
    lineHeight:isArabic?38:28,
  
  },
  Total_Discount: {
    fontSize: 20,
    color: Colors.Green,
    fontFamily: Fonts.SF_Bold,
    letterSpacing:0.4,
    lineHeight:28
  },
  Desc: {
    fontSize: 18,
    lineHeight: isArabic?24:17,
    letterSpacing:0.6,
    color: Colors.Black,
    fontWeight:'500',
    fontFamily:isArabic?'': Fonts.SF_Medium,
    marginTop:'2%',
    marginBottom:"1%",

  },
  Detail: {
    fontSize: isArabic?16:14,
    lineHeight: isArabic?24:17,
    color: Colors.Black,
    fontFamily:isArabic?'': Fonts.SF_Regular,
    marginBottom: '3%',
    textAlign:"justify",
  },

});
