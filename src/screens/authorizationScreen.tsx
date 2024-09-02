import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { checkUserExist, supabase } from '../api';;
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, signIn, signUp } from '../api';

const AuthorizationScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openEmail, setOpenEmail] = useState(Boolean)
    const [openPass, setOpenPass] = useState(Boolean)


    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText.toLowerCase());
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
                Alert.alert('Ошибка', 'Неверные почта или пароль');
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
        <View style={styles.mainViewStyle}>
            <View style={styles.viewStyle}>
                <Text style = {styles.viewTextStyle}>GYM</Text>
            </View>
            <TextInput
                onChangeText={handleEmail}
                onFocus={() => setOpenEmail(true)}
                onBlur={() => setOpenEmail(false)}
                value={email}
                placeholder='Введите почту'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                style={ openEmail ? [styles.inputTextStyle, {borderColor: 'black'}] : [styles.inputTextStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
            />
            <TextInput
                onChangeText={handlePassword}
                onFocus={() => setOpenPass(true)}
                onBlur={() => setOpenPass(false)}
                value={password}
                placeholder='Введите пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                secureTextEntry
                style={ openPass ? [styles.inputTextStyle, {borderColor: 'black'}] : [styles.inputTextStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
            />
            <TouchableOpacity onPress={logInAccountFun} style={[styles.opacityStyle, {backgroundColor: '#f06204'}]}>
                <Text style={styles.opacityTextStyle}>Войти</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('forgPassScreen')} style={styles.passOpacityStyle}>
                <Text style={styles.passTextOpacityStyle}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('createAccount')} style={[styles.opacityStyle, {backgroundColor: '#046ef0'}]}>
                <Text style={styles.opacityTextStyle}>Создать аккаунт</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {padding: 20},
    viewStyle: {flexDirection: 'row', marginBottom: 10, justifyContent: 'center'},
    viewTextStyle: {fontSize: 80, fontWeight: '900', fontFamily: 'helvetica'},
    inputTextStyle: {borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 15, padding: 10, fontFamily: 'helvetica'},
    opacityStyle: {padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 25},
    opacityTextStyle: { color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'},
    passOpacityStyle: {padding: 10, marginBottom: 8, alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 25},
    passTextOpacityStyle: {color: 'black', fontSize: 25, fontFamily: 'helvetica'}
})

export default AuthorizationScreen;


