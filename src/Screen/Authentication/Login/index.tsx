import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
  Platform,
} from 'react-native';
import { styles } from './style';
import { Logo_W } from '../../../Themes/Images';
import CustomButton from '../../../Component/CustomButton/CustomButton';
import { Colors } from '../../../Themes/Colors';
import CountryDropdown from '../../../Component/Dropdown/SelectCountry';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomCheckbox from '../../../Component/checkbox/checkbox';
import { useTranslation } from 'react-i18next';

const API_URL = "https://dev.halabsaudi.top/public/api";


type LoginScreenProps = NativeStackScreenProps<any>;

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('+966'); // Default
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { t } = useTranslation();

  




  return (
    
    <ScrollView contentContainerStyle={styles.MainContainer}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'} 
        translucent={Platform.OS === 'android'} 
        backgroundColor={Platform.OS === 'android' ? Colors.Bg : 'transparent'}
      />
      <View>
        <Image source={Logo_W} style={styles.H_Logo} resizeMode="contain" />
        <Text style={styles.Welcome_Txt}>{t('welcome_back')}</Text>
        <Text style={styles.SignUp_Txt}>{t('sign_in_message')}</Text>
        <View style={styles.InputContainer}>
         
          <CountryDropdown onSelectCountry={(code) => setCountryCode(code)} />
          <View
            style={[
              styles.Input_Field,
              PhoneNumber !== '' ? styles.Active_Input_Field : null,
            ]}
          >
            <TextInput
              placeholder={t('phone_number')}
              value={PhoneNumber}
              keyboardType="number-pad"
              maxLength={8}
              placeholderTextColor={Colors.Grey9}
              onChangeText={(txt) => setPhoneNumber(txt)}
              style={styles.User_Input}
            />
          </View>

          <CustomCheckbox
            label={t('agree_to')}
            isChecked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            linkText={t('privacy_policy')}
            linkTerm={t('terms_of_use')}
            onLinkPress={() => Linking.openURL('https://halabsaudi.com/privacy-policy-2/')}
            onLinkPress1={() => Linking.openURL('https://halabsaudi.com/terms-of-use/')}
          />

          <View style={styles.SignUp_Btn}>
            <CustomButton
              title={t('login')}
              onPress={() => {
                navigation.navigate('Otp');
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
