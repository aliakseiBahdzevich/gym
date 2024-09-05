import * as React from 'react';
import { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { setUser, signUp } from '../api';
import DatePicker from 'react-native-date-picker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




const CreateAccScreen = ({navigation}: any) => {
    const [checked, setChecked] = useState('female')
    
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
            setTimeout(()=>navigation.navigate('checkOtpScreen', {email: email, id: user?.id, name: name, surname: surname, date: date.toISOString()}), 1000)
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
                    style={ openName ? [styles.inputTextNameStyle, {borderColor: 'black'}] : [styles.inputTextNameStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
                />
                <View style={{width: 8}}></View>
                <TextInput
                    onChangeText={handleSurname}
                    onFocus={() => setOpenSurname(true)}
                    onBlur={() => setOpenSurname(false)}
                    value={surname}
                    placeholder='фамилия'
                    placeholderTextColor='rgba(0, 0, 0, 0.4)'
                    style={ openSurname ? [styles.inputTextNameStyle, {borderColor: 'black'}] : [styles.inputTextNameStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
                />
            </View>
            <View style={{
        borderWidth: 2,             // Толщина границы
        borderColor: 'black',       // Цвет границы
        borderRadius: 10,           // Закругление углов                // Внутренний отступ
        backgroundColor: '#f9f9f9', // Цвет фона контейнера
        marginBottom: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,
    }}>
                {/* <RadioForm 
                    radio_props={[{value: 'male',  label: 'мужчина'}, {value: 'female', label: 'женщина'}]}
                    initial={0}
                    onPress={(value) => {setChecked(value)}}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#869aab'}
                    selectedButtonColor={'#046ef0'}
                    animation={true}
                    wrapStyle={{marginRight: 0}}
                    labelStyle={{fontSize: 25, color: 'black', margin: 10}}
                    buttonSize={25}
                /> */}
                <RadioForm
                    radio_props={[{value: 'male',  label: 'мужчина'}, {value: 'female', label: 'женщина'}]}
                    initial={0}
                    onPress={(value) => setChecked(value)}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#869aab'}
                    selectedButtonColor={'#046ef0'}
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
                    // buttonWrapStyle={{
                    //     flex: 1,
                    //     justifyContent: 'center',
                    // }}
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
                style={ openEmail ? [styles.inputTextStyle, {borderColor: 'black'}] : [styles.inputTextStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
                />
            <TextInput
                onChangeText={handlePassword}
                onFocus={() => setOpenPass(true)}
                onBlur={() => setOpenPass(false)}
                value={password}
                placeholder='пароль'
                placeholderTextColor='rgba(0, 0, 0, 0.4)'
                secureTextEntry
                style={ openPass ? [styles.inputTextStyle, {borderColor: 'black'}] : [styles.inputTextStyle, {borderColor: 'rgba(0, 0, 0, 0.4)'}]}
                />
            <TouchableOpacity onPress={createAccountFun} style={styles.opacityStyle}>
                <Text style={styles.opacityTextStyle}>Далее</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {padding: 20},
    viewHeaderStyle: {flexDirection: 'column', marginBottom: 20},
    viewMainTextHeaderStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    viewTextHeaderStyle: {fontSize: 20, fontWeight: '300', fontFamily: 'helvetica', paddingTop: 10},
    viewNameStyle: {flexDirection: 'row', marginBottom: 10},
    inputTextNameStyle: {flex: 1, borderWidth: 1, fontSize: 25, borderRadius: 15, padding: 10, fontFamily: 'helvetica'},
    opacityDateStyle: { padding: 10, marginBottom: 10, borderRadius: 15, borderColor: 'rgba(0, 0, 0, 0.4)', borderWidth: 1},
    opacityDefaultTextDateStyle: { color: 'rgba(0, 0, 0, 0.4)', fontSize: 25, fontFamily: 'helvetica'},
    opacityCheckTextDateStyle: { color: 'rgba(0, 0, 0, 1)', fontSize: 25, fontFamily: 'helvetica'},
    inputTextStyle: {borderWidth: 1, marginBottom: 10, fontSize: 25, borderRadius: 15, padding: 10, fontFamily: 'helvetica'},
    opacityStyle: {backgroundColor: '#046ef0', padding: 10, marginBottom: 8, alignItems: 'center', borderRadius: 25},
    opacityTextStyle: {color: 'white', fontSize: 30, fontWeight: '400', fontFamily: 'helvetica'}
})

export default CreateAccScreen