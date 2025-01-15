import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';

const EmptyReferralScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <Text style={styles.title}>추천코드가 비어 있습니다</Text>
      
      <Text style={styles.description}>
        파트너 코드를 입력해야더 큰 보상을 받을 수{'\n'}
        있습니다. 파트너 코드를 입력해주세요.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="추천코드 입력"
          onPress={() => navigation.navigate('ReferralCode')}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.buttonText}
        />
        
        <Button
          title="파트너 찾기"
          onPress={() => {/* 파트너 찾기 처리 */}}
          buttonStyle={styles.secondaryButton}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 15,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4FD1C5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default EmptyReferralScreen; 