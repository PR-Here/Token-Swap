import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ChatTab() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.description}>
        Chat functionality will be implemented here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
