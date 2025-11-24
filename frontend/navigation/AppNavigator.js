// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';

// ----------  IMPORT SCREENS  ----------
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/AuthStack/LoginScreen';
import SignupScreen from '../screens/AuthStack/SignupScreen';
import HomeScreen from '../screens/MainTabs/HomeScreen';
import CartScreen from '../screens/MainTabs/CartScreen';
import ProfileScreen from '../screens/MainTabs/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';

// ----------  NAVIGATORS  ----------
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const primaryColor = '#FF9900';

// ----------  TAB NAVIGATOR  ----------
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarStyle: { height: 60 },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} /> }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={24} color={color} /> }} />
     
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} /> }} />
    </Tab.Navigator>
  );
}

// ----------  ROOT STACK  ----------
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ title: 'Your Order', headerTitleAlign: 'center' }} />
      <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} options={{ title: 'My Orders', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}