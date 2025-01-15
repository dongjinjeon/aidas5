import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsScreen = ({ navigation }) => {
    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [ageChecked, setAgeChecked] = useState(false);

    const allChecked = termsChecked && privacyChecked && ageChecked;

    const handleAllAgree = () => {
        navigation.navigate('UserInfo');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>사용약관</Text>
                <Text style={styles.description}>
                    계속하려면 서비스 약관 및{'\n'}
                    개인정보 처리방침에 동의하세요
                </Text>

                <View style={styles.checkboxGroup}>
                    <TouchableOpacity 
                        style={styles.checkboxRow}
                        onPress={() => setTermsChecked(!termsChecked)}
                    >
                        <RadioButton
                            value="terms"
                            status={termsChecked ? 'checked' : 'unchecked'}
                            onPress={() => setTermsChecked(!termsChecked)}
                            color="#008080"
                        />
                        <Text style={styles.checkboxText}>서비스 약관에 동의</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.checkboxRow}
                        onPress={() => setPrivacyChecked(!privacyChecked)}
                    >
                        <RadioButton
                            value="privacy"
                            status={privacyChecked ? 'checked' : 'unchecked'}
                            onPress={() => setPrivacyChecked(!privacyChecked)}
                            color="#008080"
                        />
                        <Text style={styles.checkboxText}>개인정보 처리 방침에 동의</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.checkboxRow}
                        onPress={() => setAgeChecked(!ageChecked)}
                    >
                        <RadioButton
                            value="age"
                            status={ageChecked ? 'checked' : 'unchecked'}
                            onPress={() => setAgeChecked(!ageChecked)}
                            color="#008080"
                        />
                        <Text style={styles.checkboxText}>만 14세 이상입니다</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[styles.button, !allChecked && styles.buttonDisabled]}
                    onPress={handleAllAgree}
                    disabled={!allChecked}
                >
                    <Text style={styles.buttonText}>모두 동의</Text>
                </TouchableOpacity>
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 24,
        color: '#666',
    },
    checkboxGroup: {
        marginTop: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginVertical: 4,
    },
    checkboxText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    button: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default TermsScreen; 