import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { styles } from './style';
import { images } from './DummyData';
import { useTranslation } from 'react-i18next';

type VenuesProps={
  navigation:any
}

const Venues:React.FC<VenuesProps> = () => {
  const {t}=useTranslation()
  const navigation = useNavigation();
  const [showAll, setShowAll] = useState(false);

  // Initially show only 8 items, show all when button is pressed
  const visibleItems = showAll ? images : images.slice(0, 8);

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleItems}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.Flatlist_Cont}
            onPress={() => navigation.navigate('CategoriesScreen', {item})}>
            <Image source={item.source} style={styles.image} />
            <Text style={styles.cate_txt}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Show More Button */}
      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowAll(!showAll)}>
        <Text style={styles.showMoreText}>
          {showAll ? 'Hide' : 'Show More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Venues;
