import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import { Search } from '../../Themes/Images';
import { fetchBrandsFromFirebase } from '../../firebase/firebaseutils';
import { Colors } from '../../Themes/Colors';




const SearchScreen: React.FC= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<any[]>([]);
  const navigation = useNavigation();

   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const getBrands = async () => {
       setLoading(true);
       const fetchedBrands = await fetchBrandsFromFirebase();
       setBrands(fetchedBrands);
       setLoading(false);
     };
 
     getBrands();
   }, []);

  const filteredData = brands.filter(item =>
    item.nameEng?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        title={'Search'}
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
          {loading ? (
                <ActivityIndicator size="small" color={Colors.Green} style={{ flex: 1 }} />
              ) : (
        <FlatList
          data={filteredData}
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
        />)}
      </View>
    </SafeAreaView>
  </View>
  );
};

export default SearchScreen;
