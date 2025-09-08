import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRIMARY_COLOR, WHITE } from '../../constant/colors';
import { IMAGES } from '../../utils/images';
import { getHeight, getWidth } from '../../utils/size';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
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
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
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
      <Tabs.Screen
        name="heart"
        options={{
          title: 'Heart',
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
      <Tabs.Screen
        name="hand"
        options={{
          title: 'Hand',
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
      </Tabs>
    </SafeAreaView>
  );
}
