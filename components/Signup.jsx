import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { addDoc , collection} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

function Signup(){  
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    // add a function to send information to database
    const signup = () => {
        try{
            addDoc(collection(db, "users"), {
                email: email,
                username: username,
            });

            setEmail('');
            setUsername('');
        }
        catch(e){
            console.log(e);
        }
    }

    // add a function to navigate to login page
    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textbox} 
                placeholder="Email" 
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.textbox} 
                placeholder="Username" 
                value={username}
                onChangeText={setUsername}
            />
            <Pressable
                style={styles.submit}
                onPress={signup}
            >
                <Text>Signup</Text>
            </Pressable>
            <Pressable
                style={styles.navigatebutton}
                onPress={navigateToLogin} 
            >
                <Text>Navigate to Login</Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbox: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5
    },
    submit: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigatebutton: {
        width: 200,
        height: 40,
        color: 'blue',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Signup;