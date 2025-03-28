import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    LayoutChangeEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";

// Create animated component from Svg
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { bottom } = useSafeAreaInsets();
    const activeIndex = state.index;

    // Store layout positions
    const [layout, setLayout] = useState<{ x: number; index: number }[]>([]);
    const xOffset = useSharedValue(0);

    // Update animation position when activeIndex changes
    useEffect(() => {
        const found = layout.find(({ index }) => index === activeIndex);
        if (found) {
            xOffset.value = withTiming(found.x - 25, { duration: 300 });
        }
    }, [activeIndex, layout]);

    // Animated styles
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: xOffset.value }],
    }));

    const icons: { [key: string]: (props: any) => JSX.Element } = {
        index: (props) => <AntDesign name="home" size={24} {...props} />,
        ProductScreen: (props) => <AntDesign name="skin" size={24} {...props} />,
        CartScreen: (props) => <AntDesign name="shoppingcart" size={24} {...props} />,
        WalletScreen: (props) => <Ionicons name="wallet-outline" size={24} {...props} />,
        AccountScreen: (props) => <Ionicons name="person-outline" size={24} {...props} />,
    };

    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            {/* SVG for Curved Background - Animated version */}
            <AnimatedSvg
                width={110}
                height={60}
                viewBox="0 0 110 60"
                style={[styles.activeBackground, animatedStyles]}
            >
                <Path
                    fill="#3c93cb"
                    d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                />
            </AnimatedSvg>

            {/* Tab Items */}
            <View style={styles.tabBarContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const active = index === activeIndex;

                    return (
                        <TabBarComponent
                            key={route.key}
                            active={active}
                            options={options}
                            routeName={route.name}
                            icons={icons}
                            onLayout={(e) => {
                                const x = e.nativeEvent.layout.x;
                                setLayout((prev) => [...prev.filter((item) => item.index !== index), { x, index }]);
                            }}
                            onPress={() => {
                                const event = navigation.emit({
                                    type: "tabPress",
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!active && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};

type TabBarComponentProps = {
    active?: boolean;
    options: any;
    onLayout: (e: LayoutChangeEvent) => void;
    onPress: () => void;
    routeName: string;
    icons: { [key: string]: (props: any) => JSX.Element };
};
const TabBarComponent = ({ active, onLayout, onPress, routeName, icons }: TabBarComponentProps) => {
    const scale = useSharedValue(active ? 1 : 0);
    const opacity = useSharedValue(active ? 1 : 0.5);

    useEffect(() => {
        scale.value = withTiming(active ? 1 : 0, { duration: 250 });
        opacity.value = withTiming(active ? 1 : 0.5, { duration: 250 });
    }, [active]);

    // Animations for component circle and icon container
    const animatedComponentCircleStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedIconContainerStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <TouchableOpacity onPress={onPress} onLayout={onLayout} style={styles.component} activeOpacity={0.7}>
            <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]} />
            <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
                {icons[routeName]({ color: active ? "black" : "gray" })}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        bottom: 0,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    activeBackground: {
        position: "absolute",
        top: 0,
    },
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 60,
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -5,
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: -2 },
        shadowRadius: 5,
    },
    iconContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default TabBar;
