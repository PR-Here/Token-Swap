import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TermsAcceptance from '../components/TermsAcceptance';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { PRIMARY_COLOR, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { getHeight, getWidth } from '../utils/size';
import useRegister from '@/hooks/useRegister';

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
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.description}>
        Creating an account makes it easier to trade later.
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
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
            <TextInput
              label="Email"
              placeholder="e.g. rainy@getloopin.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              maxLength={80}
              marginTop={getHeight(61)}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <TermsAcceptance
              onAccept={(accepted) => setFieldValue('termsAccepted', accepted)}
              isAccepted={values.termsAccepted}
            />

            <Button
              title="Next"
              onPress={() => handleSubmit()}
              style={{ marginTop: getHeight(32) }}
            />

            <Text
              onPress={handleAlreadyHaveAccountPress}
              style={styles.alreadyHaveAccount}
            >
              I already have an account
            </Text>

            <Text 
              style={styles.lookAroundText}
              onPress={handleLetMeLookAroundFirstPress}
            >
              Let me look around first
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Register;

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
  alreadyHaveAccount: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'center',
    marginTop: getHeight(16),
    textDecorationLine: 'underline',
    textDecorationColor: WHITE,
    textDecorationStyle: 'solid',
  },
  lookAroundText: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'center',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: getHeight(56),
    left: 0,
    right: 0,
  },
});
