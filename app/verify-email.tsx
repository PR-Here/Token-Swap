import { Formik } from 'formik';
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Text from '../components/Text';
import { PRIMARY_COLOR, RED, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { VerifyEmailSchema } from '../schema';
import { getHeight, getWidth } from '../utils/size';

const VerifyEmail = () => {
  const {
    timeLeft,
    isResending,
    otpValues,
    inputRefs,
    initialValues,
    formatTime,
    handleOtpChange,
    handleKeyPress,
    handleSubmit,
    handleResendOTP,
  } = useVerifyEmail();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.description}>
        OTP sent to rainy@gmail.com. Enter within 2 mins.
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={VerifyEmailSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.otpContainer}>
              <View style={styles.otpInputsContainer}>
                {otpValues.map((value, index) => (
                  <RNTextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpInput,
                      value && styles.otpInputFilled,
                      errors.otp && styles.otpInputError
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      if (numericText.length <= 1) {
                        handleOtpChange(numericText, index);
                        setFieldValue('otp', [...otpValues.slice(0, index), numericText, ...otpValues.slice(index + 1)].join(''));
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                  />
                ))}
              </View>
              {errors.otp && (
                <Text style={styles.errorText}>{errors.otp}</Text>
              )}
            </View>


            <Button
              title="Continue"
              onPress={() => handleSubmit()}
              style={{ marginTop: getHeight(32) }}
            />

            <View style={styles.resendContainer}>
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={isResending || timeLeft > 0}
                style={[
                  styles.resendButton,
                  (isResending || timeLeft > 0) && styles.resendButtonDisabled
                ]}
              >
                <Text style={[
                  styles.resendText,
                  (isResending || timeLeft > 0) && styles.resendDisabled
                ]}>
                  {isResending ? 'Sending...' : timeLeft > 0 ? `RESEND OTP (${formatTime(timeLeft)})` : 'RESEND OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(16),
  },
  formContainer: {
    flex: 1,
  },
  title: {
    color: WHITE,
    fontSize: getWidth(28),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
  },
  description: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    marginTop: getHeight(8),
  },
  otpContainer: {
    marginTop: getHeight(40),
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeight(16),
  },
  otpInput: {
    width: getWidth(45),
    height: getWidth(45),
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: getWidth(8),
    backgroundColor: 'transparent',
    color: WHITE,
    fontSize: getWidth(18),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'center',
  },
  otpInputFilled: {
    backgroundColor: 'transparent',
    color: WHITE,
  },
  otpInputError: {
    borderColor: RED,
    color: RED,
  },
  errorText: {
    color: RED,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    marginTop: getHeight(0),
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: getHeight(24),
    marginBottom: getHeight(16),
  },
  resendButton: {
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(16),
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: WHITE,
    textAlign: 'center',
    lineHeight: getHeight(18),
  },
  resendDisabled: {
    color: '#fff',
    textDecorationLine: 'none',
  },
});
