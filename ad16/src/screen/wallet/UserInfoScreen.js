import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const UserInfoScreen = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isAllAgreed, setIsAllAgreed] = useState(false);

    const handleConfirm = () => {
        if (nickname.trim() && birthdate.trim() && isAllAgreed) {
            Alert.alert(
                '',  // 제목 없음
                '본인 확인을 위해 휴대폰 인증이 필요합니다',
                [
                    {
                        text: '확인',
                        onPress: () => navigation.navigate('PhoneVerification'),
                        style: 'default',
                    },
                ],
                { cancelable: false }
            );
        }
    };

    const toggleAllAgreed = () => {
        setIsAllAgreed(!isAllAgreed);
    };

    const handleSubmit = () => {
        navigation.navigate('PhoneVerification');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>닉네임</Text>
                <TextInput
                    style={styles.input}
                    placeholder="닉네임을 입력해주세요"
                    placeholderTextColor="#999999"
                    value={nickname}
                    onChangeText={setNickname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>생년월일</Text>
                <TextInput
                    style={styles.input}
                    placeholder="생년월일을 입력해주세요 (ex_19850425)"
                    placeholderTextColor="#999999"
                    value={birthdate}
                    onChangeText={setBirthdate}
                    keyboardType="numeric"
                    maxLength={8}
                />
            </View>

            <View style={styles.termsContainer}>
                <TouchableOpacity 
                    style={styles.termsHeaderContainer} 
                    onPress={toggleAllAgreed}
                >
                    <View style={[styles.checkbox, isAllAgreed && styles.checked]}>
                        {isAllAgreed && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.termsTitle}>전체 동의</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')} style={styles.linkContainer}>
                    <Text style={styles.termsLink}>서비스 약관 {'>'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')} style={styles.linkContainer}>
                    <Text style={styles.termsLink}>개인정보 처리방침 {'>'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={[
                    styles.confirmButton, 
                    (!nickname.trim() || !birthdate.trim() || !isAllAgreed) && styles.disabledButton
                ]}
                onPress={handleConfirm}
                disabled={!nickname.trim() || !birthdate.trim() || !isAllAgreed}
            >
                <Text style={styles.confirmText}>완료</Text>
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
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333333',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        fontSize: 16,
        paddingVertical: 8,
        color: '#333333',
    },
    termsContainer: {
        marginTop: 20,
    },
    termsHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#0A7C7C',
        borderColor: '#0A7C7C',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    termsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    linkContainer: {
        paddingLeft: 36,  // checkbox width + margin
    },
    termsLink: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 12,
    },
    confirmButton: {
        backgroundColor: '#0A7C7C',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserInfoScreen;