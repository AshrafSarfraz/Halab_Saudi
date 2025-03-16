import React, { useState } from 'react';
import { View, Text, FlatList, Image,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { images } from './DummyData';



const RecentlyAdded = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items in a row
        columnWrapperStyle={styles.row} // Apply styles for spacing between columns
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('DetailScreen', { item })}  >
            <Image source={item.source} style={styles.image} />
            <Text style={styles.cate_txt}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentlyAdded;
