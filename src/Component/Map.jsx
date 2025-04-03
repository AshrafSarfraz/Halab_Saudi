import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, PermissionsAndroid, Platform } from 'react-native';

const Map = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('Permission Denied', 'Location permission is required to fetch your location.');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    // Fetch location after permission is granted
    MyLocation();
  };

  const MyLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        Alert.alert('Your Location', `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
      },
      (error) => {
        console.log('Error:', error);
        Alert.alert('Error', 'Failed to get location. Make sure location is enabled.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <Button title="Get My Location" onPress={MyLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});

export default Map;
