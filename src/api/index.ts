import AsyncStorage from '@react-native-async-storage/async-storage'
import { EmailOtpType, MobileOtpType, createClient } from '@supabase/supabase-js'
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'
import userSlice from '../redux/features/userSlice'
import{ setUser as setUserAction }  from '../redux/features/userSlice'
import { useAppSelector, useAppDispatch } from '../redux/store/hooks'

const supabaseUrl = 'https://zfousekokwvlzswkizbq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3VzZWtva3d2bHpzd2tpemJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNjc1MTcsImV4cCI6MjAzOTY0MzUxN30.kRjQUzrpbMirGhbmR46uHqgXZCMWiHiIorCvawh7ZOY'
// сonst user = useAppSelector(store=> store.user.user)
// const dispatch = useAppDispatch()

export type User = {
    email: string,
    name: string,
    surname: string,
    birthday: string,
    gender: string,
    avatar: string 
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

export const checkUserExist = async (email: string) => {
    const { data, error } = await supabase 
        .from('users')
        .select()
        .eq('email', email)
        .single();
    if (error) {
        return false;
    } 
    else {
        return true;
    }
}


export const updateUserAvatar = async(avatar: string) => {
    const { data: {user}, error: getUserError } = await supabase.auth.getUser()
    if (getUserError) {
        return { user: null, error: getUserError };
    }
    const { data, error } = await supabase
        .from('users')
        .update({ avatar: avatar })
        .eq('userID', user?.id)
        .select()
    return {user: data, error: null}
}

export const getUser = async () => {
    const { data: {user}, error: getUserError } = await supabase.auth.getUser()
    if (getUserError) {
        return { user: null, error: getUserError };
    }

    const { data: fullUserInfo, error } = await supabase 
        .from('users')
        .select('*')
        .eq('userID', user?.id)
        if (error) {
            return { user: null, error };
        } 
        else {
            const responce: {user: User, error: any} = { user: fullUserInfo[0], error: null }; 
            return responce;
        }
}

export const setUser = async(id: string, name: string, surname: string, email: string, date: string, gender: string) =>{
    const { data, error } = await supabase
        .from('users')
        .insert([
            { userID: id, name: name, surname: surname, email: email, birthday: date, gender: gender},
        ])
        .select()                     
    return {user: data, error: null}
}


export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error ) {
        return { user: null, error };
    }
    
    return { user: data.user, error: null, session: data.session };
}

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        return { user: null, error };
    }
    return { user: data.user, error: null, session: data.session };
}

export const checkOtp = async (otpCode: string, email: string, type: 'recovery' | 'signup') => {
    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpCode,
        type: type,
    })
    if (error) {
        return { user: null, error };
    }

    return { user: data, error: null }
  
}

export const passRecovery = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        return { user: null, error };
    };
    return { user: data, error: null };
}

export const updateUser = async(email: string, newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: newPassword,
    })
    if (error) {
        return { user: null, error };
    };
    return { user: data, error: null };
}









  