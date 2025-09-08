import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { GREEN, PRIMARY_COLOR, RED, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { useCreatePassword } from '../hooks/useCreatePassword';
import { getHeight, getWidth } from '../utils/size';

const CreatePassword = () => {
  const {
    showPassword,
    showConfirmPassword,
    initialValues,
    handleSubmit,
    validatePassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    CreatePasswordSchema,
  } = useCreatePassword();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.description}>
        {`Don't forget your password. You will need your\n\n`}
        <Text style={styles.description}>password for all future Login.</Text>
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={CreatePasswordSchema}
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
        }) => {
          const passwordValidation = validatePassword(values.password);

          return (
            <View style={styles.formContainer}>
              <TextInput
                label="CREATE PASSWORD"
                placeholder="e.g. Loopin*1234"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!showPassword}
                marginTop={getHeight(40)}
                error={touched.password && errors.password ? errors.password : undefined}
                rightIcon={
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Text style={styles.eyeText}>
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </Text>
                  </TouchableOpacity>
                }
              />

              {/* Password Requirements */}
              {values.password.length > 0 && (
                <View style={styles.requirementsContainer}>
                  <View style={styles.requirementItem}>
                    <Text style={[
                      styles.requirementIcon,
                      { color: passwordValidation.hasLength ? GREEN : RED }
                    ]}>
                      {passwordValidation.hasLength ? '✓' : '✗'}
                    </Text>
                    <Text style={styles.requirementText}>9-16 CHARACTERS</Text>
                  </View>

                  <View style={styles.requirementItem}>
                    <Text style={[
                      styles.requirementIcon,
                      { color: passwordValidation.hasCapital ? GREEN : RED }
                    ]}>
                      {passwordValidation.hasCapital ? '✓' : '✗'}
                    </Text>
                    <Text style={styles.requirementText}>CAPITAL LETTERS</Text>
                  </View>

                  <View style={styles.requirementItem}>
                    <Text style={[
                      styles.requirementIcon,
                      { color: passwordValidation.hasSpecialOrNumber ? GREEN : RED }
                    ]}>
                      {passwordValidation.hasSpecialOrNumber ? '✓' : '✗'}
                    </Text>
                    <Text style={styles.requirementText}>SPECIAL CHARACTERS AND NUMBERS</Text>
                  </View>
                </View>
              )}

              <TextInput
                label="RE-ENTER PASSWORD"
                placeholder="Re-enter password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={!showConfirmPassword}
                marginTop={getHeight(24)}
                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                rightIcon={
                  <TouchableOpacity
                    onPress={toggleConfirmPasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Text style={styles.eyeText}>
                      {showConfirmPassword ? 'HIDE' : 'SHOW'}
                    </Text>
                  </TouchableOpacity>
                }
              />

              <Button
                title="Continue"
                onPress={() => handleSubmit()}
                style={{ marginTop: getHeight(32) }}
              />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default CreatePassword;

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
  requirementsContainer: {
    paddingHorizontal: getWidth(4),
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(8),
  },
  requirementIcon: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderBold,
    marginRight: getWidth(8),
    width: getWidth(20),
  },
  requirementText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderRegular,
  },
  eyeIcon: {
    padding: getWidth(8),
  },
  eyeText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
  },
});
