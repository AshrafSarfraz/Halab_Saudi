import React from 'react';
import { StyleSheet, Text, View,SafeAreaView, Platform } from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Themes/Colors';

type Reedemprops={
    navigation:any
}

const Reedem_His:React.FC<Reedemprops> = () => {
    const navigation=useNavigation()
    return (
        <SafeAreaView style={{flex:1}} >
        <View style={styles.Container} >
            <CustomHeader title='Reedem Histroy' onBackPress={()=>{navigation.goBack()}} />
            <Text style={styles.Header} >No Data Found</Text>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:Colors.White4,
        marginVertical:Platform.OS==='ios'?'2%':'8%',
        marginHorizontal:'3%'
    },
    Header:{
        fontSize:18,
        color:'black',
        flex:1,
        alignSelf:"center",
         marginTop:30
    }

})

export default Reedem_His;
