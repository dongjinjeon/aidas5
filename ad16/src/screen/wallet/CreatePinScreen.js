import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/common/Header';
import PinInput from '../../component/common/PinInput';

const CreatePinScreen = ({ navigation }) => {
    const [pin, setPin] = useState('');

    const handlePinComplete = (value) => {
        if (value.length === 6) {
            navigation.navigate('ConfirmPin', { originalPin: value });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="PIN 만들기" onBack={() => navigation.goBack()} />
            <View style={styles.content}>
                <Text style={styles.title}>PIN 번호</Text>
                <Text style={styles.subtitle}>6자리 포함</Text>
                <PinInput
                    length={6}
                    value={pin}
                    onChange={setPin}
                    onComplete={handlePinComplete}
                />
                <Text style={styles.helpText}>
                    PIN은 암호와 같습니다{'\n'}
                    앱에 로그인 하는데 사용됩니다.
                </Text>
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
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
    },
    helpText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
});

export default CreatePinScreen; 