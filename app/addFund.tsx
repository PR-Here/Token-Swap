import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Text from '../components/Text';
import { PRIMARY_COLOR, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { useAddFund } from '../hooks/useAddFund';
import { getFonts, getHeight, getWidth } from '../utils/size';

const AddFund = () => {
  const {
    amount,
    setAmount,
    handleTopUp,
    handleAddFunds,
  } = useAddFund();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader title="Buy" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>You just need to top up!</Text>

        {/* Description */}
        <Text style={styles.description}>
          For the best experience, we recommend topping up at least $500—this way, you'll have enough to purchase 5 tokens ($100 each)
        </Text>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <View style={styles.currencySection}>
            <Text style={styles.currencyIcon}>$</Text>
            <Text style={styles.currencyText}>USD</Text>
          </View>

          <TextInput
            style={styles.amountText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#999"
            maxLength={10}
          />
          <Text style={styles.topUpButtonText}>Top Up</Text>


        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Add funds Now"
          onPress={handleAddFunds}
          style={styles.addFundsButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddFund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  content: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(40),
  },
  title: {
    color: WHITE,
    fontSize: getFonts(30),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    marginBottom: getHeight(24),
  },
  description: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    lineHeight: getHeight(24),
    marginBottom: getHeight(40),
    paddingHorizontal: getWidth(10),
  },
  amountContainer: {
    backgroundColor: WHITE,
    borderRadius: getWidth(12),
    padding: getWidth(16),
    alignItems: 'flex-start',
    marginBottom: getHeight(40),
    maxHeight: getHeight(112),
  },
  currencySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: getWidth(16),
  },
  currencyIcon: {
    color: PRIMARY_COLOR,
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderSemiBold,
    marginRight: getWidth(4),
  },
  currencyText: {
    color: PRIMARY_COLOR,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
  },
  amountSection: {
    flex: 1,
    alignItems: 'center',
  },
  amountText: {
    color: '#333',
    fontSize: getWidth(32),
    fontFamily: FontName.NewsreaderBold,
  },
  topUpButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(20),
    borderRadius: getWidth(8),
  },
  topUpButtonText: {
    color: PRIMARY_COLOR,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    position: 'absolute',
    top: getHeight(16),
    right: getWidth(16),
  },
  bottomContainer: {
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(20),
  },
  addFundsButton: {
    backgroundColor: '#000',
  },
});
