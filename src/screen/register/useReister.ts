import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ScreenName } from '../../constant/screenName';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackParamList';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

export interface RegisterFormValues {
  email: string;
  termsAccepted: boolean;
}

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const useRegister = () => {
  const navigation = useNavigation<NavigationType>();

  const initialValues: RegisterFormValues = {
    email: '',
    termsAccepted: false,
  };

  const handleSubmit = useCallback((
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(false);
    navigation.navigate(ScreenName.Dashboard);
  }, [navigation]);

  const handleAlreadyHaveAccountPress = useCallback(() => {
    navigation.navigate(ScreenName.Login);
  }, [navigation]);

  const handleLetMeLookAroundFirstPress = useCallback(() => {
    navigation.navigate(ScreenName.GuestDashboard);
  }, [navigation]);

  return {
    initialValues,
    RegisterSchema,
    handleSubmit,
    handleAlreadyHaveAccountPress,
    handleLetMeLookAroundFirstPress,
  };
};

export default useRegister;
