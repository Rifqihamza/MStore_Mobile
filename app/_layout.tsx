import { Stack } from 'expo-router/stack';
import { StatusBar } from 'react-native';
export default function Layout() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} hidden={false} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="payment/PaymentScreen" options={{ headerShown: false }} />
        <Stack.Screen name="transaction/TransactionHistory" options={{ headerShown: false }} />
        <Stack.Screen name="productDetails/productDetailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="orderDetails/OrderDetailsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="loginPage/LoginPageScreen" options={{ headerShown: false }} />
      </Stack>

    </>
  );
}
