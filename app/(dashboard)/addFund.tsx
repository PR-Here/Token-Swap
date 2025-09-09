import { AppHeader, Button, Text } from '@/components';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useAddFund } from '@/hooks/useAddFund';
import { getFonts, getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
        title="Add Funds"
        onBackPress={() => {
          // Handle back navigation
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Add Funds to Your Account</Text>
        <Text style={styles.subtitle}>
          Enter the amount you want to add to your Loopin account
        </Text>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={WHITE}
            keyboardType="numeric"
            selectTextOnFocus
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Top Up"
            onPress={handleTopUp}
            style={styles.topUpButton}
          />
          <Button
            title="Add Funds"
            onPress={handleAddFunds}
            style={styles.addFundsButton}
          />
        </View>
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
    paddingTop: getHeight(20),
  },
  title: {
    fontSize: getFonts(24),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(8),
  },
  subtitle: {
    fontSize: getFonts(16),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(40),
    opacity: 0.8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getHeight(40),
    paddingHorizontal: getWidth(20),
  },
  currencySymbol: {
    fontSize: getFonts(48),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    marginRight: getWidth(8),
  },
  amountInput: {
    fontSize: getFonts(48),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    minWidth: getWidth(200),
    borderBottomWidth: 2,
    borderBottomColor: WHITE,
    paddingVertical: getHeight(8),
  },
  buttonContainer: {
    gap: getHeight(16),
  },
  topUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: WHITE,
  },
  addFundsButton: {
    backgroundColor: WHITE,
  },
});
