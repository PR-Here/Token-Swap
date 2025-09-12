import { Button, Text, TextInput } from '@/components';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import useRegister from '@/hooks/useRegister';
import { getHeight, getWidth } from '@/utils/size';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
  const {
    initialValues,
    RegisterSchema,
    handleSubmit,
    handleAlreadyHaveAccountPress,
    handleLetMeLookAroundFirstPress,
  } = useRegister();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Loopin and start your financial journey
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />


              <Button
                title="Next"
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                style={styles.button}
              />

              <TouchableOpacity
                onPress={handleAlreadyHaveAccountPress}
                style={styles.underlineButton}
              >
                <Text style={styles.underlineText}>Already have an account?</Text>
              </TouchableOpacity>

              <Text style={styles.privacyText}>
                By creating an account, you agree to our{' '}
                <Text style={styles.underlinedText}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.underlinedText}>Privacy Policy</Text>
              </Text>

              <Text onPress={handleLetMeLookAroundFirstPress} style={styles.bottomButton}>Let me look around first</Text>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'left',
    marginBottom: getHeight(32),
    opacity: 0.8,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: getHeight(24),
  },
  underlineButton: {
    marginTop: getHeight(16),
    alignItems: 'center',
  },
  underlineText: {
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textDecorationLine: 'underline',
  },
  privacyText: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
    color: WHITE,
    textAlign: 'left',
    marginTop: getHeight(32),
    lineHeight: getHeight(16),
  },
  underlinedText: {
    textDecorationLine: 'underline',
    color: WHITE,
    fontSize: getWidth(12),
  },
  bottomButton: {
    marginTop: 'auto',
    marginBottom: getHeight(20),
    color: WHITE,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
