import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/common/Header';

const ConfirmPinScreen = () => {
    const navigation = useNavigation();
    const [pin, setPin] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const numbers = [1,2,3,4,5,6,7,8,9,0];

    const handleNumberPress = (number) => {
        if (pin.length < 6) {
            const newPin = pin + number;
            setPin(newPin);
            
            // PIN이 6자리가 되고 111111이면 바로 다음 화면으로 이동
            if (newPin.length === 6) {
                if (newPin === '111111') {
                    setTimeout(() => {
                        navigation.replace('PinSuccess');
                    }, 100);
                } else {
                    setPin('');
                }
            }
        }
    };

    const handleDirectionalPad = (direction) => {
        switch(direction) {
            case 'up':
                setSelectedIndex(prev => prev >= 3 ? prev - 3 : prev);
                break;
            case 'down':
                setSelectedIndex(prev => prev <= 6 ? prev + 3 : prev);
                break;
            case 'left':
                setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'right':
                setSelectedIndex(prev => prev < 9 ? prev + 1 : prev);
                break;
            case 'enter':
                handleNumberPress(numbers[selectedIndex]);
                break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="PIN 만들기" onBack={() => navigation.goBack()} />
            <View style={styles.content}>
                <Text style={styles.title}>PIN 다시 입력</Text>
                
                {/* PIN 표시 */}
                <View style={styles.pinContainer}>
                    {[...Array(6)].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.pinDot,
                                pin.length > index && styles.pinDotFilled
                            ]}
                        />
                    ))}
                </View>

                {/* 숫자 키패드 */}
                <View style={styles.keypad}>
                    {numbers.map((num, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.numberButton,
                                selectedIndex === index && styles.selectedNumber
                            ]}
                            onPress={() => handleNumberPress(num.toString())}
                        >
                            <Text style={styles.numberText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* DirectionalPad */}
                <View style={styles.dPadContainer}>
                    <View style={styles.dPadRow}>
                        <TouchableOpacity 
                            style={styles.dPadButton}
                            onPress={() => handleDirectionalPad('up')}
                        >
                            <Text>↑</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dPadRow}>
                        <TouchableOpacity 
                            style={styles.dPadButton}
                            onPress={() => handleDirectionalPad('left')}
                        >
                            <Text>←</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.dPadButton}
                            onPress={() => handleDirectionalPad('enter')}
                        >
                            <Text>●</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.dPadButton}
                            onPress={() => handleDirectionalPad('right')}
                        >
                            <Text>→</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dPadRow}>
                        <TouchableOpacity 
                            style={styles.dPadButton}
                            onPress={() => handleDirectionalPad('down')}
                        >
                            <Text>↓</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 이전/다음 버튼 */}
                <View style={styles.navigationButtons}>
                    <TouchableOpacity 
                        style={[styles.navButton, styles.prevButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.buttonText, styles.prevButtonText]}>이전</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.navButton, styles.nextButton]}
                        onPress={() => navigation.replace('PinSuccess')}
                        disabled={pin.length !== 6}
                    >
                        <Text style={[styles.buttonText, styles.nextButtonText]}>다음</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    pinDot: {
        width: 13,
        height: 13,
        borderRadius: 7,
        backgroundColor: '#E5E5E5',
        margin: 10,
    },
    pinDotFilled: {
        backgroundColor: '#008080',
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
        marginBottom: 100,
    },
    numberButton: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    numberText: {
        fontSize: 24,
        color: '#000',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 30,
    },
    navButton: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    prevButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    nextButton: {
        backgroundColor: '#008080',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    prevButtonText: {
        color: '#333',
    },
    nextButtonText: {
        color: '#fff',
    },
    selectedNumber: {
        backgroundColor: '#e0e0e0',
    },
    dPadContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    dPadRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dPadButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 5,
        borderRadius: 20,
    },
});

export default ConfirmPinScreen; 