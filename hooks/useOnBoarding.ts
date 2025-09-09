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
    {
      image: IMAGES.ONBOARDING_LOGO,
      title: 'Login to Continue',
      description: 'Sign in to access your account and start trading.',
    },
  ], []);


  const handleScroll = useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  }, []);


  const renderDots = useCallback(() => {
    // Only show dots for first 2 screens (exclude login screen)
    return onboardingData.slice(0, 2).map((_, index) => ({
      key: index,
      isActive: index === currentIndex,
    }));
  }, [currentIndex, onboardingData]);

  return {
    onboardingData,
    currentIndex,
    scrollViewRef,
    handleScroll,
    screenWidth,
    renderDots,
  };
};

export default useOnBoarding;
