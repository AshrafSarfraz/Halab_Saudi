import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewerScreen = ({ route }: any) => {
  const { pdfUrl } = route.params;

  const source = { uri: pdfUrl, cache: true };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log('PDF load error:', error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFViewerScreen;



// import React, { useState } from 'react';
// import { StyleSheet, Dimensions, View, Platform } from 'react-native';
// import Pdf from 'react-native-pdf';

// const PDFExample = () => {
//     const [numberOfPages, setNumberOfPages] = useState(0);
//     const [currentPage, setCurrentPage] = useState(0);

//     return (
//         <View style={styles.container}>
//         <Pdf
//             trustAllCerts={false}
//             source={{uri:'https://firebasestorage.googleapis.com/v0/b/hala-b-saudi.firebasestorage.app/o/Brands%2Fpdfs%2Fashraf.pdf?alt=media&token=628e3ad9-cb40-41d1-adc4-ca720d3c48a5'}}
//             onLoadComplete={(numberOfPages,filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//             }}
//             onPageChanged={(page,numberOfPages) => {
//                 console.log(`Current page: ${page}`);
//             }}
//             onError={(error) => {
//                 console.log(error);
//             }}
//             onPressLink={(uri) => {
//                 console.log(`Link pressed: ${uri}`);
//             }}
//             style={styles.pdf}/>
//     </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex: 1,
//         width: '100%',
//         height: '100%'
//     }
// });

// export default PDFExample;
