import { RatingStars, Text } from '@/components';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuestDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to Loopin</Text>
          <Text style={styles.headerSubtitle}>
            Explore our platform and discover investment opportunities
          </Text>
        </View>

        {/* Featured Asset Card */}
        <View style={styles.featuredCard}>
          <View style={styles.assetHeader}>
            <View style={styles.assetInfo}>
              <Image source={IMAGES.BITCOIN} style={styles.assetIcon} />
              <Text style={styles.assetName}>Bitcoin (BTC)</Text>
            </View>
            <RatingStars rating={4.5} />
          </View>

          <Text style={styles.assetPrice}>$106,996.3</Text>
          <Text style={styles.assetChange}>+2.5% (24h)</Text>

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

          {/* Chart Placeholder */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Chart View</Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Loopin?</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🔒</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Secure Trading</Text>
              <Text style={styles.featureDescription}>
                Bank-level security for all your transactions
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📈</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Data</Text>
              <Text style={styles.featureDescription}>
                Get live market data and insights
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🎯</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Goal Tracking</Text>
              <Text style={styles.featureDescription}>
                Set and track your financial goals
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Start?</Text>
          <Text style={styles.ctaDescription}>
            Create your account and begin your investment journey
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
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
  },
  header: {
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(20),
    paddingBottom: getHeight(30),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: getWidth(28),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(8),
  },
  headerSubtitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'center',
    opacity: 0.8,
  },
  featuredCard: {
    backgroundColor: WHITE,
    marginHorizontal: getWidth(20),
    borderRadius: getWidth(16),
    padding: getWidth(20),
    marginBottom: getHeight(30),
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(16),
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: getWidth(32),
    height: getWidth(32),
    marginRight: getWidth(12),
  },
  assetName: {
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderSemiBold,
    color: BLACK,
  },
  assetPrice: {
    fontSize: getWidth(32),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
    marginBottom: getHeight(4),
  },
  assetChange: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderMedium,
    color: '#00C851',
    marginBottom: getHeight(20),
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: getWidth(8),
    padding: getWidth(4),
    marginBottom: getHeight(20),
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
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderMedium,
    color: '#666',
  },
  activeTimeOptionText: {
    color: WHITE,
  },
  chartPlaceholder: {
    height: getHeight(150),
    backgroundColor: '#F8F9FA',
    borderRadius: getWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderMedium,
    color: '#666',
  },
  featuresSection: {
    paddingHorizontal: getWidth(20),
    marginBottom: getHeight(30),
  },
  sectionTitle: {
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    marginBottom: getHeight(20),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(20),
  },
  featureIcon: {
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(25),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(16),
  },
  featureIconText: {
    fontSize: getWidth(24),
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
    marginBottom: getHeight(4),
  },
  featureDescription: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    opacity: 0.8,
  },
  ctaSection: {
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(40),
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: getWidth(24),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(8),
  },
  ctaDescription: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: getHeight(30),
  },
  ctaButton: {
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(40),
    paddingVertical: getHeight(16),
    borderRadius: getWidth(8),
  },
  ctaButtonText: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderSemiBold,
    color: PRIMARY_COLOR,
  },
});
