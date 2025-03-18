import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('screen');

const images = [
  { id: '1', text: 'Piccolo', description:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée', discount:'10%', pin:1234, source: require('../../../Assests/Images/resturnant.png') },
  { id: '2', text: 'Piccolo',description:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée',discount:'12%', pin:1234,  source: require('../../../Assests/Images/candle.png') },
  { id: '3', text: 'Piccolo', description:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée',discount:'15%', pin:1234,  source: require('../../../Assests/Images/food.png') },

];

type BestSellerProps={
  navigation:any
}

const BestSeller:React.FC<BestSellerProps> = () => {
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
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('DetailScreen', { item })} >
            <Image source={item.source} style={styles.image} />
           <View style={styles.bestSeller_Detail} >
            <Text style={styles.title_txt} >{item.text}</Text>
            <Text style={styles.desc_txt} >{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default BestSeller;
