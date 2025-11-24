// screens/MainTabs/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 30;
const primaryColor = '#FF9900';
// Define border style for re-use
const yellowBorder = {
  borderWidth: 2,
  borderColor: primaryColor,
};


// >>>  PUT YOUR URL HERE  <<<
const HOME_BG_URL = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg';

// mock data kept exactly as before
const carouselItems = [
  { id: 1, title: 'FRESH ARRIVALS', subtitle: "Discover Our New Menu Items!", image: 'https://www.foodandwine.com/thmb/unI19Zca77Flw0lRWV5dCLd1c-Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/marcella-hazan-roast-chicken-with-lemons-FT-RECIPE0420-05ed650d40fa4556988bc20b9d62500a.jpg' },
  { id: 2, title: 'SUMMER DEAL', subtitle: "20% Off All Drinks", image: 'https://cdn-food.tribune.com.pk/gallery/NGCyPRm8QAcM4xugOZcfJquaj0OCIccA9dDqqpFy.jpeg' },
  { id: 3, title: 'NEW CHEF SPECIAL', subtitle: "Monal's Deluxe Burger", image: 'https://www.cheapism.com/wp-content/uploads/2025/07/arch-deluxe-triple.original-570x321.jpg' },
  { id: 4, title: 'HAPPY HOURS', subtitle: "Free Dessert with Main Course", image: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/02/Tahini-Mississippi-mud-pie-a501eda.jpg' },
];

const API_BASE_URL = 'http://192.168.100.2:5000/api';
const categories = [
  { name: 'All', icon: 'list' },
  { name: 'Starters', icon: 'drumstick-bite' },
  { name: 'Main Course', icon: 'utensils' },
  { name: 'Drinks', icon: 'glass-martini' },
  { name: 'Desserts', icon: 'ice-cream' },
];

// ---------- helper components (UPDATED: CarouselItem border removed) ----------
const CategoryItem = ({ name, icon, isActive, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <View style={[styles.categoryIconCircle, yellowBorder, isActive && styles.activeCategoryIcon]}>
      <FontAwesome5 name={icon} size={24} color={isActive ? "#FFF" : primaryColor} />
    </View>
    <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>{name}</Text>
  </TouchableOpacity>
);

const PopularItemCard = ({ item, navigation }) => (
  <TouchableOpacity style={[styles.popularCard, yellowBorder]} onPress={() => navigation.navigate('ItemDetailScreen', { item })}>
    <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.popularImage} />
    <Text style={styles.popularName}>{item.name}</Text>
    <Text style={styles.popularPrice}>${(item.price / 100).toFixed(2)}</Text>
  </TouchableOpacity>
);

const CarouselItem = ({ item }) => (
  // REMOVED yellowBorder from here
  <TouchableOpacity style={styles.carouselItem} activeOpacity={0.8}>
    <Image source={{ uri: item.image }} style={styles.carouselImage} />
    <View style={styles.carouselOverlay}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

// ---------- main screen ----------
export default function HomeScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) setActiveIndex(roundIndex);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/menu`);
      const itemsWithId = response.data.map((item, index) => ({ ...item, _id: item._id || item.name + index }));
      setMenuItems(itemsWithId);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  return (
    <ImageBackground source={{ uri: HOME_BG_URL }} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView style={styles.scrollViewContent} contentContainerStyle={{ paddingBottom: 50 }}>
          {/* ---- search bar ---- */}
          <View style={[styles.searchContainer, yellowBorder]}>
            <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Search food by name..." value={searchQuery} onChangeText={setSearchQuery} />
          </View>

          {/* ---- carousel ---- */}
          <View style={styles.carouselWrapper}>
            <FlatList
              data={carouselItems}
              renderItem={({ item }) => <CarouselItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              style={styles.carouselList}
            />
            <View style={styles.pagination}>
              {carouselItems.map((_, index) => (
                <View key={index} style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]} />
              ))}
            </View>
          </View>

          {/* ---- categories ---- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((cat, index) => (
              <CategoryItem key={index} name={cat.name} icon={cat.icon} isActive={cat.name === activeCategory} onPress={() => setActiveCategory(cat.name)} />
            ))}
          </ScrollView>

          {/* ---- menu items ---- */}
          <View style={[styles.sectionHeader, { marginBottom: 10, marginTop: 5 }]}>
            <Text style={styles.sectionTitle}>{activeCategory === 'All' ? 'All Menu' : activeCategory + ' Menu'}</Text>
            <Text style={styles.seeAllText}>Showing {filteredItems.length} items</Text>
          </View>

          {filteredItems.length === 0 ? (
            <Text style={styles.noResultsText}>No items found matching your filter/search.</Text>
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={({ item }) => <PopularItemCard item={item} navigation={navigation} />}
              keyExtractor={(item, index) => item._id || item.name + index}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  scrollViewContent: { paddingHorizontal: 15 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    elevation: 1,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  // carouselWrapper no longer needs the border styles applied here
  carouselWrapper: { marginBottom: 20, borderRadius: 15, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  carouselList: { width: CAROUSEL_WIDTH, height: 180 },
  // carouselItem no longer applies the yellowBorder
  carouselItem: {
    width: CAROUSEL_WIDTH,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  carouselOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', padding: 20 },
  carouselTitle: { fontSize: 26, fontWeight: '900', color: '#FFF', lineHeight: 30 },
  carouselSubtitle: { fontSize: 16, color: primaryColor, fontWeight: 'bold', marginTop: 5 },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDot: { backgroundColor: primaryColor },
  inactiveDot: { backgroundColor: '#FFFFFF', opacity: 0.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  seeAllText: { fontSize: 14, color: primaryColor },
  categoriesContainer: { marginBottom: 20 },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeCategoryIcon: { backgroundColor: primaryColor },
  activeCategoryText: { color: primaryColor, fontWeight: 'bold' },
  categoryText: { fontSize: 14, color: '#555' },
  popularListContainer: {},
  row: { flex: 1, justifyContent: 'space-between', marginBottom: 10 },
  popularCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  popularImage: { width: 130, height: 130, borderRadius: 10, marginBottom: 10, backgroundColor: '#EAEAEA' },
  popularName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  popularPrice: { fontSize: 16, color: primaryColor, fontWeight: '700', marginBottom: 5 },
  noResultsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' }
});