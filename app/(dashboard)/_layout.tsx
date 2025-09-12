import { Stack } from 'expo-router';
import React from 'react';

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="addFund" />
      <Stack.Screen name="token-dashboard" />
      <Stack.Screen name="exchange-selection" />
    </Stack>
  );
}
