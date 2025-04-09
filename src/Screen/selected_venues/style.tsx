import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';


export const getStyles=(language:String) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White4,
    paddingHorizontal: "4%",
    marginTop:Platform.OS==='ios'?'0%':'11%',
    marginBottom:Platform.OS==='ios'?'0%':'2%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7%',
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 12,
    tintColor: Colors.Green,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.SF_Bold,
    lineHeight: 24,
    color: Colors.Green,
  },
  searchContainer: {
    flexDirection:language==='en'?'row':'row-reverse' ,
    alignItems: 'center',
    backgroundColor: Colors.White,
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    marginLeft:language==='ar'?8:0,
    resizeMode: "contain",
    tintColor: Colors.Green,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    lineHeight:language==='en'?26:20,
    fontFamily: language==='en'?Fonts.SF_Medium:'',
    color: Colors.Black,
    paddingVertical: 8,
    textAlign:language==='en'?'left':'right'
  },
  FlatlistContainer: {
    flex: 1,
    marginVertical: 10,
  },
  FoundItem_Txt: {
    color: Colors.Green,
    fontSize: language==='en'?16:16,
    fontFamily: language==='en'?Fonts.SF_Medium:"",
    lineHeight: language==='en'?22:30,
    fontWeight:'500',
    marginBottom: 10,
    textAlign:language==='en'?'left':'right'
  },
  itemContainer: {
    flexDirection: language==='en'?'row':"row-reverse",
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth:1,
    borderColor: '#E0E0E0',
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: language==='en'?10:0,
    marginLeft: language==='ar'?10:0,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: language==='en'?16:16,
    fontFamily: language==='en'?Fonts.SF_Bold:"",
    lineHeight: language==='en'?22:30,
    fontWeight:'500',
    color: Colors.Black,
    marginLeft:language==='ar'?"2%":0,
    textAlign:language==='en'?'left':'right'
  },
  itemLocation: {
    fontSize: language==='en'?11:13,
    fontFamily: language==='en'?Fonts.SF_Medium:"",
    lineHeight: language==='en'?14:24,
    fontWeight:'300',
    color: Colors.Black,
    marginLeft:language==='ar'?"2%":0,
     textAlign:language==='en'?'left':'right'
  
  },
  itemCity: {
    fontSize: language==='en'?12:12,
    fontFamily: language==='en'?Fonts.SF_Bold:"",
    lineHeight: language==='en'?14:24,
    fontWeight:'500',
    color: Colors.Black,
    marginLeft:language==='ar'?"2%":0,
     textAlign:language==='en'?'left':'right'
  },
});
