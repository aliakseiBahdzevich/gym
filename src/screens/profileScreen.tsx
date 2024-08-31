import * as React from 'react';
import { useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Text } from 'react-native';


const ProfileScreen = ({navigation}: any) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
          e.preventDefault();
          navigation.dispatch(e.data.action);
          navigation.navigate('authorization');
        });
        return unsubscribe;
    }, [navigation]);

    return(
        <>
        <Text>esrr</Text>
        </>
    )
}


export default ProfileScreen