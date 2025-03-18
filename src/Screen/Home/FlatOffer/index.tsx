import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'First Image',   description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
    ,discount:'10%', pin:1234, source: require('../../../Assests/Images/bgImg.jpeg') },
  { id: '2', text: 'Second Image',  description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
    , discount:'10%', pin:1234,  source: require('../../../Assests/Images/bgImg.jpeg') },
  { id: '3', text: 'Third Image',   description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
    , discount:'10%', pin:1234, source: require('../../../Assests/Images/bgImg.jpeg') },
];

type SliderProps={
  navigation: any
}


const ImageSlider:React.FC = () => {
  const navigation=useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('DetailScreen', { item })} >
            <Image source={item.source} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#005029' : '#A2A2A2' ,
                width: index === currentIndex ? 30 : 8 ,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
