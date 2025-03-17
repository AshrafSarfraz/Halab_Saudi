import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { Full_logo_B, language, Scope } from '../../Themes/Images';
import ImageSlider from './FlatOffer';
import { styles } from './style';
import Categories from './Categories';
import BestSeller from './BestSellers';
import RecentlyAdded from './RecentlyAdded';
import LanguageModal from '../../Component/CustomAlert/Lan_Modal';
import { Colors } from '../../Themes/Colors';

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Bg }}>
      {/* StatusBar Fix */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.Bg} // Ensure consistent background
        translucent={false} // Set to false to avoid overlay issues
      />

      <SafeAreaView style={styles.Container}>
        <ScrollView>
          <View style={styles.header}>
            <Image source={Full_logo_B} style={styles.logo} />
            <View style={styles.language_Cont}>
              <TouchableOpacity style={styles.Btn} onPress={showAlert}>
                <Image source={language} style={styles.language_Icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate('SearchScreen')}>
                <Image source={Scope} style={styles.Scope_Icon} />
              </TouchableOpacity>
            </View>
          </View>

          <ImageSlider />

          <View style={styles.Categories_Cont}>
            <Text style={styles.Categories_Txt}>Categories</Text>
            <Categories navigation={navigation} />
          </View>

          <View style={styles.BestSeller_Cont}>
            <Text style={styles.BestSeller_Txt}>Best Sellers</Text>
            <BestSeller navigation={navigation} />
          </View>

          <View style={styles.BestSeller_Cont}>
            <Text style={styles.BestSeller_Txt}>Recently Added</Text>
            <RecentlyAdded />
          </View>
        </ScrollView>

        <LanguageModal visible={alertVisible} onClose={hideAlert} />
      </SafeAreaView>
    </View>
  );
};

export default Home;
