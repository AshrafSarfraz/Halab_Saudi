import { Colors } from '../../Themes/Colors';
import { useTranslation } from 'react-i18next';

export const getSlidesData = () => {
  const { t } = useTranslation();

  return [
    {
      key: 1,
      Title: t('restaurants_discounts.title'),
      text: t('restaurants_discounts.text'),
      image: require('../../Assests/Images/slider1.png'),
      backgroundColor: Colors.Bg,
    },
    {
      key: 2,
      Title: t('shopping_discounts.title'),
      text: t('shopping_discounts.text'),
      image: require('../../Assests/Images/slider2.png'),
      backgroundColor: Colors.Bg,
    },
    {
      key: 3,
      Title: t('hotels_discounts.title'),
      text: t('hotels_discounts.text'),
      image: require('../../Assests/Images/slider3.png'),
      backgroundColor: Colors.Bg,
    },
  ];
};
