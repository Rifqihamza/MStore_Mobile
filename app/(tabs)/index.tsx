import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableHighlight, ScrollView, Platform, TouchableOpacity } from "react-native";
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

type RouteType = "/ProductScreen" | "/CartScreen" | "/transaction/TransactionHistory";

const menuItems: { key: string; icon: JSX.Element; route: RouteType }[] = [
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

    const { width } = Dimensions.get("window");

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <View className="container" style={styles.header}>
                        <View style={styles.profileSection}>
                            <Image source={require("../../assets/images/avatar.jpg")} style={styles.profileImage} />
                            <View>
                                <Greeting />
                                <Text style={styles.userName}>Muhammad Rifqi Hamza</Text>
                            </View>
                        </View>
                        <View style={styles.iconSection}>
                            <TouchableOpacity
                                onPress={() => router.navigate('/loginPage/LoginPageScreen')}
                                style={styles.signUpBtn}>
                                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600", textTransform: "uppercase", }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.containerAll}>
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
                        {menuItems.map((item, index) => (
                            <View key={index} style={styles.menuGrid}>
                                <TouchableHighlight onPress={() => router.push(item.route)} style={styles.menuItem} underlayColor={"#2f7fbf"}>
                                    <View style={styles.itemContent}>
                                        {item.icon}
                                        <Text style={styles.itemTitle}>{item.key}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fefefe"
    },
    containerAll: {
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 20,
        marginTop: 20,
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
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: "#aeaeae",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 2 },
        elevation: 3,
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
        color: "#ffffff",
    },
    iconSection: {
        flexDirection: "row",
        gap: 15,
    },
    signUpBtn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
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
        width: "100%",
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
    menuGrid: {
        width: Platform.select({
            ios: "45%",
            android: "45%",
            default: "45%"
        }),
        marginBottom: 10,
    },
    menuItem: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#3c93cb",
        borderRadius: 15,
        shadowColor: "#aeaeae",
        shadowOpacity: 2,
        shadowRadius: 3,
        shadowOffset: { width: 2, height: 1 },
        elevation: 3,
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
