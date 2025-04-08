import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';
import { RootState } from '../../redux_toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { switchLanguage } from '../../redux_toolkit/language/languageSlice'; // Import the switchLanguage action

type LanProps = {
  visible: boolean;
  onClose: () => void;
};

const LanguageModal: React.FC<LanProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language); // Get current language from the Redux store

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    dispatch(switchLanguage(newLanguage)); // Dispatch the switchLanguage action
    onClose(); // Close the modal
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={{ fontSize: 18 }}>
            {language === 'en' ? 'Login' : 'تسجيل الدخول'} 
          </Text>

          <TouchableOpacity 
            style={[styles.languageButton, language === 'en' && styles.selectedButton]} 
            onPress={() => handleLanguageChange('en')}
          >
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.languageButton, language === 'ar' && styles.selectedButton]} 
            onPress={() => handleLanguageChange('ar')}
          >
            <Text style={styles.languageText}>العربية</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 30,
    width: '85%',
    height: 300,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.SF_Bold,
    color: Colors.Black,
    marginBottom: 15,
    lineHeight: 30,
  },
  languageButton: {
    backgroundColor: 'green',
    width: '80%',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: Colors.Green, // Highlight selected language
  },
  languageText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: Fonts.SF_Bold,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.Black,
    fontFamily: Fonts.SF_Medium,
  },
});

export default LanguageModal;
