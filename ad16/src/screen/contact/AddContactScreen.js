import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    Alert
} from 'react-native';
import { defaultBackground, primary } from '../../component/common/LMStyle';
import Contacts from 'react-native-contacts';
import LMBackButton from '../../component/common/LMBackButton';
import LMToast from '../../component/common/LMToast';

export default function AddContactScreen({ navigation }) {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        checkPermissionAndGetContacts();
    }, []);

    useEffect(() => {
        filterContacts();
    }, [searchQuery, contacts]);

    const checkPermissionAndGetContacts = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    {
                        title: '연락처 접근 권한',
                        message: '파트너 초대를 위해 연락처 접근 권한이 필요합니다.',
                        buttonPositive: '확인',
                        buttonNegative: '거부',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    loadContacts();
                } else {
                    Alert.alert(
                        '권한 거부됨',
                        '연락처를 가져오려면 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
                        [
                            { text: '확인', onPress: () => navigation.goBack() }
                        ]
                    );
                }
            } else {
                // iOS의 경우
                const permission = await Contacts.checkPermission();
                if (permission === 'authorized') {
                    loadContacts();
                } else if (permission === 'undefined') {
                    const request = await Contacts.requestPermission();
                    if (request === 'authorized') {
                        loadContacts();
                    } else {
                        Alert.alert(
                            '권한 거부됨',
                            '연락처를 가져오려면 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
                            [
                                { text: '확인', onPress: () => navigation.goBack() }
                            ]
                        );
                    }
                }
            }
        } catch (error) {
            console.error('Permission error:', error);
            LMToast.error({
                title: '오류',
                text: '연락처 권한을 확인하는 중 오류가 발생했습니다.',
            });
        }
    };

    const loadContacts = () => {
        Contacts.getAll()
            .then(contactsList => {
                const formattedContacts = contactsList
                    .filter(contact => {
                        // 전화번호가 있는 연락처만 필터링
                        return contact.phoneNumbers && contact.phoneNumbers.length > 0;
                    })
                    .map(contact => ({
                        id: contact.recordID,
                        name: contact.displayName || `${contact.givenName} ${contact.familyName}`.trim(),
                        phoneNumber: contact.phoneNumbers[0]?.number || '',
                        thumbnail: contact.thumbnailPath,
                        email: contact.emailAddresses && contact.emailAddresses[0]?.email || 'soseji09@gmail.com',
                        code: 'XSDEE26',
                        partnerCount: Math.floor(Math.random() * 2500) + 1
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                setContacts(formattedContacts);
                setFilteredContacts(formattedContacts);
                
                if (formattedContacts.length === 0) {
                    LMToast.info({
                        title: '알림',
                        text: '가져올 수 있는 연락처가 없습니다.',
                    });
                }
            })
            .catch(error => {
                console.error('Contacts error:', error);
                LMToast.error({
                    title: '오류',
                    text: '연락처를 불러오는데 실패했습니다.',
                });
            });
    };

    const filterContacts = () => {
        if (!searchQuery.trim()) {
            setFilteredContacts(contacts);
            return;
        }

        const filtered = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phoneNumber.includes(searchQuery)
        );
        setFilteredContacts(filtered);
    };

    const renderContactItem = ({ item }) => (
        <View style={styles.contactItem}>
            <View style={styles.contactInfo}>
                {item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.placeholderAvatar]}>
                        <Text style={styles.avatarText}>{item.name[0]}</Text>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.codeText}>{item.code}</Text>
                    <Text style={styles.emailText}>{item.email}</Text>
                    <Text style={styles.partnerText}>현재 {item.partnerCount}명의 파트너</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.inviteButton}
                onPress={() => navigation.navigate('UpdateContact', { 
                    contact: {
                        name: item.name,
                        phoneNumber: item.phoneNumber,
                        address: ''
                    }
                })}
            >
                <Text style={styles.inviteButtonText}>함께하기</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'black'} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>파트너찾기</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="검색"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>
            <FlatList
                data={filteredContacts}
                renderItem={renderContactItem}
                keyExtractor={item => item.id}
                style={styles.list}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {contacts.length === 0 ? '연락처를 불러오는 중...' : '검색 결과가 없습니다.'}
                        </Text>
                    </View>
                )}
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
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    searchContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    searchInput: {
        backgroundColor: '#F5F5F5',
        padding: 8,
        borderRadius: 8,
    },
    list: {
        flex: 1,
    },
    contactItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    placeholderAvatar: {
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 20,
        color: '#666',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    codeText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    emailText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    partnerText: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    inviteButton: {
        backgroundColor: primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 16,
    },
    inviteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
