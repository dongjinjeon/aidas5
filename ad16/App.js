import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

// components
import LMAlert from './src/component/common/LMAlert';
import LMLoading from './src/component/common/LMLoading';
import LMSelect from './src/component/common/LMSelect';
import RootStore from './src/module/redux/RootStore';

// auth screens
import LoginScreen from './src/screen/auth/LoginScreen';
import PhoneVerification from './src/screen/auth/PhoneVerification';
import PinScreen from './src/screen/auth/PinScreen';
import PinSuccessScreen from './src/screen/auth/PinSuccessScreen';
import TermsScreen from './src/screen/auth/TermsScreen';

// wallet screens
import EmptyReferralScreen from './src/screen/wallet/EmptyReferralScreen';
import LanguageSelect from './src/screen/wallet/LanguageSelectScreen';
import LocationPermissionScreen from './src/screen/wallet/LocationPermissionScreen';
import ReferralCodeScreen from './src/screen/wallet/ReferralCodeScreen';
import Splash from './src/screen/wallet/Splash';
import StartScreen from './src/screen/wallet/StartScreen';
import UserInfoScreen from './src/screen/wallet/UserInfoScreen';
import WalletMainScreen from './src/screen/wallet/WalletMainScreen';
import WelcomeModalScreen from './src/screen/wallet/WelcomeModalScreen';
import WelcomeScreen from './src/screen/wallet/WelcomeScreen';

// contact screens
import AddContactScreen from './src/screen/contact/AddContactScreen';
import ContactListScreen from './src/screen/contact/ContactListScreen';
import UpdateContactScreen from './src/screen/contact/UpdateContactScreen';

// transaction screens
import TransactionListScreen from './src/screen/transaction/TransactionListScreen';
import TokenTransferScreen from './src/screen/transaction/TokenTransferScreen';

enableScreens();
LogBox.ignoreLogs(['Warning: Cannot']);
LogBox.ignoreLogs(['component']);
LogBox.ignoreLogs(['Clipboard']);
LogBox.ignoreLogs(['RCTUI']);
LogBox.ignoreLogs(['[auth/p']);
LogBox.ignoreLogs(['[User cancelled the login process']);
LogBox.ignoreLogs(['Require cycles are allowed']);
LogBox.ignoreLogs(['Setting a timer for a long']);

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={RootStore}>
            <StatusBar hidden={false} backgroundColor={'#ffff'} barStyle={'dark-content'}/>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="WelcomeModal"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                
                    <Stack.Screen 
                        name="WelcomeModal"
                        component={WelcomeModalScreen}
                        options={{ 
                            presentation: 'transparentModal',
                        }}
                    />
                    <Stack.Screen 
                        name="Splash" 
                        component={Splash}
                    />
                    <Stack.Screen 
                        name="Welcome" 
                        component={WelcomeScreen}
                    />
                    <Stack.Screen 
                        name="StartScreen" 
                        component={StartScreen}
                    />
                    <Stack.Screen 
                        name="LanguageSelect" 
                        component={LanguageSelect}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="Terms" 
                        component={TermsScreen}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="UserInfo" 
                        component={UserInfoScreen}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="PhoneVerification" 
                        component={PhoneVerification}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="CreatePin"
                        component={PinScreen}
                    />
                    <Stack.Screen 
                        name="PinSuccess"
                        component={PinSuccessScreen}
                    />
                    <Stack.Screen 
                        name="LocationPermission"
                        component={LocationPermissionScreen}
                    />
                    <Stack.Screen 
                        name="EmptyReferral"
                        component={EmptyReferralScreen}
                    />
                    <Stack.Screen 
                        name="ReferralCode"
                        component={ReferralCodeScreen}
                    />
                    <Stack.Screen 
                        name="WalletMain"
                        component={WalletMainScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="AddContact"
                        component={AddContactScreen}
                    />
                    <Stack.Screen 
                        name="ContactList"
                        component={ContactListScreen}
                    />
                    <Stack.Screen 
                        name="UpdateContact"
                        component={UpdateContactScreen}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen 
                        name="TransactionList"
                        component={TransactionListScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="TokenTransfer"
                        component={TokenTransferScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <LMLoading ref={(ref) => LMLoading.setRef(ref)}/>
            <LMSelect ref={(ref) => LMSelect.setRef(ref)}/>
            <LMAlert ref={(ref) => LMAlert.setRef(ref)}/>
        </Provider>
    );
};
