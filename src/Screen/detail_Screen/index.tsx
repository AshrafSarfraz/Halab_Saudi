import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../Component/CustomButton/CustomButton';
import {Dark_Heart, Light_Heart} from '../../Themes/Images';
import Pin_Modal from '../../Component/CustomAlert/Pin_Modal';
import {styles} from './style';

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

        <CustomButton
          title="Redeem"
          onPress={() => {
            showAlert();
          }}
        />
        <View style={{marginBottom: Platform.OS==='ios'?'5%':'4%'}} />
        <CustomButton title="Open Map" onPress={() => {}} />
      </View>
      <Pin_Modal
        visible={alertVisible}
        onClose={() => {
          hideAlert();
        }}
        //   onClose={() => { hideAlert(), navigation.navigate('RentedItem', { updateButtonState: 1 }) }}
      />
    </SafeAreaView>
  );
};

export default DetailScreen;
