import React, { useReducer } from 'react';
import {
    View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList,
    Platform,
    Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { productList as initialProductList } from '@/dummyDataProduct/productList';


interface Product {
    id: number;
    nameProduct: string;
    priceProduct: number;
    stockProduct: number;
    uri: any;
    quantity?: number;
}

type CartState = {
    products: Product[];
    selectedItems: number[];
};

type CartAction =
    | { type: 'INCREASE'; id: number }
    | { type: 'DECREASE'; id: number }
    | { type: 'DELETE'; id: number }
    | { type: 'TOGGLE_SELECT'; id: number }
    | { type: 'TOGGLE_SELECT_ALL' }
    | { type: 'DELETE_SELECTED' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'INCREASE':
            return {
                ...state,
                products: state.products.map(item =>
                    item.id === action.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                ),
            };
        case 'DECREASE':
            return {
                ...state,
                products: state.products.map(item =>
                    item.id === action.id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
                ),
            };
        case 'DELETE':
            return { ...state, products: state.products.filter(item => item.id !== action.id) };
        case 'TOGGLE_SELECT':
            return {
                ...state,
                selectedItems: state.selectedItems.includes(action.id)
                    ? state.selectedItems.filter(id => id !== action.id)
                    : [...state.selectedItems, action.id],
            };
        case 'TOGGLE_SELECT_ALL':
            return {
                ...state,
                selectedItems: state.selectedItems.length === state.products.length ? [] : state.products.map(p => p.id),
            };
        case 'DELETE_SELECTED':
            return {
                ...state,
                products: state.products.filter(item => !state.selectedItems.includes(item.id)),
                selectedItems: []
            };
        default:
            return state;
    }
};

const CartScreen: React.FC = () => {
    const [state, dispatch] = useReducer(cartReducer, { products: initialProductList, selectedItems: [] });
    const router = useRouter();
    const totalPrice = state.products.reduce((total, item) => total + (item.priceProduct * (item.quantity || 1)), 0);
    const allSelected = state.selectedItems.length === state.products.length && state.products.length > 0;


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <Text style={styles.headerTitle}>Keranjang Belanja</Text>
                    {/* Select All Section */}
                    <View style={styles.selectAllContainer}>
                        <TouchableOpacity style={styles.checkbox} onPress={() => dispatch({ type: 'TOGGLE_SELECT_ALL' })}>
                            <Feather name={allSelected ? "check-square" : "square"} size={24} color={allSelected ? "#3c93cb" : "#ccc"} />
                            <Text style={styles.selectAllText}>Pilih Semua ({state.selectedItems.length})</Text>
                        </TouchableOpacity>

                        {state.selectedItems.length > 0 && (
                            <TouchableOpacity
                                onPress={() => dispatch({ type: 'DELETE_SELECTED' })}
                            >
                                <Text style={styles.deleteText}>Hapus</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {state.products.length === 0 ? (
                        <View style={styles.emptyCartContainer}>
                            <Text style={styles.emptyCartText}>Keranjang belanja kosong</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={state.products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <CartItem
                                    item={item}
                                    isSelected={state.selectedItems.includes(item.id)}
                                    onIncrease={() => dispatch({ type: 'INCREASE', id: item.id })}
                                    onDecrease={() => dispatch({ type: 'DECREASE', id: item.id })}
                                    onDelete={() => dispatch({ type: 'DELETE', id: item.id })}
                                    onToggleSelect={() => dispatch({ type: 'TOGGLE_SELECT', id: item.id })}
                                />
                            )}
                            contentContainerStyle={styles.cartContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>

                {state.products.length > 0 && (
                    <View style={styles.footer}>
                        <View style={styles.footerContainer}>
                            <Text style={styles.summaryTitle}>Ringkasan Belanja</Text>
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Total:</Text>
                                <Text style={styles.totalPrice}>Rp {totalPrice.toLocaleString()}</Text>
                            </View>
                            <TouchableOpacity style={styles.buyButton} onPress={() => router.push('/payment/PaymentScreen')}>
                                <Text style={styles.buyButtonText}>Buy Now!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const CartItem = ({ item, isSelected, onIncrease, onDecrease, onDelete, onToggleSelect }: {
    item: Product;
    isSelected: boolean;
    onIncrease: () => void;
    onDecrease: () => void;
    onDelete: () => void;
    onToggleSelect: () => void;
}) => (
    <View style={styles.cartItem}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={onToggleSelect}>
            <Feather name={isSelected ? "check-square" : "square"} size={24} color={isSelected ? "#fff" : "#ccc"} />
        </TouchableOpacity>

        <View style={styles.productInfo}>
            <Image source={item.uri} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text numberOfLines={1} style={styles.productName}>{item.nameProduct}</Text>
                <Text style={styles.productPrice}>Rp {item.priceProduct}</Text>
                <Text style={styles.productStock}>Stok {item.stockProduct}</Text>
            </View>
        </View>

        <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Feather name="trash-2" size={14} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDecrease} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity || 1}</Text>
            <TouchableOpacity onPress={onIncrease} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fefefe"
    },
    container: {
        padding: Platform.select({
            ios: 20,
            android: 30,
            default: 15
        }),
        justifyContent: "center",
        alignContent: "center",
        gap: 15,
        width: "100%",
        marginHorizontal: "auto"
    },
    containerList: {
        height: Dimensions.get("window").height * 0.5,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        shadowColor: "#aeaeae",
        shadowOffset: { width: 3, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        padding: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "600",
        textTransform: 'uppercase',
        paddingBottom: 10
    },
    cartContainer: {
        overflow: 'scroll'
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888'
    },
    cartItem: {
        backgroundColor: "#3c93cb",
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        marginRight: 5,
    },
    selectAllContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    checkbox: {
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    selectAllText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    deleteText: {
        color: '#3c93cb',
        fontWeight: 'bold'
    },
    productInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productImage: {
        width: 50,
        height: 50
    },
    productDetails: {
        flexShrink: 1,
        maxWidth: "60%"
    },
    productName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    productPrice: {
        color: "#fafafa",
        fontSize: 16
    },
    productStock: {
        color: "#fafafa",
        fontSize: 14
    },
    actionContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    button: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    buttonText: {
        color: "black",
        fontSize: 14
    },
    quantity: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    deleteButton: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        borderColor: 'white'
    },
    footer: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        gap: 20,
        shadowColor: "#aeaeae",
        shadowOffset: { width: 3, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 2,
    },
    footerContainer: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        gap: 20
    },
    summaryTitle: {
        fontSize: 22,
        fontWeight: '600'
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    totalText: {
        fontSize: 18
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '600'
    },
    buyButton: {
        backgroundColor: '#3c93cb',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buyButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: '600'
    },
});

export default CartScreen;
