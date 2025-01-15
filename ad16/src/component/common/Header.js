import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Header = ({ title, onBack }) => {
    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56 + getStatusBarHeight(),
        paddingTop: getStatusBarHeight(),
        backgroundColor: '#00A3B4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: getStatusBarHeight() + 16,
        zIndex: 1,
    },
    backText: {
        fontSize: 24,
        color: '#fff',
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Header; 