import { Text } from '@/components';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const allMessageData = [
  {
    id: '1',
    type: 'profit-alert',
    title: 'Profit Alert',
    body: 'Your XRP position gained 8% after a $150M withdrawal from Binance sparked bullish sentiment.',
    timestamp: '2 mins ago',
    hasLike: true
  },
  {
    id: '2',
    type: 'portfolio-snapshot',
    title: 'Portfolio Snapshot',
    body: 'Your assets are up 5.2% this week, driven by SOL\'s 15% rally on whale accumulation. Keep Loopin.',
    timestamp: '2 mins ago',
    hasLike: true
  },
  {
    id: '3',
    type: 'diversification',
    title: 'Abin\'s Diversification',
    body: 'Abin added 200 DOT to their portfolio, betting on Polkadot\'s cross-chain momentum.',
    timestamp: '2 mins ago',
    hasLike: true
  },
  {
    id: '4',
    type: 'btc-hold',
    title: 'Rainy\'s BTC Hold',
    body: 'Rainy\'s Bitcoin stack grew 6% this month, sticking to his HODL strategy. Solid.',
    timestamp: '2 mins ago',
    hasLike: true
  },
  {
    id: '5',
    type: 'market-update',
    title: 'Market Update',
    body: 'Ethereum 2.0 staking rewards hit a new high of 5.2% APY, attracting more institutional investors.',
    timestamp: '5 mins ago',
    hasLike: true
  },
  {
    id: '6',
    type: 'defi-alert',
    title: 'DeFi Alert',
    body: 'Uniswap V3 liquidity pools are showing increased activity with $2B+ in daily volume.',
    timestamp: '8 mins ago',
    hasLike: true
  },
  {
    id: '7',
    type: 'nft-trend',
    title: 'NFT Trend',
    body: 'Bored Ape floor price increased 15% this week as celebrity endorsements continue.',
    timestamp: '12 mins ago',
    hasLike: true
  },
  {
    id: '8',
    type: 'regulation-update',
    title: 'Regulation Update',
    body: 'SEC approves first Bitcoin ETF, marking a major milestone for crypto adoption.',
    timestamp: '15 mins ago',
    hasLike: true
  },
  {
    id: '9',
    type: 'whale-movement',
    title: 'Whale Movement',
    body: 'Large Bitcoin holder transferred 1,000 BTC to cold storage, reducing circulating supply.',
    timestamp: '20 mins ago',
    hasLike: true
  },
  {
    id: '10',
    type: 'altcoin-rally',
    title: 'Altcoin Rally',
    body: 'Cardano (ADA) surged 12% following successful smart contract deployment on mainnet.',
    timestamp: '25 mins ago',
    hasLike: true
  },
  {
    id: '11',
    type: 'yield-farming',
    title: 'Yield Farming',
    body: 'New DeFi protocol offers 300% APY on stablecoin pairs, attracting yield farmers.',
    timestamp: '30 mins ago',
    hasLike: true
  },
  {
    id: '12',
    type: 'institutional-adoption',
    title: 'Institutional Adoption',
    body: 'Tesla announces $1.5B Bitcoin purchase, signaling continued corporate adoption.',
    timestamp: '35 mins ago',
    hasLike: true
  }
];

export default function MessageTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [likedMessages, setLikedMessages] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;

  // Load initial messages
  useEffect(() => {
    loadMessages(1);
  }, []);

  const loadMessages = useCallback((page: number) => {
    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newMessages = allMessageData.slice(startIndex, endIndex);

      if (page === 1) {
        setMessages(newMessages);
      } else {
        setMessages(prev => [...prev, ...newMessages]);
      }

      setCurrentPage(page);
      setHasMoreData(endIndex < allMessageData.length);
      setIsLoadingMore(false);
    }, 1000);
  }, []);

  const loadMoreMessages = useCallback(() => {
    if (!isLoadingMore && hasMoreData) {
      loadMessages(currentPage + 1);
    }
  }, [isLoadingMore, hasMoreData, currentPage, loadMessages]);

  const handleLikePress = useCallback((messageId: string) => {
    setLikedMessages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(messageId)) {
        newLiked.delete(messageId);
      } else {
        newLiked.add(messageId);
      }
      return newLiked;
    });
  }, []);

  const renderMessageItem = useCallback(({ item }: { item: any }) => {
    const isLiked = likedMessages.has(item.id);

    return (
      <TouchableOpacity style={styles.messageCard} activeOpacity={1}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageTitle}>{item.title}</Text>
        </View>

        <View style={styles.messageBody}>
          <Text style={styles.messageText}>{item.body}</Text>
        </View>

        <View style={styles.messageFooter}>
          <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
          {item.hasLike && (
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLikePress(item.id)}
            >
              <Image
                source={isLiked ? IMAGES.THUMBS_UP_BLACK : IMAGES.THUMBS_UP_GREY}
                resizeMode='contain'
                style={styles.likeButtonImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [likedMessages, handleLikePress]);

  const keyExtractor = useCallback((item: any) => item.id, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />

      {/* News Flash Card */}
      <View style={styles.newsFlashCard}>
        <View style={styles.newsFlashContent}>
          <Text style={styles.newsFlashLabel}>News Flash</Text>
          <Text style={styles.newsFlashTitle}>{`See how everyone else\nis Loopin`}</Text>
        </View>
        <Image source={IMAGES.NEWS_PERSON} resizeMode='contain' style={styles.newsPersonImage} />
      </View>

      {/* Messages List */}
      <FlatList
        style={styles.messagesContainer}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading more messages...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  newsFlashCard: {
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: getWidth(16),
    marginTop: getHeight(40),
    marginBottom: getHeight(16),
    paddingVertical: getHeight(16),
    borderRadius: getWidth(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: WHITE,
    height: getHeight(100),
    zIndex: 2,
  },
  newsFlashContent: {
    flex: 1,
    marginLeft: getWidth(12),
  },
  newsFlashLabel: {
    fontSize: getWidth(12),
    color: WHITE,
    fontFamily: FontName.NewsreaderRegular,
    opacity: 0.8,
    marginBottom: getHeight(4),
  },
  newsFlashTitle: {
    fontSize: getWidth(16),
    color: WHITE,
    fontFamily: FontName.NewsreaderSemiBold,
    lineHeight: getHeight(20),
  },
  newsPersonImage: {
    width: getWidth(132),
    height: getWidth(94),
    zIndex: 1,
    alignSelf: 'center',
    marginRight: getWidth(-3),
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: getWidth(16),
    paddingBottom: getHeight(20), // Space for bottom navigation
  },
  messageCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
    marginBottom: getHeight(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageHeader: {
    marginBottom: getHeight(8),
  },
  messageTitle: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
  },
  messageBody: {
    marginBottom: getHeight(8),
  },
  messageText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: BLACK,
    lineHeight: getHeight(20),
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageTimestamp: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    color: '#AFAFAF',
  },
  likeButton: {
    padding: getWidth(4),
  },
  likeButtonImage: {
    width: getWidth(14),
    height: getWidth(14),
  },
  loadingContainer: {
    paddingVertical: getHeight(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    opacity: 0.7,
  },
});
