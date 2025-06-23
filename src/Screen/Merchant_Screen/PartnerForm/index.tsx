// BrandFormScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BrandFormScreen = () => {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async () => {
    if (!brandName || !description) {
      Alert.alert('Error', 'Brand name and description are required');
      return;
    }

    try {
      await firestore().collection('Brands').add({
        name: brandName,
        description: description,
        logoUrl: logoUrl,
        website: website,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Brand added successfully');
      setBrandName('');
      setDescription('');
      setLogoUrl('');
      setWebsite('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Brand</Text>

      <TextInput
        placeholder="Brand Name"
        style={styles.input}
        value={brandName}
        onChangeText={setBrandName}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Logo URL (optional)"
        style={styles.input}
        value={logoUrl}
        onChangeText={setLogoUrl}
      />

      <TextInput
        placeholder="Website (optional)"
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default BrandFormScreen;
