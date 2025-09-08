import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { IMAGES } from '../utils/images';

const { width: screenWidth } = Dimensions.get('window');

export const useOnboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<any>(null);

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
        router.push('/login');
    }, []);

    const renderOnboardingScreen = useCallback((item: any, index: number) => {
        // This will be handled in the component since it imports specific components
        return { item, index };
    }, []);

    const renderDots = () => {
        return onboardingData.map((_, index) => ({
            key: index,
            isActive: index === currentIndex,
        }));
    };

    return {
        // State
        currentIndex,
        screenWidth,

        // Refs
        scrollViewRef,

        // Data
        onboardingData,

        // Functions
        handleScroll,
        handleSkip,
        renderOnboardingScreen,
        renderDots,
    };
};
