import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

export const useAddFund = () => {
  const [amount, setAmount] = useState('500.00');
  const { showToast } = useToast();

  useEffect(() => {
    showToast('Welcome to Loopin. Invest to your heart’s content.');
  }, []);

  const handleTopUp = useCallback(() => {
    // Handle top up logic
    console.log('Top up amount:', amount);
  }, [amount]);

  const handleAddFunds = useCallback(() => {
    showToast(`Adding $${amount} to your account added successfully`, 3000);
    router.push('/(dashboard)/exchange-selection' as any);
  }, [amount, showToast]);

  return {
    // State
    amount,

    // Functions
    setAmount,
    handleTopUp,
    handleAddFunds,
  };
};
