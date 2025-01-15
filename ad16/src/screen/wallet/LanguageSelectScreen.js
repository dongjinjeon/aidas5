import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const languages = [
  {
    code: 'ko',
    name: '한국어',
    flag: require('../../assets/images/korea.png')
  },
  {
    code: 'ja',
    name: '日本語',
    flag: require('../../assets/images/japan.png')
  },
  {
    code: 'en',
    name: 'English',
    flag: require('../../assets/images/usa.png')
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: require('../../assets/images/vietnam.png')
  },
  {
    code: 'zh',
    name: '简体中文',
    flag: require('../../assets/images/china.png')
  }
];

const LanguageSelectScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
  };

  const handleConfirm = () => {
   // navigation.navigate('Login');
    navigation.navigate('Terms');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>언어선택</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.languageButton}
          onPress={() => handleLanguageSelect(lang.code)}
        >
          <Image source={lang.flag} style={styles.flag} />
          <Text style={styles.languageText}>{lang.name}</Text>
          {selectedLanguage === lang.code && (
            <View style={styles.selectedIndicator}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.checkIcon}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  flag: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
  },
  languageText: {
    fontSize: 16,
    flex: 1,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A7C7C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#0A7C7C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelectScreen;
