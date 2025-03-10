import { Stack } from 'expo-router/stack';
import { StatusBar, View } from 'react-native';
export default function Layout() {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="payment/PaymentScreen" options={{ headerShown: false }} />
        <Stack.Screen name="transaction/TransactionHistory" options={{ headerShown: false }} />
        <Stack.Screen name="productDetails/productDetailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="orderDetails/OrderDetailsScreen" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
