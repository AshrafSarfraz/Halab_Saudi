import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { Back_Icon, Logo_W } from '../../../Themes/Images';
import CustomButton from '../../../Component/CustomButton/CustomButton';
import { Colors } from '../../../Themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

interface OtpProps extends NativeStackScreenProps<any> {}

const Otp: React.FC<OtpProps> = ({ navigation }) => {
  const {t}=useTranslation()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRef = useRef<Array<TextInput | null>>([]);
  const [showError, setShowError] = useState<boolean>(false);
  
  useEffect(() => {
    setShowError(otp.some(pin => pin === ''));
  }, [otp]);

  const handleOtpChange = (value: string, index: number) => {
    setOtp(prevOtp => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      if (value && index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
      return newOtp;
    });
  };

  const handleOtpKeyPress = (
    event: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Bg }}>
    {/* StatusBar fix for iOS */}
    <StatusBar
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'} 
      translucent={Platform.OS === 'android'} 
      backgroundColor={Platform.OS === 'android' ? Colors.Bg : 'transparent'}
    />
    
      <ScrollView contentContainerStyle={styles.MainCont}>
        <View>
          <TouchableOpacity
            style={styles.Header}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={Back_Icon} style={styles.BackIcon} />
          </TouchableOpacity>
        </View>
        <Image source={Logo_W} style={styles.Logo} />
        <Text style={styles.digit_Txt}>{t('enter_otp')}</Text>

        <View style={styles.inputContainer}>
          {otp.map((pin, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRef.current[index] = ref)}
              style={[styles.Otp, { borderColor: pin ? Colors.Green : '#E0E0E0' }]}
              value={pin}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={event => handleOtpKeyPress(event, index)}
              maxLength={1}
              keyboardType="numeric"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {showError && (
          <Text style={styles.Error}>
           {t('incorrect_otp')}
          </Text>
        )}

        <View style={styles.Resend_Cont}>
          <Text style={styles.Already}>{t('no_code_received')}</Text>
          <TouchableOpacity onPress={() => Alert.alert('API Working here')}>
            <Text style={styles.Resend_Txt}> {t('resend')}</Text>
          </TouchableOpacity>
        </View>

        <CustomButton title={t('verify_otp')} onPress={() => {navigation.navigate('BottomTab')}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
