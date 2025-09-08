import * as Yup from 'yup';

export const CreatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(9, 'Password must be at least 9 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[0-9!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one number or special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
