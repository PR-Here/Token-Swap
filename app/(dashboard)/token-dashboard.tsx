import { RatingStars, Text } from '@/components';
import EyeHeartHeader from '@/components/eyeHeartHeader';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const TokenDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isLiked, setIsLiked] = useState(true);

  const handleTimeRangeChange = useCallback((timeRange: string) => {
    setSelectedTimeRange(timeRange);
  }, []);

  const handleHeartPress = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);



  // Create cards data
  const flatListData = [
    {
      id: 'tokenDashboard',
      type: 'dashboard',
      data: {
        header: {
          type: 'header',
          data: null,
        },
        price: {
          type: 'price',
          data: null,
        },
        timeRange: {
          type: 'timeRange',
          data: null,
        },
        opportunity: {
          type: 'section',
          data: {
            title: 'Opportunity',
            content: ['Price doubled.', 'Opportunity missed to make 2X.'],
          },
        },
        popularity: {
          type: 'section',
          data: {
            title: 'Popularity',
            content: ['20000 people are buying and selling BTC at 4 Billion.'],
          },
        },
        credibility: {
          type: 'credibility',
          data: {
            title: 'Credibility',
            rating: 2.4,
          },
        },
        founded: {
          type: 'founded',
          data: {
            title: 'Founded by',
            founder: 'Satoshi Nakamoto',
          },
        },
      },
    },
    {
      id: 'ethereum',
      type: 'dashboard',
      data: {
        header: {
          type: 'header',
          data: null,
        },
        price: {
          type: 'price',
          data: null,
        },
        timeRange: {
          type: 'timeRange',
          data: null,
        },
        opportunity: {
          type: 'section',
          data: {
            title: 'Opportunity',
            content: ['Price increased 150%.', 'Strong growth potential in DeFi ecosystem.'],
          },
        },
        popularity: {
          type: 'section',
          data: {
            title: 'Popularity',
            content: ['15000 people are trading ETH at 2.5 Billion.'],
          },
        },
        credibility: {
          type: 'credibility',
          data: {
            title: 'Credibility',
            rating: 4.8,
          },
        },
        founded: {
          type: 'founded',
          data: {
            title: 'Founded by',
            founder: 'Vitalik Buterin',
          },
        },
      },
    },
    {
      id: 'dogecoin',
      type: 'dashboard',
      data: {
        header: {
          type: 'header',
          data: null,
        },
        price: {
          type: 'price',
          data: null,
        },
        timeRange: {
          type: 'timeRange',
          data: null,
        },
        opportunity: {
          type: 'section',
          data: {
            title: 'Opportunity',
            content: ['Community-driven growth.', 'Meme coin with strong following.'],
          },
        },
        popularity: {
          type: 'section',
          data: {
            title: 'Popularity',
            content: ['25000 people are trading DOGE at 1.8 Billion.'],
          },
        },
        credibility: {
          type: 'credibility',
          data: {
            title: 'Credibility',
            rating: 3.9,
          },
        },
        founded: {
          type: 'founded',
          data: {
            title: 'Founded by',
            founder: 'Billy Markus & Jackson Palmer',
          },
        },
      },
    },
  ];

  const getTokenInfo = useCallback((tokenId: string) => {
    switch (tokenId) {
      case 'ethereum':
        return {
          icon: IMAGES.ETHERIUM,
          symbol: 'ETH',
          price: '$3,456.78'
        };
      case 'dogecoin':
        return {
          icon: IMAGES.BITCOIN, // Using Bitcoin icon as placeholder for DOGE
          symbol: 'DOGE',
          price: '$0.0845'
        };
      default: // bitcoin
        return {
          icon: IMAGES.BITCOIN,
          symbol: 'BTC',
          price: '$106,996.3'
        };
    }
  }, []);

  const renderDashboard = useCallback((data: any, tokenId: string) => {
    const tokenInfo = getTokenInfo(tokenId);

    return (
      <View style={styles.whiteCardContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.tokenInfo}>
            <Image source={tokenInfo.icon} style={styles.tokenIcon} />
            <Text style={styles.tokenSymbol}>{tokenInfo.symbol}</Text>
          </View>
          <TouchableOpacity onPress={handleHeartPress} style={styles.heartButton}>
            <Image
              source={isLiked ? IMAGES.FILL_HEART_ICON : IMAGES.HEART_ICON}
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Price */}
        <Text style={styles.price}>{tokenInfo.price}</Text>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {['6h', '12h', '24h', '1W', '1M'].map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                time === selectedTimeRange && styles.activeTimeOption,
              ]}
              onPress={() => handleTimeRangeChange(time)}
            >
              <Text
                style={[
                  styles.timeOptionText,
                  time === selectedTimeRange && styles.activeTimeOptionText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Opportunity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.opportunity.data.title}</Text>
          {data.opportunity.data.content.map((text: string, index: number) => (
            <Text key={index} style={styles.sectionText}>
              {text}
            </Text>
          ))}
        </View>

        {/* Popularity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.popularity.data.title}</Text>
          {data.popularity.data.content.map((text: string, index: number) => (
            <Text key={index} style={styles.sectionText}>
              {text}
            </Text>
          ))}
        </View>

        {/* Credibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.credibility.data.title}</Text>
          <RatingStars rating={data.credibility.data.rating} size={16} />
        </View>

        {/* Founded by Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.founded.data.title}</Text>
          <Text style={styles.founderText}>{data.founded.data.founder}</Text>
        </View>
      </View>
    );
  }, [getTokenInfo, handleHeartPress, isLiked, selectedTimeRange, handleTimeRangeChange]);

  const renderCard = useCallback((data: any) => (
    <View style={styles.whiteCardContainer}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Image source={data.header.data.icon} style={styles.cardIcon} />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{data.header.data.title}</Text>
          <Text style={styles.cardSubtitle}>{data.header.data.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={handleHeartPress} style={styles.cardHeart}>
          <Image
            source={isLiked ? IMAGES.FILL_HEART_ICON : IMAGES.HEART_ICON}
            style={styles.heartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.cardContent}>{data.content.data.text}</Text>

      {/* Features */}
      <View style={styles.cardFeatures}>
        <Text style={styles.cardFeaturesTitle}>{data.features.data.title}</Text>
        {data.features.data.items.map((item: string, index: number) => (
          <Text key={index} style={styles.cardFeatureItem}>
            • {item}
          </Text>
        ))}
      </View>

      {/* Action */}
      <View style={styles.cardAction}>
        <Text style={styles.cardActionTitle}>{data.action.data.title}</Text>
        <Text style={styles.cardActionDescription}>{data.action.data.description}</Text>
      </View>
    </View>
  ), [handleHeartPress, isLiked]);

  const renderFlatListItem = useCallback(({ item }: { item: any }) => {
    switch (item.type) {
      case 'dashboard':
        return renderDashboard(item.data, item.id);
      case 'card':
        return renderCard(item.data);
      default:
        return null;
    }
  }, [renderDashboard, renderCard]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <EyeHeartHeader />
      {/* Main Content */}
      <View style={styles.mainContent}>

        <FlatList
          data={flatListData}
          renderItem={renderFlatListItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          pagingEnabled={true}
          snapToInterval={getHeight(560)}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>

      {/* Blue Sidebar */}
      <View style={styles.blueSidebar} />
    </SafeAreaView>
  );
};

