import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';

export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
                lazy: true, // Render screen hanya saat diperlukan
            }}
        >
            {[
                { name: "WalletScreen", icon: "wallet-outline" },
                { name: "CartScreen", icon: "shoppingcart" },
                { name: "index", icon: "home" },
                { name: "ProductScreen", icon: "skin" },
                { name: "AccountScreen", icon: "person-outline" },
            ].map(({ name, icon }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name={icon as keyof typeof FontAwesome.glyphMap} color={color} />,
                    }}
                />
            ))}
        </Tabs>
    );
}
