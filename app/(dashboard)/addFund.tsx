import { AppHeader, Button, ButtonSize, Text } from '@/components';
import { BLACK, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useAddFund } from '@/hooks/useAddFund';
import { IMAGES } from '@/utils/images';
import { getFonts, getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddFund = () => {
  const {
    amount,
    setAmount,
    handleTopUp,
    handleAddFunds,
  } = useAddFund();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Buy"
      />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>You just need to top up!</Text>
        <Text style={styles.subtitle}>
          For the best experience, we recommend topping up at least $500—this way, you'll have enough to purchase 5 tokens ($100 each)
        </Text>


        {/* Top-up Card */}
        <View style={styles.topUpCard}>
          <View style={styles.cardLeft}>
            <View style={styles.cardLeftTop}>
              <View style={styles.currencyContainer}>
                <Image source={IMAGES.DOLLOR} style={styles.dollarSign} />
                <Text style={styles.currencyText}>USD</Text>
              </View>
              <Text style={styles.topUpButtonText}>Top Up</Text>
            </View>
            <TextInput
              style={styles.amountText}
              value={amount}
              onChangeText={setAmount}
              placeholder="500.00"
              placeholderTextColor="#999"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              maxLength={7}

            />
          </View>

        </View>
      </View>
      <Button title="Add funds Now" onPress={handleAddFunds} size={ButtonSize.LARGE} style={styles.addFundsButton} />
    </SafeAreaView>
  );
};

export default AddFund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(10),
    paddingBottom: getHeight(20),
  },
  backButton: {
    padding: getWidth(8),
  },
  headerTitle: {
    fontSize: getFonts(18),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
  },
  headerSpacer: {
    width: getWidth(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    marginTop: getHeight(36),
  },
  title: {
    fontSize: getFonts(28),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(10),
    lineHeight: getHeight(36),
  },
  subtitle: {
    fontSize: getFonts(14),
    color: WHITE,
    textAlign: 'left',
  },
  topUpCard: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: getWidth(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: getHeight(112),
    marginTop: getHeight(36),

  },
  cardLeft: {
    flex: 1,
  },
  cardLeftTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    width: getWidth(20),
    height: getHeight(20),
    fontFamily: FontName.NewsreaderBold,
    marginRight: getWidth(8),
  },
  currencyText: {
    fontSize: getFonts(16),
    fontFamily: FontName.NewsreaderBold,
    color: BLACK,
  },
  amountText: {
    fontSize: getFonts(32),
    fontFamily: FontName.NewsreaderBold,
    color: '#333',
    padding: 0,
    marginTop: getHeight(12),
    borderWidth: 0,
    outline: 'none',
  },
  topUpButtonText: {
    fontSize: getFonts(16),
    fontFamily: FontName.NewsreaderBold,
    color: PRIMARY_COLOR,
  },
  addFundsButton: {
    marginHorizontal: getWidth(20),
    marginBottom: getHeight(40),
  },
});
