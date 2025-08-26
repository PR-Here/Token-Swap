import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Text from './Text';
import { PRIMARY_COLOR, WHITE } from '../constant/colors';
import { getFonts, getHeight, getWidth } from '../utils/size';
import { FontName } from '../constant/fontName';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
  required?: boolean;
  marginTop?: number;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      disabled = false,
      required = false,
      style,
      marginTop,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={[styles.container, { marginTop }]}>
        {/* Label */}
        {label && (
          <Text
            style={[
              styles.label,
              isFocused && styles.focusedLabel,
              error && styles.errorLabel,
              disabled && styles.disabledLabel,
            ]}
          >
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        {/* Input Container */}
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.focusedContainer,
            error && styles.errorContainer,
            disabled && styles.disabledContainer,
          ]}
        >
          {/* Left Icon */}
          {leftIcon && (
            <View style={[styles.leftIconContainer, {}]}>{leftIcon}</View>
          )}

          {/* Text Input */}
          <RNTextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={WHITE}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Helper or Error Text */}
        {(helperText || error) && (
          <Text style={[styles.helperText, error && styles.errorText]}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: getHeight(16),
  },
  label: {
    fontSize: getFonts(14),
    color: WHITE,
    marginBottom: getHeight(8),
  },
  focusedLabel: {
    color: WHITE,
  },
  errorLabel: {
    color: 'red',
  },
  disabledLabel: {
    color: 'grey',
  },
  required: {
    color: 'red',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: getWidth(4),
    backgroundColor: PRIMARY_COLOR,
    height: getHeight(44),
    paddingHorizontal: getWidth(16),
    borderColor: WHITE,
  },
  focusedContainer: {
    borderColor: WHITE,
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  disabledContainer: {
    opacity: 0.6,
    backgroundColor: 'grey',
  },

  input: {
    flex: 1,
    fontSize: getFonts(14),
    color: WHITE,
    height: '100%',
    paddingVertical: 0,
    textAlignVertical: 'center',
    paddingLeft: 0,
    lineHeight: getFonts(16),
    includeFontPadding: false,
    fontFamily: FontName.NewsreaderSemiBold,
  },

  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(12),
    paddingVertical: getHeight(8),
    height: getHeight(36),
    lineHeight: getFonts(16),
    borderRightWidth: 1,
    borderRightColor: PRIMARY_COLOR,
    paddingRight: getWidth(12),
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getWidth(12),
    paddingVertical: getHeight(8),
    height: getHeight(36),
    lineHeight: getFonts(16),
  },

  helperText: {
    fontSize: getFonts(12),
    color: 'grey',
    marginTop: getHeight(6),
    marginLeft: getWidth(4),
  },
  errorText: {
    color: 'red',
  },
});

TextInput.displayName = 'TextInput';

export default TextInput;
