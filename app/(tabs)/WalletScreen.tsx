import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from '@expo/vector-icons/Ionicons';

const WalletScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saldo = [{ id: 1, saldoTotal: 1500000 }];
  const saldoHistory = [
    { id: "1", date: "2025-03-08", amount: 50000, description: "Top-up saldo" },
    { id: "2", date: "2025-03-08", amount: -20000, description: "Beli Wearpack Elektronika Industri" },
  ];

  const formattedDate = (date: Date): string => date.toISOString().split('T')[0];
  const filteredHistory = saldoHistory.filter(item => item.date === formattedDate(selectedDate));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerSaldo}>
        <View style={styles.innerSaldo}>
          <Text style={styles.title}>MitraSaldo</Text>
          {saldo.map((sisaSaldo) => (
            <View key={sisaSaldo.id} style={styles.saldoContainer}>
              <Ionicons name="wallet-outline" size={36} color="#3c93cb" />
              <Text style={styles.textSaldo}>{isVisible ? `Rp ${sisaSaldo.saldoTotal.toLocaleString("id-ID")}` : "Rp ******"}</Text>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Ionicons name={isVisible ? "eye-outline" : "eye-off-outline"} size={30} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.history}>
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Riwayat Saldo</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                style={styles.dateInput}
                value={formattedDate(selectedDate)}
                editable={false}
                placeholder="Pilih tanggal"
              />
            </TouchableOpacity>
          </View>

          {/* Android Date Picker (Inline) */}
          {showPicker && Platform.OS === 'android' && (
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

          {/* iOS Date Picker (Modal) */}
          {Platform.OS === 'ios' && (
            <Modal visible={showPicker} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => date && setSelectedDate(date)}
                  />
                  <TouchableOpacity style={styles.modalButton} onPress={() => setShowPicker(false)}>
                    <Text style={styles.modalButtonText}>Pilih</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

          <FlatList
            data={filteredHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyDescription}>{item.description}</Text>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={[styles.historyAmount, { color: item.amount < 0 ? 'red' : 'green' }]}>Rp {item.amount.toLocaleString("id-ID")}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noDataText}>Tidak ada data untuk tanggal ini.</Text>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerSaldo: {
    padding: 20,
  },
  innerSaldo: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  saldoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textSaldo: {
    fontWeight: "700",
    fontSize: 24,
    flex: 1,
  },
  history: {
    flex: 1,
    padding: 20,
  },
  historyContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  historyItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  historyDescription: {
    fontSize: 18,
    fontWeight: "600",
  },
  historyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  historyDate: {
    fontSize: 16,
    color: "gray",
  },
  historyAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#3c93cb",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#3c93db",
    fontWeight: "600",
  },
  /* Modal Styles */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%"
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#3c93cb",
    padding: 10,
    borderRadius: 5
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },

  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default WalletScreen;
