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

import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import { Search } from '../../Themes/Images';
import { fetchBrandsFromFirebase } from '../../firebase/firebaseutils';
import { Colors } from '../../Themes/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/store';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { getStyles } from './style';
import { languageData } from '../../redux_toolkit/language/languageSlice';
import LinearGradient from 'react-native-linear-gradient';
import DetectCountry from '../../Component/distanceCalculate/DetectCountry';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<any[]>([]);
    const [country, setCountry] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const language = useSelector((state: RootState) => state.language.language);
  const styles = getStyles(language);

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

  const handleImageLoad = (id: string) => {
    setImageLoaded(prev => ({
      ...prev,
      [id]: true,
    }));
  };

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
        <CustomHeader
          title={language === 'en' ? 'Search Screen' : 'شاشة البحث'}
          onBackPress={() => navigation.goBack()}
        />

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
          {filteredData.length > 0 && !loading ? (
            <Text style={styles.FoundItem_Txt}>{languageData[language].Found_Items}</Text>
          ) : null}

          {loading ? (
            <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => (
                <View style={styles.itemContainer}>
                  <ShimmerPlaceholder  visible={false}    LinearGradient={LinearGradient}  style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <ShimmerPlaceholder visible={false}    LinearGradient={LinearGradient} style={{ height: 20, marginBottom: 6 }} />
                    <ShimmerPlaceholder visible={false}    LinearGradient={LinearGradient} style={{ height: 15, marginBottom: 6 }} />
                    <ShimmerPlaceholder visible={false}    LinearGradient={LinearGradient} style={{ height: 15, width: 80 }} />
                  </View>
                </View>
              )}
            />
          ) : filteredData.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
            data={
              filteredData.filter(item => {
                if (country) {
                  return item.selectedCountry?.toLowerCase() === country.toLowerCase();
                }
                return true; // agar country detect na ho to sab items dikhao
              })
            }
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
                 <ShimmerPlaceholder
                      visible={isLoaded}
                      LinearGradient={LinearGradient}
                      style={styles.itemImage}
                    >
                      <Image
                        source={{ uri: item.img }}
                        style={styles.itemImage}
                        onLoad={() => handleImageLoad(item.id)}
                      />
                      </ShimmerPlaceholder>



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
                        <Text style={styles.itemCity}>{item.selectedCity}</Text>
                      </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
      <DetectCountry onCountryDetect={(value) => setCountry(value)} />
    </View>
  );
};

export default SearchScreen;
