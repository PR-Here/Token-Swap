import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreen } from './src/constant/appScreenConstant';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenName } from './src/constant/screenName';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={ScreenName.Onboarding}
          >
            {AppScreen.map(screen => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
