import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux_toolkit/store';
import { getStyles } from './style';



const images = [
  { id: '1', text: 'Food and Drink', category: 'Food and Drink', categoryArabic: 'المأكولات والمشروبات', source: require('../../../Assests/Images/Food.png') },
  { id: '2', text: 'Beauty and Spa', category: 'Beauty and Spa',categoryArabic:  'الجمال والمنتجعات'  ,source: require('../../../Assests/Images/Beauty.png') },
  { id: '3', text: 'Health and Fitness', category: 'Health and Fitness',categoryArabic:  'الصحة واللياقة' , source: require('../../../Assests/Images/Health.png') },
  { id: '4', text: 'Fun and Leisure', category: 'Fun and Leisure', categoryArabic:  'الترفيه والتسلية' , source: require('../../../Assests/Images/Fun.png') },
  { id: '5', text: 'Room Nights', category: 'Room Nights', categoryArabic:  'الإقامة الفندقية' , source: require('../../../Assests/Images/Room.png') },
  { id: '6', text: 'Services and Retail', category: 'Services and Retail', categoryArabic:  'الخدمات والتجزئة' , source: require('../../../Assests/Images/Services.png') },
];


type CategoriesProps={
  navigation: any
  
}

const Categories:React.FC<CategoriesProps> = () => {
  const navigation=useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
  const styles = getStyles(language);

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
          <TouchableOpacity  style={styles.Flatlist_Cont} onPress={() => navigation.navigate('CategoriesScreen', { item })}>
            <ImageBackground source={item.source}  imageStyle={{borderRadius:10}} style={styles.image}>
            <Text style={styles.Txt} >{language==='en'? item.category:item.categoryArabic}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default Categories;
