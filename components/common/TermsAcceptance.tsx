import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';

interface TermsAcceptanceProps {
  onAccept?: (accepted: boolean) => void;
  initialValue?: boolean;
}

const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({
  onAccept,
  initialValue = false,
}) => {
  const [accepted, setAccepted] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !accepted;
    setAccepted(newValue);
    onAccept?.(newValue);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
        {accepted && (
          <Ionicons name="checkmark" size={getWidth(16)} color={WHITE} />
        )}
      </View>
      <Text style={styles.text}>
        I agree to the{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default TermsAcceptance;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: getHeight(16),
  },
  checkbox: {
    width: getWidth(20),
    height: getWidth(20),
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: getWidth(4),
    marginRight: getWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  text: {
    flex: 1,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    lineHeight: getHeight(20),
  },
  link: {
    color: PRIMARY_COLOR,
    textDecorationLine: 'underline',
  },
});
