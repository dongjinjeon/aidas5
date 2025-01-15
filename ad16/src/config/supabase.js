import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
});

// Phone 인증 관련 함수들
export const phoneSignIn = async (phoneNumber) => {
    try {
        const formattedPhone = formatPhoneNumber(phoneNumber);
        console.log('Attempting to sign in with phone:', formattedPhone);

        const { data, error } = await supabaseClient.auth.signInWithOtp({
            phone: formattedPhone,
            options: {
                channel: 'sms',
                data: {
                    phoneNumber: formattedPhone
                }
            }
        });
        
        if (error) {
            console.error('Phone sign in error details:', error);
            throw error;
        }
        
        console.log('Sign in successful:', data);
        return { data, error: null };
    } catch (error) {
        console.error('Phone sign in error:', error);
        return { 
            data: null, 
            error: {
                message: error.message || '인증번호 발송에 실패했습니다.',
                details: error
            }
        };
    }
};

// 전화번호 형식 변환 함수 추가
const formatPhoneNumber = (phoneNumber) => {
    // 첫 번째 0 제거하고 +82 추가
    return '+82' + phoneNumber.replace(/^0/, '');
};

export const verifyOTP = async (phoneNumber, token) => {
    try {
        const formattedPhone = formatPhoneNumber(phoneNumber);
        console.log('Attempting to verify OTP for phone:', formattedPhone);

        const { data, error } = await supabaseClient.auth.verifyOtp({
            phone: formattedPhone,
            token: token,
            type: 'sms'
        });
        
        if (error) {
            console.error('OTP verification error details:', error);
            throw error;
        }
        
        console.log('OTP verification successful:', data);
        return { data, error: null };
    } catch (error) {
        console.error('OTP verification error:', error);
        return { 
            data: null, 
            error: {
                message: error.message || '인증번호가 일치하지 않습니다.',
                details: error
            }
        };
    }
};

// 현재 세션 확인
export const getCurrentSession = async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
        console.error('Session error:', error);
        return null;
    }
    return session;
};

export const supabase = supabaseClient;
