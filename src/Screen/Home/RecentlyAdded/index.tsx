import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { firestore } from '../../../firebase/firebaseconfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux_toolkit/store';
import { getStyles } from './style';
import DistanceFromDevice from '../../../Component/distanceCalculate/distanceCalculate';
import { Location } from '../../../Themes/Images';

const RecentlyAdded = () => {
  const navigation = useNavigation();
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); // State to track image loading
  const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
  const styles = getStyles(language);

  useEffect(() => {
    const fetchRecentlyAdded = async () => {
      try {
        const snapshot = await firestore().collection('Brands').get();
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🕒 Get current time and subtract 1 month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const filtered = data.filter(item => {
          const createdAt = item.time?.toDate?.(); // Convert Firestore Timestamp to JS Date
          return createdAt && createdAt > oneMonthAgo;
        });
        setRecentItems(filtered);
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        console.error('❌ Error fetching recently added items:', error);
        setLoading(false);  // Set loading to false if error occurs
      }
    };

    fetchRecentlyAdded();
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false); // Stop shimmer effect once the image has loaded
  };

  return (
    <View style={styles.container}>
      {loading ? (
        // Shimmer placeholder when loading
        <ShimmerPlaceholder
          visible={false}
          LinearGradient={LinearGradient}
          style={styles.image}
        />
      ) : (
        <FlatList
          data={recentItems}
          keyExtractor={(item) => item.id}
          numColumns={2} // Display 2 items in a row
          columnWrapperStyle={styles.row} // Apply styles for spacing between columns
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('DetailScreen', { item })}>
              {/* Shimmer effect for the image */}
              <ShimmerPlaceholder
                visible={!imageLoading}
                LinearGradient={LinearGradient}
                style={styles.image}
              >
                <Image
                  source={{ uri: item.img }} // Image source
                  style={styles.image}
                  onLoad={handleImageLoad} // Trigger shimmer removal once image loads
                />
              </ShimmerPlaceholder>
              <Text style={styles.cate_txt}>
                {language === 'en' ? item.nameEng : item.nameArabic}
              </Text>

              <View style={styles.Type_Cont}>
                <Text style={styles.Type_Text}>{item.selectedCategory}</Text>
              </View>

              <View style={styles.Loc_Status_Cont}>
                <View style={styles.Loc_Cont}>
                  <Image source={Location} style={styles.LocationIcon} />
                  <DistanceFromDevice
                    targetLat={item.latitude}
                    targetLong={item.longitude}
                    kmText="km away"
                    mText="m away"
                    loadingText="Calculating..."
                  />
                </View>
                {item.status === 'Yes' ? (
                  <Text style={styles.Status_Txt}>Active</Text>
                ) : (
                  <Text style={styles.Status_Txt}>In-active</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default RecentlyAdded;
