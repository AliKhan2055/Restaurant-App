// screens/MainTabs/CartScreen.js
import React, { useState } from 'react';
import {
  ImageBackground, View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Alert, Modal, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getToken } from '../../utils/token';
import { useCart } from '../../context/CartContext'; // Use the context provided

const CART_BG_URL = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';

const CartItem = ({ item }) => {
  const { updateQuantity } = useCart();
  return (
    <View style={styles.cartItemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity / 100).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity - 1)}>
          <Ionicons name="remove-circle-outline" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity + 1)}>
          <Ionicons name="add-circle-outline" size={24} color="#FF9900" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CartScreen({ route, navigation }) {
  const { cartItems, clearCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  // Added background image customization
  const customBackgroundURL = route?.params?.backgroundImageURL;
  const finalBackgroundURL = customBackgroundURL || CART_BG_URL;

  // Prices are in cents, so we calculate total and divide by 100 for display
  const subTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = cartItems.length ? 500 : 0; // Assuming $5.00 delivery if cart is not empty
  const total = subTotal + delivery;

  const openCheckout = () => {
    if (!cartItems.length) return;
    setModalVisible(true);
  };

  const submitOrder = async () => {
    if (!address.trim() || !payment.trim()) {
      Alert.alert('Please fill address & payment');
      return;
    }
    setModalVisible(false);

    const items = cartItems.map(i => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price
    }));
    const payload = {
      items,
      total,
      address: address.trim(),
      paymentMethod: payment.trim()
    };

    try {
      const token = await getToken();
      await axios.post('http://192.168.100.2:5000/api/orders', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
     // clearCart();
     // FIX: Restored navigation to OrderScreen
      navigation.navigate('OrderScreen', { orderedItems: cartItems, total, address: address.trim(), payment: payment.trim() }); 
    } catch (e) {
      Alert.alert('Order failed', e.response?.data?.message || 'Try again');
    }
  };

  const isEmpty = cartItems.length === 0;

  return (
    <ImageBackground source={{ uri: finalBackgroundURL }} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Cart ({cartItems.length})</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {isEmpty ? (
            <View style={styles.emptyCartContainer}>
              <Ionicons name="basket-outline" size={80} color="#999" />
              <Text style={styles.emptyCartText}>Your cart is empty.</Text> 
              <Text style={styles.emptyCartSubText}>Add some delicious food to place an order!</Text>
            </View>
          ) : (
            <>
              {/* FIX: Use index as a fallback key to ensure items render */}
              {cartItems.map((item, index) => <CartItem key={item._id || index} item={item} />)}
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Sub Total</Text>
                  <Text style={styles.summaryValue}>${(subTotal / 100).toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Charge</Text>
                  <Text style={styles.summaryValue}>${(delivery / 100).toFixed(2)}</Text>
                </View>
                <View style={styles.summarySeparator} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${(total / 100).toFixed(2)}</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        {!isEmpty && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.placeOrderButton} onPress={openCheckout}>
              <Text style={styles.placeOrderText}>Place Order (${(total / 100).toFixed(2)})</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ======  ADDRESS / PAYMENT MODAL  ====== */}
        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Delivery details</Text>
              <TextInput placeholder="Delivery address" value={address} onChangeText={setAddress} style={styles.input} />
              <TextInput placeholder="Payment method (e.g. Cash, Card ****1234)" value={payment} onChangeText={setPayment} style={styles.input} />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={submitOrder}>
                  <Text style={styles.submitTxt}>Confirm order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  header: { backgroundColor: '#FFF', paddingTop: 10, paddingBottom: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  // FIX: Added background and corrected text colors for visibility over dynamic background
  emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100, backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: 15, borderRadius: 10 }, 
  emptyCartText: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 15 }, 
  emptyCartSubText: { fontSize: 14, color: '#666', marginTop: 5, textAlign: 'center' },
  cartItemCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10, padding: 10, marginBottom: 10, alignItems: 'center' },
  itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 10, backgroundColor: '#FFDDAA' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDescription: { fontSize: 12, color: '#888', marginBottom: 5 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: '#333' },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  itemQuantity: { fontSize: 16, marginHorizontal: 10, fontWeight: '600' },
  summaryContainer: { backgroundColor: '#FFF', borderRadius: 10, padding: 20, marginTop: 20, marginBottom: 100, marginHorizontal: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 16, fontWeight: '600' },
  summarySeparator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#FF9900' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  placeOrderButton: { backgroundColor: '#FF9900', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  placeOrderText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  /* ---- modal ---- */
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelBtn: { flex: 1, marginRight: 8, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#CCC', borderRadius: 8 },
  cancelTxt: { color: '#666', fontWeight: '600' },
  submitBtn: { flex: 1, marginLeft: 8, paddingVertical: 12, alignItems: 'center', backgroundColor: '#FF9900', borderRadius: 8 },
  submitTxt: { color: '#FFF', fontWeight: 'bold' },
});