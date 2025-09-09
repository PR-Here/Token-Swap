import { Button, Text } from '@/components';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';
import { VerifyEmailSchema } from '@/schema';
import { getHeight, getWidth } from '@/utils/size';
import { Formik } from 'formik';
import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    handleResendCode,
    handleBackToRegister,
  } = useVerifyEmail();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to your email address
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={VerifyEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View style={styles.form}>
              <View style={styles.otpContainer}>
                {otpValues.map((value, index) => (
                  <RNTextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={[
                      styles.otpInput,
                      value && styles.otpInputFilled,
                    ]}
                    value={value}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                  />
                ))}
              </View>

              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                  Resend code in {formatTime(timeLeft)}
                </Text>
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={timeLeft > 0 || isResending}
                  style={[
                    styles.resendButton,
                    (timeLeft > 0 || isResending) && styles.resendButtonDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.resendText,
                      (timeLeft > 0 || isResending) && styles.resendTextDisabled,
                    ]}
                  >
                    {isResending ? 'Resending...' : 'Resend Code'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title="Verify Email"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.button}
              />

              <TouchableOpacity
                onPress={handleBackToRegister}
                style={styles.backButton}
              >
                <Text style={styles.backText}>Back to Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

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
    fontSize: getWidth(28),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(8),
  },
  subtitle: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'center',
    marginBottom: getHeight(40),
    opacity: 0.8,
  },
  form: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeight(32),
    paddingHorizontal: getWidth(20),
  },
  otpInput: {
    width: getWidth(50),
    height: getHeight(60),
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: getWidth(8),
    fontSize: getWidth(24),
    fontFamily: FontName.NewsreaderBold,
    color: WHITE,
    backgroundColor: 'transparent',
  },
  otpInputFilled: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: 'rgba(1, 8, 220, 0.1)',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: getHeight(32),
  },
  timerText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    marginBottom: getHeight(8),
  },
  resendButton: {
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(16),
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    color: PRIMARY_COLOR,
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: WHITE,
    textDecorationLine: 'none',
  },
  button: {
    marginBottom: getHeight(24),
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: getHeight(12),
  },
  backText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textDecorationLine: 'underline',
  },
});
