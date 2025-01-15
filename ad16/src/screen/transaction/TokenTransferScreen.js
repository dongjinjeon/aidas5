import axios from 'axios';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LMBackButton from '../../component/common/LMBackButton';
import { defaultBackground } from '../../component/common/LMStyle';
import { API_URL } from '../../config/config';

export default function TokenTransferScreen({ navigation }) {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [tokenType, setTokenType] = useState('AIDAS');

    const handleTransfer = async () => {
        if (!toAddress || !amount) {
            Alert.alert('알림', '받는 주소와 금액을 입력해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('action', 'transfer');
            formData.append('to_address', toAddress);
            formData.append('amount', amount);
            formData.append('token_type', tokenType);

            const response = await axios.post(`${API_URL}/transaction_api.php`, formData);
            
            if (response.data.success) {
                Alert.alert('성공', '전송이 요청되었습니다.', [
                    { text: '확인', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('오류', response.data.message);
            }
        } catch (error) {
            Alert.alert('오류', '전송 처리 중 오류가 발생했습니다.');
            console.error('Transfer failed:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'white'} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>토큰 전송</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>받는 주소</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="받는 사람의 지갑 주소를 입력하세요"
                        value={toAddress}
                        onChangeText={setToAddress}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>금액</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="전송할 금액을 입력하세요"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                <View style={styles.tokenSelector}>
                    <TouchableOpacity 
                        style={[styles.tokenButton, tokenType === 'AIDAS' && styles.tokenButtonActive]}
                        onPress={() => setTokenType('AIDAS')}
                    >
                        <Text style={[styles.tokenButtonText, tokenType === 'AIDAS' && styles.tokenButtonTextActive]}>
                            AIDAS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tokenButton, tokenType === 'BNB' && styles.tokenButtonActive]}
                        onPress={() => setTokenType('BNB')}
                    >
                        <Text style={[styles.tokenButtonText, tokenType === 'BNB' && styles.tokenButtonTextActive]}>
                            BNB
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
                    <Text style={styles.transferButtonText}>전송하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultBackground,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#009688',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    headerRight: {
        width: 40,
    },
    content: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    tokenSelector: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 10,
    },
    tokenButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    tokenButtonActive: {
        backgroundColor: '#009688',
    },
    tokenButtonText: {
        fontSize: 16,
        color: '#666',
    },
    tokenButtonTextActive: {
        color: 'white',
    },
    transferButton: {
        backgroundColor: '#009688',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    transferButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
