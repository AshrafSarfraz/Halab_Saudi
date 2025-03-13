import React, { useState } from 'react';
import { SafeAreaView,View, Text, StyleSheet,Image, TouchableOpacity, ScrollView } from 'react-native';
import { Full_logo_B, language, Scope,  } from '../../Themes/Images';
import ImageSlider from './FlatOffer';
import { styles } from './style';
import Categories from './Categories';
import BestSeller from './BestSellers';
import RecentlyAdded from './RecentlyAdded';


const Home: React.FC = () => {

    return (
       <SafeAreaView style={styles.Container} >
        <ScrollView   >
        <View style={styles.header} >
         <Image source={Full_logo_B} style={styles.logo} />
         <View style={styles.language_Cont} >
            <TouchableOpacity onPress={()=>{}}>
            <Image source={language} style={styles.language_Icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
            <Image source={Scope} style={styles.Scope_Icon} />
            </TouchableOpacity>
         </View>
        </View>
        <View style={{}} >
         <ImageSlider/>
         </View>
         <View style={styles.Categories_Cont} >
            <Text style={styles.Categories_Txt} >Categories</Text>
         <Categories/>
         </View>
         <View style={styles.BestSeller_Cont} >
            <Text style={styles.BestSeller_Txt} >Best Sellers</Text>
         <BestSeller/>
         </View>

         <View style={styles.BestSeller_Cont} >
            <Text style={styles.BestSeller_Txt} >Recently Added</Text>
         <RecentlyAdded/>
         </View>

         
         </ScrollView>
       </SafeAreaView>
    );
};


export default Home;
