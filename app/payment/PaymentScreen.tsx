import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Icon
import AntDesign from '@expo/vector-icons/AntDesign';

export default function PaymentScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={router.back}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Checkout</Text>
            </View>






            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ color: 'white' }}>Check Out Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 10,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
});
