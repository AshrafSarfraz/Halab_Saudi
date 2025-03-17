import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../Themes/Colors';
import { Fonts } from '../../Themes/Fonts';
import { Back_Icon } from '../../Themes/Images';

type HeaderProps={
    title: string,
    onBackPress: () => void,
}

const CustomHeader:React.FC<HeaderProps> = ({onBackPress,title}) => {
    return (
        <View style={styles.header}>
                <TouchableOpacity onPress={onBackPress}>
                  <Image source={Back_Icon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{title}</Text>
              </View>
    );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    tintColor: Colors.Green,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.SF_Bold,
    lineHeight: 24,
    color: Colors.Green,
  },

})

export default CustomHeader;
