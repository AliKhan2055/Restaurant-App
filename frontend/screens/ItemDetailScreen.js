// screens/ItemDetailScreen.js

import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../context/CartContext';


const primaryColor = '#FF9900';

// >>> PUT YOUR URL HERE <<<
const ITEM_DETAIL_BG_URL = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';


export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Custom background logic (same pattern as previous screens)
  const customBackgroundURL = route?.params?.backgroundImageURL;
  const finalBackgroundURL = customBackgroundURL || ITEM_DETAIL_BG_URL;

  const pricePerItem = item.price / 100;
  const totalPrice = (pricePerItem * quantity).toFixed(2);

  const handleQuantityChange = type => {
    if (type === 'increase') setQuantity(q => q + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    Alert.alert('Added to Cart', `${quantity}x ${item.name} added!`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    // WRAPPED ENTIRE SAFE AREA IN IMAGE BACKGROUND
    <ImageBackground source={{ uri: finalBackgroundURL }} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.detailsBox}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.restaurantName}>From: {item.restaurant || 'Monal Restaurant'}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price:</Text>
              <Text style={styles.priceValue}>${pricePerItem.toFixed(2)}</Text>
            </View>

            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleQuantityChange('decrease')}>
                  <Ionicons name="remove-circle" size={30} color={quantity > 1 ? primaryColor : '#AAA'} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange('increase')}>
                  <Ionicons name="add-circle" size={30} color={primaryColor} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalDisplay}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPriceValue}>${totalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  // ADDED background style for ImageBackground
  background: { flex: 1, width: '100%', height: '100%' }, 
  // CHANGED safeArea to be transparent so the background shows through
  safeArea: { flex: 1, backgroundColor: 'transparent' }, 

  itemImage: { width: '100%', height: 250, resizeMode: 'cover' },
  detailsBox: { padding: 20, backgroundColor: '#FFF' }, // Added white background to detailsBox for readability
  itemName: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  restaurantName: { fontSize: 16, color: primaryColor, fontWeight: '600', marginBottom: 15 },
  itemDescription: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 20 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  priceLabel: { fontSize: 18, color: '#555', marginRight: 10 },
  priceValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  quantityContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EEE' },
  quantityLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', width: 120, justifyContent: 'space-between' },
  quantityText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'space-between' },
  totalDisplay: { flexDirection: 'row', alignItems: 'baseline' },
  totalText: { fontSize: 16, color: '#666', marginRight: 5 },
  totalPriceValue: { fontSize: 24, fontWeight: 'bold', color: primaryColor },
  addToCartButton: { backgroundColor: primaryColor, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, minWidth: 150, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});