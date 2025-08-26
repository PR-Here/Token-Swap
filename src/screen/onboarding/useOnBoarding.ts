import { useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { IMAGES } from '../../utils/images';
import { RootStackParamList } from '../../navigation/rootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenName } from '../../constant/screenName';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const useOnBoarding = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onboardingData = [
    {
      image: IMAGES.ONBOARDING_LOGO,
      title: 'Loopin the right direction',
      description: 'Get access to the right crypto opportunity early.',
    },
    {
      image: IMAGES.ONBOARDING_LOGO,
      title: 'Secure and Fast Trading',
      description: 'Trade cryptocurrencies with confidence and speed.',
    },
  ];

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  const handleSkip = useCallback(() => {
    navigation.navigate(ScreenName.Login);
  }, []);

  return {
    onboardingData,
    currentIndex,
    scrollViewRef,
    handleScroll,
    handleSkip,
    screenWidth,
  };
};

export default useOnBoarding;
