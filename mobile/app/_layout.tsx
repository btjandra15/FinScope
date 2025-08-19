import SafeScreen from '@/components/SafeScreen';
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return <ClerkProvider tokenCache={tokenCache}>
            <SafeScreen>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
              </Stack>
            </SafeScreen>
          </ClerkProvider>;
}