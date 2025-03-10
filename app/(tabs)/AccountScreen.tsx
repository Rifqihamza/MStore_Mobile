import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, SectionList, TouchableOpacity, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const AccountScreen = () => {
  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out") }
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
        <Image source={require('@/assets/images/react-logo.png')} style={styles.backgroundImage} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.profilePict} />
          <View>
            <Text style={styles.profileName}>Muhammad Rifqi Hamza</Text>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text style={styles.profileDetail}>+62 812 345 678</Text>
              <Text style={styles.profileDetail}>example@gmail.com</Text>
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
            <FontAwesome5 name={item.icon} size={18} color="white" />
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={18} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F4287',
  },
  containerProfile: {
    height: 200,
    padding: 20,
    position: 'relative',
    justifyContent: 'center'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    right: '-50%',
    top: 20,
    opacity: 0.2,

  },
  profilePict: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDetail: {
    color: 'white',
    fontSize: 16,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#1F4287',},
  sectionHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
  },
  itemText: {
    color: 'white',
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
    borderColor: 'white'
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
