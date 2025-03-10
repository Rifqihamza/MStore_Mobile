import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductDetailScreen: React.FC = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Periksa apakah params tersedia dan konversi ke tipe yang benar
    const id = params.id ? Number(params.id) : 0;
    const name = params.name ? params.name.toString() : 'Unknown Product';
    const price = params.price ? Number(params.price) : 0;
    const stock = params.stock ? Number(params.stock) : 0;
    const imageUri = Array.isArray(params.uri) ? params.uri[0] : params.uri;

    const handleGoBack = (): void => {
        router.back();
    };

    const imageSource =
        !isNaN(Number(imageUri)) ? parseInt(imageUri, 10) : { uri: imageUri };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <View style={styles.productDetails}>
                    <Text style={styles.productId}>Product ID: {id}</Text>

                    {/* Periksa apakah imageUri tersedia sebelum menampilkan gambar */}
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.productImage} />
                    ) : (
                        <Text style={styles.errorText}>Gambar Tidak Tersedia</Text>
                    )}
                    <View style={styles.details}>
                        <Text style={styles.productName}>{name}</Text>
                        <View style={styles.priceStock}>
                            <Text style={styles.productPrice}>Rp {price.toLocaleString('id-ID')}</Text>
                            <Text style={styles.productStock}>Stock: {stock}</Text>
                        </View>
                    </View>
                    <View style={styles.actionBtn}>
                        <TouchableOpacity style={styles.buyNowBtn}>
                            <Text style={{ color: '#fff', fontWeight: 600, }}>Buy Now!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addCartBtn}>
                            <Text style={{ color: '#fff', fontWeight: 600, }}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        padding: 16,
    },
    backButton: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600',
    },
    productDetails: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        flex: 1,
    },
    productImage: {
        width: 250,
        height: 250,
        marginHorizontal: 'auto',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    productId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        textAlign: 'right',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    productStock: {
        fontSize: 16,
        color: '#666',
    },
    priceStock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    details: {
        padding: 20,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        maxWidth: '50%',
        gap: 15,
        paddingHorizontal: 10,
    },
    addCartBtn: {
        backgroundColor: '#aeaeae',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    },
    buyNowBtn: {
        backgroundColor: '#1F4287',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    }
});

export default ProductDetailScreen;
