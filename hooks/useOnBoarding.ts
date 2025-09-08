import { router } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { IMAGES } from '../utils/images';

const { width: screenWidth } = Dimensions.get('window');

const useOnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const onboardingData = useMemo(() => [
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
  ], []);


  const handleScroll = useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  }, []);

  const handleSkip = useCallback(() => {
    router.push('/login');
  }, []);

  const renderDots = useCallback(() => {
    return onboardingData.map((_, index) => ({
      key: index,
      isActive: index === currentIndex,
    }));
  }, [currentIndex, onboardingData]);

  return {
    onboardingData,
    currentIndex,
    scrollViewRef,
    handleScroll,
    handleSkip,
    screenWidth,
    renderDots,
  };
};

export default useOnBoarding;
