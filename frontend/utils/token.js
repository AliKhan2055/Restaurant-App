// utils/token.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@monal_token';

export const saveToken = async (token) => AsyncStorage.setItem(TOKEN_KEY, token);
export const getToken  = async ()       => AsyncStorage.getItem(TOKEN_KEY);
export const clearToken = async ()      => AsyncStorage.removeItem(TOKEN_KEY);