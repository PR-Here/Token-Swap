import { router } from 'expo-router';
import { useState } from 'react';
import { CreatePasswordSchema } from '../schema';

interface CreatePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export const useCreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: CreatePasswordFormValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: CreatePasswordFormValues) => {
    // Simulate password creation
    console.log('Password created:', values.password);
    router.push('/addFund');
  };

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 9 && password.length <= 16;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialOrNumber = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      hasLength,
      hasCapital,
      hasSpecialOrNumber,
    };
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    // State
    showPassword,
    showConfirmPassword,
    initialValues,
    
    // Functions
    handleSubmit,
    validatePassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Schema
    CreatePasswordSchema,
  };
};
