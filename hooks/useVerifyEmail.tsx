import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export interface VerifyEmailFormValues {
    otp: string;
}

export const useVerifyEmail = () => {
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [isResending, setIsResending] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(RNTextInput | null)[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const handleOtpChange = useCallback((value: string, index: number) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [otpValues]);

    const handleKeyPress = useCallback((key: string, index: number) => {
        if (key === 'Backspace') {
            if (!otpValues[index] && index > 0) {
                // If current input is empty, go to previous and clear it
                const newOtpValues = [...otpValues];
                newOtpValues[index - 1] = '';
                setOtpValues(newOtpValues);
                inputRefs.current[index - 1]?.focus();
            } else if (otpValues[index]) {
                // If current input has value, clear it
                const newOtpValues = [...otpValues];
                newOtpValues[index] = '';
                setOtpValues(newOtpValues);
            }
        }
    }, [otpValues]);

    const handleSubmit = useCallback((values: VerifyEmailFormValues) => {
        const otpString = otpValues.join('');
        console.log({ otpString });
        // Simulate OTP verification
        if (otpString == '123456') {
            router.push('/create-password');
        } else {
            // Show error - handled by formik validation
        }
    }, [otpValues]);

    const handleResendOTP = useCallback(async () => {
        setIsResending(true);
        // Simulate API call
        setTimeout(() => {
            setTimeLeft(120);
            setIsResending(false);
        }, 1000);
    }, []);

    const initialValues: VerifyEmailFormValues = {
        otp: '',
    };

    return {
        // State
        timeLeft,
        isResending,
        otpValues,

        // Refs
        inputRefs,

        // Data
        initialValues,

        // Functions
        formatTime,
        handleOtpChange,
        handleKeyPress,
        handleSubmit,
        handleResendOTP,
    };
};
