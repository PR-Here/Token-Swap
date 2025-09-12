import { Text } from '@/components';
import EyeHeartHeader from '@/components/eyeHeartHeader';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const savedTokensData = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: IMAGES.BITCOIN,
    isSaved: true
  },
  {
    id: '2',
    symbol: 'CUBE',
    name: 'Cube',
    icon: IMAGES.BUNGEE, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '3',
    symbol: 'BORA',
    name: 'Bora',
    icon: IMAGES.PROVY, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '4',
    symbol: 'ROSE',
    name: 'Rose',
    icon: IMAGES.HEART_ICON, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '5',
    symbol: 'ZEON',
    name: 'Zeon',
    icon: IMAGES.KEY_ICON, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '6',
    symbol: 'EXRD',
    name: 'Exrd',
    icon: IMAGES.RATING_ICON, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '7',
    symbol: 'LON',
    name: 'Lon',
    icon: IMAGES.PENCIL_ICON, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '8',
    symbol: 'WNXM',
    name: 'Wnxm',
    icon: IMAGES.CHAT_ICON, // Using available image as placeholder
    isSaved: true
  },
  {
    id: '9',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: IMAGES.ETHERIUM,
    isSaved: true
  },
  {
    id: '10',
    symbol: 'GEMINI',
    name: 'Gemini',
    icon: IMAGES.APPLOGO, // Using available image as placeholder
    isSaved: true
  }
];

export default function HeartTab() {
  const router = useRouter();
  const [savedTokens, setSavedTokens] = useState(savedTokensData);
  const [likedTokens, setLikedTokens] = useState<Set<string>>(new Set(savedTokensData.map(token => token.id)));

  const handleHeartPress = useCallback((tokenId: string) => {
    setLikedTokens(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(tokenId)) {
        newLiked.delete(tokenId);
      } else {
        newLiked.add(tokenId);
      }
      return newLiked;
    });
  }, []);

  const handleTokenPress = useCallback((token: any) => {
    router.push('/(dashboard)/token-dashboard');
  }, [router]);

  const renderTokenItem = useCallback(({ item }: { item: any }) => {
    const isLiked = likedTokens.has(item.id);

    return (
      <TouchableOpacity
        style={styles.tokenItem}
        activeOpacity={0.7}
        onPress={() => handleTokenPress(item)}
      >
        <View style={styles.tokenIconContainer}>
          <Image source={item.icon} style={styles.tokenIcon} resizeMode="contain" />
        </View>
        <Text style={styles.tokenSymbol}>{item.symbol}</Text>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => handleHeartPress(item.id)}
        >
          <Image
            source={isLiked ? IMAGES.FILL_HEART_ICON : IMAGES.HEART_ICON}
            style={styles.heartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, [likedTokens, handleHeartPress, handleTokenPress]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />

      {/* Header */}
      <EyeHeartHeader />

      {/* Tokens List */}
      <FlatList
        style={styles.tokensList}
        data={savedTokens}
        renderItem={renderTokenItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tokensContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },

  tokensList: {
    flex: 1,
  },
  tokensContent: {
    paddingHorizontal: getWidth(16),
    paddingBottom: getHeight(20), // Space for bottom navigation
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(16),
    marginBottom: getHeight(8),
    borderRadius: getWidth(4),
  },
  tokenIconContainer: {
    width: getWidth(32),
    height: getWidth(48),
    borderRadius: getWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIcon: {
    width: getWidth(16),
    height: getWidth(16),
  },
  tokenSymbol: {
    flex: 1,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: BLACK,
  },
  heartButton: {
    padding: getWidth(4),
  },
  heartIcon: {
    width: getWidth(20),
    height: getWidth(18),
  },
});
