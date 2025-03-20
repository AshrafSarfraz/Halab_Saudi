import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux_toolkit/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../redux_toolkit/store'; // Import RootState for type safety

type LanProps = {
  visible: boolean;
  onClose: () => void;
};

const LanguageModal: React.FC<LanProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language); // Type-safe selector

  const changeLanguage = async (lang: 'en' | 'ar') => {
    await AsyncStorage.setItem('language', lang); // Save language persistently
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang)); // Update Redux state
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{t('language')}</Text>

          <TouchableOpacity 
            style={[styles.languageButton, language === 'en' && styles.selectedButton]} 
            onPress={() => {changeLanguage('en'),onClose()}}
          >
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.languageButton, language === 'ar' && styles.selectedButton]} 
            onPress={() => {changeLanguage('ar'),onClose()}}
          >
            <Text style={styles.languageText}>العربية</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('cancel')}</Text>
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
    paddingTop:30,
    width: '85%',
    height:300,
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
    lineHeight:30
  },
  languageButton: {
    backgroundColor: Colors.Green,
    width: '80%',
    height:60,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    justifyContent:"center"
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
