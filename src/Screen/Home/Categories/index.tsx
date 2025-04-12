import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';



const images = [
  { id: '1', text: 'Food and Drink', category: 'Food and Drink', categoryArabic: 'المأكولات والمشروبات', source: require('../../../Assests/Images/food_drink.png') },
  { id: '2', text: 'Beauty and Spa', category: 'Beauty and Spa',categoryArabic:  'الجمال والمنتجعات'  ,source: require('../../../Assests/Images/beauty.png') },
  { id: '3', text: 'Health and Fitness', category: 'Health and Fitness',categoryArabic:  'الصحة واللياقة' , source: require('../../../Assests/Images/health.png') },
  { id: '4', text: 'Fun and Leisure', category: 'Fun and Leisure', categoryArabic:  'الترفيه والتسلية' , source: require('../../../Assests/Images/fun.png') },
  { id: '5', text: 'Room Nights', category: 'Room Nights', categoryArabic:  'الإقامة الفندقية' , source: require('../../../Assests/Images/room_night.png') },
  { id: '6', text: 'Services and Retail', category: 'Services and Retail', categoryArabic:  'الخدمات والتجزئة' , source: require('../../../Assests/Images/service.png') },
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
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('CategoriesScreen', { item })}>
            <Image source={item.source} style={styles.image} />
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default Categories;
