import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { checkOtp, setUser } from '../api';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard';
import{ setUser as setUserAction }  from '../redux/features/userSlice'
import { useAppDispatch } from '../redux/store/hooks';



const CheckOtpScreen = ({navigation, route}: any) => {

    const [otp, setOtp] = useState('');
    const dispatch = useAppDispatch();
    const [otpView, setOtpView] = useState(Boolean)

    const handleOtp = React.useCallback((inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setOtp(filteredText);
    }, []);

    const otpFun = async () => {
        try {
            const { user, error } = await checkOtp(otp, route.params.email, 'signup');
            if (error) {
                Alert.alert('Ошибка', 'Неверный код');
            } else if (user) {
                const {user: userResponce} = await setUser(route.params.id, route.params.name, route.params.surname, route.params.email, route.params.date, route.params.gender);
                userResponce && dispatch(setUserAction(userResponce[0]))
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
                onFocus={() => setOtpView(true)}
                onBlur={() => setOtpView(false)}
                autoFocus
                handleChange={handleOtp}
                numberOfInputs={6} 
                autofillFromClipboard={false}
                inputStyles={otpView ? [styles.otpInputStyle, {borderColor: 'black', borderWidth: 1}] : styles.otpInputStyle} 
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
    viewStyle: {padding: 20, flex: 1, backgroundColor: 'rgba(239,238,244,255)'},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    opacityStyle: { backgroundColor: 'rgba(0,125,255,255)', padding: 10, marginTop: 8, alignItems: 'center', borderRadius: 25 },
    opacityTextStyle: { color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica' }, 
    otpInputStyle: {
        fontSize: 25, 
        borderRadius: 8, 
        width: 50, 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        textAlign: 'center', 
        fontFamily: 'helvetica', 
        backgroundColor: 'white',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    otpInputContStyle: {justifyContent: 'space-between', alignItems: 'center', flex: 1},
    otpStyle: {flexDirection: 'row', width: '100%'}
})


export default CheckOtpScreen


