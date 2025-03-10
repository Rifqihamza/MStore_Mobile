import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from "@expo/vector-icons/AntDesign";
import { productList as initialProductList } from '@/dummyDataProduct/productList';

// Define the Product type
interface Product {
    id: number;
    nameProduct: string;
    priceProduct: number;
    stockProduct: number;
    uri: any; // Adjust the type if necessary (e.g., ImageSourcePropType)
    quantity?: number;
}

const CartScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProductList);
    const router = useRouter();

    // Increase Quantity
    const increaseQuantity = (id: number): void => {
        setProducts(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ));
    };

    // Decrease Quantity
    const decreaseQuantity = (id: number): void => {
        setProducts(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
        ));
    };

    // Delete Product
    const deleteProduct = (id: number): void => {
        setProducts(prev => prev.filter(item => item.id !== id));
    };

    // Calculate total price
    const totalPrice = products.reduce((total, item) => total + (item.priceProduct * (item.quantity || 1)), 0);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.containerHeader}>
                <Text style={styles.title}>Keranjang Belanja</Text>
                <View style={styles.compIcon}>
                    <AntDesign name="hearto" size={24} color="white" />
                    <AntDesign name="setting" size={24} color="white" />
                </View>
            </View>

            {/* Cart List */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <View style={styles.productInfo}>
                            <Image source={item.uri} style={styles.productImage} />
                            <View style={styles.productTitle}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.productName}>{item.nameProduct}</Text>
                                <Text style={styles.productPrice}>Rp {item.priceProduct}</Text>
                                <Text style={styles.productPrice}>Stok {item.stockProduct}</Text>
                            </View>
                        </View>
                        <View style={styles.containerAction}>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.delButton} onPress={() => deleteProduct(item.id)}>
                                    <Feather name="trash-2" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity || 1}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.cartContainer}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalText}>Total: Rp {totalPrice.toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={() => router.push('/payment/PaymentScreen')}>
                    <Text style={styles.checkoutText}>Buy Now!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1F4287'
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "600"
    },
    compIcon: {
        flexDirection: "row",
        gap: 20
    },
    cartContainer: {
        paddingHorizontal: 20,

    },
    cartItem: {
        backgroundColor: "#ffffff",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 500,
    },
    productTitle: {
        flexShrink: 1, // Menghindari teks keluar dari container
        maxWidth: "60%", // Menyesuaikan agar tidak lebih dari 80% parent
    },
    productName: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    productPrice: {
        color: "#010101",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#444",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20
    },
    quantity: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    quantityContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center",
        gap: 10
    },
    containerAction: {
        flexDirection: 'column',
        gap: 20,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    buyButton: {
        backgroundColor: '#3c93cb',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        alignItems: 'center'

    },
    delButton: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 6,
        borderColor: 'black'
    },
    footer: {
        position: 'relative',
        backgroundColor: '#ffffff',
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    totalText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    checkoutText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default CartScreen;
