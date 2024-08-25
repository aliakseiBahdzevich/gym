import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { setUser, signUp } from '../api';


const CreateAccScreen = ({navigation}: any) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleName = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setName(filteredText);
    };

    const handleSurname = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setSurname(filteredText);
    };


    const handleEmail = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setEmail(filteredText);
    };

    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };

    const createAccountFun = async () => {
        try {
            const { user, error } = await signUp(email, password);
            console.log('RESPONCE CREATE ACC', user);
            if (error) {
                Alert.alert('Ошибка', error.message);
                return;
            } 
            else if (!user?.role) {
                Alert.alert('Укажите другую почту', `аккаунт с почтой ${email} уже существует!`,);
                return; 
            }
            setUser(user.id, name, surname, email);
            Alert.alert('Успешно', `Ваш аккаунт создан! ${email}`,);
            setTimeout(()=>navigation.navigate('checkOtpScreen', {email: email}), 1000)
            console.log(user)
        } 
        catch (error) {
            console.error('Unexpected Error:', error);
            Alert.alert('Unexpected Error', 'Something went wrong!');
        }
        
    };


    return(
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                    onChangeText={handleName}
                    value={name}
                    placeholder='имя'
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    style={{ flex: 1, borderWidth: 1, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)', marginRight: 5 }}
                />
                <TextInput
                    onChangeText={handleSurname}
                    value={surname}
                    placeholder='фамилия'
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    style={{ flex: 1, borderWidth: 1, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)', marginLeft: 5 }}
                 />
            </View>
            <TextInput
                onChangeText={handleEmail}
                value={email}
                placeholder='почта'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)'  }}
            />
            <TextInput
                onChangeText={handlePassword}
                value={password}
                placeholder='пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 8, padding: 10, borderColor: 'rgba(0, 0, 0, 0.6)'  }}
            />
            <TouchableOpacity onPress={createAccountFun} style={{ backgroundColor: 'green', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 8}}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold'}}>СОЗДАТЬ АККАУНТ</Text>
            </TouchableOpacity>
        </View>
    )
}


export default CreateAccScreen