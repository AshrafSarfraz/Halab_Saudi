import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Search } from '../../Themes/Images';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';

import { fetchBrandsFromFirebase } from '../../firebase/firebaseutils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/store';
import { getStyles } from './style';
import { languageData } from '../../redux_toolkit/language/languageSlice';
import { Colors } from '../../Themes/Colors';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const SelectedCategories: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<any>();
  const { item } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  const language = useSelector((state: RootState) => state.language.language);
  const styles = getStyles(language);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      const fetchedBrands = await fetchBrandsFromFirebase();
      const matchedItems = fetchedBrands.filter(data =>
        data.selectedCategory?.toLowerCase() === item.text?.toLowerCase(),
      );
      setFilteredItems(matchedItems);
      setLoading(false);
    };

    getBrands();
  }, []);

  const handleImageLoad = (id: string) => {
    setImageLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const searchFiltered = filteredItems.filter(entry =>
    entry.nameEng?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image source={require('../../Assests/Images/no_data.png')} style={styles.emptyStateImage} />
      <Text style={styles.emptyStateText}>{languageData[language].No_Items_Found}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} translucent={true} animated={true} />
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title={item.text} onBackPress={() => navigation.goBack()} />

        <View style={{ marginTop: '7%' }} />
        <View style={styles.searchContainer}>
          <Image source={Search} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={languageData[language].Search_for_anything}
            placeholderTextColor={Colors.Grey5}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.FlatlistContainer}>
          {searchFiltered.length > 0 && !loading ? (
            <Text style={styles.FoundItem_Txt}>{languageData[language].Found_Items}</Text>
          ) : null}

          {loading ? (
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => (
                <View style={styles.itemContainer}>
                  <ShimmerPlaceholder visible={false} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <ShimmerPlaceholder visible={false} style={{ height: 20, marginBottom: 6 }} />
                    <ShimmerPlaceholder visible={false} style={{ height: 15, marginBottom: 6 }} />
                    <ShimmerPlaceholder visible={false} style={{ height: 15, width: 80 }} />
                  </View>
                </View>
              )}
            />
          ) : searchFiltered.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={searchFiltered}
              keyExtractor={item => item.id}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isLoaded = imageLoaded[item.id] || false;

                return (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate('DetailScreen', { item })}
                  >
                    {/* IMAGE shimmer */}
                    <ShimmerPlaceholder
                      visible={isLoaded}
                      style={styles.itemImage}
                    >
                      <Image
                        source={{ uri: item.img }}
                        style={styles.itemImage}
                        onLoad={() => handleImageLoad(item.id)}
                      />
                    </ShimmerPlaceholder>

                    {/* TEXT shimmer */}
                    <ShimmerPlaceholder
                      visible={isLoaded}
                      style={styles.itemInfo}
                    >
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>
                          {language === 'en' ? item.nameEng : item.nameArabic}
                        </Text>
                        <Text style={styles.itemLocation}>
                          {language === 'en'
                            ? item.descriptionEng?.length > 70
                              ? item.descriptionEng.substring(0, 70) + '...'
                              : item.descriptionEng
                            : item.descriptionArabic?.length > 70
                            ? item.descriptionArabic.substring(0, 70) + '...'
                            : item.descriptionArabic}
                        </Text>
                        <Text style={styles.itemCity}>
                          {item.selectedCity}
                        </Text>
                      </View>
                    </ShimmerPlaceholder>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SelectedCategories;
