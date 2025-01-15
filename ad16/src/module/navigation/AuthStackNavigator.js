import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import ConfirmMnemonicsScreen from '../../screen/wallet/ConfirmMnemonicsScreen';
import CreateMnemonicsScreen from '../../screen/wallet/CreateMnemonicsScreen';
import CreateWalletScreen from '../../screen/wallet/CreateWalletScreen';
import ImportWalletScreen from '../../screen/wallet/ImportWalletScreen';
import StartScreen from '../../screen/wallet/StartScreen';
import TermsAndConditionsScreen from '../../screen/wallet/TermsAndConditionsScreen';
import WalletLoginScreen from '../../screen/wallet/WalletLoginScreen';


const Stack = createStackNavigator();
function AuthStackNavigator(props) {
    const {lang} = props;
    useEffect(  () => {

    },[])
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen name="StartScreen" component={(props) => {return <StartScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="CreateWalletScreen" component={(props) => {return <CreateWalletScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="CreateMnemonicsScreen" component={(props) => {return <CreateMnemonicsScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="ConfirmMnemonicsScreen" component={(props) => {return <ConfirmMnemonicsScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="TermsAndConditionsScreen" component={(props) => {return <TermsAndConditionsScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="WalletLoginScreen" component={(props) => {return <WalletLoginScreen {...props} lang={lang}/>}}/>
            <Stack.Screen name="ImportWalletScreen" component={(props) => {return <ImportWalletScreen {...props} lang={lang}/>}}/>
        </Stack.Navigator>
    );
}
export default AuthStackNavigator;
