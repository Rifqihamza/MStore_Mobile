import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Icon
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Importing components
import Greeting from "@/components/greetings";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen() {

    const router = useRouter();

    const adsData = [
        require("../../assets/images/ads-images/ads-first.jpg"),
        require("../../assets/images/ads-images/ads-second.jpg"),
        require("../../assets/images/ads-images/ads-third.jpg"),
        require("../../assets/images/ads-images/ads-fourth.jpg"),
        require("../../assets/images/ads-images/ads-fifth.jpg"),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const changeSlide = () => {
        const next = (currentIndex + 1) % adsData.length;
        setNextIndex(next);

        Animated.timing(slideAnim, {
            toValue: -width,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex(next);
            slideAnim.setValue(0);
        });
    };

    useEffect(() => {
        const interval = setInterval(changeSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.containerHeader}>
                <View style={styles.compProfile}>
                    <Image source={require("../../assets/images/avatar.jpg")} style={styles.profileImage} />
                    <View>
                        <Greeting />
                        <Text style={styles.userName}>Muhammad Rifqi Hamza</Text>
                    </View>
                </View>
                <View style={styles.compIcon}>
                    <Feather name="bell" size={24} color="white" />
                    <Feather name="settings" size={24} color="white" />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.carouselContainer}>
                    <Animated.View
                        style={[
                            styles.slidesContainer,
                            { transform: [{ translateX: slideAnim }] }
                        ]}
                    >
                        {/* Current image */}
                        <View style={styles.imageContainer}>
                            <Image source={adsData[currentIndex]} style={styles.image} />
                        </View>

                        {/* Next image */}
                        <View style={styles.imageContainer}>
                            <Image source={adsData[nextIndex]} style={styles.image} />
                        </View>
                    </Animated.View>
                </View>

                {/* Dots Indicator */}
                <View style={styles.dotsContainer}>
                    {adsData.map((_, index) => (
                        <View key={index} style={[styles.dot, { backgroundColor: currentIndex === index ? "white" : "gray" }]} />
                    ))}
                </View>
            </View>

            {/* Background Putih (80% layar) */}
            <View style={styles.whiteContainer}>
                {/* Navigation Icons */}
                <View style={styles.iconGrid}>
                    {/* Description and Gretting */}
                    <View style={styles.containerGreeting}>
                        <View style={styles.innerConGreeting}>
                            <Text style={{ fontSize: 24, fontWeight: 600 }}>Hello, Dears!</Text>
                            <Text style={{ fontSize: 18, }}>Selamat datang di aplikasi pembelian seragam dan atribut sekolah SMK Mitra Industri MM2100</Text>
                        </View>
                    </View>
                    {/* Seragam */}
                    <TouchableOpacity style={styles.iconCard} onPress={() => router.push('/ProductScreen')}>
                        <FontAwesome5 name="tshirt" size={30} color="black" />
                        <Text style={styles.iconText}>Seragam</Text>
                    </TouchableOpacity>

                    {/* Aksesoris */}
                    <TouchableOpacity style={styles.iconCard} onPress={() => router.push('/ProductScreen')}>
                        <AntDesign name="book" size={30} color="black" />
                        <Text style={styles.iconText}>Aksesoris</Text>
                    </TouchableOpacity>

                    {/* Belanja */}
                    <TouchableOpacity style={styles.iconCard} onPress={() => router.push('/CartScreen')}>
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <Text style={styles.iconText}>Keranjang</Text>
                    </TouchableOpacity>

                    {/* Transaksi */}
                    <TouchableOpacity style={styles.iconCard} onPress={() => router.push('/transaction/TransactionHistory')}>
                        <Ionicons name="receipt-outline" size={30} color="black" />
                        <Text style={styles.iconText}>Transaksi</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#1F4287",
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: width * 0.05, // Padding responsif
        paddingTop: height * 0.02,
    },
    compProfile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
    },
    userName: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
    compIcon: {
        flexDirection: "row",
        gap: 20,
    },
    container: {
        top: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    carouselContainer: {
        width: Dimensions.get("window").width,
        overflow: "hidden",
    },
    slidesContainer: {
        flexDirection: "row",
        width: Dimensions.get("window").width * 1.5,
    },
    imageContainer: {
        width: Dimensions.get("window").width,
    },
    image: {
        width: Dimensions.get("window").width,
        height: 200,
        resizeMode: "cover",
        aspectRatio: 16 / 9,
        borderRadius: 10,
        marginHorizontal: 'auto',
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4,
    },
    whiteContainer: {
        flex: 1, // Menyesuaikan tinggi secara dinamis
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingVertical: height * 0.03, // Padding atas bawah responsif
        paddingHorizontal: width * 0.02, // Padding kiri kanan responsif
        alignItems: "center",
    },
    containerGreeting: {
        paddingHorizontal: 10,
        paddingVertical: 20,

    },
    innerConGreeting: {
        padding: 20,
        width: "100%",
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
    },
    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly", // Menyesuaikan agar ikon tersusun rapi
        width: "100%",
        gap: 10,
        paddingHorizontal: 20,
    },
    iconCard: {
        alignItems: "center",
        padding: height * 0.02, // Padding responsif
        width: "40%", // Lebar responsif
        backgroundColor: "#f0f0f0",
        borderRadius: 15,

    },
    iconText: {
        marginTop: height * 0.005,
        fontSize: height * 0.02, // Ukuran font responsif
        fontWeight: "600",
    },
});