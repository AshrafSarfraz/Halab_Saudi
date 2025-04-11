import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../Component/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItemInCart } from '../../redux_toolkit/cartSlice';
import { RootState } from '../../redux_toolkit/store';
import {Dark_Heart, Light_Heart, Location} from '../../Themes/Images';
import Pin_Modal from '../../Component/CustomAlert/Pin_Modal';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Discount_Redeem from '../../Component/CustomAlert/DiscountRedeem';
import i18n from '../../../i18n';
import { getStyles } from './style';
import { languageData } from '../../redux_toolkit/language/languageSlice';


const DetailScreen: React.FC<{route:any}> = ({route}) => {
  const isArabic = i18n.language === 'ar';
  const {item} = route.params; // Home se data le rahe hain
  const dispatch = useDispatch();
  const latitude = item.latitude ? item.latitude : null;
  const longitude = item.longitude ? item.longitude : null;
  const phoneNumber = item.PhoneNumber;
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [discountAlert, setdiscountAlert] = useState<boolean>(false);
   const [imageLoading, setImageLoading] = useState(true);
  

  // Redux Toolkit
   const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
    const styles = getStyles(language);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
  const handleToggleCart = () => {
    dispatch(toggleItemInCart(item));
  };
  
// Redux Toolkit


  // Alert Modal
  const showAlert = () => {
    setAlertVisible(true);
  };
  const hideAlert = () => {
    setAlertVisible(false);
  };
  const showDiscount_Alert = () => {
    setdiscountAlert(true);
  };
  const hideDiscount_Alert = () => {
    setdiscountAlert(false);
  };
// Modal

// Google Map and Mobile Number
  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const Contact = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };
  // Google Map and Mobile Number

  const handleImageLoad = () => {
    setImageLoading(false); // Stop shimmer effect once the image has loaded
  };

  return (
    <SafeAreaView>
          <StatusBar hidden={true} translucent={true} animated={true} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.HeaderCont}>
            <CustomHeader
              title="Detail Screen"
              onBackPress={() => {
                navigation.goBack();
              }}
            />
            <TouchableOpacity onPress={() =>{handleToggleCart()}}>
              {isInCart ? (
                <Image source={Dark_Heart} style={styles.HeartStyle} />
              ) : (
                <Image source={Light_Heart} style={styles.HeartStyle} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.Body_Cont}>
          <ShimmerPlaceholder
                visible={!imageLoading}
                LinearGradient={LinearGradient}
                style={styles.image}
              >
            <Image source={{uri:item.img}} style={styles.image}    onLoad={handleImageLoad} />
            </ShimmerPlaceholder>
            <View style={styles.Type_Cont}>
              <Text style={styles.Type_Text}>{item.selectedCategory}</Text>
            </View>
            <View style={styles.Title_Cont}>
              {language==='ar'?<Text style={styles.title}>{item.nameArabic}</Text>:
              <Text style={styles.title}>{item.nameEng}</Text>}
            
              
              <TouchableOpacity onPress={Contact} style={styles.call_cont}>
                <Image
                  source={require('../../Assests/Icons/phone.png')}
                  style={styles.Phone_Icon}
                />
                <Text style={styles.call_txt}>Call Now</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.Address_Cont}>
              <Image source={Location} style={styles.Address_Img} />
              <Text style={styles.Address}>{item.longitude}</Text>
            </View> */}
            <View style={styles.Dis_Cont}>
              <Text style={styles.Discount}>{languageData[language].discount} </Text>
              <Text style={styles.Total_Discount}> {''+ item.discount +'%'}  </Text>
            </View>
            
              <View style={styles.Desc_Cont} >
              <Text style={styles.Desc}>{languageData[language].description}</Text>
              </View>
              {
                language==='ar'?<Text style={styles.Detail}>{item.descriptionArabic}</Text>:
                <Text style={styles.Detail}>{item.descriptionEng}</Text>
              }
              
{/* 
            <Text style={styles.pin}>Pin: {item.pin}</Text> */}
          </View>

          <CustomButton
            title="Redeem"
            onPress={() => {
              showAlert();
            }}
          />
          <View style={{marginBottom: Platform.OS === 'ios' ? '5%' : '4%'}} />
          <CustomButton
            title="Open Map"
            onPress={() => {
              handleOpenMaps();
            }}
          />
        </View>
        <Pin_Modal
  visible={alertVisible}
  correctPin={item.pin}
  onSubmit={(userPin) => {
    if (userPin === item.pin) {
      showDiscount_Alert();
    } else {
      Alert.alert('Pin is incorrect'); // or use console.warn()
    }
    hideAlert(); // Close pin modal in both cases
  }}
  onClose={() => hideAlert()}
/>

        <Discount_Redeem
          visible={discountAlert}
          discount={item.discount}
          onClose={() => {
            hideDiscount_Alert();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
