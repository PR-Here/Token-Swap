import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { PRIMARY_COLOR, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { getHeight, getWidth } from '../utils/size';
import Text from './Text';

export enum ToastIconType {
  EXPO = 'expo',
  IMAGE = 'image',
}

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
  icon?: {
    type: ToastIconType;
    name?: string;
    source?: any;
    size?: number;
    color?: string;
  };
}

const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  onHide,
  duration = 3000,
  icon = {
    type: ToastIconType.EXPO,
    name: 'checkmark',
    size: 14,
    color: PRIMARY_COLOR
  }
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, [fadeAnim, slideAnim, onHide]);

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, fadeAnim, slideAnim, hideToast]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.toast}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            {icon.type === ToastIconType.EXPO ? (
              <Ionicons 
                name={icon.name as any} 
                size={getWidth(icon.size || 14)} 
                color={icon.color || PRIMARY_COLOR} 
              />
            ) : (
              <Image 
                source={icon.source} 
                style={{
                  width: getWidth(icon.size || 14),
                  height: getWidth(icon.size || 14),
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: getHeight(60),
    left: getWidth(20),
    right: getWidth(20),
    zIndex: 1000,
  },
  toast: {
    backgroundColor: 'rgba(238, 238, 238, 1)',
    borderRadius: getWidth(6),
    padding: getWidth(1),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: getWidth(12),
    backgroundColor: PRIMARY_COLOR,
    borderRadius: getWidth(8),
    width: getWidth(36),
    height: getWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: getWidth(19),
    height: getWidth(19),
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidth(99),
  },
  message: {
    color: '#333',
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    flex: 1,
    lineHeight: getHeight(20),
  },
});

export default Toast;
