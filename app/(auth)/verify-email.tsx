import { Button, Text } from '@/components';
import { GREEN, PRIMARY_COLOR, RED, WHITE } from '@/constant/colors';
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
    handleResendOTP,
  } = useVerifyEmail();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>OTP sent to rainy@gmail.com. Enter within 2 mins.</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={VerifyEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, touched, submitCount, setFieldValue }) => {
            const hasOtpError = !!errors.otp && ((touched as any).otp || (submitCount ?? 0) > 0);
            React.useEffect(() => {
              setFieldValue('otp', otpValues.join(''));
            }, [otpValues, setFieldValue]);
            return (
              <View style={styles.form}>
                <View style={styles.otpContainer}>
                  {otpValues.map((value, index) => (
                    <RNTextInput
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      style={[
                        styles.otpInput,
                        hasOtpError && styles.otpInputError,
                      ]}
                      value={value}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      placeholder="-"
                      placeholderTextColor={'rgba(255,255,255,0.6)'}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>Code expires in {formatTime(timeLeft)}</Text>
                </View>

                <Button
                  title="Continue"
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  style={styles.button}
                  fullWidth
                />

                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={timeLeft > 0 || isResending}
                  style={[styles.resendWrapper, (timeLeft > 0 || isResending) && { opacity: 0.5 }]}
                >
                  <Text style={styles.resendCta}>{isResending ? 'RESENDING...' : 'RESEND OTP'}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
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
    textAlign: 'left',
    marginBottom: getHeight(8),
  },
  subtitle: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'left',
    marginBottom: getHeight(40),
    opacity: 0.8,
  },
  form: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeight(12),
    paddingHorizontal: getWidth(0),
  },
  otpInput: {
    width: getWidth(48),
    height: getHeight(48),
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: getWidth(4),
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderMedium,
    color: WHITE,
    backgroundColor: 'transparent',
    marginRight: getWidth(8),
  },
  otpInputFilled: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: 'rgba(1, 8, 220, 0.1)',
  },
  otpInputError: {
    borderColor: RED,
  },
  timerContainer: {
    alignItems: 'flex-start',
    marginBottom: getHeight(32),
  },
  timerText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: GREEN,
    marginBottom: getHeight(8),
  },
  button: {
    marginBottom: getHeight(24),
  },
  resendWrapper: {
    alignItems: 'center',
    paddingVertical: getHeight(12),
  },
  resendCta: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
});
