import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Animated, FlatList, TouchableHighlight, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Icon
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Greeting from "@/components/greetings";

const adsData = [
    require("../../assets/images/ads-images/ads-first.jpg"),
    require("../../assets/images/ads-images/ads-second.jpg"),
    require("../../assets/images/ads-images/ads-third.jpg"),
    require("../../assets/images/ads-images/ads-fourth.jpg"),
    require("../../assets/images/ads-images/ads-fifth.jpg"),
];

import { Route } from "expo-router";

type MenuItem = { key: string; icon: JSX.Element; route: Route };

const menuItems: MenuItem[] = [
    { key: "Seragam", icon: <FontAwesome5 name="tshirt" size={30} color={"white"} />, route: "/ProductScreen" },
    { key: "Aksesoris", icon: <AntDesign name="book" size={30} color={"white"} />, route: "/ProductScreen" },
    { key: "Keranjang", icon: <AntDesign name="shoppingcart" size={30} color={"white"} />, route: "/CartScreen" },
    { key: "Transaksi", icon: <Ionicons name="receipt-outline" size={30} color={"white"} />, route: "/transaction/TransactionHistory" },
];

export default function HomeScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % adsData.length);
            Animated.timing(slideAnim, { toValue: -width, duration: 500, useNativeDriver: false }).start(() => slideAnim.setValue(0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const { width, height, scale } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <View className="container" style={styles.header}>
                    <View style={styles.profileSection}>
                        <Image source={require("../../assets/images/avatar.jpg")} style={styles.profileImage} />
                        <View>
                            <Greeting />
                            <Text style={styles.userName}>Muhammad Rifqi Hamza</Text>
                        </View>
                    </View>
                    {/* Login Button */}
                    <View style={styles.iconSection}>
                        <TouchableHighlight
                            onPress={() => router.navigate('/loginPage/LoginPageScreen')}
                            underlayColor={"#fff"}
                            style={styles.signUpBtn}>
                            <Text style={{ color: "#fff" }}>Sign Up</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View style={styles.containerAll}>
                <View style={styles.container}>
                    {/* Carousel */}
                    <View style={styles.carouselContainer}>
                        <Animated.View style={[styles.slideWrapper, { transform: [{ translateX: slideAnim }] }]}>
                            <Image source={adsData[currentIndex]} style={styles.image} />
                        </Animated.View>
                    </View>
                    <View style={styles.dotsContainer}>
                        {adsData.map((_, i) => (
                            <View key={i} style={[styles.dot, { backgroundColor: currentIndex === i ? "white" : "gray" }]} />
                        ))}
                    </View>

                    {/* Menu */}
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={menuItems}
                            renderItem={({ item }) => (
                                <TouchableHighlight
                                    style={styles.menuItem}
                                    onPress={() => router.push(item.route)}
                                    underlayColor="#000"
                                >
                                    <View style={styles.itemContent}>
                                        {item.icon}
                                        <Text style={styles.itemTitle}>{item.key}</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                            keyExtractor={item => item.key}
                            numColumns={2}
                            columnWrapperStyle={styles.menuGrid}
                        />
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fefefe"
    },
    containerAll: {
        width: Dimensions.get("window").width > 768 ? "80%" : "100%", // Jika lebar layar > 768px (tablet/desktop), gunakan 60%, jika tidak gunakan 100%
        alignSelf: "center", // Agar tetap berada di tengah pada layar besar
        paddingHorizontal: Dimensions.get("window").width > 768 ? 40 : 20, // Padding lebih besar di desktop
        marginTop: Dimensions.get("window").width > 768 ? 30 : 20, // Margin atas lebih besar di desktop
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        backgroundColor: "#3c93cb",
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Platform.select({
            ios: 15,
            android: 15,
            default: 10,
        }),
        paddingHorizontal: Platform.select({
            ios: 15,
            android: 20,
            default: 20,
        }),
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2 },

        elevation: 5,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#ffffff"
    },
    iconSection: {
        flexDirection: "row",
        gap: Platform.select({
            ios: 10,
            android: 15,
            default: 15,
        }),
    },
    signUpBtn: {
        borderWidth: 2,
        borderColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    container: {
        width: "100%",
        marginHorizontal: "auto",
    },
    carouselContainer: {
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
    },
    slideWrapper: {
        width: "100%",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 250,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4
    },
    menuContainer: {
        marginHorizontal: "auto",
        width: "100%",
        height: "100%",
    },
    menuGrid: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    menuItem: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#3c93cb",
        borderRadius: 15,
        flex: 1,
        margin: 5,

        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2 },

        elevation: 5,
    },
    itemContent: {
        alignItems: "center",
    },
    itemTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },
});
