import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WelcomeModalScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>축하합니다!{'\n'}포텐 세계에 들어오셨습니다</Text>
        
        <Image 
          source={require('../../assets/images/community.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          파트너를 초대하면{'\n'}
          파트너에게 <Text style={styles.highlight}>5,000 PCT</Text>를 드려요.
        </Text>

        <Text style={styles.subText}>
          회원님은 5,000 PCT를 받고{'\n'}
          그를 실적을 만드는 파트너들과 함께{'\n'}
          더 큰 보상을 받아가세요.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('WalletMain');
          }}>
          <Text style={styles.buttonText}>함께하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  highlight: {
    color: '#4FD1C5',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WelcomeModalScreen;