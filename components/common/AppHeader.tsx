import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color={WHITE} />
        <Text style={styles.backText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(16),
    backgroundColor: PRIMARY_COLOR,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
    marginLeft: getWidth(2),
    marginBottom: getHeight(2),
  },
});
