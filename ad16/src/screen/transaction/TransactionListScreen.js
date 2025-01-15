import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { defaultBackground } from '../../component/common/LMStyle';
import LMBackButton from '../../component/common/LMBackButton';
import axios from 'axios';
import { API_URL } from '../../config/config';

export default function TransactionListScreen({ navigation }) {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('action', 'get_list');
            formData.append('page', page);

            const response = await axios.post(`${API_URL}/transaction_api.php`, formData);
            
            if (response.data.success) {
                setTransactions(prev => [...prev, ...response.data.data]);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderTransaction = ({ item }) => {
        const isPositive = item.tx_type === 'deposit';
        return (
            <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                    <Text style={styles.transactionType}>
                        {item.tx_type === 'deposit' ? '입금' : '출금'}
                    </Text>
                    <Text style={styles.transactionDate}>
                        {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                </View>
                <View style={styles.transactionRight}>
                    <Text style={[styles.amount, isPositive ? styles.positive : styles.negative]}>
                        {isPositive ? '+' : '-'}{item.amount} {item.token_type}
                    </Text>
                    {item.fee > 0 && (
                        <Text style={styles.fee}>수수료: {item.fee} {item.token_type}</Text>
                    )}
                    <Text style={[styles.status, styles[item.status]]}>
                        {item.status === 'completed' ? '완료' : 
                         item.status === 'pending' ? '처리중' : '실패'}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'white'} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>거래 내역</Text>
                <View style={styles.headerRight} />
            </View>

            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={getTransactions}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && <Text style={styles.loading}>로딩중...</Text>}
            />
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
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 1,
    },
    transactionLeft: {
        flex: 1,
    },
    transactionType: {
        fontSize: 16,
        fontWeight: '500',
    },
    transactionDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
    positive: {
        color: '#4CAF50',
    },
    negative: {
        color: '#F44336',
    },
    fee: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    status: {
        fontSize: 12,
        marginTop: 4,
    },
    completed: {
        color: '#4CAF50',
    },
    pending: {
        color: '#FFC107',
    },
    failed: {
        color: '#F44336',
    },
    loading: {
        textAlign: 'center',
        padding: 10,
        color: '#666',
    },
});
