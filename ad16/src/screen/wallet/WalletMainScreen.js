import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 보상 금액 상수
const REWARDS = {
    DAILY: 500,      // 일일 보상
    REFERRAL: 1000,  // 추천 보상
    MISSION: 400     // 미션 보상
};

export default function WalletMainScreen({ navigation }) {
    const [walletData, setWalletData] = useState({
        bnb_balance: '0',
        aidas_balance: '0',
        token_fee: '0'
    });

    useEffect(() => {
        getWalletBalance();
        // 화면이 포커스를 받을 때마다 잔액 갱신
        const unsubscribe = navigation.addListener('focus', () => {
            getWalletBalance();
        });

        return unsubscribe;
    }, [navigation]);

    const getWalletBalance = async () => {
        try {
            const formData = new FormData();
            formData.append('action', 'get_balance');
            
            // 전화번호가 있다면 함께 전송
            const phone = await AsyncStorage.getItem('userPhone');
            if (phone) {
                formData.append('phone', phone);
            }

            console.log('Fetching balance from:', `${API_URL}/wallet_api.php`);
            
            const response = await axios.post(`${API_URL}/wallet_api.php`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            
            console.log('API Response:', response.data);
            
            if (response.data && response.data.success) {
                const balance = response.data.data.aidas_balance || '0';
                console.log('Setting balance:', balance);
                
                setWalletData({
                    bnb_balance: '0',
                    token_fee: '0',
                    aidas_balance: balance.toString()
                });
            } else {
                const errorMsg = response.data ? response.data.message : 'Unknown error';
                console.error('API Error:', errorMsg);
            }
        } catch (error) {
            console.error('Network Error:', error.message);
            if (error.response) {
                console.error('Error Response:', error.response.data);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={require('../../assets/images/poten-logo.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('TransactionList')}>
                        <Ionicons name="time-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.aidasAmount}>{walletData.aidas_balance}</Text>
                <Text style={styles.totalaidas}>Total aidas</Text>
                <Text style={styles.securityText}>Being protected by aidas certified security tech usage</Text>
                <TouchableOpacity 
                    style={styles.transferButton}
                    onPress={() => navigation.navigate('TokenTransfer')}
                >
                    <Text style={styles.transferButtonText}>토큰 전송</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.binanceCard}>
                <View style={styles.binanceHeader}>
                    <Image 
                        source={require('../../assets/images/binance-logo.png')} 
                        style={styles.binanceLogo}
                    />
                    <Text style={styles.binanceTitle}>Binance Wallet</Text>
                </View>
                <View style={styles.binanceContent}>
                    <View style={styles.bnbContainer}>
                        <Text style={styles.bnbText}>BNB</Text>
                        <View>
                            <Text style={styles.bnbAmount}>{walletData.bnb_balance}</Text>
                            <Text style={styles.feeText}>token fee BNB {walletData.token_fee}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statsHeader}>
                    <Text style={styles.statsTitle}>나의실적</Text>
                    <TouchableOpacity>
                        <Text style={styles.statsLink}>추천내역 ›</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.partnersCount}>내가 추천한 파트너 145명</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsLabel}>직급 기사</Text>
                        <Text style={styles.statsValue}>120,000,000 AD$</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsLabel}>직급 1,200,000 AD$</Text>
                        <Text style={styles.statsValue}>추천 1,200,000 AD$</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text style={styles.statsLabel}>일일 50,000,000 AD$</Text>
                        <Text style={styles.statsValue}>매칭 1,200,000 AD$</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.rewardSection}>
                <Text style={styles.rewardTitle}>보상받기</Text>
                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>📅</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>일일 보상받기</Text>
                            <Text style={styles.rewardDesc}>영상을 보고 AD$ {REWARDS.DAILY} 적립</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>🎁</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>선물상자 열고 AD$ 획득</Text>
                            <Text style={styles.rewardDesc}>하루한번 100~10,000 AD$ 획득</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>🏪</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>직급 올리고 보상받기</Text>
                            <Text style={styles.rewardDesc}>한 시간에 한번 {REWARDS.REFERRAL}AD$ 획득</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>⭐</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>추천하고 보상받기</Text>
                            <Text style={styles.rewardDesc}>파트너 만들고 5,000 AD$ 획득</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>❤️</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>이벤트 참여하고, 보상받기</Text>
                            <Text style={styles.rewardDesc}>이벤트 참여하고,{REWARDS.DAILY} PTC 획득</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>🎯</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>미션 완료하고 보상받기</Text>
                            <Text style={styles.rewardDesc}>클릭 후 {REWARDS.MISSION} AD$ 받기</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>👛</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>회원님을 위한 추천 1</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rewardItem}>
                    <View style={styles.rewardLeft}>
                        <View style={styles.rewardIcon}>
                            <Text>🏅</Text>
                        </View>
                        <View>
                            <Text style={styles.rewardName}>회원님을 위한 추천 2</Text>
                        </View>
                    </View>
                    <Text style={styles.rewardArrow}>›</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    logo: {
        width: 100,
        height: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    balanceCard: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    aidasAmount: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
    },
    totalaidas: {
        color: '#fff',
        marginTop: 5,
    },
    securityText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 10,
    },
    binanceCard: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        padding: 15,
    },
    binanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    binanceLogo: {
        width: 24,
        height: 24,
    },
    binanceTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    binanceContent: {
        marginTop: 10,
    },
    bnbContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bnbText: {
        fontSize: 16,
        fontWeight: '500',
    },
    bnbAmount: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
    },
    feeText: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    statsSection: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 10,
        padding: 15,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    statsLink: {
        color: '#009688',
    },
    partnersCount: {
        marginTop: 10,
    },
    statsGrid: {
        marginTop: 10,
    },
    statsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    statsLabel: {
        color: '#666',
    },
    statsValue: {
        fontWeight: '500',
    },
    rewardSection: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        marginTop: 0,
        borderRadius: 10,
        padding: 15,
    },
    rewardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
    },
    rewardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    rewardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    rewardIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardName: {
        fontSize: 14,
        fontWeight: '500',
    },
    rewardDesc: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    rewardArrow: {
        fontSize: 20,
        color: '#666',
    },
    transferButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 15,
    },
    transferButtonText: {
        color: '#009688',
        fontWeight: '600',
    },
});
