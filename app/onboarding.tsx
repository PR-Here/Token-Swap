import OnBoardingTwo from '@/components/onboarding/onBoardingTwo';
import OnBordingOne from '@/components/onboarding/onBordingOne';
import SkipButton from '@/components/onboarding/skipButton';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import useOnBoarding from '@/hooks/useOnBoarding';
import { getHeight, getWidth } from '@/utils/size';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  const {
    currentIndex,
    screenWidth,
    scrollViewRef,
    onboardingData,
    handleScroll,
    handleSkip,
    renderDots,
  } = useOnBoarding();

  const styles = useStyles(screenWidth);

  const renderOnboardingScreenComponent = useCallback((item: any, index: number) => {
    return index === 0 ? <OnBordingOne /> : <OnBoardingTwo />;
  }, []);

  const renderDotsComponent = () => {
    return (
      <View style={styles.dotsContainer}>
        {renderDots().map((dot) => (
          <View
            key={dot.key}
            style={[
              styles.dot,
              {
                backgroundColor: dot.isActive
                  ? '#00046F'
                  : 'rgba(255, 255, 255, 0.5)',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SkipButton onPress={handleSkip} currentIndex={currentIndex} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) =>
          renderOnboardingScreenComponent(item, index),
        )}
      </ScrollView>
      {renderDotsComponent()}
    </SafeAreaView>
  );
};

export default Onboarding;

const useStyles = (screenWidth: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
    },
    scrollView: {
      flex: 1,
    },
    slide: {
      width: screenWidth,
      flex: 1,
      paddingHorizontal: getWidth(20),
      paddingVertical: getHeight(16),
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: getWidth(320),
      height: getHeight(340),
    },
    title: {
      color: WHITE,
      fontSize: getWidth(14),
      marginTop: getHeight(68),
      fontFamily: FontName.NewsreaderSemiBold,
      textAlign: 'center',
    },
    description: {
      width: getWidth(264),
      color: WHITE,
      fontSize: getWidth(32),
      marginTop: getHeight(0),
      fontFamily: FontName.NewsreaderRegular,
      textAlign: 'center',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: getHeight(40),
      paddingTop: getHeight(20),
    },
    dot: {
      width: getWidth(10),
      height: getWidth(10),
      borderRadius: getWidth(50),
      marginHorizontal: getWidth(4),
      borderWidth: 1,
      borderColor: WHITE,
    },
  });
};
