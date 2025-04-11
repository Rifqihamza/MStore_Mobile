import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { accountData } from '@/dummyDataProduct/accountData';

const AccountScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const user = accountData[0]; // Ambil data pengguna pertama

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  const sections = [
    {
      title: 'Pengaturan Akun',
      data: [
        { id: 1, name: 'Edit Profile', icon: 'user-edit' },
        { id: 2, name: 'Ganti Kata Sandi', icon: 'key' },
        { id: 3, name: 'Kelola Metode Pembayaran', icon: 'credit-card' },
        { id: 4, name: 'Notifikasi', icon: 'bell' },
        { id: 5, name: 'Pengaturan Keamanan', icon: 'shield-alt' },
      ],
    },
    {
      title: 'Riwayat Aktivitas',
      data: [
        { id: 6, name: 'Riwayat Transaksi', icon: 'file-invoice-dollar' },
        { id: 7, name: 'Riwayat Login', icon: 'history' },
      ],
    },
    {
      title: 'Fitur Lainnya',
      data: [
        { id: 8, name: 'Bantuan atau pusat dukungan', icon: 'info-circle' },
        { id: 9, name: 'Kebijakan privasi & syarat penggunaan', icon: 'book' },
        { id: 10, name: 'Tentang Aplikasi', icon: 'info' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Profile */}
      <View style={styles.containerProfile}>
        <Image source={user.backgroundImage} style={styles.backgroundImage} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Image source={user.profilePicture} style={styles.profilePict} />
          <View>
            <Text style={styles.profileName}>{user.name}</Text>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text style={styles.profileDetail}>{user.phone}</Text>
              <Text style={styles.profileDetail}>{user.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <FontAwesome5 name={item.icon} size={18} color="black" />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableHighlight
        onPress={handleLogout}
        onShowUnderlay={() => setIsPressed(true)}
        onHideUnderlay={() => setIsPressed(false)}
        underlayColor="transparent"
        style={isPressed ? styles.logoutButtonPressed : styles.logoutButton}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <FontAwesome5
            name="sign-out-alt"
            size={18}
            color={isPressed ? '#000' : '#3c93cb'}
          />
          <Text style={[styles.logoutText, isPressed && { color: '#000' }]}>
            Logout
          </Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerProfile: {
    height: 250,
    padding: 20,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    right: '-50%',
    opacity: 0.2,
    resizeMode: 'contain',
  },
  profilePict: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDetail: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#fff',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    margin: 20,
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3c93cb',
  },
  logoutButtonPressed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    margin: 20,
    borderRadius: 15,
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
  },
  logoutText: {
    color: '#3c93cb',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;