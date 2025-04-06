// utils/languageStyle.ts
import { I18nManager } from 'react-native';

export const getLanguageStyle = (
  fontSizeForEN: number,
  fontSizeForAR: number,
  fontFamily: string,
  color: string = '#000'
) => {
  const isArabic = I18nManager.isRTL;

  return {
    textAlign: isArabic ? 'right' : 'left',
    fontSize: isArabic ? fontSizeForAR : fontSizeForEN,
    fontFamily: fontFamily,
    color: color,
  };
};
