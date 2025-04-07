import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { firestore } from '../../../firebase/firebaseconfig';
import { Colors } from '../../../Themes/Colors';

const RecentlyAdded = () => {
  const navigation = useNavigation();
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
       // console.log('🆕 Recently Added (1 Month):', filtered);
        setRecentItems(filtered);
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        console.error('❌ Error fetching recently added items:', error);
        setLoading(false);  // Set loading to false if error occurs
      }
    };

    fetchRecentlyAdded();
  }, []);


  return (
    <View style={styles.container}>
       {loading ? (
              <ActivityIndicator size="small" color={Colors.Green} style={{ flex: 1 }} />
            ) : (
      <FlatList
        data={recentItems}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 items in a row
        columnWrapperStyle={styles.row} // Apply styles for spacing between columns
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.Flatlist_Cont} onPress={() => navigation.navigate('DetailScreen', { item })}  >
            <Image source={{uri:item.img}} style={styles.image} />
            <Text style={styles.cate_txt}>{item.nameEng}</Text>
          </TouchableOpacity>
        )}
      /> )}
    </View>
  );
};

export default RecentlyAdded;
