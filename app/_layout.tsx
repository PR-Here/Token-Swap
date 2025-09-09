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
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="(tutorial)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}
