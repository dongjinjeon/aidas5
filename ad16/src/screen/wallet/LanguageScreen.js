import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to the next screen after step 12
      navigation.navigate('NextScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Step {currentStep} of 12</Text>
      
      {/* Content for each step will go here */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {`Content for step ${currentStep}`}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  stepText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageScreen;
