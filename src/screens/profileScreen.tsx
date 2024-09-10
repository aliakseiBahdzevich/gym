import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { getUser, passRecovery, supabase, User } from '../api';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { store } from '../redux/store/store';
import { setUser } from '../redux/features/userSlice';


const ProfileScreen = ({navigation, route}: any) => {

    const user = useAppSelector(store=> store.user.user)
    const dispatch = useAppDispatch()
    
    const logOut = async()=>{
        await supabase.auth.signOut();
        dispatch(setUser(null))
    }

    return(
        <>
        <View style={styles.viewMainStyle}>
            <View style={styles.viewHeaderStyle}>
                <View style={styles.viewNameStyle}>
                    <Text style = {styles.viewTextNameStyle}>{user?.name}</Text>
                    <Text style = {styles.viewTextNameStyle}>{user?.surname}</Text>
                </View>
                <View style={styles.viewAvatarStyle}>
                    <Text>аватарка</Text>
                </View>   
            </View>  
            <View style={[styles.viewHeaderStyle, {flexDirection: 'column', alignItems: 'baseline'}]}>
                <View style={{borderBottomWidth: 1, width: '100%', borderBottomColor: 'rgba(235,235,235,255)'}}>
                    <Text style={{fontSize: 16}}>пол</Text>
                    <Text style={{fontSize: 18}}>{user?.gender}</Text>
                </View>
                <View style={{borderBottomWidth: 1, width: '100%', borderBottomColor: 'rgba(235,235,235,255)'}}>
                    <Text style={{fontSize: 16}}>дата рождения</Text>
                    <Text style={{fontSize: 18}}>{user?.birthday}</Text>
                </View>
                <View style={{width: '100%'}}>
                    <Text style={{fontSize: 16}}>почта</Text>
                    <Text style={{fontSize: 18}}>{user?.email}</Text>
                </View>
            </View>    
        </View>
        <View style={{padding: 15}}>
            <TouchableOpacity style={[styles.opacityStyle, {backgroundColor: 'rgba(0,125,255,255)'}]} onPress={logOut}>
                <Text style={styles.opacityTextStyle}>Редактировать профиль</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.opacityStyle, {backgroundColor: '#f06204'}]} onPress={logOut}>
                <Text style={styles.opacityTextStyle}>Выйти из профиля</Text>
            </TouchableOpacity>
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    viewMainStyle: {padding: 15, flex: 1, backgroundColor: 'rgba(239,238,244,255)'},
    viewHeaderStyle: {
        flexDirection: 'row', 
        marginBottom: 20, 
        padding: 5, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderRadius: 10, 
        backgroundColor: 'white',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    viewAvatarStyle: {
        borderRadius: 60, 
        width: 120, 
        height: 120, 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
        backgroundColor: 'rgba(87,192,247,255)'
    },
    viewNameStyle: {flexDirection: 'column', backgroundColor: 'white'},
    viewTextNameStyle: {fontSize: 30, fontWeight: '700', fontFamily: 'helvetica'},
    opacityStyle: {
        padding: 10, 
        marginBottom: 8, 
        alignItems: 'center', 
        borderRadius: 10,
        shadowColor: 'black', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 6, // Радиус размытия тени
        elevation: 10, // Тень для Android
    },
    opacityTextStyle: { color: 'white', fontSize: 18, fontFamily: 'helvetica'}
})


export default ProfileScreen