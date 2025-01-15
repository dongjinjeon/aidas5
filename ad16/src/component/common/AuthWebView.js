import React from 'react';
import { WebView } from 'react-native-webview';
import { Modal, ActivityIndicator, View } from 'react-native';

const AuthWebView = ({ url, visible, onClose }) => {
  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes('com.lmbscwallet://login-callback')) {
      onClose(navState.url);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36"
        incognito={true}
        thirdPartyCookiesEnabled={true}
      />
    </Modal>
  );
};

export default AuthWebView;
