import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthWebView from '../../component/common/AuthWebView';
import { supabase } from '../../config/supabase';

const LoginScreen = ({ navigation }) => {
    const [authUrl, setAuthUrl] = useState(null);
    const [showWebView, setShowWebView] = useState(false);
    const [isInitialCheck, setIsInitialCheck] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isInitialCheck) {
            checkSession();
            setIsInitialCheck(false);
        }
    }, [isInitialCheck]);

    const checkSession = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error && isInitialCheck && !isLoggingIn) {
            console.log('User is already logged in');
            setIsLoggedIn(true);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoggingIn(true);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'com.lmbscwallet://login-callback',
                    skipBrowserRedirect: true,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account'
                    }
                }
            });

            if (error) {
                console.error('Google login error:', error.message);
                Alert.alert('로그인 오류', '구글 로그인 중 오류가 발생했습니다.');
                setIsLoggingIn(false);
                return;
            }

            if (data?.url) {
                setAuthUrl(data.url);
                setShowWebView(true);
            }
        } catch (error) {
            console.error('Google login error:', error);
            Alert.alert('로그인 오류', '알 수 없는 오류가 발생했습니다.');
            setIsLoggingIn(false);
        }
    };

    const handleAppleLogin = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'apple',
                options: {
                    redirectTo: 'com.lmbscwallet://login-callback',
                    skipBrowserRedirect: true,
                }
            });

            if (error) {
                console.error('Apple login error:', error.message);
                return;
            }

            if (data?.url) {
                setAuthUrl(data.url);
                setShowWebView(true);
            }
        } catch (error) {
            console.error('Apple login error:', error);
        }
    };

    const handleWebViewClose = async (url) => {
        setShowWebView(false);
        if (url) {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const { data: { user }, error } = await supabase.auth.getUser();
                if (user && !error) {
                    console.log('Login successful:', user);
                    setIsLoggingIn(false);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggingIn(false);
                    Alert.alert('로그인 오류', '사용자 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('Login error:', error);
                setIsLoggingIn(false);
                Alert.alert('로그인 오류', '로그인 처리 중 오류가 발생했습니다.');
            }
        } else {
            setIsLoggingIn(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>AIDAS</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Terms')}
                    style={[styles.loginButton, styles.termsButton]}
                >
                    <Text style={styles.termsButtonText}>사용 약관 가기</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleGoogleLogin}
                    style={[styles.loginButton, styles.googleButton]}
                    disabled={isLoggedIn}
                >
                    <Text style={styles.googleButtonText}>
                        {isLoggedIn ? '구글 로그인 성공' : '구글로 계속하기'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleAppleLogin}
                    style={[styles.loginButton, styles.appleButton]}
                >
                    <Text style={styles.appleButtonText}>Apple로 계속하기</Text>
                </TouchableOpacity>
            </View>

            <AuthWebView
                url={authUrl}
                visible={showWebView}
                onClose={handleWebViewClose}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A7C7C',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        width: '100%',
    },
    googleButton: {
        backgroundColor: '#4285F4',
    },
    appleButton: {
        backgroundColor: '#000000',
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    appleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    termsButton: {
        backgroundColor: '#808080',
        marginBottom: 16,
    },
    termsButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default LoginScreen;
