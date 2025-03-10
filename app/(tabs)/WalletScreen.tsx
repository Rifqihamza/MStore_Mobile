import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from '@expo/vector-icons/Ionicons';

const WalletScreen = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saldo = [{ id: 1, saldoTotal: 1500000 }];

  const saldoHistory = [
    { id: "1", date: "2025-03-08", amount: 50000, description: "Top-up saldo" },
    { id: "2", date: "2025-03-08", amount: -20000, description: "Beli Wearpack Elektronika Industri" },
    { id: "3", date: "2025-03-08", amount: 150000, description: "Top-up saldo" },
    { id: "4", date: "2025-03-08", amount: 50000, description: "Top-up saldo" },
    { id: "5", date: "2025-03-08", amount: -20000, description: "Beli Wearpack Elektronika Industri" },
    { id: "6", date: "2025-03-08", amount: 150000, description: "Top-up saldo" },
    { id: "7", date: "2025-03-08", amount: 50000, description: "Top-up saldo" },
    { id: "8", date: "2025-03-08", amount: -20000, description: "Beli Wearpack Elektronika Industri" },
    { id: "9", date: "2025-03-08", amount: 150000, description: "Top-up saldo" },
    { id: "10", date: "2025-03-08", amount: 50000, description: "Top-up saldo" },
    { id: "11", date: "2025-03-08", amount: -20000, description: "Beli Wearpack Elektronika Industri" },
    { id: "12", date: "2025-03-08", amount: 150000, description: "Top-up saldo" },
  ];

  const formattedDate = (date: Date) => date.toISOString().split('T')[0];

  // Filter riwayat saldo berdasarkan tanggal yang dipilih
  const filteredHistory = saldoHistory.filter(item => item.date === formattedDate(selectedDate));

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Section Saldo */}
      <View style={styles.containerSaldo}>
        <View style={styles.innerSaldo}>
          <Text style={styles.greetingText}>Hallo, Saldo anda saat ini adalah</Text>

          {saldo.map((sisaSaldo) => (
            <View key={sisaSaldo.id} style={styles.saldoStyle}>
              <Ionicons name="wallet-outline" size={36} />

              {/* Tampilkan saldo atau sensor */}
              <Text style={styles.textSaldo}>
                {isVisible ? `Rp ${sisaSaldo.saldoTotal.toLocaleString("id-ID")}` : "Rp ******"}
              </Text>

              {/* Tombol untuk menampilkan/menyembunyikan saldo */}
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Ionicons name={isVisible ? "eye-outline" : "eye-off-outline"} size={30} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Section Riwayat Saldo */}
      <View style={styles.history}>
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Riwayat Saldo</Text>

            {/* Input untuk memilih tanggal */}
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                style={styles.dateInput}
                value={formattedDate(selectedDate)}
                editable={false}
                placeholder="Pilih tanggal"
              />
            </TouchableOpacity>

            {/* DateTimePicker */}
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowPicker(false);
                  if (date) setSelectedDate(date);
                }}
              />
            )}
          </View>
          {/* Menampilkan hasil filter */}
          <FlatList
            data={filteredHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: "600" }}>
                  {item.description}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontSize: 18, color: "gray" }}>{item.date}</Text>
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    Rp {item.amount.toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noDataText}>Tidak ada data untuk tanggal ini.</Text>}
          />

        </View>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1F4287",
  },
  containerSaldo: {
    padding: 20,
  },
  innerSaldo: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 15,
    flexDirection: "column",
    gap: 15,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "600",
  },
  saldoStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  textSaldo: {
    fontWeight: "600",
    fontSize: 24,
    flex: 1,
  },
  history: {
    padding: 20,
    flex: 1,
  },
  historyContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    height: "100%",
    gap: 10,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "100%"
  },
  historyItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default WalletScreen;
