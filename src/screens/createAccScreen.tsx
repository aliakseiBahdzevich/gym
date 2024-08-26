import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { setUser, signUp } from '../api';
import DatePicker from 'react-native-date-picker'




const CreateAccScreen = ({navigation}: any) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState(new Date());
    const [placeholder, setPlaceholder] = useState('дата рождения');
    const [open, setOpen] = useState(false)
    const monthNames = [
        "января", "февряля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

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
            Alert.alert('Успешно', `Ваш аккаунт создан! ${email}`,);
            setTimeout(()=>navigation.navigate('checkOtpScreen', {email: email, id: user.id, name: name, surname: surname, date: date.toISOString()}), 1000)
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
            <TouchableOpacity onPress={() => setOpen(true)} style={{ padding: 10, marginBottom: 8, borderRadius: 8, borderColor: 'rgba(0, 0, 0, 0.6)', borderWidth: 1}}>
                {placeholder==='дата рождения' ? <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 25}}>{placeholder}</Text> : <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 25}}>{placeholder}</Text>}
            </TouchableOpacity>
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setPlaceholder(date.getDate() + ' ' + (monthNames[date.getMonth()]) + ' ' + date.getFullYear() + 'г')
                }}
                onCancel={() => {
                  setOpen(false)
                }}
            />
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
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '600'}}>СОЗДАТЬ АККАУНТ</Text>
            </TouchableOpacity>
        </View>
    )
}


export default CreateAccScreen