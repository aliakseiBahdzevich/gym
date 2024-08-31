import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { checkOtp, setUser } from '../api';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard';



const CheckOtpPassRecScreen = ({navigation, route}: any) => {

    const [otp, setOtp] = useState('');

    const handleOtp = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setOtp(filteredText);
    };

    const otpFun = async () => {
        try {
            const { user, error } = await checkOtp(otp, route.params.email, 'recovery');
            if (error) {
                Alert.alert('Ошибка', 'неверный код');
            } else if (user) {
                Alert.alert('Успешно', 'Код введен верно!');
                setTimeout(()=>navigation.navigate('newPassScreen', {email: route.params.email}), 1000)
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
            <Text style={styles.textStyle}>SEND</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {padding: 20, flex: 1},
    opacityStyle: { backgroundColor: 'blue', padding: 10, marginTop: 8, alignItems: 'center', borderRadius: 8 },
    textStyle: { color: 'white', fontSize: 25, fontWeight: '600' }, 
    inputStyle: { borderWidth: 1, fontSize: 25, borderRadius: 8, borderColor: 'rgba(0, 0, 0, 0.6)', width: 50, height: 50, alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }
})


export default CheckOtpPassRecScreen