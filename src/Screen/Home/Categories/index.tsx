import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'Food & Drinks',   source: require('../../../Assests/Images/food_drink.png') },
  { id: '2', text: 'Beauty & Spa', source: require('../../../Assests/Images/beauty.png') },
  { id: '3', text: 'Health & Fitness',   source: require('../../../Assests/Images/health.png') },
  { id: '4', text: 'Fun & Leisure',   source: require('../../../Assests/Images/fun.png') },
  { id: '5', text: 'Room Night',   source: require('../../../Assests/Images/room_night.png') },
  { id: '6', text: 'Services & Retail',   source: require('../../../Assests/Images/food_drink.png') },
];

type CategoriesProps={
  navigation: any
}

const Categories:React.FC<CategoriesProps> = () => {
  const navigation=useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);


  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('CategoriesScreen', { item })} >
            <Image source={item.source} style={styles.image} />
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default Categories;
