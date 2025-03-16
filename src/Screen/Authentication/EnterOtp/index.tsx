import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Back_Icon, Logo_W } from '../../../Themes/Images';
import CustomButton from '../../../Component/CustomButton/CustomButton';
import { Colors } from '../../../Themes/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface OtpProps extends NativeStackScreenProps<any> {}

const Otp: React.FC<OtpProps> = ({ navigation }) => {
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
    <SafeAreaView>
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
        <Text style={styles.digit_Txt}>Enter the 6-digit OTP sent to you at</Text>

        <View style={styles.inputContainer}>
          {otp.map((pin, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRef.current[index] = ref)}
              style={[styles.Otp, { borderColor: pin ? Colors.Green : '#959595' }]}
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
            The OTP passcode you’ve entered is incorrect
          </Text>
        )}

        <View style={styles.Resend_Cont}>
          <Text style={styles.Already}>I haven’t received a code</Text>
          <TouchableOpacity onPress={() => Alert.alert('API Working here')}>
            <Text style={styles.Resend_Txt}> RESEND</Text>
          </TouchableOpacity>
        </View>

        <CustomButton title={'Verify OTP'} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
