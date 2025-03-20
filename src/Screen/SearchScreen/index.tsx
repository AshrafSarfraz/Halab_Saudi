import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { Back_Icon, Search } from '../../Themes/Images';
import { mockData } from './dummyData';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';

const SearchScreen:React.FC = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredData = mockData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>  
       <CustomHeader title='Search' onBackPress={()=>{navigation.goBack()}} />
         <View style={{marginTop:'7%'}} />
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
            data={filteredData}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer}>
                <Image source={item.source} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemLocation}>{item.location}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;
