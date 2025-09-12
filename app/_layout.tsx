import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRIMARY_COLOR } from "../constant/colors";
import { ToastProvider } from "../context/ToastContext";
import { useAppLayout } from "../hooks/useAppLayout";

export default function RootLayout() {
  const { fontsLoaded } = useAppLayout();
  const insets = useSafeAreaInsets();

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <ToastProvider>
      <StatusBar style="light" />
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="(tutorial)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
