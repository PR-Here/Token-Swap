import { router } from 'expo-router';
import { FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { RegisterSchema } from '../schema';

export interface RegisterFormValues {
  email: string;
  termsAccepted: boolean;
}

const useRegister = () => {
  const initialValues: RegisterFormValues = {
    email: 'test@test.com',
    termsAccepted: false,
  };

  const handleSubmit = useCallback((
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(false);
    router.push('/verify-email');
  }, []);

  const handleAlreadyHaveAccountPress = useCallback(() => {
    router.push('/login');
  }, []);

  const handleLetMeLookAroundFirstPress = useCallback(() => {
    router.push('/guest-dashboard');
  }, []);

  return {
    initialValues,
    RegisterSchema,
    handleSubmit,
    handleAlreadyHaveAccountPress,
    handleLetMeLookAroundFirstPress,
  };
};

export default useRegister;
