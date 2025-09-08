import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../../components/Text';
import { PRIMARY_COLOR, WHITE } from '../../constant/colors';
import { FontName } from '../../constant/fontName';
import { getHeight, getWidth } from '../../utils/size';

export default function HeartTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.description}>
          Your favorite investments will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
  },
  title: {
    color: WHITE,
    fontSize: getWidth(24),
    fontFamily: FontName.NewsreaderSemiBold,
    marginBottom: getHeight(16),
  },
  description: {
    color: WHITE,
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'center',
  },
});
