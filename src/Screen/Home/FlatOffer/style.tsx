import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal:"3%",
      marginTop:10
    },
    imageContainer: {
      width:width * 0.93,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 4
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
      justifyContent: 'center',
      alignItems: 'center',
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
  