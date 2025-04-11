// In your ProductScreen.tsx
import React from 'react';
import {
    StyleSheet, View, Text, SafeAreaView, Image, FlatList,
    TouchableOpacity, ImageSourcePropType, ImageURISource
} from 'react-native';
import { useRouter } from 'expo-router'; // Use Expo Router
import SearchBar from '@/components/searchBar';
import { productList } from '@/dummyData/productList';

interface Product {
    id: number;
    nameProduct: string;
    priceProduct: number;
    stockProduct: number;
    uri: ImageSourcePropType;
}

const ProductScreen: React.FC = () => {
    const router = useRouter(); // Use router instead of navigation

    const handleProductPress = (product: Product): void => {
        let imageUri = '';

        if (typeof product.uri === 'number') {
            // Jika gambar lokal (require), simpan nilainya sebagai string untuk dikenali di halaman detail
            imageUri = product.uri.toString();
        } else if ('uri' in product.uri) {
            // Jika gambar online, ambil `uri` string-nya
            imageUri = (product.uri as ImageURISource).uri || '';
        }

        console.log("Navigating with image URI:", imageUri); // Debugging log

        router.push({
            pathname: '/productDetails/productDetailScreen',
            params: {
                id: product.id.toString(),
                name: product.nameProduct,
                price: product.priceProduct.toString(),
                stock: product.stockProduct.toString(),
                uri: imageUri, // Kirim sebagai string
            }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ paddingTop: 10 }}>
                <SearchBar changeInputFocus={(focused: boolean): void => console.log(focused)} />
            </View>

            <View style={styles.container}>
                <FlatList
                    data={productList}
                    keyExtractor={(item: Product): string => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }: { item: Product }): JSX.Element => (
                        <TouchableOpacity
                            style={styles.cardWrapper}
                            onPress={(): void => handleProductPress(item)}
                        >
                            <View style={styles.card}>
                                <Image source={item.uri} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text numberOfLines={1} style={styles.titleName}>{item.nameProduct}</Text>
                                    <Text style={styles.titlePrice}>Rp {item.priceProduct}</Text>
                                    <Text style={styles.titleStock}>Stok Tersisa {item.stockProduct}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    listContent: {
        justifyContent: 'space-between',
    },
    cardWrapper: {
        flex: 1,
        margin: 5,
    },
    card: {
        backgroundColor: '#fefefe',
        shadowColor: '#aeaeae',
        shadowOffset: { width: 4, height: 3 }, // Increased offset for a deeper shadow
        shadowOpacity: 0.4, // Increased opacity for a more visible shadow
        shadowRadius: 2, // Increased radius for a softer spread
        elevation: 10, // For Android shadow support
        borderRadius: 10,
        padding: 10,
        height: 250,
    },    
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        alignSelf: 'center'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 4,
    },
    titleName: {
        color: '#000',
        fontSize: 18,
        fontWeight: "600",
    },
    titlePrice: {
        color: '#000',
        fontSize: 16,
    },
    titleStock: {
        color: '#000',
        fontSize: 14,
    },
});

export default ProductScreen;
