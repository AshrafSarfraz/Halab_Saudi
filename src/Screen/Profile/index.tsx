import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import CustomButton2 from '../../Component/CustomButton/CustomButton2';
import CustomButton from '../../Component/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LanguageModal from '../../Component/CustomAlert/Lan_Modal';
import { styles } from './style';
import { Colors } from '../../Themes/Colors';

type ProfileProps={
    navigation:any
}

const Profile:React.FC<ProfileProps> = () => {
    const navigation=useNavigation()
      const [alertVisible, setAlertVisible] = useState<boolean>(false);
    
       const showAlert = () => {
         setAlertVisible(true);
       };
     
       const hideAlert = () => {
         setAlertVisible(false);
       };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Bg }}>
      {/* StatusBar fix for iOS */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'} 
        translucent={Platform.OS === 'android'} 
        backgroundColor={Platform.OS === 'android' ? Colors.Bg : 'transparent'}
      />

       <View style={styles.Container} >
            <Text style={styles.Header_Txt} >Profile</Text>
            <View style={styles.Button_Cont} >
              <CustomButton2 title='Account' onPress={() => console.log('Account Pressed')} />
              <CustomButton2 title='Reedem Histroy' onPress={() => {navigation.navigate('ReedemHistroy')}} />
              <CustomButton2 title='Language' onPress={() =>{showAlert()}} />
            </View>
            <View style={styles.Logout_cont}>
            <CustomButton title='Logout' onPress={() => {navigation.navigate('Login')}} />
            </View>
        </View>
        <LanguageModal
        visible={alertVisible}
        onClose={() => { hideAlert() }}
      //   onClose={() => { hideAlert(), navigation.navigate('RentedItem', { updateButtonState: 1 }) }}
      />
        </SafeAreaView>
    );
}


export default Profile;
