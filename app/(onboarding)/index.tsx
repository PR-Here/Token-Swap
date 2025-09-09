import { OnBoardingOne, OnBoardingTwo } from '@/components';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import useOnBoarding from '@/hooks/useOnBoarding';
import { getHeight, getWidth } from '@/utils/size';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from '../(auth)/login';

const Onboarding = () => {
  const {
    currentIndex,
    screenWidth,
    scrollViewRef,
    onboardingData,
    handleScroll,
    renderDots,
  } = useOnBoarding();

  const styles = useStyles(screenWidth);
  const dotsHeightAnim = useRef(new Animated.Value(getHeight(60))).current;

  useEffect(() => {
    Animated.timing(dotsHeightAnim, {
      toValue: currentIndex === 2 ? 0 : getHeight(60),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, dotsHeightAnim]);

  const renderOnboardingScreenComponent = useCallback((item: any, index: number) => {
    if (index === 0) return <OnBoardingOne />;
    if (index === 1) return <OnBoardingTwo />;
    return (
      <View style={{ width: screenWidth }}>
        <Login />
      </View>
    );
  }, [screenWidth]);

  const renderDotsComponent = () => {
    return (
      <Animated.View style={[
        styles.dotsContainer,
        { 
          height: dotsHeightAnim, 
          overflow: 'hidden',
          paddingBottom: currentIndex === 2 ? 0 : getHeight(40),
          paddingTop: currentIndex === 2 ? 0 : getHeight(20),
        }
      ]}>
        {currentIndex !== 2 && renderDots().map((dot) => (
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
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
      flex: 1,
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
