import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { getHeight, getWidth } from '../utils/size';
import { WHITE, PRIMARY_COLOR } from '../constant/colors';
import { FontName } from '../constant/fontName';

interface TermsAcceptanceProps {
  onAccept: (accepted: boolean) => void;
  isAccepted?: boolean;
}

const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({
  onAccept,
  isAccepted = false,
}) => {
  const [accepted, setAccepted] = useState(isAccepted);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          By continuing, I accept the{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default TermsAcceptance;

const styles = StyleSheet.create({
  container: {
    marginVertical: getHeight(32),
    paddingHorizontal: getWidth(10),
    minHeight: getHeight(50),
  },
  textContainer: {
    width: '100%',
    minHeight: getHeight(40),
  },
  text: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    lineHeight: getHeight(24),
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  link: {
    color: WHITE,
    fontFamily: FontName.NewsreaderSemiBold,
    textDecorationLine: 'underline',
    fontSize: getWidth(12),
  },
});
