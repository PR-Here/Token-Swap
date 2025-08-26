import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '../../components/Text';
import RatingStars from '../../components/RatingStars';
import { PRIMARY_COLOR, WHITE, BLACK } from '../../constant/colors';
import { FontName } from '../../constant/fontName';
import { getHeight, getWidth } from '../../utils/size';
import { IMAGES } from '../../utils/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuestDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

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

        {/* BTC Card */}
        <View style={styles.btcCard}>
          {/* BTC Header */}
          <View style={styles.btcHeader}>
            <View style={styles.btcInfo}>
              <View style={styles.btcIconContainer}>
                <Text style={styles.btcIconText}>B</Text>
              </View>
              <Text style={styles.btcText}>BTC</Text>
            </View>
            <TouchableOpacity>
              <Image source={IMAGES.HEART_ICON} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>

          {/* Current Price */}
          <Text style={styles.currentPrice}>$106,996.3</Text>

          {/* Time Range Options */}
          <View style={styles.timeRangeContainer}>
            {['6h', '12h', '24h', '1W', '1M'].map((time, index) => (
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
            <Text style={styles.sectionTitle}>Opportunity</Text>
            <Text style={styles.sectionText}>Price doubled.</Text>
            <Text style={styles.sectionText}>
              Opportunity missed to make 2X.
            </Text>
          </View>

          {/* Popularity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popularity</Text>
            <Text style={styles.sectionText}>
              20000 people are buying and selling BTC at 4 Billion
            </Text>
          </View>

          {/* Credibility Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Credibility</Text>
            <RatingStars rating={4} size={20} />
          </View>

          {/* Founded by Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Founded by</Text>
            <TouchableOpacity>
              <Text style={styles.founderText}>Satoshi Nakamoto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuestDashboard;

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
  btcCard: {
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
  btcIconContainer: {
    width: getWidth(24),
    height: getWidth(24),
    borderRadius: getWidth(12),
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(8),
  },
  btcIconText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderBold,
  },
  btcText: {
    fontSize: getWidth(18),
    color: BLACK,
    fontFamily: FontName.NewsreaderSemiBold,
  },
  heartIcon: {
    width: getWidth(20),
    height: getWidth(20),
    tintColor: '#ccc',
  },
  currentPrice: {
    fontSize: getWidth(32),
    color: BLACK,
    fontFamily: FontName.NewsreaderBold,
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
  section: {
    marginBottom: getHeight(20),
  },
  sectionTitle: {
    fontSize: getWidth(14),
    color: '#666',
    fontFamily: FontName.NewsreaderRegular,
    marginBottom: getHeight(8),
  },
  sectionText: {
    fontSize: getWidth(14),
    color: BLACK,
    fontFamily: FontName.NewsreaderRegular,
    lineHeight: getHeight(20),
  },
  founderText: {
    fontSize: getWidth(14),
    color: BLACK,
    fontFamily: FontName.NewsreaderMedium,
    textDecorationLine: 'underline',
  },
});
