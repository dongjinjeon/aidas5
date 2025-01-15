import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {defaultBackground, primary} from '../../component/common/LMStyle';
import {useDispatch, useSelector} from 'react-redux';
import LMFlatList from '../../component/common/LMFlatList';
import LMBackButton from '../../component/common/LMBackButton';
import {ContactAction} from '../../persistent/contact/ContactAction';
import Jazzicon from 'react-native-jazzicon';

export default function ContactListScreen({navigation}){
    const {contacts} = useSelector(state => state.ContactReducer);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        dispatch(ContactAction.list());
    }, []);

    useEffect(() => {
        filterContacts();
    }, [searchQuery, contacts]);

    const filterContacts = () => {
        if (!searchQuery.trim()) {
            setFilteredContacts(contacts);
            return;
        }
        const filtered = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    const renderItem = ({item}) => {
        return (
            <View style={styles.contactItem}>
                <View style={styles.contactInfo}>
                    <View style={styles.avatarContainer}>
                        <Jazzicon size={50} address={item.address || '0x123'} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.codeText}>XSDEE26</Text>
                        <Text style={styles.emailText}>soseji09@gmail.com</Text>
                        <Text style={styles.partnerText}>현재 {item.partnerCount || 0}명의 파트너</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity 
                        style={styles.inviteButton}
                        onPress={() => navigation.navigate('WalletMain')}
                    >
                        <Text style={styles.inviteButtonText}>함께하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.arrowContainer}
                        onPress={() => navigation.navigate('WalletMain')}
                    >
                        <Text style={styles.arrowText}>›</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'white'} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>파트너찾기</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <View style={styles.smallIconContainer}>
                            <Jazzicon size={24} address={'0x456'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <View style={styles.searchIconContainer}>
                        <Text style={styles.iconText}>🔍</Text>
                    </View>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="검색"
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                    />
                    {searchQuery ? (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <View style={styles.clearIconContainer}>
                                <Text style={styles.iconText}>✕</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>회원님을 위한 추천</Text>
            </View>
            <LMFlatList
                data={filteredContacts}
                renderItem={renderItem}
                keyExtractor={item => item.address}
                contentContainerStyle={styles.listContent}
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
        alignItems: 'center',
    },
    smallIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        overflow: 'hidden',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIconContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    clearIconContainer: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 16,
        color: '#666',
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000',
    },
    titleContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    listContent: {
        backgroundColor: 'white',
    },
    contactItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    codeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    emailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    partnerText: {
        fontSize: 12,
        color: '#999',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inviteButton: {
        backgroundColor: primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginRight: 8,
    },
    inviteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    arrowContainer: {
        padding: 4,
    },
    arrowText: {
        fontSize: 20,
        color: '#666',
        fontWeight: '300',
    },
});
