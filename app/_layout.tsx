import { Stack } from "expo-router";
import { ToastProvider } from "../context/ToastContext";
import { useAppLayout } from "../hooks/useAppLayout";

export default function RootLayout() {
  const { fontsLoaded } = useAppLayout();

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <ToastProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="verify-email" />
        <Stack.Screen name="create-password" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="guest-dashboard" />
        <Stack.Screen name="security-process" />
        <Stack.Screen name="addFund" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}
