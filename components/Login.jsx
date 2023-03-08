import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";


function Login(){
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    // add a function to navigate to view all chats if email is in database
    const navigateToChats = async () => {  
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);


        if (querySnapshot.size === 1) {
            console.log("User exists!")
            navigation.navigate('Chats', {email: email});
        } else {
            console.log("No such user!");
        }
    }
   

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textbox} 
                placeholder="Email" 
                value={email}
                onChangeText={setEmail}
            />
            <Pressable
                style={styles.submit}
                onPress={navigateToChats}
            >
                <Text>Login</Text>
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

export default Login;