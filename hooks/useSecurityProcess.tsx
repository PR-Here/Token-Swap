import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export const useSecurityProcess = () => {
  const { showToast } = useToast();

  useEffect(() => {
    // Show welcome toast when component mounts
    showToast("Welcome to Loopin. Invest to your heart's content.", 4000);
  }, []);

  return {
    // No additional state or functions needed for this simple component
  };
};
