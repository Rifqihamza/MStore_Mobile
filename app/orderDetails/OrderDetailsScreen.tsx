import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const OrderDetailsScreen = () => {
    const { id, name, date, total, price, uri } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            <Image source={{ uri: Array.isArray(uri) ? uri[0] : uri }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>Order ID: {id}</Text>
            <Text style={styles.info}>Date: {date}</Text>
            <Text style={styles.info}>Price: {price}</Text>
            <Text style={styles.total}>Total: {total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6347',
        marginTop: 10,
    },
});

export default OrderDetailsScreen;
