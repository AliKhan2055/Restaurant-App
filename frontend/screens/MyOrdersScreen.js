// screens/MyOrdersScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { getToken } from '../utils/token';
import { Ionicons } from '@expo/vector-icons';

const API_BASE_URL = 'https://restaurant-delta-cyan.vercel.app/api';
// >>> PUT YOUR URL HERE <<<
const ORDERS_BG_URL = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';

const OrderCard = ({ order, onDelete }) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</Text>
      <TouchableOpacity onPress={() => onDelete(order._id)}>
        <Ionicons name="trash-bin" size={20} color="#FF6666" />
      </TouchableOpacity>
    </View>
    {order.items.map((item, idx) => (
      <Text key={idx} style={styles.itemText}>
        {item.quantity}x {item.name} - ${(item.price * item.quantity / 100).toFixed(2)}
      </Text>
    ))}
    <Text style={styles.totalText}>Total: ${(order.total / 100).toFixed(2)}</Text>
  </View>
);

export default function MyOrdersScreen({ route, navigation }) { // Added route for consistency
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom background logic
  const customBackgroundURL = route?.params?.backgroundImageURL;
  const finalBackgroundURL = customBackgroundURL || ORDERS_BG_URL;

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${API_BASE_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (e) {
      console.log('LOAD ORDERS ERROR:', e.response?.data || e.message);
      Alert.alert('Error', e.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    Alert.alert('Delete Order', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await getToken();
            await axios.delete(`${API_BASE_URL}/orders/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(prev => prev.filter(o => o._id !== id));
          } catch (e) {
            Alert.alert('Error', 'Could not delete order');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7' }}>
        <ActivityIndicator size="large" color="#FF9900" />
      </View>
    );
  }

  return (
    // WRAPPED ENTIRE SAFE AREA IN IMAGE BACKGROUND
    <ImageBackground source={{ uri: finalBackgroundURL }} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {orders.length === 0 ? (
            // Added background color to ensure text readability over the image
            <View style={styles.noOrdersContainer}> 
               <Text style={styles.noOrdersText}>You have no orders yet.</Text>
            </View>
          ) : (
            orders.map(order => <OrderCard key={order._id} order={order} onDelete={deleteOrder} />)
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ADDED style for ImageBackground
  background: { flex: 1, width: '100%', height: '100%' }, 
  // CHANGED style to be transparent so the background shows through
  safeArea: { flex: 1, backgroundColor: 'transparent' }, 
  // Extracted padding from container and moved it to ScrollView content container
  scrollViewContent: { padding: 15, paddingBottom: 30 }, 

  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FF9900',
  },
  noOrdersContainer: { // New container for empty message
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    marginHorizontal: 15, // Apply margin here since main container padding was removed
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});