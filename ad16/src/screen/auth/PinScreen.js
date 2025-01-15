import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PinScreen = ({ navigation }) => {
    const [pin, setPin] = useState('');

    const handleNumberPress = (number) => {
        if (pin.length < 6) {
            const newPin = pin + number;
            setPin(newPin);
            
            if (newPin.length === 6) {
                setTimeout(() => {
                    navigation.navigate('WalletMain');
                }, 200);
            }
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 24, color: '#fff'}}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PIN 만들기</Text>
            </View>

            <View style={styles.pinContainer}>
                <Text style={styles.title}>PIN 번호</Text>
                <Text style={styles.subtitle}>6자리 포함</Text>
                
                <View style={styles.dotsContainer}>
                    {[...Array(6)].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                pin.length > index && styles.dotFilled
                            ]}
                        />
                    ))}
                </View>

                <Text style={styles.message}>
                    PIN은 암호와 같습니다{'\n'}
                    앱에 로그인 하는데 사용됩니다.
                </Text>
            </View>

            <View style={styles.keypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.key}
                        onPress={() => {
                            if (item === 'delete') {
                                handleDelete();
                            } else if (item !== '') {
                                handleNumberPress(item);
                            }
                        }}
                    >
                        {item === 'delete' ? (
                            <Text style={{fontSize: 24}}>←</Text>
                        ) : (
                            <Text style={styles.keyText}>{item}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#008080',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 16,
    },
    pinContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 32,
        marginBottom: 24,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 8,
    },
    dotFilled: {
        backgroundColor: '#008080',
    },
    message: {
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 16,
        marginTop: 'auto',
        marginBottom: 20,
    },
    key: {
        width: '33%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        fontSize: 24,
        fontWeight: '500',
    },
});

export default PinScreen;
