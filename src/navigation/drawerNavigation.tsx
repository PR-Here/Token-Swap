import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { IMAGES } from '../utils/images';
import { getWidth, getHeight } from '../utils/size';
import { WHITE, PRIMARY_COLOR } from '../constant/colors';
import { ScreenName } from '../constant/screenName';

// Import screens
import Dashboard from '../screen/dashboard';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: WHITE,
            borderTopWidth: 0,
            height: getHeight(60),
            paddingBottom: getHeight(10),
            paddingTop: getHeight(15),
            marginLeft: getWidth(16),
            marginRight: getWidth(16),
            marginBottom: getHeight(16),
            borderRadius: getWidth(20),
          },

          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={IMAGES.HOME_ICON}
                style={{
                  width: getWidth(20),
                  height: getWidth(20),
                  tintColor: focused ? 'black' : 'gray',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={IMAGES.CHAT_ICON}
                style={{
                  width: getWidth(20),
                  height: getWidth(20),
                  tintColor: focused ? 'black' : 'gray',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={IMAGES.MSG_ICON}
                style={{
                  width: getWidth(20),
                  height: getWidth(20),
                  tintColor: focused ? 'black' : 'gray',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Heart"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={IMAGES.HEART_ICON}
                style={{
                  width: getWidth(20),
                  height: getWidth(20),
                  tintColor: focused ? 'black' : 'gray',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Hand"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={IMAGES.HAND_ICON}
                style={{
                  width: getWidth(20),
                  height: getWidth(20),
                  tintColor: focused ? 'black' : 'gray',
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigation;
