import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Search} from '../../Themes/Images';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import {firestore} from '../../firebase/firebaseconfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/store';
import { getStyles } from './style';
import { languageData } from '../../redux_toolkit/language/languageSlice';
import { Colors } from '../../Themes/Colors';



const SelectedVenues: React.FC<{route:any}>= ({route}) => {
  const navigation = useNavigation<any>();
  const {item} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);


  const language = useSelector((state: RootState) => state.language.language); // Get the current language from Redux
  const styles = getStyles(language);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const snapshot = await firestore().collection('Brands').get();
        const BrandsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
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
        <StatusBar hidden={true} translucent={true} animated={true} />
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title={item.venueName}
          onBackPress={() => navigation.goBack()}
        />

        <View style={{marginTop: '7%'}} />
        <View style={styles.searchContainer}>
          <Image source={Search} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={languageData[language].Search_for_anything}
            placeholderTextColor={Colors.Grey9}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.FlatlistContainer}>
          <Text style={styles.FoundItem_Txt}>{languageData[language].Found_Items}</Text>
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
                  {
                    language==='en'? <Text style={styles.itemTitle}>{item.nameEng}</Text>:
                    <Text style={styles.itemTitle}>{item.nameArabic}</Text>
                  }
                 {
                  language==='en'? <Text style={styles.itemLocation}>
                  {item.descriptionEng?.length > 70
                    ? item.descriptionEng.substring(0, 70) + '...'
                    : item.descriptionEng}
                </Text>:
                 <Text style={styles.itemLocation}>
                 {item.descriptionArabic?.length > 70
                   ? item.descriptionArabic.substring(0, 70) + '...'
                   : item.descriptionArabic}
               </Text>
                 }
                 
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

export default SelectedVenues;
