import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
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
const ApiToken = "6838131996ef135b352d16caacb6cfe5962a897cc69ad208430d52e7f0c818af";

type LoginScreenProps = NativeStackScreenProps<any>;

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('+966'); // Default
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { t } = useTranslation();

  




  return (
    <ScrollView contentContainerStyle={styles.MainContainer}>
      <View>
        <Image source={Logo_W} style={styles.H_Logo} resizeMode="contain" />
        <Text style={styles.Welcome_Txt}>Welcome Back!</Text>
        <Text style={styles.SignUp_Txt}>Sign in with your account</Text>
        <View style={styles.InputContainer}>
         
          <CountryDropdown onSelectCountry={(code) => setCountryCode(code)} />
          <View
            style={[
              styles.Input_Field,
              PhoneNumber !== '' ? styles.Active_Input_Field : null,
            ]}
          >
            <TextInput
              placeholder="Phone Number"
              value={PhoneNumber}
              keyboardType="number-pad"
              maxLength={8}
              placeholderTextColor={Colors.Grey9}
              onChangeText={(txt) => setPhoneNumber(txt)}
              style={styles.User_Input}
            />
          </View>

          <CustomCheckbox
            label="I agree to the"
            isChecked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            linkText="Privacy Policy"
            linkTerm="Term of Use"
            onLinkPress={() => Linking.openURL('https://halabsaudi.com/privacy-policy-2/')}
            onLinkPress1={() => Linking.openURL('https://halabsaudi.com/terms-of-use/')}
          />

          <View style={styles.SignUp_Btn}>
            <CustomButton
              title="Sign In"
              onPress={() => {
                navigation.navigate('BottomTab');
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
