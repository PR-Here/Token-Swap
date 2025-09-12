import { Text } from '@/components';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useCardGestures } from '@/hooks/useCardGestures';
import { useDashboard } from '@/hooks/useDashboard';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const Dashboard = () => {
  const {
    selectedTimeRange,
    chartData,
    handleTimeRangeChange,
    getCurrentPrice,
    getPricePosition,
  } = useDashboard();

  // Animation values
  const [flipValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(1));
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  // Crosshair state
  const [crosshairX, setCrosshairX] = useState<number | null>(null);
  const [crosshairY, setCrosshairY] = useState<number | null>(null);
  const [crosshairPrice, setCrosshairPrice] = useState<number | null>(null);
  const [crosshairDay, setCrosshairDay] = useState<string | null>(null);


  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Custom data point component
  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderWidth: 4,
          borderRadius: 10,
          borderColor: '#8B5CF6',
        }}
      />
    );
  };

  // Custom label component
  const customLabel = (val: string) => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text style={{ color: '#666', fontWeight: 'bold', fontSize: getWidth(10) }}>{val}</Text>
      </View>
    );
  };

  // Line chart data with custom components
  const lineChartData = [
    {
      value: 80,
      labelComponent: () => customLabel('Sun'),
      customDataPoint: customDataPoint,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 90,
      customDataPoint: customDataPoint,
    },
    {
      value: 150,
      hideDataPoint: true,
    },
    {
      value: 510,
      labelComponent: () => customLabel('Thu'),
      customDataPoint: customDataPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: '#8B5CF6',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: '#8B5CF6',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{ color: 'white', fontSize: getWidth(10) }}>$510</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -4,
    },
    {
      value: 130,
      hideDataPoint: true,
    },
    {
      value: 130,
      customDataPoint: customDataPoint,
    },
  ];


  // Data for the 3 chart cards with different tokens
  const cardsData = [
    {
      id: '1',
      token: 'BTC',
      tokenName: 'Bitcoin',
      icon: IMAGES.BITCOIN,
      price: '$51,000',
      change: '+2.5%',
      isLiked: false
    },
    {
      id: '2',
      token: 'ETH',
      tokenName: 'Ethereum',
      icon: IMAGES.ETHERIUM,
      price: '$3,200',
      change: '+1.8%',
      isLiked: true
    },
    {
      id: '3',
      token: 'DOGE',
      tokenName: 'Dogecoin',
      icon: IMAGES.PROVY,
      price: '$0.08',
      change: '-0.5%',
      isLiked: false
    },
  ];

  // Hide crosshair when touch ends
  const handleChartTouchEnd = useCallback(() => {
    setCrosshairX(null);
    setCrosshairY(null);
    setCrosshairPrice(null);
    setCrosshairDay(null);
  }, []);

  const animateCard = useCallback((animationType: string) => {
    // Reset all animations
    Animated.parallel([
      Animated.timing(flipValue, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 0, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
    ]).start();

    switch (animationType) {
      case 'flip':
        Animated.sequence([
          Animated.timing(flipValue, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(flipValue, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
        break;
      case 'save':
        Animated.sequence([
          Animated.timing(scaleValue, { toValue: 1.1, duration: 150, useNativeDriver: true }),
          Animated.timing(scaleValue, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        break;
      case 'buy':
        Animated.sequence([
          Animated.timing(translateX, { toValue: 50, duration: 200, useNativeDriver: true }),
          Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
        break;
      case 'sell':
        Animated.sequence([
          Animated.timing(translateX, { toValue: -50, duration: 200, useNativeDriver: true }),
          Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
        break;
      case 'share':
        Animated.sequence([
          Animated.timing(translateY, { toValue: -30, duration: 200, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
        break;
      case 'skip':
        Animated.sequence([
          Animated.timing(translateY, { toValue: 30, duration: 200, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
        break;
    }
  }, [flipValue, scaleValue, translateX, translateY, opacity]);

  const { gestureHandlers } = useCardGestures({
    onTap: () => {
      console.log('Tap to Flip');
      animateCard('flip');
    },
    onDoubleTap: () => {
      console.log('Double Tap to Save');
      animateCard('save');
    },
    onSwipeRight: () => {
      animateCard('buy');
    },
    onSwipeLeft: () => {
      router.push('/addFund');
      animateCard('sell');
    },
    onSwipeUp: () => {
      console.log('Swipe up to Share');
      animateCard('share');
    },
    onSwipeDown: () => {
      console.log('Swipe down to Skip');
      animateCard('skip');
    },
  });


  const renderChartCard = useCallback(({ item }: { item: any }) => {
    const timeRanges = ['6h', '12h', '24h', '1W', '1M', 'ALL'];
    const priceLevels = [10, 50, 100, 150, 500];

    return (
      <Animated.View
        style={[
          styles.chartCard,
          {
            transform: [
              { scale: scaleValue },
              { translateX: translateX },
              { translateY: translateY },
            ],
            opacity: opacity,
          },
        ]}
        {...gestureHandlers}
      >
        {/* Header */}
        <View style={styles.chartHeader}>
          <View style={styles.tokenInfo}>
            <Image source={item.icon} style={styles.tokenIcon} />
            <Text style={styles.tokenSymbol}>{item.token}</Text>
          </View>
          <TouchableOpacity style={styles.heartButton}>
            <Image
              source={item.isLiked ? IMAGES.FILL_HEART_ICON : IMAGES.HEART_ICON}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Historical Price Action Title */}
        <Text style={styles.historicalTitle}>Historical price action</Text>

        {/* Time Range Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timeRangeContainer}
          contentContainerStyle={styles.timeRangeContent}
        >
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                selectedTimeRange === range && styles.timeRangeButtonActive
              ]}
              onPress={() => handleTimeRangeChange(range)}
            >
              <Text style={[
                styles.timeRangeText,
                selectedTimeRange === range && styles.timeRangeTextActive
              ]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Chart Container */}
        <View style={styles.chartContainer}>
          {/* Y-axis labels */}
          <View style={styles.yAxisContainer}>
            {priceLevels.map((level) => (
              <Text key={level} style={styles.yAxisLabel}>{level}</Text>
            ))}
          </View>

          {/* Chart Area */}
          <View style={styles.chartArea}>
            <TouchableOpacity
              style={styles.chartBackground}
              onPress={handleChartTouchEnd}
              activeOpacity={1}
            >
              <LineChart
                thickness={6}
                color="#8B5CF6"
                maxValue={500}
                noOfSections={10}
                areaChart
                yAxisTextStyle={{ color: '#999' }}
                data={lineChartData}
                curved
                startFillColor={'#8B5CF6'}
                endFillColor={'#8B5CF6'}
                startOpacity={0.4}
                endOpacity={0.4}
                spacing={38}
                backgroundColor="#F8F9FA"
                rulesColor="gray"
                rulesType="solid"
                initialSpacing={10}
                yAxisColor="#E0E0E0"
                xAxisColor="#E0E0E0"
                dataPointsHeight={20}
                dataPointsWidth={20}
                onPress={(item: any, index: number) => {
                  // Handle crosshair on line chart click
                  const chartWidth = getWidth(250);
                  const x = (index / (lineChartData.length - 1)) * chartWidth;
                  const price = item.value;
                  const day = item.labelComponent ? 'Thu' : 'Day ' + (index + 1);

                  setCrosshairX(x);
                  setCrosshairPrice(price);
                  setCrosshairDay(day);

                  // Calculate Y position based on price
                  const chartHeight = getHeight(180);
                  const normalizedPrice = price / 500; // Max value is 500
                  const y = chartHeight - (normalizedPrice * chartHeight);
                  setCrosshairY(y);
                }}
              />
              {/* Crosshair */}
              {crosshairX !== null && crosshairY !== null && (
                <>
                  {/* Vertical crosshair line */}
                  <View
                    style={[
                      styles.crosshairLine,
                      {
                        left: crosshairX,
                        top: 0,
                        height: getHeight(200),
                      },
                    ]}
                  />

                  {/* Horizontal crosshair line */}
                  <View
                    style={[
                      styles.crosshairLine,
                      {
                        left: 0,
                        top: crosshairY,
                        width: getWidth(250),
                        height: 1,
                      },
                    ]}
                  />

                  {/* Crosshair dot */}
                  <View
                    style={[
                      styles.crosshairDot,
                      {
                        left: crosshairX - getWidth(4),
                        top: crosshairY - getWidth(4),
                      },
                    ]}
                  />

                  {/* Crosshair price tooltip */}
                  <View
                    style={[
                      styles.crosshairTooltip,
                      {
                        left: crosshairX + getWidth(10),
                        top: crosshairY - getHeight(20),
                      },
                    ]}
                  >
                    <Text style={styles.crosshairPriceText}>
                      ${Math.round(crosshairPrice || 0)}
                    </Text>
                    <Text style={styles.crosshairDayText}>
                      {crosshairDay}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* X-axis labels */}
        <View style={styles.xAxisContainer}>
          {days.map((day) => (
            <Text key={day} style={styles.xAxisLabel}>{day}</Text>
          ))}
        </View>

      </Animated.View>
    );
  }, [selectedTimeRange, handleTimeRangeChange, scaleValue, translateX, translateY, opacity, gestureHandlers, crosshairX, crosshairY, crosshairPrice, crosshairDay, handleChartTouchEnd, days, lineChartData]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Fixed Goal Card */}
      <View style={styles.goalCard}>
        <Text style={styles.goalLabel}>My Loopin Goal</Text>
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>I want a vineyard</Text>
          <TouchableOpacity>
            <Image source={IMAGES.PENCIL_ICON} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList with 3 chart cards */}
      <FlatList
        data={cardsData}
        renderItem={renderChartCard}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: getWidth(10),
    paddingBottom: getHeight(10),
  },
  goalCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginTop: getHeight(16),
    marginBottom: getHeight(0),
  },
  goalLabel: {
    fontSize: getWidth(14),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: getWidth(24),
    color: BLACK,
    fontFamily: FontName.NewsreaderSemiBold,
    flex: 1,
  },
  editIcon: {
    width: getWidth(20),
    height: getWidth(20),
    tintColor: '#666',
  },
  flatListContent: {
    paddingVertical: getHeight(10),
  },
  separator: {
    height: getHeight(8),
  },
  chartCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginHorizontal: getWidth(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(12),
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: getWidth(24),
    height: getWidth(24),
    marginRight: getWidth(8),
  },
  tokenSymbol: {
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
  },
  heartButton: {
    padding: getWidth(4),
  },
  heartIcon: {
    width: getWidth(20),
    height: getWidth(20),
  },
  historicalTitle: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    marginBottom: getHeight(12),
  },
  timeRangeContainer: {
    marginBottom: getHeight(16),
  },
  timeRangeContent: {
    paddingHorizontal: getWidth(4),
  },
  timeRangeButton: {
    paddingHorizontal: getWidth(12),
    paddingVertical: getHeight(6),
    borderRadius: getWidth(16),
    backgroundColor: '#F5F5F5',
    marginRight: getWidth(6),
    minWidth: getWidth(40),
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  timeRangeText: {
    fontSize: getWidth(10),
    fontFamily: FontName.NewsreaderMedium,
    color: '#666',
  },
  timeRangeTextActive: {
    color: WHITE,
    fontFamily: FontName.NewsreaderBold,
  },
  chartContainer: {
    flexDirection: 'row',
    marginBottom: getHeight(12),
  },
  yAxisContainer: {
    width: getWidth(30),
    justifyContent: 'space-between',
    paddingVertical: getHeight(10),
  },
  yAxisLabel: {
    fontSize: getWidth(10),
    fontFamily: FontName.NewsreaderRegular,
    color: '#999',
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    height: getHeight(200),
  },
  chartBackground: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: getWidth(8),
    position: 'relative',
  },
  priceIndicatorContainer: {
    position: 'absolute',
    right: getWidth(40),
    top: getHeight(20),
    alignItems: 'center',
    height: getHeight(160),
  },
  priceIndicatorLine: {
    width: 1,
    height: getHeight(160),
    backgroundColor: PRIMARY_COLOR,
  },
  priceIndicatorDot: {
    width: getWidth(8),
    height: getWidth(8),
    borderRadius: getWidth(4),
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    position: 'absolute',
    top: getHeight(20),
  },
  priceTooltip: {
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    borderRadius: getWidth(4),
    position: 'absolute',
    top: getHeight(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  priceTooltipText: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(30),
    marginBottom: getHeight(12),
  },
  xAxisLabel: {
    fontSize: getWidth(10),
    fontFamily: FontName.NewsreaderRegular,
    color: '#999',
  },
  crosshairLine: {
    position: 'absolute',
    backgroundColor: '#666',
    opacity: 0.6,
    width: 1,
  },
  crosshairDot: {
    position: 'absolute',
    width: getWidth(8),
    height: getWidth(8),
    borderRadius: getWidth(4),
    backgroundColor: '#666',
    borderWidth: 2,
    borderColor: WHITE,
  },
  crosshairTooltip: {
    position: 'absolute',
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    borderRadius: getWidth(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minWidth: getWidth(60),
  },
  crosshairPriceText: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    textAlign: 'center',
  },
  crosshairDayText: {
    fontSize: getWidth(10),
    fontFamily: FontName.NewsreaderRegular,
    color: '#666',
    textAlign: 'center',
    marginTop: getHeight(2),
  },
  priceCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginTop: getHeight(16),
  },

});

