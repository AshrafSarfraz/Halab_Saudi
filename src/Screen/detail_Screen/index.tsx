import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Themes/Fonts';
import CustomButton from '../../Component/CustomButton/CustomButton';
import {Dark_Heart, Light_Heart} from '../../Themes/Images';
import {Colors} from '../../Themes/Colors';
import Pin_Modal from '../../Component/CustomAlert/Pin_Modal';

const DetailScreen: React.FC = ({route}) => {
  const [wishlist, setWishlist] = useState<boolean>(false);
  const {item} = route.params; // Home se data le rahe hain
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.HeaderCont}>
          <CustomHeader
            title="Detail Screen"
            onBackPress={() => {
              navigation.goBack();
            }}
          />
          <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
            {wishlist ? (
              <Image source={Dark_Heart} style={styles.HeartStyle} />
            ) : (
              <Image source={Light_Heart} style={styles.HeartStyle} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.Body_Cont}>
          <Image source={item.source} style={styles.image} />
          <Text style={styles.title}>{item.text}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.discount}>Discount: {item.discount}</Text>
          {/* <Text style={styles.pin}>Pin: {item.pin}</Text> */}
        </View>

        <CustomButton title="Redeem" onPress={() => {showAlert()}} />
        <View style={{marginBottom: '5%'}} />
        <CustomButton title="Open Map" onPress={() => {}} />
      </View>
      <Pin_Modal
        visible={alertVisible}
        onClose={() => { hideAlert() }}
      //   onClose={() => { hideAlert(), navigation.navigate('RentedItem', { updateButtonState: 1 }) }}
      />
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  HeaderCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3%',
  },
  HeartStyle: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: Colors.Green,
  },
  Body_Cont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '3%',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.SF_Bold,
    color: '#000',
    lineHeight: 28,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.SF_Medium,
    lineHeight: 18,
    marginBottom: 10,
    textAlign: 'justify',
    width: '90%',
    marginVertical: '3%',
  },
  discount: {
    fontSize: 26,
    color: Colors.Green,
    fontFamily: Fonts.SF_Bold,
    marginVertical: '5%',
  },
  pin: {
    fontSize: 16,
    color: 'gray',
  },
});
