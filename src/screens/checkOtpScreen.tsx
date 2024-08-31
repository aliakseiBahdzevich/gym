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
                Alert.alert('Ошибка', 'неверный код');
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
        <OtpInputs
            autoFocus
            handleChange={handleOtp}
            numberOfInputs={6} 
            autofillFromClipboard={false}
            inputStyles={[styles.inputStyle]} 
            inputContainerStyles={{ justifyContent: 'space-between', alignItems: 'center', flex: 1}} 
            style={{ flexDirection: 'row', width: '100%'}}
        />
        <TouchableOpacity onPress={otpFun} style={styles.opacityStyle}>
            <Text style={styles.textStyle}>отправить</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {padding: 20, flex: 1},
    opacityStyle: { backgroundColor: '#046ef0', padding: 10, marginTop: 8, alignItems: 'center', borderRadius: 8 },
    textStyle: { color: 'white', fontSize: 30, fontWeight: '600', fontFamily: 'helvetica' }, 
    inputStyle: { borderWidth: 1, fontSize: 25, borderRadius: 8, borderColor: 'rgba(0, 0, 0, 0.6)', width: 50, height: 50, alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', fontFamily: 'helvetica' }
})


export default CheckOtpScreen


