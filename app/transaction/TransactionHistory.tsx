import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ImageSourcePropType, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const TransactionHistory = () => {
    const router = useRouter();

    const backButton = () => {
        router.back();
    }

    interface Order {
        id: number;
        name: string;
        imgUrl: ImageSourcePropType;
        date: string;
        total: string;
        price: string;
    }
    interface ImageURISource {
        uri: string;
    }

    const handleToDetailOrders = (order: Order): void => {
        let imageUri = '';

        if (typeof order.imgUrl === 'number') {
            // Jika gambar lokal (require), ubah ke string
            imageUri = order.imgUrl.toString();
        } else if ('uri' in order.imgUrl) {
            // Jika gambar online, ambil string `uri`-nya
            imageUri = (order.imgUrl as ImageURISource).uri || '';
        }

        console.log("Navigating with image URI:", imageUri); // Debugging log

        router.push({
            pathname: '/orderDetails/OrderDetailsScreen',
            params: {
                id: order.id.toString(),
                name: order.name,
                date: order.date,
                total: order.total,
                price: order.price,
                uri: imageUri, // Kirim sebagai string
            }
        });
    };



    const orders = [
        { id: 1, name: "Produk 1", imgUrl: require('@/assets/images/react-logo.png'), date: "2025-03-10", total: "Rp 155.699", price: "Rp 159.999" },
        { id: 2, name: "Produk 2", imgUrl: require('@/assets/images/react-logo.png'), date: "2025-03-10", total: "Rp 155.699", price: "Rp 159.999" },
        { id: 3, name: "Produk 3", imgUrl: require('@/assets/images/react-logo.png'), date: "2025-03-10", total: "Rp 155.699", price: "Rp 159.999" },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View>
                <TouchableOpacity onPress={backButton} style={{ flexDirection: 'row', alignItems: 'center', padding: 15, gap: 10, }}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={{
                        color: '#ffffff', fontSize: 18, fontWeight: "600"
                    }}>Riwayat Transaksi</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleToDetailOrders(item)}>
                            <Image source={item.imgUrl} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.quantity}>1 barang x {item.price}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.totalLabel}>Total Belanja</Text>
                                <Text style={styles.totalPrice}>{item.total}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1F4287',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    details: {
        flex: 1,
        marginLeft: 5,
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 12,
        color: 'gray',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontSize: 12,
        color: 'gray',
    },
    totalPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default TransactionHistory;
