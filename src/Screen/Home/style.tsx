import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../Themes/Colors';
import {Fonts} from '../../Themes/Fonts';
import i18n from '../../../i18n';

const isArabic = i18n.language === 'ar';
export const styles = StyleSheet.create({
  
  Container: {
  
    flex:1,
    backgroundColor: Colors.Bg,
    paddingHorizontal: Platform.OS === 'ios' ? '3%' : '0%',
    marginTop: Platform.OS === 'ios' ? 0 : '8%',
    marginBottom: Platform.OS === 'ios' ? 0 : '2%',
  },
  header: {
    paddingHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: 'contain',
  },
  language_Cont: {
    width: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  language_Icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#000',
  },

  Scope_Icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  Categories_Cont: {
    marginTop: isArabic?1:5,
    width:'100%',

  },
  Categories_Txt: {
    fontSize: isArabic?14:18,
    fontFamily: Fonts.SF_Bold,
    color: Colors.Green,
    lineHeight:  isArabic?38:22,
    marginHorizontal:"4%",
    marginBottom: 2,
  },
  BestSeller_Cont: {
    marginTop: isArabic?5:14,
  },
  BestSeller_Txt: {
    fontSize: isArabic?14:18,
    fontFamily: Fonts.SF_Bold,
    color: Colors.Green,
    lineHeight:  isArabic?38:22,
    marginHorizontal:"4%",
    marginBottom: 2,
  },
  txt_cont:{
    flexDirection:"row"
  }
});
