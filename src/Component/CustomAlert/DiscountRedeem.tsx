import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from '../../Themes/Colors';
import {Fonts} from '../../Themes/Fonts';
import {Giftpack, Remove} from '../../Themes/Images';
import CustomButton from '../CustomButton/CustomButton';

type LanProps = {
  visible: boolean;
  onClose: () => void;
};

const Discount_Redeem: React.FC<LanProps> = ({visible, onClose}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            style={{width: 150, height: 150, resizeMode: 'cover',marginVertical:20}}
            source={Giftpack}
          />
          <Text style={styles.header_Text}>Your discount code is :</Text>
          <Text style={styles.code_Text}>SKVMMY</Text>
          <Text style={styles.dis_Text}>-15%</Text>
          <Text style={styles.desc_Text}>
            This is single use of code for your use only. Get a new code each
            time you open the App
          </Text>

          <CustomButton onPress={onClose} title="Redeem" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginHorizontal: '3%',
    marginBottom: '7%',
    marginTop: '2%',
  },
  RemoveIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.Green,
  },
  header_Text: {
    fontSize: 16,
    fontFamily: Fonts.SF_Regular,
    lineHeight: 20,
    color: Colors.Green,
    marginVertical: 10,
  },
  code_Text: {
    fontSize: 24,
    lineHeight: 30,
     fontFamily:Fonts.SF_Bold,
    color: Colors.Green,
  },
  dis_Text: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily:Fonts.SF_Bold,
    color: Colors.Green,
    marginTop:"3%"
  
  },
  desc_Text: {
    fontSize: 10,
    lineHeight:12,
    fontFamily:Fonts.SF_Regular,
    color: Colors.Grey9,
    marginVertical:20,
    textAlign:"center"
  },
});

export default Discount_Redeem;
