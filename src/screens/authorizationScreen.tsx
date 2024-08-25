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

    
    const logInAccountFun = async () => {
        try {
            const { user, error } = await signIn(email, password);
            console.log(user)
            if (error) {
                Alert.alert('Ошибка', 'неверные почта или пароль');
            } 
            else if (user) {
                Alert.alert('Успешно', 'Вход выполнен!');
                setTimeout(()=>navigation.navigate('profile'), 1000)
            }
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
                placeholder='Введите почту'
                placeholderTextColor='black'
                style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 25 }}
            />
            <TextInput
                onChangeText={handlePassword}
                value={password}
                placeholder='Введите пароль'
                placeholderTextColor='black'
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 20, fontSize: 25  }}
            />
            <TouchableOpacity onPress={logInAccountFun} style={{ backgroundColor: 'blue', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold'  }}>ВОЙТИ</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={forgetPass} style={{ padding: 10, marginBottom: 8, alignItems: 'center', borderColor: 'clack', borderWidth: 1, borderRadius: 8 }}>
                <Text style={{ color: 'black', fontSize: 25}}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('createAccount')} style={{ backgroundColor: 'green', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold'}}>СОЗДАТЬ АККАУНТ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthorizationScreen;


