import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { DropdownIcon } from '../../Themes/Images';

type Country = {
  name: string;
  code: string;
  image: number;
};

type Props = {
  onSelectCountry: (countryCode: string) => void;
};

// ✅ Country Options with correct image paths
const countryOptions: Country[] = [
  { name: 'Saudi Arabia', code: '+966', image: require('../../Assests/Icons/Saudi_Flag.png') },
  { name: 'Qatar', code: '+974', image: require('../../Assests/Icons/Qatar_Flag.jpg') },
];

const CountryDropdown: React.FC<Props> = ({ onSelectCountry }) => {
  const [dropdown, setDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countryOptions[0]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setDropdown(false);
    onSelectCountry(country.code);
  };

  return (
    <View style={styles.Dropdown_Cont}>
      {/* Dropdown Button */}
      <TouchableOpacity style={styles.Dropdown_Btn} onPress={() => setDropdown(!dropdown)}>
        <Image source={selectedCountry.image} style={styles.flag} />
        <Text style={styles.selectedText}>{selectedCountry.name} ({selectedCountry.code})</Text>
        <Image source={DropdownIcon} style={styles.dropdown_Icon} />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {dropdown && (
        <View style={styles.dropdown_Container}>
          {countryOptions.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={styles.Dropdown_ContItem}
              onPress={() => handleSelectCountry(country)}
            >
              <Image source={country.image} style={styles.flag} />
              <Text style={styles.dropdownText}>{country.name} ({country.code})</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Dropdown_Cont: {
    backgroundColor: 'ffffff',
    width: '100%',
    alignSelf: 'center',
  },
  Dropdown_Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.grey1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom:'3%',
    width: '100%',
    height:60,
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  dropdown_Icon: {
    width: 15,
    height: 15,
    tintColor: Colors.Black,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
    flex: 1, // Push the icon to the right
  },
  dropdown_Container: {
    position: 'absolute',
    top: 60, // Positioning below the button
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey1,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    zIndex: 10,
  },
  Dropdown_ContItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.Black,
  },
});

export default CountryDropdown;
