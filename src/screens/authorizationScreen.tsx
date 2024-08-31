import * as React from 'react';
import { Linking } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { checkUserExist, supabase } from '../api';;
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, signIn, signUp } from '../api';

const AuthorizationScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText);
    };

    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };
          
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
            console.error('Неизвестная ошибка:', error);
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
        
    };

    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center' }}>
                <Text style = {{fontSize: 80, fontWeight: '900', fontFamily: 'helvetica'}}>GYM</Text>
            </View>
            <TextInput
                onChangeText={handleEmail}
                value={email}
                placeholder='Введите почту'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)', fontFamily: 'helvetica'   }}
            />
            <TextInput
                onChangeText={handlePassword}
                value={password}
                placeholder='Введите пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)', fontFamily: 'helvetica' }}
            />
            <TouchableOpacity onPress={logInAccountFun} style={{ backgroundColor: '#f06204', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}}>Войти</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('forgPassScreen')} style={{ padding: 10, marginBottom: 8, alignItems: 'center', borderColor: 'clack', borderWidth: 1, borderRadius: 8 }}>
                <Text style={{ color: 'black', fontSize: 25, fontFamily: 'helvetica' }}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('createAccount')} style={{ backgroundColor: '#046ef0', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}}>Создать аккаунт</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthorizationScreen;


