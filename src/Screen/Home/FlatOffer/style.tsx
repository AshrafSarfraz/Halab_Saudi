import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors} from '../../../Themes/Colors';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White4,
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'ios' ? '3%' : '1%',
    marginTop: 10,
  },
  imageContainer: {
    width: width * 0.93,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding:"4%",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    borderRadius: 20,
  },
  imageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default styles;
