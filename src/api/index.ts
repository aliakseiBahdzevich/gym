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

export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        console.error('Sign Up Error:', error.message);
        return { user: null, error };
    }

    return { user: data.user, error: null };
}








  