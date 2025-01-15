import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PartnerList = () => {
  const [invitedPartners, setInvitedPartners] = useState(new Set());
  
  const partners = [
    {
      id: '1',
      name: 'XSDEE26',
      email: 'soseji09@gmail.com',
      partnerCount: '225명의 파트너',
      image: require('../assets/partner1.png')
    },
    // ... more partner data
  ];

  const handleInvite = (partnerId) => {
    setInvitedPartners(prev => {
      const newSet = new Set(prev);
      if (newSet.has(partnerId)) {
        newSet.delete(partnerId);
      } else {
        newSet.add(partnerId);
      }
      return newSet;
    });
  };

  const renderItem = ({ item }) => {
    const isInvited = invitedPartners.has(item.id);
    
    return (
      <TouchableOpacity style={styles.partnerItem}>
        <Image source={item.image} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.count}>{item.partnerCount}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.followButton, isInvited && styles.followedButton]}
          onPress={() => handleInvite(item.id)}
        >
          <Text style={[styles.followText, isInvited && styles.followedText]}>
            {isInvited ? '초대됨' : '팔로하기'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text>검색</Text>
      </View>
      <Text style={styles.title}>회원님을 위한 추천</Text>
      <FlatList
        data={partners}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  partnerItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  email: {
    color: '#666',
    fontSize: 12,
  },
  count: {
    color: '#666',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#009688',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
  },
  followedButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#009688',
  },
  followedText: {
    color: '#009688',
  },
});

export default PartnerList; 