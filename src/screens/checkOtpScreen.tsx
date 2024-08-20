import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { checkOtp } from '../api';


const CheckOtpScreen = ({navigation, route}: any) => {

    const [otp, setOtp] = useState('');

    const handleOtp = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setOtp(filteredText);
    };

    const otpFun = async () => {
        try {
            const { user, error } = await checkOtp(otp, route.params.email);
            if (error) {
                Alert.alert('Sign Up Error', error.message);
            } else if (user) {
                Alert.alert('Success', 'Registration successful!');
            }
        } 
        catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
    }

    return(
        <>
        <TextInput
            onChangeText={handleOtp}
            value={otp}
            placeholder='Enter code'
            placeholderTextColor='black'
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
        />
        <TouchableOpacity onPress={otpFun} style={{ backgroundColor: 'blue', padding: 10, marginBottom: 8, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>SEND</Text>
            </TouchableOpacity>
        </>
    )
}


export default CheckOtpScreen