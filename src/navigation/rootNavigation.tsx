import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationScreen from '../screens/authorizationScreen';
import ProfileScreen from '../screens/profileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckOtpScreen from '../screens/checkOtpScreen';
import CreateAccScreen from '../screens/createAccScreen';
import CheckOtpPassRecScreen from '../screens/checkOtpPassRecScreen';
import NewPassScreen from '../screens/newPassScreen';
import ForgPassScreen from '../screens/forgottenPassScreen';


const Stack = createNativeStackNavigator();


const MyStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'authorization'
                    component = {AuthorizationScreen}
                    options = {{title: 'Authorization'}}
                />                         
                <Stack.Screen
                    name = 'profile'
                    component = {ProfileScreen}
                    options = {{title: 'Profile'}}
                />
                <Stack.Screen
                    name = 'checkOtpScreen'
                    component = {CheckOtpScreen}
                    options = {{title: 'Check OTP'}}
                />
                <Stack.Screen
                    name = 'createAccount'
                    component = {CreateAccScreen}
                    options = {{title: 'Create Account'}}
                />
                <Stack.Screen
                    name = 'checkOtpPassRec'
                    component = {CheckOtpPassRecScreen}
                    options = {{title: 'Check OTP'}}
                />
                <Stack.Screen
                    name = 'newPassScreen'
                    component = {NewPassScreen}
                    options = {{title: 'Create new password'}}
                />
                <Stack.Screen
                    name = 'forgPassScreen'
                    component = {ForgPassScreen}
                    options = {{title: 'Forgotten password'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyStack














