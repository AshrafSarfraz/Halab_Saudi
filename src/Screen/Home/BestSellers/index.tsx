import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'Piccolo', desc:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée', source: require('../../../Assests/Images/resturnant.png') },
  { id: '2', text: 'Piccolo',desc:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée', source: require('../../../Assests/Images/candle.png') },
  { id: '3', text: 'Piccolo', desc:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée', source: require('../../../Assests/Images/food.png') },

];

const BestSeller = () => {
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
           <View style={styles.bestSeller_Detail} >
            <Text style={styles.title_txt} >{item.text}</Text>
            <Text style={styles.desc_txt} >{item.desc}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default BestSeller;
