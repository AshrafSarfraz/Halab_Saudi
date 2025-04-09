import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { fetchVenuFromFirebase } from '../../../firebase/firebaseutils';

type VenuesProps = {
  navigation: any;
};

const Venues: React.FC<VenuesProps> = () => {
  const navigation = useNavigation();
  const [showAll, setShowAll] = useState(false);
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false); // Stop loader when image is loaded
  };

  const handleImageError = () => {
    setImageLoading(false); // Stop loader in case of error
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVenuFromFirebase(); // 👈 use your logic here
      setVenues(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const visibleItems = showAll ? venues : venues.slice(0, 8);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleItems}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.Flatlist_Cont}
              onPress={() => navigation.navigate('SelectedVenue', { item })}
            >
              {imageLoading && (
                <ActivityIndicator
                  size="small"
                  color="gray"
                  style={styles.loader}
                />
              )}

              {item.img && (
                <Image
                  source={{ uri: item.img }}
                  style={styles.image}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
              <Text style={styles.cate_txt}>{item.venueName}</Text>
            </TouchableOpacity>
          );
        }}
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
    </View>
  );
};

export default Venues;
