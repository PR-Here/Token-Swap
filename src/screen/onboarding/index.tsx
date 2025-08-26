import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Text from '../../components/Text';
import { IMAGES } from '../../utils/images';
import { getHeight, getWidth } from '../../utils/size';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontName } from '../../constant/fontName';
import OnBordingOne from './components/onBordingOne';
import OnBoardingTwo from './components/onBoardingTwo';
import SkipButton from './components/skipButton';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../constant/screenName';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackParamList';
import useOnBoarding from './useOnBoarding';

const Onboarding = () => {
  const {
    onboardingData,
    currentIndex,
    scrollViewRef,
    handleScroll,
    handleSkip,
    screenWidth,
  } = useOnBoarding();

  const styles = useStyles(screenWidth);

  const renderOnboardingScreen = useCallback((item: any, index: number) => {
    return index === 0 ? <OnBordingOne /> : <OnBoardingTwo />;
  }, []);

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex
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
          renderOnboardingScreen(item, index),
        )}
      </ScrollView>
      {renderDots()}
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
