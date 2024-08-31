import * as React from 'react';
import { Linking } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { checkUserExist, supabase } from '../api';;
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, signIn, signUp } from '../api';

const ForgPassScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');

    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText);
    };

    const forgetPass = async () => {
        const userExist = await checkUserExist(email)
        if (userExist){
            const { error } = await passRecovery(email);
            if (error) {
                Alert.alert('Ошибка', error.message);
            }
            Alert.alert('Успешно', 'На вашу почту выслан 6-значный код для восстановления пароля!');
            setTimeout(()=>navigation.navigate('checkOtpPassRec', {email: email}), 1000)
        }
        else{
            Alert.alert('Ошибка', 'Пользователь с таким email не существует!');
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                onChangeText={handleEmail}
                value={email}
                placeholder='Введите почту'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)'  }}
            />

            <TouchableOpacity onPress={forgetPass} style={{ backgroundColor: 'blue', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '600'  }}>ВОССТАНОВИТЬ ПАРОЛЬ</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ForgPassScreen;