import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

function PhoneSignIn() {
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        Alert.alert('Login Successful', `Welcome ${user.phoneNumber}`);
        resetForm();
      }
    });
    return () => subscriber(); // Cleanup subscription
  }, []);

  // Reset form state after successful login or on demand
  const resetForm = (): void => {
    setConfirmation(null);
    setCode('');
    setPhoneNumber('');
    setIsLoading(false);
  };

  // Send verification code
  const signInWithPhoneNumber = async (): Promise<void> => {
    if (!phoneNumber.startsWith('+') || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number with country code (e.g., +16505553434)');
      return;
    }
    setIsLoading(true);
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
    } catch (error) {
      handleAuthError(error as FirebaseAuthTypes.AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm the verification code
  const confirmCode = async (): Promise<void> => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit code');
      return;
    }
    setIsLoading(true);
    try {
      if (confirmation) {
        await confirmation.confirm(code);
        // Success handled by onAuthStateChanged
      }
    } catch (error) {
      handleAuthError(error as FirebaseAuthTypes.AuthError, 'Invalid Code');
    } finally {
      setIsLoading(false);
    }
  };

  // Centralized error handling
  const handleAuthError = (error: FirebaseAuthTypes.AuthError, title: string = 'Error'): void => {
    console.error('Error Code:', error.code, 'Message:', error.message);
    switch (error.code) {
      case 'auth/invalid-phone-number':
        Alert.alert(title, 'The phone number format is invalid. Use +[country code][number] (e.g., +16505553434)');
        break;
      case 'auth/too-many-requests':
        Alert.alert(title, 'Too many attempts. Please wait and try again later.');
        break;
      case 'auth/invalid-verification-code':
        Alert.alert(title, 'The verification code is incorrect.');
        break;
      case 'auth/billing-not-enabled':
        Alert.alert(title, 'Phone authentication requires a billing account. Check your Firebase plan.');
        break;
      default:
        Alert.alert(title, error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      {!confirmation ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number (e.g., +16505553434)"
            value={phoneNumber}
            onChangeText={(text: string) => setPhoneNumber(text)}
            keyboardType="phone-pad"
            autoComplete="tel"
            editable={!isLoading}
          />
          <Button
            title="Send Verification Code"
            onPress={signInWithPhoneNumber}
            disabled={isLoading}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={(text: string) => setCode(text)}
            keyboardType="number-pad"
            maxLength={6}
            editable={!isLoading}
          />
          <Button
            title="Confirm Code"
            onPress={confirmCode}
            disabled={isLoading || code.length !== 6}
          />
        </>
      )}
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  loader: {
    marginTop: 20,
  },
});

export default PhoneSignIn;