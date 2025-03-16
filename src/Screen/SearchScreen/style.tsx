import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White4,
    paddingHorizontal: "5%",
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    height: 55,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: "contain",
    tintColor: Colors.Green,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.SF_Medium,
    color: Colors.Black,
    paddingVertical: 8,
  },
  FlatlistContainer: {
    flex: 1,
    marginVertical: 10,
  },
  FoundItem_Txt: {
    color: Colors.Green,
    fontSize: 16,
    fontFamily: Fonts.SF_Medium,
    lineHeight: 22,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: Fonts.SF_Bold,
    color: Colors.Black,
  },
  itemLocation: {
    fontSize: 14,
    fontFamily: Fonts.SF_Medium,
    color: Colors.Grey4,
    marginVertical: 2,
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: Fonts.SF_Regular,
    color: Colors.Black2,
  },
});
