import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    SafeAreaView
} from 'react-native';

const ChangePasswordPages = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        // Basic validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Semua field harus diisi.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Kata sandi baru tidak cocok.');
            return;
        }
        // TODO: Panggil API untuk ganti password
        Alert.alert('Sukses', 'Password berhasil diubah!');
    };

    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Kata Sandi Lama"
                        secureTextEntry
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Kata Sandi Baru"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Konfirmasi Kata Sandi Baru"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Konfirmasi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    backButton: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    backButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    container: {
        padding: 20,
    },
    innerContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,

        shadowColor: '#aeaeae',
        shadowOpacity: 0.5,
        shadowRadius: 5,

        elevation: 5
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ChangePasswordPages;
