import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../../firebase/firebaseconfig';


type VenuesProps = {
  navigation: any;
};

const Venues: React.FC<VenuesProps> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [showAll, setShowAll] = useState(false);
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const snapshot = await firestore().collection('Venues').get();
        const venuesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('📍 Venues Data:', venuesData);
        setVenues(venuesData);
      } catch (error) {
        console.error('❌ Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const visibleItems = showAll ? venues : venues.slice(0, 8);

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleItems}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.Flatlist_Cont}
            onPress={() => navigation.navigate('SelectedVenue', { item })}
          >
            {item.img && (
              <Image source={{ uri: item.img }} style={styles.image} />
            )}
            <Text style={styles.cate_txt}>{item.venueName}</Text>
          </TouchableOpacity>
        )}
      />

{venues.length > 8 && (
  <TouchableOpacity
    style={styles.showMoreButton}
    onPress={() => setShowAll(!showAll)}
  >
    <Text style={styles.showMoreText}>
      {showAll ? t('Hide') : t('Show More')}
    </Text>
  </TouchableOpacity>
)}
      {/* Show More Button */}
      {/* <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowAll(!showAll)}
      >
        <Text style={styles.showMoreText}>
          {showAll ? t('Hide') : t('Show More')}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Venues;
