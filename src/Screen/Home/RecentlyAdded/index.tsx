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
import DetectCountry from '../../../Component/distanceCalculate/DetectCountry';

const RecentlyAdded = () => {
  const navigation = useNavigation();
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [country, setCountry] = useState<string | null>(null);
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

        // Get current time and subtract 1 month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Filter only items created in the last month
        const filtered = data.filter(item => {
          const createdAt = item.time?.toDate?.(); // Convert Firestore Timestamp to JS Date
          return createdAt && createdAt > oneMonthAgo;
        });

        setRecentItems(filtered);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching recently added items:', error);
        setLoading(false);
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
        data={
          recentItems.filter(item => {
            if (country) {
              return item.selectedCountry?.toLowerCase() === country.toLowerCase();
            }
            return true; // agar country detect na ho to sab items dikhao
          })
        }
      
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
                {language === 'en' ?    <Text> {item.nameEng.length > 20 ? item.nameEng.substring(0, 20) + '...' : item.nameEng}</Text> : item.nameArabic}
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

                <DetectCountry onCountryDetect={(value) => setCountry(value)} />
           
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
