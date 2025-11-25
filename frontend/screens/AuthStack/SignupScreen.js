// screens/AuthStack/SignupScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_BASE_URL = 'https://restaurant-delta-cyan.vercel.app/api';
const BACKGROUND_IMAGE_URI = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (!firstName || !email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, { firstName, email, password });
      setLoading(false);
      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully! Please log in.');
        navigation.replace('Login');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Registration failed. Try again.';
      Alert.alert('Registration Error', errorMessage);
    }
  };

  return (
    <ImageBackground source={{ uri: BACKGROUND_IMAGE_URI }} style={styles.background} resizeMode="cover">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create Account</Text>
          <Text style={styles.subtitle}>Enter your details below to get started.</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#666" value={firstName} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#666" secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#666" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0)' },
  headerContainer: { marginBottom: 40, alignItems: 'flex-start' },
  header: { fontSize: 36, fontWeight: 'bold', marginBottom: 5, color: '#FFF', textShadowColor: 'rgba(0, 0, 0, 0.4)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  subtitle: { fontSize: 16, color: '#FFF' },
  formContainer: { width: '100%' },
  input: { height: 55, borderColor: '#FF9900', borderWidth: 2, borderRadius: 12, paddingHorizontal: 20, marginBottom: 18, backgroundColor: '#FFF', fontSize: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  button: { backgroundColor: '#FF9900', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 20, elevation: 5 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { fontSize: 14, color: '#FFF' },
  loginLink: { fontSize: 14, fontWeight: 'bold', color: '#FF9900' },
});