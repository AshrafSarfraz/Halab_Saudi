import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';
import CustomButton2 from '../../Component/CustomButton/CustomButton2';
import CustomButton from '../../Component/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LanguageModal from '../../Component/CustomAlert/Lan_Modal';

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
       <SafeAreaView style={{flex:1}}>
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

const styles = StyleSheet.create({
    Container:{
        flex:1,
        marginVertical:"3%",
        backgroundColor:Colors.White4,

    },
    Header_Txt:{
        marginHorizontal: '5%',
            marginBottom: '10%',
            fontSize: 22,
            fontFamily: Fonts.SF_Bold,
            color: Colors.Green,
            textAlign: 'center',
    },
    Button_Cont:{
      flex:0.9,
    },
    Logout_cont:{
        flex:0.1,
     justifyContent:"center",

    }

})

export default Profile;
