import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../../firebase/firebaseconfig';
import { fetchFlatOfferFromFirebase } from '../../../firebase/firebaseutils';
import { Colors } from '../../../Themes/Colors';

const { width } = Dimensions.get('screen');

const ImageSlider: React.FC<{navigation:any}> = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offers, setOffers] = useState<any[]>([]); // State to store Firestore data
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const getFlatOffer = async () => {
      setLoading(true);
      const fetchedBrands = await fetchFlatOfferFromFirebase();
      setOffers(fetchedBrands);
      setLoading(false);
    };

    getFlatOffer();
  }, []);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
       {loading ? (
              <ActivityIndicator size="small" color={Colors.Green} style={{ flex: 1 }} />
            ) : (
      <FlatList
        data={offers} // Use Firestore data
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.imageContainer} 
            onPress={() => navigation.navigate('DetailScreen', { item })}
          >
            {/* Assuming image URL is stored in Firestore as 'source' */}
            <Image 
              source={{ uri: item.img }} // Use URI for Firestore images
              style={styles.image} 
            />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>{'Discount: '+item.discount+'%'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />)}

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { 
                backgroundColor: index === currentIndex ? '#005029' : '#A2A2A2',
                width: index === currentIndex ? 30 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;



// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
// import styles from './style';
// import { useNavigation } from '@react-navigation/native';
// const { width } = Dimensions.get('screen');

// const images = [
//   { id: '1', text: 'First Image',   description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
//     ,discount:'10%', pin:1234, source: require('../../../Assests/Images/bgImg.jpeg') },
//   { id: '2', text: 'Second Image',  description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
//     , discount:'10%', pin:1234,  source: require('../../../Assests/Images/bgImg.jpeg') },
//   { id: '3', text: 'Third Image',   description:'A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals. A fine dining restaurant with a great ambiance and delicious meals.A fine dining restaurant with a great ambiance and delicious meals.' 
//     , discount:'10%', pin:1234, source: require('../../../Assests/Images/bgImg.jpeg') },
// ];

// type SliderProps={
//   navigation: any
// }


// const ImageSlider:React.FC = () => {
//   const navigation=useNavigation()
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleScroll = (event: any) => {
//     const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
//     setCurrentIndex(slideIndex);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Image Slider */}
//       <FlatList
//         data={images}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('DetailScreen', { item })} >
//             <Image source={item.source} style={styles.image} />
//             <View style={styles.overlay}>
//               <Text style={styles.imageText}>{item.text}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Pagination Dots */}
//       <View style={styles.pagination}>
//         {images.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               { backgroundColor: index === currentIndex ? '#005029' : '#A2A2A2' ,
//                 width: index === currentIndex ? 30 : 8 ,
//               },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default ImageSlider;





