import React, { useState } from 'react';
import { View, Text, FlatList, Image,  TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { images } from './DummyData';
import { Location } from '../../Themes/Images';

type WishlistProps={
    navigation: any
}


const Wishlist:React.FC<WishlistProps> = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}} >
   <View style={styles.container}>
    <Text  style={styles.Header_Txt} >Wishlist</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items in a row
        columnWrapperStyle={styles.row} // Apply styles for spacing between columns
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('DetailScreen', { item })}  >
            <Image source={item.source} style={styles.image} />
            <Text style={styles.cate_txt}>{item.text}</Text>
            <View style={styles.Loc_Status_Cont} >
            <View style={styles.Loc_Cont} >
                <Image source={Location}  style={styles.LocationIcon}/>
                <Text style={styles.location_txt}>100kM</Text>
            </View>
            <Text style={styles.Status_Txt} >Closed</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default  Wishlist;
