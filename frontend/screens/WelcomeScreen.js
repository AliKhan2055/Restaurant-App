import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons'; 

export default function WelcomeScreen({ navigation }) {
    
    // Using the working Imgur link for the food background image
    const BACKGROUND_IMAGE_URI = 'https://c0.wallpaperflare.com/preview/159/307/795/burger-food-hamburger-eat.jpg'; 
    
    return (
        <ImageBackground 
            source={{ uri: BACKGROUND_IMAGE_URI }} 
            style={styles.background}
            resizeMode="cover" 
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            
            {/* Dark, strong overlay for text readability against the busy image */}
            <View style={styles.overlay} />
            
            <SafeAreaView style={styles.contentContainer}>
                
                {/* The top spacer (View style={styles.spacer}) is REMOVED 
                  to allow justifyContent: 'center' to work effectively.
                */}
                
                {/* Text Block */}
                <View style={styles.textBlock}>
                    <Text style={styles.heyText}>Hey!</Text>
                    
                    <View style={styles.foodieContainer}>
                        <Text style={styles.foodieText}>   Foodie</Text>
                        
                        {/* Chili Icon using FontAwesome5 for reliability */}
                        <FontAwesome5 
                            name="pepper-hot" 
                            size={40} 
                            color="#FFD700" // Yellow/Gold color
                            style={styles.chiliIcon}
                        />
                    </View>
                    <Text style={styles.tagline}>Let's find your favorite food.</Text>
                </View>

                {/* Get Started Button */}
                <TouchableOpacity 
                    style={styles.getStartedButton} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.getStartedButtonText}>GET STARTED</Text>
                    <Feather name="arrow-right" size={24} color="#FFF" style={styles.arrowIcon} />
                </TouchableOpacity>

                {/* The bottom spacer is kept small for aesthetic padding */}
                <View style={styles.bottomSpacer} />

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0)', 
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        // 🛑 KEY CHANGE: This centers all content vertically 🛑
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    // The top 'spacer' style object is no longer needed here.
    bottomSpacer: {
        height: 50, // Small bottom padding
    },
    textBlock: {
        alignItems: 'center',
        marginBottom: 40, // Space between text block and button
    },
    heyText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: -10, 
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
    },
    foodieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    foodieText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFD700',
        marginRight: 10, 
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
    },
    chiliIcon: {
        marginTop: 5, 
        color: '#0f5306ff', 
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    tagline: {
        fontSize: 20,
        color: '#EEE',
        textAlign: 'center',
        lineHeight: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    getStartedButton: {
        flexDirection: 'row',
        backgroundColor: '#FF9900',
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', 
        alignSelf: 'center', 
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    getStartedButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    arrowIcon: {
        // Style inherited
    },
});