import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Text from '../../components/Text';
import { PRIMARY_COLOR, WHITE, BLACK } from '../../constant/colors';
import { FontName } from '../../constant/fontName';
import { getHeight, getWidth } from '../../utils/size';
import { IMAGES } from '../../utils/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Chart data for different time ranges
  const chartData = {
    '6h': [
      { value: 300, label: '12PM' },
      { value: 450, label: '2PM' },
      { value: 380, label: '4PM' },
      { value: 520, label: '6PM' },
      { value: 480, label: '8PM' },
      { value: 580, label: '10PM' },
      { value: 520, label: '12AM' },
    ],
    '12h': [
      { value: 250, label: '6AM' },
      { value: 380, label: '8AM' },
      { value: 320, label: '10AM' },
      { value: 450, label: '12PM' },
      { value: 520, label: '2PM' },
      { value: 480, label: '4PM' },
      { value: 580, label: '6PM' },
    ],
    '24h': [
      { value: 280, label: 'Sun' },
      { value: 420, label: 'Mon' },
      { value: 350, label: 'Tue' },
      { value: 480, label: 'Wed' },
      { value: 580, label: 'Thu' },
      { value: 520, label: 'Fri' },
      { value: 450, label: 'Sat' },
    ],
    '1W': [
      { value: 200, label: 'Week 1' },
      { value: 350, label: 'Week 2' },
      { value: 280, label: 'Week 3' },
      { value: 420, label: 'Week 4' },
      { value: 380, label: 'Week 5' },
      { value: 520, label: 'Week 6' },
      { value: 580, label: 'Week 7' },
    ],
    '1M': [
      { value: 220, label: 'Jan' },
      { value: 380, label: 'Feb' },
      { value: 320, label: 'Mar' },
      { value: 450, label: 'Apr' },
      { value: 400, label: 'May' },
      { value: 520, label: 'Jun' },
      { value: 580, label: 'Jul' },
    ],
    ALL: [
      { value: 180, label: '2020' },
      { value: 320, label: '2021' },
      { value: 280, label: '2022' },
      { value: 420, label: '2023' },
      { value: 380, label: '2024' },
      { value: 520, label: '2025' },
    ],
  };

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* My Loopin Goal Section */}
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>My Loopin Goal</Text>
          <View style={styles.goalRow}>
            <Text style={styles.goalText}>I want a vineyard</Text>
            <TouchableOpacity>
              <Image source={IMAGES.PENCIL_ICON} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* BTC Historical Price Action Card */}
        <View style={styles.priceCard}>
          {/* BTC Header */}
          <View style={styles.btcHeader}>
            <View style={styles.btcInfo}>
              <Image source={IMAGES.BITCOIN} style={styles.btcIcon} />
              <Text style={styles.btcText}>BTC</Text>
            </View>
            <TouchableOpacity>
              <Image source={IMAGES.HEART_ICON} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.chartTitle}>Historical price action</Text>

          {/* Time Range Options */}
          <View style={styles.timeRangeContainer}>
            {['6h', '12h', '24h', '1W', '1M', 'ALL'].map((time, index) => (
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

          {/* Chart with Graph */}
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData[selectedTimeRange as keyof typeof chartData]}
              width={Dimensions.get('window').width - getWidth(80)}
              height={getHeight(200)}
              color={PRIMARY_COLOR}
              thickness={3}
              startFillColor={PRIMARY_COLOR}
              endFillColor={PRIMARY_COLOR}
              startOpacity={0.1}
              endOpacity={0.1}
              initialSpacing={20}
              endSpacing={10}
              spacing={getWidth(40)}
              hideDataPoints={true}
              hideRules={false}
              rulesType="solid"
              rulesColor="#f0f0f0"
              xAxisLabelsVerticalShift={10}
              yAxisTextStyle={{
                color: '#666',
                fontSize: getWidth(10),
                fontFamily: FontName.NewsreaderRegular,
              }}
              xAxisLabelTextStyle={{
                color: '#666',
                fontSize: getWidth(10),
                fontFamily: FontName.NewsreaderRegular,
              }}
              curved
              isAnimated
              animationDuration={800}
              animateOnDataChange={true}
              animationEasing="easeInOut"
            />
            {/* Price point indicator */}
            <View
              style={[
                styles.pricePoint,
                {
                  top:
                    getHeight(15) +
                    (getHeight(160) -
                      ((chartData[selectedTimeRange as keyof typeof chartData][
                        chartData[selectedTimeRange as keyof typeof chartData]
                          .length - 1
                      ]?.value || 510) /
                        580) *
                        getHeight(160)),
                  right: getWidth(40),
                },
              ]}
            >
              <View style={styles.priceIndicator} />
              <View style={styles.priceBubble}>
                <Text style={styles.priceValue}>
                  $
                  {chartData[selectedTimeRange as keyof typeof chartData][
                    chartData[selectedTimeRange as keyof typeof chartData]
                      .length - 1
                  ]?.value || 510}
                </Text>
              </View>
            </View>
          </View>

          {/* Latest News Section */}
          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Latest news</Text>
            <TouchableOpacity>
              <Text style={styles.newsText}>
                Hong Kong-based MemeStrategy Delves into Solana, Mirrors
                MicroStrategy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Mentions Section */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Social Mentions</Text>
            <View style={styles.socialIcons}>
              {/* Row 1 */}
              <View style={styles.socialRow}>
                <View style={styles.socialItem}>
                  <Image
                    source={IMAGES.TWITTER_ICON}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialCount}>189766</Text>
                </View>
                <View style={styles.socialItem}>
                  <Image source={IMAGES.FB_ICON} style={styles.socialIcon} />
                  <Text style={styles.socialCount}>189766</Text>
                </View>
              </View>
              {/* Row 2 */}
              <View style={styles.socialRow}>
                <View style={styles.socialItem}>
                  <Image source={IMAGES.INSTA_ICON} style={styles.socialIcon} />
                  <Text style={styles.socialCount}>189766</Text>
                </View>
                <View style={styles.socialItem}>
                  <Image
                    source={IMAGES.GOOGLE_ICON}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialCount}>189766</Text>
                </View>
              </View>
              {/* Row 3 */}
              <View style={styles.socialRow}>
                <View style={styles.socialItem}>
                  <View style={styles.tiktokContainer}>
                    <Text style={styles.tiktokText}>TikTok</Text>
                  </View>
                  <Text style={styles.socialCount}>189766</Text>
                </View>
                <View style={styles.socialItem}>
                  {/* Empty space for even layout */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: getWidth(16),
  },
  goalCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginTop: getHeight(16),
    marginBottom: getHeight(16),
  },
  goalLabel: {
    fontSize: getWidth(14),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
    marginBottom: getHeight(8),
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
  priceCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    marginBottom: getHeight(16),
  },
  btcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(16),
  },
  btcInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btcIcon: {
    width: getWidth(24),
    height: getWidth(24),
    marginRight: getWidth(8),
  },
  btcText: {
    fontSize: getWidth(18),
    color: BLACK,
    fontFamily: FontName.NewsreaderSemiBold,
  },
  heartIcon: {
    width: getWidth(20),
    height: getWidth(20),
    tintColor: '#ff6b6b',
  },
  chartTitle: {
    fontSize: getWidth(14),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
    marginBottom: getHeight(16),
  },
  timeRangeContainer: {
    flexDirection: 'row',
    marginBottom: getHeight(24),
    backgroundColor: '#F3F3F3',
    borderRadius: getWidth(8),
    padding: getWidth(4),
    alignSelf: 'center',
  },
  timeOption: {
    paddingHorizontal: getWidth(12),
    paddingVertical: getHeight(6),
    marginRight: getWidth(8),
    borderRadius: getWidth(16),
  },
  activeTimeOption: {
    backgroundColor: PRIMARY_COLOR,
  },
  timeOptionText: {
    fontSize: getWidth(12),
    color: '#666',
    fontFamily: FontName.NewsreaderMedium,
  },
  activeTimeOptionText: {
    color: WHITE,
  },
  chartContainer: {
    position: 'relative',
    marginBottom: getHeight(24),
    alignItems: 'center',
    alignSelf: 'center',
  },
  chart: {
    marginVertical: getHeight(8),
    borderRadius: getWidth(16),
  },
  pricePoint: {
    position: 'absolute',
    top: getHeight(15),
    right: getWidth(40),
    alignItems: 'center',
  },
  priceIndicator: {
    width: getWidth(8),
    height: getWidth(8),
    borderRadius: getWidth(4),
    backgroundColor: WHITE,
    borderWidth: getWidth(2),
    borderColor: PRIMARY_COLOR,
  },
  priceBubble: {
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    borderRadius: getWidth(8),
    marginTop: getHeight(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceValue: {
    fontSize: getWidth(12),
    color: BLACK,
    fontFamily: FontName.NewsreaderSemiBold,
  },

  newsSection: {
    marginBottom: getHeight(20),
  },
  sectionTitle: {
    fontSize: getWidth(14),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
    marginBottom: getHeight(8),
  },
  newsText: {
    fontSize: getWidth(14),
    color: BLACK,
    fontFamily: FontName.NewsreaderMedium,
    textDecorationLine: 'underline',
    lineHeight: getHeight(20),
  },
  socialSection: {
    marginBottom: getHeight(16),
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: getHeight(4),
  },
  socialIcon: {
    width: getWidth(20),
    height: getWidth(20),
    marginRight: getWidth(8),
  },
  tiktokContainer: {
    width: getWidth(20),
    height: getWidth(20),
    backgroundColor: '#000',
    borderRadius: getWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(8),
  },
  tiktokText: {
    fontSize: getWidth(8),
    color: WHITE,
    fontFamily: FontName.NewsreaderMedium,
  },
  socialCount: {
    fontSize: getWidth(10),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
  },
  socialRow: {
  },
});
