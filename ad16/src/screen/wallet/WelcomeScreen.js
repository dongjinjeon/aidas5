import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>환영합니다.</Text>
        <Text style={styles.message}>
          전세계인과 함께하는 글로벌 플랫폼에{'\n'}
          오신 것을 환영합니다. Web 3.0 시대의{'\n'}
          성장과 성공, 그리고 수익 창출의 시작이{'\n'}
          이제 당신과 함께합니다.
        </Text>
        <Text style={styles.coinMessage}>
          회원 가입 축하 <Text style={styles.coinAmount}>20,000 PTC</Text>가{'\n'}
          지급 되었습니다.{'\n'}
          확인을 눌러 코인을 수령하세요.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="확인"
          onPress={() => navigation.navigate('EmptyReferral')}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>

      <Text style={styles.footer}>
        Being protected by AIDAS certified security tech usage
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F2D',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  coinMessage: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  coinAmount: {
    color: '#4FD1C5',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: '#4FD1C5',
    fontSize: 12,
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default WelcomeScreen; 