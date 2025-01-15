import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/common/Header';

const PhoneVerification = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleSendCode = () => {
        // Add your verification code sending logic here
        setIsCodeSent(true);
    };

    const handleVerifyCode = () => {
        // Add your verification logic here
        navigation.navigate('CreatePin');
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