import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert } from 'react-native';
import { getUser, passRecovery, supabase, User } from '../api';


const ProfileScreen = ({navigation, route}: any) => {

    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        userData()
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
          e.preventDefault();
          navigation.dispatch(e.data.action);
          navigation.navigate('authorization');
        });
        return unsubscribe;
    }, [navigation]);

    const userData = async () => {
        try{
            const {user, error} = await getUser()
            if(error){
                if (error.message==="User from sub claim in JWT does not exist"){
                    Alert.alert('Ошибка', 'Зарегистрируйте аккаунт!');
                    return;
                }
                console.error(error)
                Alert.alert("Ошибка", error.message)
            }
            setUser(user)
        }
        catch (error) {
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
    }


    return(
        <>
        <TouchableOpacity onPress={()=>supabase.auth.signOut()}><Text>ВЫЙТИ</Text></TouchableOpacity>
        <Text>{user?.name}</Text>
        <Text>{user?.birthday}</Text>
        <Text>{user?.surname}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.gender}</Text>
        <TouchableOpacity onPress={()=>userData()}><Text>запрос</Text></TouchableOpacity>
        </>
    )
}


export default ProfileScreen