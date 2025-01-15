import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/common/Header';
import axios from 'axios';
import { API_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneVerification = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleSendCode = async () => {
        if (!phoneNumber) {
            Alert.alert('알림', '휴대폰 번호를 입력해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('action', 'send_code');
            formData.append('phone', phoneNumber);

            const response = await axios.post(`${API_URL}/auth/check_member.php`, formData);
            console.log('Send code response:', response.data);

            if (response.data.success) {
                setIsCodeSent(true);
                Alert.alert('알림', '인증번호가 전송되었습니다.');
            } else {
                Alert.alert('오류', response.data.message || '인증번호 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('Send code error:', error);
            Alert.alert('오류', '인증번호 전송 중 오류가 발생했습니다.');
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) {
            Alert.alert('알림', '인증번호를 입력해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('action', 'verify_code');
            formData.append('phone', phoneNumber);
            formData.append('code', verificationCode);

            const response = await axios.post(`${API_URL}/auth/check_member.php`, formData);
            console.log('Verify code response:', response.data);

            if (response.data.success) {
                // 인증 성공 시 전화번호 저장
                await AsyncStorage.setItem('userPhone', phoneNumber);
                
                // WalletMain 화면으로 이동
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'WalletMain' }],
                });
            } else {
                Alert.alert('오류', response.data.message || '인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('Verify code error:', error);
            Alert.alert('오류', '인증 중 오류가 발생했습니다.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="휴대폰 인증" />
            <View style={styles.content}>
                <Text style={styles.description}>
                    휴대폰 번호를 입력하시면{'\n'}
                    인증번호를 보내드립니다
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="휴대폰 번호 입력"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={handleSendCode}
                    >
                        <Text style={styles.sendButtonText}>인증번호 전송</Text>
                    </TouchableOpacity>

                    {isCodeSent && (
                        <>
                            <TextInput
                                style={[styles.input, styles.verificationInput]}
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                keyboardType="number-pad"
                            />
                            <TouchableOpacity 
                                style={styles.verifyButton}
                                onPress={handleVerifyCode}
                            >
                                <Text style={styles.verifyButtonText}>확인</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 24,
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    verificationInput: {
        marginTop: 15,
    },
    sendButton: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    verifyButton: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default PhoneVerification;