import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

const ReferralCodeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>친구의 추천 코드 입력</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>추천코드 (선택사항)</Text>
      
      <View style={styles.inputContainer}>
        <Input
          placeholder="추천코드 입력"
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.input}
          rightIcon={
            <TouchableOpacity>
              <Text style={styles.toggleButton}>불러보기</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <Button
        title="확인"
        onPress={() => navigation.navigate('WelcomeModal')}
        buttonStyle={styles.confirmButton}
        titleStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputWrapper: {
    paddingHorizontal: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  toggleButton: {
    color: '#4FD1C5',
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReferralCodeScreen; 