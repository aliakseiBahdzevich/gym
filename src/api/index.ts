import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://zfousekokwvlzswkizbq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3VzZWtva3d2bHpzd2tpemJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNjc1MTcsImV4cCI6MjAzOTY0MzUxN30.kRjQUzrpbMirGhbmR46uHqgXZCMWiHiIorCvawh7ZOY'

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

export const getUser = async (email: string) => {
    const { data, error } = await supabase.auth.getUser(email)
    if (error ) {
        console.error('Sign Up Error:', error.message);
        return { user: null, error };
    }
    return {user: data.user, error: null}
}

export const setUser = async(id: string, name: string, surname: string, email: string, date: string) =>{
    const { data, error } = await supabase
        .from('users')
        .insert([
            { userID: id, name: name, surname: surname, email: email, birthday: date },
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
        console.error('Sign Up Error:', error.message);
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
        console.error('Sign In Error:', error.message);
        return { user: null, error };
    }
    return { user: data.user, error: null, session: data.session };
}

export const checkOtp = async (otpCode: string, email: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpCode,
        type: 'signup',
    })
    if (error) {
        console.error('Sign In Error:', error.message);
        return { user: null, error };
    }
    await supabase
        .from('users')
        .update({ status: 'verified' })
        .eq('email', email);

    return { user: data, error: null }
  
}

export const passRecovery = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        console.error('Sign In Error:', error.message);
        return { user: null, error };
    };
    console.log("password",data)
    return { user: data, error: null };
}









  