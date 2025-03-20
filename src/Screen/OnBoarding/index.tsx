import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomButton from '../../Component/CustomButton/CustomButton';
import { styles } from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSlidesData } from './DummyData';
import { useTranslation } from 'react-i18next';

type OnBoardingProps = {
  navigation: NativeStackNavigationProp<any>;
};

type SlideItem = {
  Title: string;
  text: string;
  image: any;
  backgroundColor: string;
};

const OnBoarding: React.FC<OnBoardingProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const slides = getSlidesData(); // Call inside the component

  const [showRealApp, setShowRealApp] = useState(false);
  const sliderRef = useRef<AppIntroSlider<SlideItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current?.goToSlide(currentIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current?.goToSlide(currentIndex - 1);
    }
  };

  const renderItem = ({ item, index }: { item: SlideItem; index: number }) => {
    const isLastSlide = index === slides.length - 1;
    const isFirstSlide = index === 0;

    return (
      <SafeAreaView style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        {!isFirstSlide && (
          <TouchableOpacity style={styles.prevButton} onPress={handlePrevSlide}>
            <Image source={require('../../Assests/Icons/Back.png')} style={styles.Back_Icon} />
          </TouchableOpacity>
        )}
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={{ height: 170, justifyContent: 'center', alignItems: 'center', width: '85%' }}>
          <Text style={styles.Title}>{item.Title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
        <View style={styles.paginationContainer}>
          {slides.map((slide, ind) => (
            <View
              key={slide.key}
              style={[styles.paginationDot, ind === currentIndex ? styles.activePaginationDot : null]}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title={t('next')} onPress={isLastSlide ? () => navigation.navigate('Login') : handleNextSlide} />
        </View>
      </SafeAreaView>
    );
  };

  if (showRealApp) {
    return <Text>Your App Content Goes Here</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <AppIntroSlider
          ref={sliderRef}
          renderItem={renderItem}
          data={slides} // Use slides instead of SlidesData
          initialNumToRender={slides.length}
          onSlideChange={(index) => setCurrentIndex(index)}
          renderNextButton={() => null}
          renderDoneButton={() => null}
          renderPagination={() => null}
        />
      </SafeAreaView>
    );
  }
};

export default OnBoarding;
