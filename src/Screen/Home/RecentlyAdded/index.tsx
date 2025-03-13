import React, { useState } from 'react';
import { View, Text, FlatList, Image,  TouchableOpacity } from 'react-native';
import styles from './style';

const images = [
  { id: '1', text: 'Juno restaurant', source: require('../../../Assests/Images/resturnant.png') },
  { id: '2', text: 'Layali restaurant and cafe', source: require('../../../Assests/Images/candle.png') },
  { id: '3', text: 'Hotel', source: require('../../../Assests/Images/candle.png') },
  { id: '4', text: 'uno restaurant', source: require('../../../Assests/Images/resturnant.png') },
  { id: '5', text: 'Layali restaurant and cafe', source: require('../../../Assests/Images/resturnant.png') },
  { id: '6', text: 'uno restaurant', source: require('../../../Assests/Images/candle.png') },
];

const RecentlyAdded = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items in a row
        columnWrapperStyle={styles.row} // Apply styles for spacing between columns
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Flatlist_Cont}>
            <Image source={item.source} style={styles.image} />
            <Text style={styles.cate_txt}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentlyAdded;
