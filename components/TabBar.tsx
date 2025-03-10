import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const icons: { [key: string]: (props: any) => JSX.Element } = {
        index: (props) => <AntDesign name="home" size={24} {...props} />,
        ProductScreen: (props) => <AntDesign name="skin" size={24} {...props} />,
        CartScreen: (props) => <AntDesign name="shoppingcart" size={24} {...props} />,
        WalletScreen: (props) => <Ionicons name="wallet-outline" size={24} {...props} />,
        AccountScreen: (props) => <Ionicons name="person-outline" size={24} {...props} />,
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.tabbar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    if (['_sitemap', '+not-found'].includes(route.name)) return null;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabbarItem}
                        >
                            {icons[route.name] && icons[route.name]({ color: isFocused ? 'black' : 'gray' })}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingTop: 10,
        height: 80
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabBar;
