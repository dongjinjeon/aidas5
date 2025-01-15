import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const PinInput = ({ length = 6, value = '', onChange, onComplete }) => {
    const handleChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= length) {
            onChange(numericText);
            if (numericText.length === length) {
                onComplete(numericText);
            }
        }
    };

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < length; i++) {
            dots.push(
                <View
                    key={i}
                    style={[
                        styles.dot,
                        i < value.length ? styles.dotFilled : styles.dotEmpty,
                    ]}
                />
            );
        }
        return dots;
    };

    return (
        <View style={styles.container}>
            <View style={styles.dotsContainer}>{renderDots()}</View>
            <TextInput
                style={styles.hiddenInput}
                value={value}
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={length}
                secureTextEntry
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    dotEmpty: {
        backgroundColor: '#E5E5E5',
    },
    dotFilled: {
        backgroundColor: '#00A3B4',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
});

export default PinInput; 