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
} from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../Component/CustomButton/CustomButton';
import {Dark_Heart, Light_Heart, Location} from '../../Themes/Images';
import Pin_Modal from '../../Component/CustomAlert/Pin_Modal';
import {styles} from './style';
import Discount_Redeem from '../../Component/CustomAlert/DiscountRedeem';
import i18n from '../../../i18n';
import { t } from 'i18next';

const DetailScreen: React.FC = ({route}) => {
  const isArabic = i18n.language === 'ar';


  const [wishlist, setWishlist] = useState<boolean>(false);
  const {item} = route.params; // Home se data le rahe hain
  const latitude = item.latitude ? item.latitude : null;
  const longitude = item.longitude ? item.longitude : null;
  const phoneNumber = item.PhoneNumber;
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [discountAlert, setdiscountAlert] = useState<boolean>(false);

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

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const Contact = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
            <Image source={{uri:item.img}} style={styles.image} />
            <View style={styles.Type_Cont}>
              <Text style={styles.Type_Text}>{item.selectedCategory}</Text>
            </View>
            <View style={styles.Title_Cont}>
              {isArabic?<Text style={styles.title}>{item.nameArabic}</Text>:
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
              <Text style={styles.Discount}>{t('discount')} </Text>
              <Text style={styles.Total_Discount}>
                {' '+item.discount+'%'}
              
              </Text>
            </View>
            <View style={styles.Desc_Cont}>
              <View style={{flexDirection:'row'}} >
              <Text style={styles.Desc}>{t("description")}</Text>
              </View>
              {
                isArabic?<Text style={styles.Detail}>{item.descriptionArabic}</Text>:
                <Text style={styles.Detail}>{item.descriptionEng}</Text>
              }
              
            </View>
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
          onClose={() => {
            hideDiscount_Alert();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
