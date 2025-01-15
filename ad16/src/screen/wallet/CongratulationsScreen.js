import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CongratulationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.giftIcon}>
          <Text style={styles.giftText}>🎁</Text>
        </View>
        <Text style={styles.title}>회원가입을 축하드립니다.</Text>
        <Text style={styles.subtitle}>
          "POTEN에서 가입선물로{'\n'}
          20,000 코인을 드려요"
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}  // Updated to match navigator screen name
      >
        <Text style={styles.buttonText}>선물받기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A7C7C',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  giftIcon: {
    marginBottom: 30,
  },
  giftText: {
    fontSize: 72,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0A7C7C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CongratulationsScreen;
