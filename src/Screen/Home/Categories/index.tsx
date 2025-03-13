import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'Restaurants', source: require('../../../Assests/Images/resturnant.png') },
  { id: '2', text: 'Spa', source: require('../../../Assests/Images/candle.png') },
  { id: '3', text: 'Hotel', source: require('../../../Assests/Images/food.png') },
  { id: '4', text: 'Restaurants', source: require('../../../Assests/Images/resturnant.png') },
  { id: '5', text: 'Spa', source: require('../../../Assests/Images/candle.png') },
  { id: '6', text: 'Hotel', source: require('../../../Assests/Images/food.png') },
];

const Categories = () => {
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
          <TouchableOpacity style={styles.Flatlist_Cont}>
            <Image source={item.source} style={styles.image} />
            <Text style={styles.cate_txt} >{item.text}</Text>
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default Categories;
