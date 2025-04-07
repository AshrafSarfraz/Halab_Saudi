import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../Themes/Images';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {firestore} from '../../firebase/firebaseconfig';
import {styles} from './style';

type Offer = {
  id: string;
  nameEng: string;
  descriptionEng: string;
  img: string;
  selectedCity: string;
  selectedVenue: string;
};

const selected_venues: React.FC<{route:any}>= ({route}) => {
  const navigation = useNavigation<any>();
  const {item} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const snapshot = await firestore().collection('Brands').get();
        const BrandsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log('🔥 All Brands Data:', BrandsData);

        // Filter based on selected category
        const matchedItems = BrandsData.filter(
          data =>
            data.selectedVenue?.toLowerCase() === item.venueName?.toLowerCase(),
        );

        setFilteredItems(matchedItems);
      } catch (error) {
        console.error('❌ Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [item.text]);

  // Filter by search
  const searchFiltered = filteredItems.filter(entry =>
    entry.nameEng?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title={item.text}
          onBackPress={() => navigation.goBack()}
        />

        <View style={{marginTop: '7%'}} />
        <View style={styles.searchContainer}>
          <Image source={Search} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for anything you need"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.FlatlistContainer}>
          <Text style={styles.FoundItem_Txt}>Found Items</Text>
          <FlatList
            data={searchFiltered}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('DetailScreen', {item})}>
                <Image source={{uri: item.img}} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.nameEng}</Text>
                  <Text style={styles.itemLocation}>
                    {item.descriptionEng?.length > 70
                      ? item.descriptionEng.substring(0, 70) + '...'
                      : item.descriptionEng}
                  </Text>
                  <Text style={styles.itemCity}>
                    {item.selectedCity}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default selected_venues;
