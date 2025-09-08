import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { getFonts } from '../utils/size';
import { BLACK, PRIMARY_COLOR } from '../constant/colors';
import { FontName } from '../constant/fontName';

export interface TextProps extends RNTextProps {
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  color = PRIMARY_COLOR,
  align = 'left',
  fontSize,
  style,
  children,
  ...props
}) => {

  const textStyle = [
    styles.base,
    {
      color,
      textAlign: align,
      ...(fontSize && { fontSize: getFonts(fontSize) }),
    },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: FontName.NewsreaderMedium,
    fontSize: getFonts(14),
    color: BLACK,
  },
});

export default Text; 