
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from './firebaseconfig';

export const fetchBrandsFromFirebase = async () => {
  try {
    const cachedData = await AsyncStorage.getItem('brands');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      // If no data in AsyncStorage, fetch from Firebase
      const snapshot = await firestore().collection('Brands').get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Save data to AsyncStorage for future use
      await AsyncStorage.setItem('brands', JSON.stringify(data));
      return data;                        // Return freshly fetched data from Firebase
    }
  } catch (error) {
     console.error('❌ Error fetching brands:', error);
    return []; // Return empty array if error occurs
  }
};

export const fetchFlatOfferFromFirebase = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('flatOffers');
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        // If no data in AsyncStorage, fetch from Firebase
        const snapshot = await firestore().collection('FlatOffers').get();
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Save data to AsyncStorage for future use
        await AsyncStorage.setItem('flatOffers', JSON.stringify(data));
        return data;                        // Return freshly fetched data from Firebase
      }
    } catch (error) {
       console.error('❌ Error fetching brands:', error);
      return []; // Return empty array if error occurs
    }
  };

  