export default TokenDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: getWidth(10),
    paddingTop: getHeight(0), // Remove top padding to let FlatList handle spacing
  },
  flatListContent: {
    paddingTop: getHeight(20), // Space for header
    paddingBottom: getHeight(20),
  },
  whiteCardContainer: {
    backgroundColor: WHITE,
    borderRadius: getWidth(8),
    padding: getWidth(20),
    marginVertical: getHeight(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(0),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: getWidth(16),
    height: getWidth(16),
    marginRight: getWidth(2),
  },
  tokenSymbol: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
  },
  heartButton: {
    padding: getWidth(8),
  },
  heartIcon: {
    width: getWidth(24),
    height: getWidth(24),
  },
  price: {
    fontSize: getWidth(24),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    marginBottom: getHeight(20),
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: getWidth(8),
    padding: getWidth(4),
    marginBottom: getHeight(30),
  },
  timeOption: {
    flex: 1,
    paddingVertical: getHeight(8),
    alignItems: 'center',
    borderRadius: getWidth(6),
  },
  activeTimeOption: {
    backgroundColor: PRIMARY_COLOR,
  },
  timeOptionText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderMedium,
    color: '#666',
  },
  activeTimeOptionText: {
    color: WHITE,
  },
  section: {
    marginBottom: getHeight(24),
  },
  sectionTitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderMedium,
    color: '#999',
    marginBottom: getHeight(8),
  },
  sectionText: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: BLACK,
    lineHeight: getHeight(22),
  },
  founderText: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: BLACK,
    textDecorationLine: 'underline',
  },
  cubeSection: {
    marginTop: getHeight(30),
    flex: 1,
  },
  cubeSectionTitle: {
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    marginBottom: getHeight(16),
  },
  cubeListContent: {
    paddingBottom: getHeight(20),
  },
  cubeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: getWidth(12),
    marginBottom: getHeight(12),
    padding: getWidth(16),
  },
  cubeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cubeCardIcon: {
    width: getWidth(32),
    height: getWidth(32),
    marginRight: getWidth(12),
  },
  cubeCardText: {
    flex: 1,
  },
  cubeCardTitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    marginBottom: getHeight(2),
  },
  cubeCardSubtitle: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    color: PRIMARY_COLOR,
    marginBottom: getHeight(4),
  },
  cubeCardDescription: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    lineHeight: getHeight(16),
  },
  cubeCardHeart: {
    padding: getWidth(8),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(12),
  },
  cardIcon: {
    width: getWidth(32),
    height: getWidth(32),
    marginRight: getWidth(12),
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    marginBottom: getHeight(4),
  },
  cardSubtitle: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    color: PRIMARY_COLOR,
  },
  cardContent: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    lineHeight: getHeight(20),
  },
  cardHeart: {
    padding: getWidth(8),
  },
  cardFeatures: {
    marginTop: getHeight(16),
    marginBottom: getHeight(12),
  },
  cardFeaturesTitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderSemiBold,
    color: BLACK,
    marginBottom: getHeight(8),
  },
  cardFeatureItem: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    marginBottom: getHeight(4),
    lineHeight: getHeight(18),
  },
  cardAction: {
    marginTop: getHeight(12),
    paddingTop: getHeight(12),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cardActionTitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderBold,
    color: PRIMARY_COLOR,
    marginBottom: getHeight(4),
  },
  cardActionDescription: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    lineHeight: getHeight(18),
  },
  blueSidebar: {
    width: getWidth(8),
    backgroundColor: PRIMARY_COLOR,
  },
});