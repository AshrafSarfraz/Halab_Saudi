import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../Themes/Fonts';
import { Colors } from '../../Themes/Colors';


const Home:React.FC = () => {
    return (
        <SafeAreaView>
            <Text style={{fontSize:20,margin:20,fontFamily:Fonts.SF_Bold, color:Colors.Green}} >Login</Text>
           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Home;
