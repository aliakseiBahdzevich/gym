import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { checkOtp, setUser } from '../api';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard';



const CheckOtpScreen = ({navigation, route}: any) => {

    const [otp, setOtp] = useState('');

    const handleOtp = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setOtp(filteredText);
    };

    const otpFun = async () => {
        try {
            const { user, error } = await checkOtp(otp, route.params.email, 'signup');
            if (error) {
                Alert.alert('Ошибка', 'Неверный код');
            } else if (user) {
                Alert.alert('Успешно', 'Регистрация прошла успешно!');
                setTimeout(()=>navigation.navigate('profile'), 1000)
                setUser(route.params.id, route.params.name, route.params.surname, route.params.email, route.params.date);
            }
        } 
        catch (error) {
            console.error('Неизвестная ошибка:', error);
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
    }

    return(
        <View style={styles.viewStyle}>
            <View style={styles.viewHeaderStyle}>
                <Text style = {styles.viewMainTextHeaderStyle}>На Вашу почту был отправлен код для создания аккаунта</Text>
                <Text style = {styles.viewTextHeaderStyle}>Введите код в поле ввода</Text>
            </View>
            <OtpInputs
                autoFocus
                handleChange={handleOtp}
                numberOfInputs={6} 
                autofillFromClipboard={false}
                inputStyles={styles.otpInputStyle} 
                inputContainerStyles={styles.otpInputContStyle} 
                style={styles.otpStyle}
            />
            <TouchableOpacity onPress={otpFun} style={styles.opacityStyle}>
                <Text style={styles.opacityTextStyle}>Отправить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {padding: 20, flex: 1},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    opacityStyle: { backgroundColor: '#046ef0', padding: 10, marginTop: 8, alignItems: 'center', borderRadius: 25 },
    opacityTextStyle: { color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica' }, 
    otpInputStyle: { borderWidth: 1, fontSize: 25, borderRadius: 8, borderColor: 'rgba(0, 0, 0, 0.6)', width: 50, height: 50, alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', fontFamily: 'helvetica' },
    otpInputContStyle: {justifyContent: 'space-between', alignItems: 'center', flex: 1},
    otpStyle: {flexDirection: 'row', width: '100%'}
})


export default CheckOtpScreen


