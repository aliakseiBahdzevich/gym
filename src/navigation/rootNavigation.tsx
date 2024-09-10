import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizationScreen from '../screens/authorizationScreen';
import ProfileScreen from '../screens/profileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckOtpScreen from '../screens/checkOtpScreen';
import CreateAccScreen from '../screens/createAccScreen';
import CheckOtpPassRecScreen from '../screens/checkOtpPassRecScreen';
import NewPassScreen from '../screens/newPassScreen';
import ForgPassScreen from '../screens/forgottenPassScreen';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { getUser, supabase } from '../api';
import { setSession } from '../redux/features/sessionSlice';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { setUser } from '../redux/features/userSlice';


const Stack = createNativeStackNavigator();


const MyStack = () => {

    const session = useAppSelector(state => state.session.session)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(true);



    const getUserFullData = async () => {
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
            user && dispatch(setUser(user))
        }
        catch (error) {
            Alert.alert('Неизвестная ошибка', 'Что-то пошло не так!');
        }
    }




    React.useEffect(() => {
        setLoading(true)
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            if(session){
                if(event === 'PASSWORD_RECOVERY'){
                    dispatch(setSession(false))
                }
                else{
                    dispatch(setSession(true))   
                }
            }
            else{
                dispatch(setSession(false))
            }
        })
        const checkSession = async () => {
            const { data: {session}} = await supabase.auth.getSession()
            if(session){
                await getUserFullData();
                dispatch(setSession(true))
            }
            else{
                dispatch(setSession(false))
            }
            setLoading(false)
        }

        checkSession();
        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [])

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator style={{alignSelf: 'center'}} size="large"/>
            </View>
        )
    }

    return(
        <NavigationContainer>
            { session ? 
            <Stack.Navigator>       
                <Stack.Screen
                    name = 'profile'
                    component = {ProfileScreen}
                    options = {{title: 'Profile'}}
                />
            </Stack.Navigator> 
            :
            <Stack.Navigator>
                <Stack.Screen
                    name = 'authorization'
                    component = {AuthorizationScreen}
                    options = {{title: 'Authorization'}}
                />             
                <Stack.Screen
                    name = 'checkOtpScreen'
                    component = {CheckOtpScreen}
                    options = {{title: 'Check OTP'}}
                />
                <Stack.Screen
                    name = 'createAccount'
                    component = {CreateAccScreen}
                    options = {{title: 'Create Account'}}
                />
                <Stack.Screen
                    name = 'checkOtpPassRec'
                    component = {CheckOtpPassRecScreen}
                    options = {{title: 'Check OTP'}}
                />
                <Stack.Screen
                    name = 'newPassScreen'
                    component = {NewPassScreen}
                    options = {{title: 'Create new password'}}
                />
                <Stack.Screen
                    name = 'forgPassScreen'
                    component = {ForgPassScreen}
                    options = {{title: 'Forgotten password'}}
                />           
            </Stack.Navigator>
        }   
        </NavigationContainer>
    )
}

export default MyStack














