import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

function ApplicationNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
                <Stack.Screen name="Main" component={MainStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
