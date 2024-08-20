import * as React from 'react';
import { Linking } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../api';;
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, signIn, signUp } from '../api';

const AuthorizationScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        

    const forgetPass = async () => {
        try {
            const { user, error } = await passRecovery(email);
            if (error) {
                Alert.alert('Sign Up Error', error.message);
            }
            Alert.alert('Success', 'Watch your mail');
            console.log(user)
        } 
        catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
    }

    const createAccountFun = async () => {
        try {
            const { user, error } = await signUp(email, password);
            console.log('RESPONCE CREATE ACC', user);
            if (error) {
                Alert.alert('Sign Up Error', error.message);
            } 
            if (!user?.email_confirmed_at) {
                Alert.alert('Sign Up Error', ` шлюха! ${email}`,);
                return; 
            }

            Alert.alert('Success', `Registration successful! ${email}`,);
            setTimeout(()=>navigation.navigate('checkOtpScreen', {email: email}), 1000)
            console.log(user)
        } 
        catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
        
    };

    
    const logInAccountFun = async () => {
        try {
            const { user, error } = await signIn(email, password);
            if (error) {
                Alert.alert('Sign In Error', error.message);
            } else if (user) {
                Alert.alert('Success', 'Successful login!');
                setTimeout(()=>navigation.navigate('profile'), 1000)
            }
            console.log(user)
        } 
        catch (error) {
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
            <TouchableOpacity onPress={logInAccountFun} style={{ backgroundColor: 'blue', padding: 10, marginBottom: 8, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={forgetPass} style={{ padding: 10, marginBottom: 8, alignItems: 'center', borderColor: 'clack', borderWidth: 1 }}>
                <Text style={{ color: 'black' }}>Forgotten password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={createAccountFun} style={{ backgroundColor: 'green', padding: 10, marginBottom: 8, alignItems: 'center'}}>
                <Text style={{ color: 'white' }}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthorizationScreen;
