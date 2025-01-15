import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultBackground, primary} from '../../component/common/LMStyle';
import LMBackButton from '../../component/common/LMBackButton';
import Jazzicon from 'react-native-jazzicon';
import {useDispatch} from 'react-redux';
import {ContactAction} from '../../persistent/contact/ContactAction';
import LMToast from '../../component/common/LMToast';

export default function UpdateContactScreen({navigation, route}) {
    const { contact, name, email, code, partnerCount } = route.params;
    const dispatch = useDispatch();

    const handleInvite = async () => {
        try {
            // 연락처가 이미 존재하면 업데이트, 없으면 추가
            const action = contact ? ContactAction.update : ContactAction.add;
            await dispatch(action({
                address: contact?.address || '0x123',
                name: name,
                email: email,
                code: code,
                partnerCount: partnerCount
            }));

            LMToast.popupSuccess({
                title: '완료',
                message: contact ? '파트너 정보가 업데이트되었습니다.' : '새로운 파트너가 추가되었습니다.',
                buttontext: '확인',
                callback: () => {
                    navigation.navigate('WalletMain');
                },
            });
        } catch (error) {
            LMToast.popupError({
                title: '오류',
                message: '파트너 정보 처리 중 오류가 발생했습니다.',
                buttontext: '확인',
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'white'} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>파트너 정보</Text>
                <View style={styles.headerRight} />
            </View>
            
            <View style={styles.content}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Jazzicon size={80} address={contact?.address || '0x123'} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.codeText}>{code}</Text>
                        <Text style={styles.emailText}>{email}</Text>
                        <Text style={styles.partnerText}>현재 {partnerCount}명의 파트너</Text>
                    </View>
                </View>

                <View style={styles.buttonSection}>
                    <TouchableOpacity 
                        style={styles.inviteButton}
                        onPress={handleInvite}
                    >
                        <Text style={styles.inviteButtonText}>함께하기</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#008299',
        height: 56,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: 16,
    },
    infoContainer: {
        alignItems: 'center',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    codeText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    emailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    partnerText: {
        fontSize: 14,
        color: '#999',
    },
    buttonSection: {
        marginTop: 'auto',
        paddingBottom: 20,
    },
    inviteButton: {
        backgroundColor: primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    inviteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
