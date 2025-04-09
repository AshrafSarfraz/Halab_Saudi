import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { fetchBrandsFromFirebase } from '../../../firebase/firebaseutils';
import ActivityIndicatorModal from '../../../Component/Loader/ActivityIndicator';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux_toolkit/store';
import { getStyles } from './style';


const { width } = Dimensions.get('screen');

const BestSeller: React.FC = () => {
  const navigation = useNavigation();
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
  const styles = getStyles(language);

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
        <ActivityIndicatorModal visible={loading} />
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
                {
                  language==='en'?
                  <Text style={styles.title_txt}>{item.nameEng}</Text>:
                  <Text style={styles.title_txt}>{item.nameArabic}</Text>
                }
               
               {
                 language==='en'?
                 <Text style={styles.desc_txt}>
                 {item.descriptionEng?.length > 70
                   ? item.descriptionEng.substring(0, 60) + '...'
                   : item.descriptionEng}
               </Text>:
                 <Text style={styles.desc_txt}>
                 {item.descriptionArabic?.length > 70
                   ? item.descriptionArabic.substring(0, 60) + '...'
                   : item.descriptionArabic}
               </Text>
               }
              
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default BestSeller;
