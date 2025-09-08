import { router } from 'expo-router';
import { useCallback, useState } from 'react';

export enum Tab {
  MONEY = 'money',
  THINGS = 'things',
}

const useLogin = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.MONEY);
  
  const handleTabPress = useCallback((tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  const handleRegisterPress = useCallback(() => {
    router.push('/register');
  }, []);

  return { selectedTab, handleTabPress, setSelectedTab, handleRegisterPress };
};

export default useLogin;
