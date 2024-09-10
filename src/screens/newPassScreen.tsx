import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { getUser, passRecovery, setUser, updateUser } from '../api';
import { useAppDispatch } from '../redux/store/hooks';
import{ setUser as setUserAction }  from '../redux/features/userSlice'


const NewPassScreen = ({navigation, route}: any) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
          e.preventDefault();
          navigation.dispatch(e.data.action);
          navigation.navigate('authorization');
        });
        return unsubscribe;
    }, [navigation]);

    const [password, setPassword] = useState('');
    const [openPass, setOpenPass] = useState(Boolean)
    const dispatch = useAppDispatch();


    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };

    const newPassword = async () => {
        try {
            const { user, error } = await updateUser(route.params.email, password);
            if (error) {
                if(error.message==='New password should be different from the old password.'){
                    Alert.alert('Ошибка', 'Новый пароль должен отличаться от старого!');
                    return;
                }
            }
            Alert.alert('Успешно', 'Вы успешно сменили пароль!');
            const {user: userResponce} = await getUser();
            userResponce && dispatch(setUserAction(userResponce))
            
        } 
        catch (error) {
            console.error('Неизвестная ошибка:', error);
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
    };

    return(
        <>
         <View style={styles.mainViewStyle}>
         <View style={styles.viewHeaderStyle}>
                <Text style = {styles.viewMainTextHeaderStyle}>Придумайте новый пароль</Text>
                <Text style = {styles.viewTextHeaderStyle}>Введите новый пароль</Text>
            </View>
            <TextInput
                onChangeText={handlePassword}
                onFocus={() => setOpenPass(true)}
                onBlur={() => setOpenPass(false)}
                value={password}
                placeholder='новый пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                secureTextEntry
                style={ openPass ? [styles.inputTextStyle, {borderColor: 'black', borderWidth: 1}] : styles.inputTextStyle}
            />
            <TouchableOpacity onPress={newPassword} style={styles.opacityStyle}>
                <Text style={styles.opacityTextStyle}>Сменить пароль</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {padding: 20},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    inputTextStyle: { 
        marginBottom: 10, 
        fontSize: 25, 
        borderRadius: 15, 
        padding: 10, 
        fontFamily: 'helvetica',
        backgroundColor: 'white'
    },
    opacityStyle: {backgroundColor: '#f06204', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 25},
    opacityTextStyle: {color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}
})

export default NewPassScreen