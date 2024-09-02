import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { checkUserExist, supabase } from '../api';;
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, signIn, signUp } from '../api';


const ForgPassScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [openEmail, setOpenEmail] = useState(Boolean)


    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText.toLowerCase());
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
            Alert.alert('Ошибка', 'Пользователя с таким email не существует!');
        }
    }

    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.viewHeaderStyle}>
                <Text style = {styles.viewMainTextHeaderStyle}>Найдите свой аккаунт</Text>
                <Text style = {styles.viewTextHeaderStyle}>Введите адрес электронной почты</Text>
            </View>
            <TextInput
                onChangeText={handleEmail}
                onFocus={() => setOpenEmail(true)}
                onBlur={() => setOpenEmail(false)}
                value={email}
                placeholder='почта'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                style={ openEmail ? [styles.inputTextStyle, {borderColor: 'black'}] : [styles.inputTextStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
            />
            <TouchableOpacity onPress={forgetPass} style={styles.opacityStyle}>
                <Text style={styles.opacityTextStyle}>Далее</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {padding: 20},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    inputTextStyle: {borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 15, padding: 10, fontFamily: 'helvetica'},
    opacityStyle: {backgroundColor: '#046ef0', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 25},
    opacityTextStyle: {color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}
})

export default ForgPassScreen;