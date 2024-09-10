import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { setUser, signUp } from '../api';
import DatePicker from 'react-native-date-picker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




const CreateAccScreen = ({navigation}: any) => {
    const [gender, setGender] = useState('мужской')
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState(new Date());
    const [placeholder, setPlaceholder] = useState('дата рождения');
    const [open, setOpen] = useState(false)
    const [openName, setOpenName] = useState(Boolean)
    const [openSurname, setOpenSurname] = useState(Boolean)
    const [openEmail, setOpenEmail] = useState(Boolean)
    const [openPass, setOpenPass] = useState(Boolean)
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
        setEmail(filteredText.toLowerCase());
    };

    const handlePassword = (inputText: any) => {
        const filteredText = inputText.replace(/\s/g, '');
        setPassword(filteredText);
    };
    console.log(gender);
    const createAccountFun = async () => {
        try {
            const { user, error } = await signUp(email, password);
            if (error) {
                if(error.message==='Password should be at least 6 characters.'){
                    Alert.alert('Ошибка', 'Минимальная длина пароля 6 символов!');
                    return;
                }
                else if(error.message==='Unable to validate email address: invalid format'){
                    Alert.alert('Ошибка', 'Введите правильный формат почты!');
                    return; 
                }
                else if(error.message==='Anonymous sign-ins are disabled'){
                    Alert.alert('Ошибка', 'Заполните все поля!');
                    return;
                }
                else if(error.message==='Error sending confirmation mail'){
                    Alert.alert('Ошибка', 'Введите существующий адрес почты!');
                    return;
                }
            }
            else if (!user?.role) {
                Alert.alert('Укажите другую почту', `Аккаунт с почтой ${email} уже существует!`,);
                return; 
            }
            Alert.alert('Успешно', 'На Вашу почту выслан 6-значный код для создания аккаунта!');
            navigation.navigate('checkOtpScreen', {email: email, id: user?.id, name: name, surname: surname, date: date.toISOString(), gender: gender})
            console.log(user)
        } 
        catch (error) {
            console.error('Неизвестная ошибка:', error);
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
        
    };

    return(
        <View style={styles.mainViewStyle}>
            <View style={styles.viewHeaderStyle}>
                <Text style = {styles.viewMainTextHeaderStyle}>Укажите информацию о себе</Text>
                <Text style = {styles.viewTextHeaderStyle}>Заполните основные данные</Text>
            </View>
            <View style={styles.viewNameStyle}>
                <TextInput
                    onChangeText={handleName}
                    onFocus={() => setOpenName(true)}
                    onBlur={() => setOpenName(false)}
                    value={name}
                    placeholder='имя'
                    placeholderTextColor='rgba(0, 0, 0, 0.4)'
                    style={ openName ? [styles.inputTextNameStyle, {borderColor: 'black', borderWidth: 1}] : styles.inputTextNameStyle}
                />
                <View style={{width: 8}}></View>
                <TextInput
                    onChangeText={handleSurname}
                    onFocus={() => setOpenSurname(true)}
                    onBlur={() => setOpenSurname(false)}
                    value={surname}
                    placeholder='фамилия'
                    placeholderTextColor='rgba(0, 0, 0, 0.4)'
                    style={ openSurname ? [styles.inputTextNameStyle, {borderColor: 'black', borderWidth: 1}] : styles.inputTextNameStyle}
                />
            </View>
            <View style={{marginBottom: 10}}>
               
                <RadioForm
                    radio_props={[{value: 'мужской',  label: 'мужчина'}, {value: 'женский', label: 'женщина'}]}
                    initial={0}
                    onPress={setGender}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#869aab'}
                    selectedButtonColor={'rgba(0,125,255,255)'}
                    animation={true}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                    buttonSize={25}
                    buttonOuterSize={40}
                    labelStyle={{
                        fontSize: 25,
                        color: 'black'
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.opacityDateStyle}>
                {placeholder==='дата рождения' ? <Text style={styles.opacityDefaultTextDateStyle}>{placeholder}</Text> : <Text style={styles.opacityCheckTextDateStyle}>{placeholder}</Text>}
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
                onCancel={() => {setOpen(false)}}
            />
            <TextInput
                onChangeText={handleEmail}
                onFocus={() => setOpenEmail(true)}
                onBlur={() => setOpenEmail(false)}
                value={email}
                placeholder='почта'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                style={ openEmail ? [styles.inputTextStyle, {borderColor: 'black', borderWidth: 1}] : styles.inputTextStyle}
                />
            <TextInput
                onChangeText={handlePassword}
                onFocus={() => setOpenPass(true)}
                onBlur={() => setOpenPass(false)}
                value={password}
                placeholder='пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                secureTextEntry
                style={ openPass ? [styles.inputTextStyle, {borderColor: 'black', borderWidth: 1}] : styles.inputTextStyle}
                />
            <TouchableOpacity onPress={createAccountFun} style={styles.opacityStyle}>
                <Text style={styles.opacityTextStyle}>Далее</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {padding: 20, backgroundColor: 'rgba(239,238,244,255)'},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    viewNameStyle: {flexDirection: 'row', marginBottom: 10},
    inputTextNameStyle: {
        flex: 1, 
        fontSize: 25, 
        borderRadius: 15, 
        padding: 10, 
        fontFamily: 'helvetica',
        backgroundColor: 'white',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    opacityDateStyle: { 
        padding: 10, 
        marginBottom: 10, 
        borderRadius: 15, 
        backgroundColor: 'white',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    opacityDefaultTextDateStyle: { color: 'rgba(0, 0, 0, 0.4)', fontSize: 25, fontFamily: 'helvetica'},
    opacityCheckTextDateStyle: { color: 'rgba(0, 0, 0, 1)', fontSize: 25, fontFamily: 'helvetica'},
    inputTextStyle: {
        marginBottom: 10,
        fontSize: 25,
        borderRadius: 15,
        padding: 10,
        fontFamily: 'helvetica',
        backgroundColor: 'white',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    opacityStyle: {
        backgroundColor: 'rgba(0,125,255,255)',
        padding: 10,
        marginBottom: 8,
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    opacityTextStyle: {color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}
})

export default CreateAccScreen