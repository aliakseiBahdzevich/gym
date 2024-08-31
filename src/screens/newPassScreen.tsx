import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { passRecovery, updateUser } from '../api';


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

    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };

    const newPassword = async () => {
        try {
            console.log(route.params.email)
            const { user, error } = await updateUser(route.params.email, password);
            if (error) {
                Alert.alert('Ошибка', error.message);
            }
            Alert.alert('Успешно', 'Вы успешно сменили пароль!');
            console.log(user)
        } 
        catch (error) {
            console.error('Неизвестная ошибка:', error);
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
    };

    return(
        <>
         <View style={{ padding: 20 }}>
            <TextInput
                onChangeText={handlePassword}
                value={password}
                placeholder='Введите пароль'
                placeholderTextColor='black'
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)'  }}
            />
            <TouchableOpacity onPress={newPassword} style={{ backgroundColor: 'green', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '600'}}>СМЕНИТЬ ПАРОЛЬ</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}


export default NewPassScreen