import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const LocationPermissionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>위치정보</Text>
      <Text style={styles.subtitle}>
        POTEN에서 이 기기의 위치 정보에{'\n'}엑세스 하도록 허용하시겠습니까?
      </Text>

      <View style={styles.locationTypes}>
        <View style={styles.locationType}>
          <View style={styles.locationIconContainer}>
            <Image 
              source={require('../../assets/images/precise-location.png')} 
              style={styles.locationIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.locationTitle}>정확한 위치</Text>
        </View>

        <View style={styles.locationType}>
          <View style={styles.locationIconContainer}>
            <Image 
              source={require('../../assets/images/approximate-location.png')} 
              style={styles.locationIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.locationTitle}>대략적인 위치</Text>
        </View>
      </View>

      <Button
        title="앱 사용중에만 허용"
        onPress={() => navigation.navigate('Welcome')}
        buttonStyle={styles.appUseButton}
        titleStyle={styles.appUseButtonText}
      />
      
      <Button
        title="이번만 허용"
        onPress={() => navigation.navigate('Welcome')}
        buttonStyle={styles.allowOnceButton}
        titleStyle={styles.buttonText}
      />
      
      <Button
        title="허용안함"
        onPress={() => navigation.navigate('Welcome')}
        buttonStyle={styles.denyButton}
        titleStyle={styles.buttonText}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
  },
  locationTypes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  locationType: {
    alignItems: 'center',
    flex: 1,
  },
  locationIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 70,
    height: 70,
    tintColor: '#666',
  },
  locationTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  appUseButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    marginBottom: 10,
  },
  appUseButtonText: {
    color: '#0066FF',
    fontSize: 16,
    fontWeight: 'normal',
  },
  allowOnceButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  denyButton: {
    backgroundColor: '#666',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationPermissionScreen; 