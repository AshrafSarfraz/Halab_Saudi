import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Tick } from '../../Themes/Images';


 // ✅ Dummy tick icon

type CheckboxProps = {
  label: string;
  onPress: () => void;
  isChecked: boolean;
  linkText: string;
  linkTerm:string;
  onLinkPress: () => void;
  onLinkPress1: () => void;
};

const CustomCheckbox: React.FC<CheckboxProps> = ({ label, onPress, isChecked, linkText, onLinkPress,linkTerm, onLinkPress1 }) => {

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <TouchableOpacity onPress={onPress} style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Image source={Tick} style={styles.tickIcon} />}
      </TouchableOpacity>

      {/* Label & Privacy Link */}
      <Text style={styles.label}>
        {label}{' '}
        <Text style={styles.linkText} onPress={onLinkPress}>
          {linkText} 
        </Text>
        <Text style={styles.label} onPress={onLinkPress}>
        {' and '}
        </Text>
        <Text style={styles.linkText} onPress={onLinkPress1}>
          {linkTerm} 
        </Text>

     
      
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom:5
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.grey1, // ✅ Default grey border
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  
  },
  checked: {
    borderColor: Colors.Green,
    backgroundColor:Colors.Green // ✅ Green when checked
  },
  tickIcon: {
    width: 15,
    height: 15,
    tintColor: Colors.White, // ✅ Ensuring green tick
  },
  label: {
    fontSize: 14,
    color: Colors.Black2,
  },
  linkText: {
    color: Colors.Black, // ✅ Blue for privacy policy link
    textDecorationLine: 'underline',
  },
});

export default CustomCheckbox;
