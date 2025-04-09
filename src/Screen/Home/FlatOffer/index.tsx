import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { fetchFlatOfferFromFirebase } from '../../../firebase/firebaseutils';
import { Colors } from '../../../Themes/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux_toolkit/store';
import { languageData } from '../../../redux_toolkit/language/languageSlice';
import { getStyles } from './style';

const { width } = Dimensions.get('screen');

const ImageSlider: React.FC<{navigation:any}> = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offers, setOffers] = useState<any[]>([]); // State to store Firestore data
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
  const styles = getStyles(language);

  
 useEffect(() => {
    const getFlatOffer = async () => {
      setLoading(true);
      const fetchedBrands = await fetchFlatOfferFromFirebase();
      setOffers(fetchedBrands);
      setLoading(false);
    };

    getFlatOffer();
  }, []);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };
  const handleImageLoad = () => {
    setImageLoading(false); // Stop the loader when image has loaded
  };
    const handleImageError = () => {
    setImageLoading(false); // Stop the loader in case of an error
  };

  return (
    <View style={styles.container}>
       {loading ? (
              <ActivityIndicator size="small" color={Colors.Green} style={{ flex: 1 }} />
            ) : (
      <FlatList
        data={offers} // Use Firestore data
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <TouchableOpacity  style={styles.imageContainer} onPress={() => navigation.navigate('DetailScreen', { item })}>
            
            {imageLoading && (
                <ActivityIndicator
                  size="large"
                  color={Colors.Green}
                  style={styles.loader}
                />
              )}

            <Image 
              source={{ uri: item.img }} // Use URI for Firestore images
              style={styles.image} 
                   onLoad={handleImageLoad}
            />
            <View style={styles.overlay}>

              <Text style={styles.imageText}>{languageData[language].discount+item.discount+'%'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />)}

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { 
                backgroundColor: index === currentIndex ? '#005029' : '#A2A2A2',
                width: index === currentIndex ? 30 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;

