import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ConfirmPinScreen from '../../screen/auth/ConfirmPinScreen';
import CreatePinScreen from '../../screen/auth/CreatePinScreen';
import PinSuccessScreen from '../../screen/auth/PinSuccessScreen';
import TermsScreen from '../../screen/auth/TermsScreen';
import AddContactScreen from '../../screen/contact/AddContactScreen';
import UpdateContactScreen from '../../screen/contact/UpdateContactScreen';
import AddNetworkScreen from '../../screen/network/AddNetworkScreen';
import NetworkListScreen from '../../screen/network/NetworkListScreen';
import UpdateNetworkScreen from '../../screen/network/UpdateNetworkScreen';
import AddTokenScreen from '../../screen/pancakeswap/AddTokenScreen';
import TokenScreen from '../../screen/pancakeswap/TokenScreen';
import ChangePasswordScreen from '../../screen/setting/ChangePasswordScreen';
import PersonalScreen from '../../screen/setting/PersonalScreen';
import PrivacyScreen from '../../screen/setting/PrivacyScreen';
import ScannerScreen from '../../screen/transaction/ScannerScreen';
import TopUpScreen from '../../screen/transaction/TopUpScreen';
import TransactionDetailScreen from '../../screen/transaction/TransactionDetailScreen';
import TransactionScreen from '../../screen/transaction/TransactionScreen';
import TransferScreen from '../../screen/transaction/TransferScreen';
import AddWalletScreen from '../../screen/wallet/AddWalletScreen';
import ViewWalletScreen from '../../screen/wallet/ViewWalletScreen';
import BottomTabBarNavigator from './BottomTabBarNavigator';

const Stack = createStackNavigator();

function MainStackNavigator({style, lang}) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="CreatePin" component={CreatePinScreen} />
            <Stack.Screen name="ConfirmPin" component={ConfirmPinScreen} />
            <Stack.Screen 
                name="PinSuccess" 
                component={PinSuccessScreen}
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen name="BottomTabBarNavigator" component={BottomTabBarNavigator}/>
            <Stack.Screen name="AddWalletScreen" component={(props) => {
                return <AddWalletScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="ViewWalletScreen" component={(props) => {
                return <ViewWalletScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="TopUpScreen" component={(props) => {
                return <TopUpScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="TransferScreen" component={(props) => {
                return <TransferScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="ScannerScreen" component={(props) => {
                return <ScannerScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="TransactionScreen" component={(props) => {
                return <TransactionScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="TransactionDetailScreen" component={(props) => {
                return <TransactionDetailScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="AddContactScreen" component={(props) => {
                return <AddContactScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="UpdateContactScreen" component={(props) => {
                return <UpdateContactScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="PersonalScreen" component={PersonalScreen}/>
            <Stack.Screen name="PrivacyScreen" component={(props) => {
                return <PrivacyScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="NetworkListScreen" component={(props) => {
                return <NetworkListScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="AddNetworkScreen" component={(props) => {
                return <AddNetworkScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="UpdateNetworkScreen" component={(props) => {
                return <UpdateNetworkScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="ChangePasswordScreen" component={(props) => {
                return <ChangePasswordScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="TokenScreen" component={(props) => {
                return <TokenScreen {...props} lang={lang}/>;
            }}/>
            <Stack.Screen name="AddTokenScreen" component={(props) => {
                return <AddTokenScreen {...props} lang={lang}/>;
            }}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
});

export default MainStackNavigator;
