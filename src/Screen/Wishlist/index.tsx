import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { images } from './DummyData';
import { Location } from '../../Themes/Images';
import { Colors } from '../../Themes/Colors'; // Import Colors

type WishlistProps = {
  navigation: any;
};

const Wishlist: React.FC<WishlistProps> = () => {
  const navigation = useNavigation();
  return (
    < SafeAreaView style={{ flex: 1, backgroundColor: Colors.Bg }}>
    {/* StatusBar fix for iOS */}
    <StatusBar
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'} 
      translucent={Platform.OS === 'android'} 
      backgroundColor={Platform.OS === 'android' ? Colors.Bg : 'transparent'}
    />
    
      
      <View style={styles.container}>
        <Text style={styles.Header_Txt}>Wishlist</Text>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.Flatlist_Cont} 
              onPress={() => navigation.navigate('DetailScreen', { item })}
            >
              <Image source={item.source} style={styles.image} />
              <Text style={styles.cate_txt}>{item.text}</Text>
              <View style={styles.Loc_Status_Cont}>
                <View style={styles.Loc_Cont}>
                  <Image source={Location} style={styles.LocationIcon} />
                  <Text style={styles.location_txt}>100kM</Text>
                </View>
                <Text style={styles.Status_Txt}>Closed</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wishlist;
