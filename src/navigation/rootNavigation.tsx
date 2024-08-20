import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationScreen from '../screens/authorizationScreen';
import ProfileScreen from '../screens/profileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckOtpScreen from '../screens/checkOtpScreen';


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
                    options = {{title: 'check OTP'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyStack














