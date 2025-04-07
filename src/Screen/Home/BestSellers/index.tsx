import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { fetchBrandsFromFirebase } from '../../../firebase/firebaseutils';
import { Colors } from '../../../Themes/Colors';

const { width } = Dimensions.get('screen');

const BestSeller: React.FC = () => {
  const navigation = useNavigation();
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      const fetchedBrands = await fetchBrandsFromFirebase();
      setBrands(fetchedBrands);
      setLoading(false);
    };

    getBrands();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.Green} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.Flatlist_Cont}
              onPress={() => navigation.navigate('DetailScreen', { item })}
            >
              {item.img && <Image source={{ uri: item.img }} style={styles.image} />}
              <View style={styles.bestSeller_Detail}>
                <Text style={styles.title_txt}>{item.nameEng}</Text>
                <Text style={styles.desc_txt}>
                  {item.descriptionEng?.length > 70
                    ? item.descriptionEng.substring(0, 60) + '...'
                    : item.descriptionEng}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default BestSeller;
