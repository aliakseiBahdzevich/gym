import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { checkOtp, setUser } from '../api';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs'
import Clipboard from '@react-native-clipboard/clipboard';



const CheckOtpScreen = ({navigation, route}: any) => {

    const [otp, setOtp] = useState('');
    const ref = React.useRef<OtpInputsRef>(null)

    const handleOtp = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setOtp(filteredText);
    };

    React.useEffect(() => {
        ref.current?.focus()
    }, [])

    const otpFun = async () => {
        try {
            const { user, error } = await checkOtp(otp, route.params.email);
            if (error) {
                Alert.alert('Sign Up Error', error.message);
            } else if (user) {
                Alert.alert('Success', 'Registration successful!');
                setUser(route.params.id, route.params.name, route.params.surname, route.params.email, route.params.date);
            }
        } 
        catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
    }

    return(
        <View style={styles.viewStyle}>
        <OtpInputs
            autoFocus
            //ref={ref}
            handleChange={handleOtp}
            numberOfInputs={6} 
            autofillFromClipboard={false}
            // style={{backgroundColor: 'red'}}
            inputStyles={[styles.inputStyle]} 
            inputContainerStyles={{ justifyContent: 'space-between', alignItems: 'center', flex: 1}} 
            style={{ flexDirection: 'row', width: '100%'}}
        />
        {/* <View style={{height: 20}}/> */}
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


export default CheckOtpScreen