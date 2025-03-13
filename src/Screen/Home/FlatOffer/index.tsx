import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, } from 'react-native';
import styles from './style';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'First Image', source: require('../../../Assests/Images/bgImg.jpeg') },
  { id: '2', text: 'Second Image', source: require('../../../Assests/Images/bgImg.jpeg') },
  { id: '3', text: 'Third Image', source: require('../../../Assests/Images/bgImg.jpeg') },
];

const ImageSlider = () => {
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
          <View style={styles.imageContainer}>
            <Image source={item.source} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>{item.text}</Text>
            </View>
          </View>
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
