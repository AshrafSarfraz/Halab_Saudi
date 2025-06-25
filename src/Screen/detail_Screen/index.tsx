import React, {useState} from 'react';
import { View, Text, Image,SafeAreaView, TouchableOpacity,Platform,ScrollView,Linking,StatusBar,} from 'react-native';
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
import { getStyles } from './style';
import { languageData } from '../../redux_toolkit/language/languageSlice';
import MenuUnavailableModal from '../../Component/CustomAlert/MenuAlert';
import IncorrectPin from '../../Component/CustomAlert/IncorrectPin';
import { Colors } from '../../Themes/Colors';


const DetailScreen: React.FC<{route:any}> = ({route}) => {
  const {item} = route.params; 
  const dispatch = useDispatch();
  const latitude = item.latitude ? item.latitude : null;
  const longitude = item.longitude ? item.longitude : null;
  const Address = item.address ? item.address : null;
  const phoneNumber = item.PhoneNumber;
  const navigation = useNavigation();
  const [discountAlert, setdiscountAlert] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [incorrectPinModal, setIncorrectPinModal] = useState(false);
  const [showTimings, setShowTimings] = useState(false);
  

  // Redux Toolkit
    const language = useSelector((state: RootState) => state.language.language); 
    const styles = getStyles(language);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
   
    const handleToggleCart = () => {
    dispatch(toggleItemInCart(item));  };
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
                <StatusBar hidden={false} translucent={true} animated={true} backgroundColor={Colors.White4} barStyle='dark-content' />
          <ScrollView>
          <View style={styles.container}>
          
          <View style={styles.HeaderCont}>
          <CustomHeader  title={languageData[language].Detail_Screen}  onBackPress={() => {    navigation.goBack();  }}/>
          <TouchableOpacity onPress={() =>{handleToggleCart()}}>
            {isInCart ? (  <Image source={Dark_Heart} style={styles.HeartStyle} />) :  (<Image source={Light_Heart} style={styles.HeartStyle} /> )}
         </TouchableOpacity>
          </View>

          <View style={styles.Body_Cont}>
          <ShimmerPlaceholder visible={!imageLoading} LinearGradient={LinearGradient}  style={styles.image} >
          <Image source={{uri:item.img}} style={styles.image}    onLoad={handleImageLoad} />
          </ShimmerPlaceholder>
          <View style={styles.Type_Cont}>
          <Text style={styles.Type_Text}>{item.selectedCategory}</Text>
          </View>

          <View style={styles.Title_Cont}>
           {language==='ar'?<Text style={styles.title}>{item.nameArabic}</Text>:
          <Text style={styles.title}>{item.nameEng}</Text>}
            
              
          <TouchableOpacity onPress={Contact} style={styles.call_cont}>
          <Image source={require('../../Assests/Icons/phone.png')} style={styles.Phone_Icon}/>
          <Text style={styles.call_txt}>Call Now</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.Loc_Cont}>
          <Image source={Location} style={styles.Loc_Icon}/>
          <Text style={styles.Loc_Txt} >{Address} </Text>
          </View>
          
 {/* Working Hours */}
        <View style={{ marginTop: 5 }}>
        <TouchableOpacity onPress={() => setShowTimings(!showTimings)} style={styles.timing_dropdown}>
        <Text style={styles.working_hour_txt}> {languageData[language].workingHours || 'Working Hours'} </Text>
        <Text style={styles.dropdown_icon}>{showTimings ? '▲' : '▼'}</Text>
       </TouchableOpacity>

     {showTimings && item.timings && (
    <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 8, marginTop: 6 }}>
      {Object.entries(item.timings).map(([day, time]) => (
        <View key={day}style={styles.item_cont} >
          <Text style={{ textTransform: 'capitalize', fontSize: 15, color: '#333' }}>{day}</Text>
          <Text style={{ fontSize: 15, color: '#000' }}>{time}</Text>
        </View>
      ))}
    </View>
  )}
       </View>
       {/* working Hours */}
            <View style={styles.Dis_Cont}>
              <View style={styles.Dis_txt_cont} >
              <Text style={styles.Total_Discount}> {''+ item.discount +'%'}  </Text>
              <Text style={styles.Discount}>{languageData[language].discount} </Text>
            
              </View>
              
              <TouchableOpacity style={styles.Menu_Btn} onPress={() => {
          if (item.pdfUrl) {
            navigation.navigate('PDFViewerScreen', { pdfUrl: item.pdfUrl });
          } else { setModalVisible(true)}}}  >
               
                <Text style={styles.menu_txt} >View Menu</Text>
              </TouchableOpacity>
            </View>
      

              <View style={styles.Desc_Cont} >
              <Text style={styles.Desc}>{languageData[language].description}</Text>
              </View>
              {
                language==='ar'?<Text style={styles.Detail}>{item.descriptionArabic}</Text>:
                <Text style={styles.Detail}>{item.descriptionEng}</Text>
              }
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
     setIncorrectPinModal(true); // or use console.warn()
    }
    hideAlert(); // Close pin modal in both cases
  }}
  onClose={() => hideAlert()}
/>

        <Discount_Redeem visible={discountAlert} discount={item.discount} onClose={() => {hideDiscount_Alert();}}/>
        <MenuUnavailableModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
        <IncorrectPin visible={incorrectPinModal} onClose={() => setIncorrectPinModal(false)}/>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
