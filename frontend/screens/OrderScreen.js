import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const OrderItemRow = ({ item }) => (
  <View style={styles.orderItemRow}>
    <Text style={styles.itemQuantity}>{item.quantity}x</Text>
    <Text numberOfLines={1} style={[styles.itemName, { flex: 1, fontSize: 15, color: '#333' }]}>
      {item.name}
    </Text>
    <Text style={styles.itemPrice}>${(item.price * item.quantity / 100).toFixed(2)}</Text>
  </View>
);

export default function OrderScreen({ route, navigation }) {
  const { orderedItems, total, address, payment } = route.params || { orderedItems: [], total: 0, address: '', payment: '' };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.confirmationCard}>
          <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
          <Text style={styles.statusText}>Order Confirmed</Text>
          <Text style={styles.subStatusText}>Estimated Delivery: 30 - 45 min</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          <View style={styles.separator} />
          {orderedItems.map((item, idx) => (
            <OrderItemRow key={item._id || idx} item={item} />
          ))}
          <View style={styles.separator} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>${(total / 100).toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <Text style={styles.infoText}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {address || 'Not provided'}</Text>
          <Text style={styles.infoText}><Text style={{ fontWeight: 'bold' }}>Payment:</Text> {payment || 'Not provided'}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.trackOrderButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.trackOrderText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },
  confirmationCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 20, elevation: 2 },
  statusText: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#4CAF50' },
  subStatusText: { fontSize: 16, color: '#666', marginTop: 5 },
  detailSection: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },
  orderItemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemQuantity: { fontSize: 15, color: '#888', width: 30 },
  itemName: { fontSize: 15, color: '#333' },
  itemPrice: { fontSize: 15, fontWeight: '600', color: '#FF9900' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  summaryLabel: { fontSize: 17, fontWeight: 'bold' },
  totalValue: { fontSize: 17, fontWeight: 'bold', color: '#FF9900' },
  infoText: { fontSize: 15, color: '#555', lineHeight: 22 },
  footer: { paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10, backgroundColor: 'white' },
  trackOrderButton: { backgroundColor: '#FF9900', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  trackOrderText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});