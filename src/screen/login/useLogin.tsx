import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../../constant/screenName';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackParamList';

export enum Tab {
  MONEY = 'money',
  THINGS = 'things',
}
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const useLogin = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.MONEY);
  const navigation = useNavigation<NavigationType>();
  const handleTabPress = useCallback((tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  const handleRegisterPress = useCallback(() => {
    navigation.navigate(ScreenName.Register);
  }, [navigation]);

  return { selectedTab, handleTabPress, setSelectedTab, handleRegisterPress };
};

export default useLogin;
