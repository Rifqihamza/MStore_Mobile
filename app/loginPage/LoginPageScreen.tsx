import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

const LoginPageScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button To Home */}
            <TouchableOpacity onPress={() => router.navigate('/')} style={styles.backToHome}>
                <FontAwesome name="arrow-left" size={24} color="black" />
                <Text style={styles.backToHomeTitle}>Kembali</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <View style={styles.containerForm}>
                    <View style={styles.headerTitle}>
                        <View>
                            <Text style={styles.title}>MitraStore</Text>
                            <Text style={styles.titleChild}>login Dahulu Ya!</Text>
                        </View>
                        <Image source={require("@/assets/images/mitraLogo.png")} style={styles.logo} />
                    </View>

                    {/* Simulated Fieldset */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLegend}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={'#000'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLegend}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={'#000'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>




                    {/* Action Login Button */}
                    <View style={styles.actionButton}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.gapAction}>
                            <Text style={styles.gapActionLegend}>Atau</Text>
                        </View>
                        <TouchableOpacity style={styles.googleButton}>
                            <Image source={require("@/assets/images/googleLogo.png")} style={styles.googleIcon} />
                            <Text style={styles.googleText}>Google</Text>
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
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    backToHome: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backToHomeTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    containerForm: {
        backgroundColor: "#fff",
        borderRadius: 20,
        height: "auto",
        width: "100%",
        padding: 30,

        elevation: 5,

        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
    },
    headerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 100 / 2,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 26,
    },
    titleChild: {
        fontSize: 16,
    },
    inputContainer: {
        position: "relative",
        marginBottom: 20,
    },
    inputLegend: {
        position: "absolute",
        top: -10,
        left: 15,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        zIndex: 1
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: "column",
        gap: 20,
    },
    gapAction: {
        height: 2,
        backgroundColor: "#eee",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    gapActionLegend: {
        position: "absolute",
        top: -10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        zIndex: 1,
    },

    button: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    googleButton: {
        backgroundColor: "#fff",

        paddingVertical: 15,
        borderRadius: 15,

        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

        elevation: 5,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleText: {
        fontSize: 20,
        fontWeight: "600",
    }
});

export default LoginPageScreen;
