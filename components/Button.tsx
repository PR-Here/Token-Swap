import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Text from './Text';
import { getFonts, getHeight, getWidth } from '../utils/size';
import { BLACK, PRIMARY_COLOR, WHITE } from '../constant/colors';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  DANGER = 'danger',
}
export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  loading = false,
  disabled = false,
  title,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = false,
  style,
  ...props
}) => {
  const getVariantStyle = (): { button: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case ButtonVariant.PRIMARY:
        return {
          button: {
            backgroundColor: BLACK,
            borderColor: PRIMARY_COLOR,
          },
          text: {
            color: WHITE,
            
          },
        };
      default:
        return {
          button: {
            backgroundColor: PRIMARY_COLOR,
            borderColor: PRIMARY_COLOR,
          },
          text: {
            color: WHITE,
          },
        };
    }
  };

  const getSizeStyle = (): { button: ViewStyle; text: TextStyle } => {
    switch (size) {
      case ButtonSize.SMALL:
        return {
          button: {
            paddingHorizontal: getWidth(16),
            paddingVertical: getHeight(8),
            minHeight: getHeight(36),
          },
          text: {
            fontSize: getFonts(14),
          },
        };
      case ButtonSize.MEDIUM:
        return {
          button: {
            paddingHorizontal: getWidth(24),
            paddingVertical: getHeight(12),
            minHeight: getHeight(48),
          },
          text: {
            fontSize: getFonts(16),
          },
        };
      case ButtonSize.LARGE:
        return {
          button: {
            paddingHorizontal: getWidth(32),
            paddingVertical: getHeight(16),
            minHeight: getHeight(56),
          },
          text: {
            fontSize: getFonts(18),
          },
        };
      default:
        return {
          button: {
            paddingHorizontal: getWidth(24),
            paddingVertical: getHeight(12),
            minHeight: getHeight(48),
          },
          text: {
            fontSize: getFonts(16),
          },
        };
    }
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = getSizeStyle();
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.base,
    variantStyle.button,
    sizeStyle.button,
    {
      borderRadius: rounded ? getWidth(50) : getWidth(8),
      opacity: isDisabled ? 0.6 : 1,
    },
    style,
  ];

  const textStyle = [
    variantStyle.text,
    sizeStyle.text,
  ];

  return (
    <TouchableOpacity
      style={[buttonStyle, fullWidth && { width: '100%' }]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyle.text.color}
        />
      ) : (
        <>
          {leftIcon && leftIcon}
          <Text style={[textStyle, { flex: 1, textAlign: 'center' }]} align="center">
            {title}
          </Text>
          {rightIcon && rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Button; 