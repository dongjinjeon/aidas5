import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const PinSuccessScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // 3초 후 자동으로 다음 화면으로 이동하는 부분은 제거
  }, []);

  const handleGiftButton = () => {
    setShowAlert(true);
  };

  const handleAlertResponse = (accepted) => {
    setShowAlert(false);
    if (accepted) {
      navigation.navigate('LocationPermission'); // Home 대신 LocationPermission으로 이동
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/poten-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>회원가입을 축하드립니다.</Text>
      <Image
        source={require('../../assets/images/gift.png')}
        style={styles.giftImage}
      />
      <Text style={styles.message}>
        "POTEN에서 가입선물로{'\n'}20,000 코인을 드려요"
      </Text>
      <Button
        title="선물받기"
        onPress={handleGiftButton}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      {/* 알림 모달 */}
      <Modal
        visible={showAlert}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>알림</Text>
            <Text style={styles.alertMessage}>
              POTEN에서 알림을 보내도록{'\n'}허용 하시겠습니까?
            </Text>
            <View style={styles.alertButtons}>
              <Button
                title="허용"
                onPress={() => handleAlertResponse(true)}
                buttonStyle={[styles.alertButton, styles.allowButton]}
                titleStyle={styles.alertButtonText}
              />
              <Button
                title="허용안함"
                onPress={() => handleAlertResponse(false)}
                buttonStyle={[styles.alertButton, styles.denyButton]}
                titleStyle={styles.alertButtonText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  giftImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  message: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4FD1C5',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 모달 스타일
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  alertButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  allowButton: {
    backgroundColor: '#008080',
  },
  denyButton: {
    backgroundColor: '#666',
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PinSuccessScreen; 