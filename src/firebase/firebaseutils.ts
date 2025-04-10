
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from './firebaseconfig';

export const fetchBrandsFromFirebase = async () => {
  try {
    // Fetch data directly from Firestore
    const snapshot = await firestore().collection('Brands').get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data; // Return freshly fetched data from Firebase
  } catch (error) {
    // Handle errors if any
    console.error('❌ Error fetching brands:', error);
    return []; // Return empty array if error occurs
  }
};

export const fetchFlatOfferFromFirebase = async () => {
  try {
    // Directly fetch data from Firebase without using AsyncStorage
    const snapshot = await firestore().collection('FlatOffers').get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data; // Return freshly fetched data from Firebase
  } catch (error) {
    // Handle the error appropriately (console log, show error message, etc.)
    console.error('❌ Error fetching flat offers:', error);
    return []; // Return empty array if error occurs
  }
};


export const fetchVenuFromFirebase = async () => {
  try {
    // Directly fetch data from Firebase without using AsyncStorage
    const snapshot = await firestore().collection('Venues').get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data; // Return freshly fetched data from Firebase
  } catch (error) {
    // Handle the error appropriately (console log, show error message, etc.)
    console.error('❌ Error fetching venues:', error);
    return []; // Return empty array if error occurs
  }
};
