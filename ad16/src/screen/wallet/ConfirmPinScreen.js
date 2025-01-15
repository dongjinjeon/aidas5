import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/common/Header';
import LMAlert from '../../component/common/LMAlert';
import PinInput from '../../component/common/PinInput';

const ConfirmPinScreen = ({ navigation, route }) => {
    const [pin, setPin] = useState('');
    const FIXED_PIN = '123456';

    const handlePinComplete = (value) => {
        if (value.length === 6) {
            if (value === FIXED_PIN) {
                navigation.replace('PinSuccess');
            } else {
                LMAlert.show({
                    message: 'PIN이 일치하지 않습니다. 다시 확인해주세요.',
                    type: 'error',
                });
                setPin('');
            }
        } else {
            setPin(value);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="PIN 만들기" onBack={() => navigation.goBack()} />
            <View style={styles.content}>
                <Text style={styles.title}>PIN 다시 입력</Text>
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    helpText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#008080',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConfirmPinScreen; 