import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountryDropdown from '../../Component/Dropdown/SelectCountry';


const Home: React.FC = () => {
    const [countryCode, setCountryCode] = useState('+966'); // Default

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selected Country Code: {countryCode}</Text>

            {/* Use the CountryDropdown and get selected value */}
            <CountryDropdown onSelectCountry={(code) => setCountryCode(code)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    label: { fontSize: 20, marginBottom: 20 },
});

export default Home;
