// screens/MainTabs/ProfileScreen.js
import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// >>>  PUT YOUR URL HERE  <<<
const PROFILE_BG_URL = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';

const ProfileOption = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <View style={styles.optionIconContainer}>
      <FontAwesome5 name={icon} size={20} color="#FF9900" />
    </View>
    <Text style={styles.optionText}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color="#888" />
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const user = global.user || { firstName: 'User', email: '—' };

  const handleLogout = () => {
    global.user = null;
    Alert.alert('Logout', 'You have been logged out.', [{ text: 'OK', onPress: () => navigation.replace('Welcome') }]);
  };

  return (
    <ImageBackground source={{ uri: PROFILE_BG_URL }} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.userInfoCard}>
            <FontAwesome5 name="user-circle" size={80} color="#FF9900" />
            <Text style={styles.userName}>{user.firstName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>

          <View style={styles.optionsSection}>
            <ProfileOption icon="utensils" text="My Orders" onPress={() => navigation.navigate('MyOrdersScreen')} />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  header: { backgroundColor: '#FFF', paddingVertical: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  container: { flex: 1, padding: 15 },
  userInfoCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 20, elevation: 2 },
  userName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  userEmail: { fontSize: 14, color: '#888' },
  optionsSection: { backgroundColor: '#FFF', borderRadius: 10, marginBottom: 20, overflow: 'hidden', elevation: 2 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  optionIconContainer: { width: 30, alignItems: 'center', marginRight: 15 },
  optionText: { flex: 1, fontSize: 16, color: '#333' },
  logoutButton: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#FFDDDD', marginBottom: 30 },
  logoutText: { color: '#FF6666', fontSize: 18, fontWeight: 'bold' },
});