import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Text from '../../../components/Text';
import { getHeight, getWidth } from '../../../utils/size';
import { PRIMARY_COLOR, WHITE } from '../../../constant/colors';
import { FontName } from '../../../constant/fontName';

interface SkipButtonProps {
  onPress: () => void;
  currentIndex: number;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onPress, currentIndex }) => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate button sliding from bottom right to top
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  // Hide button on last screen
  if (currentIndex === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.skipText}>→</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: getHeight(50),
    right: getWidth(20),
    zIndex: 10,
  },
  button: {
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(99),
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skipText: {
    color: WHITE,
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderMedium,
    fontWeight:'bold',
    textAlign:'center'
  },

});
