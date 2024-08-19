import * as React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { signUp } from '../api';

const AuthorizationScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const confirmFunction = async () => {
        try {
            const { user, error } = await signUp(email, password);
            if (error) {
                Alert.alert('Sign Up Error', error.message);
            } else if (user) {
                Alert.alert('Success', 'Registration successful!');
                // Navigate to another screen or do something with user data
            }
        } catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
    };

    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText);
    };

    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                onChangeText={handleEmail}
                value={email}
                placeholder='Enter email'
                placeholderTextColor='black'
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                onChangeText={handlePassword}
                value={password}
                placeholder='Enter password'
                placeholderTextColor='black'
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <TouchableOpacity onPress={confirmFunction} style={{ backgroundColor: 'blue', padding: 10 }}>
                <Text style={{ color: 'white' }}>CONFIRM</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthorizationScreen;
