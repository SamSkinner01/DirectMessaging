import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, addDoc , setDoc, doc, updateDoc, update} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

function DisplayAllChats(){
    const navigation = useNavigation();
    const route = useRoute();
    const current_user = route.params.email;

    const [email, setEmail] = useState('');

    const [chatrooms, setChatrooms] = useState([]);
    const [chatroom_ids, setChatroom_ids] = useState([]);


    async function createRoom(){
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 1 && email !== current_user) {

            // see if chatroom already exists
            // if it does, navigate to it
            const chatRoomRef = collection(db, "chatroom");
            const q = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size !== 0) {
                console.log("createRoom() called")
                return
            }

            // Create a chatroom between the two users
            try{
                addDoc(collection(db, "chatroom"), {
                    user1email: email,
                    user2email: current_user,
                    messages: [],
                });
            }
            catch(e){
                console.log(e);
            }

            // Get the chatroom id
            const crR = collection(db, "chatroom");
            const qu = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const qS = await getDocs(qu);

            let chatroom_id = "";  
            qS.forEach((doc) => {
                chatroom_id = doc.id;
            });

            // Navigate to the chatroom
            navigation.navigate('ChatRoom', {chatroom_id: chatroom_id, current_user: current_user});
        }
        else {
            console.log("No such user!");
        }

    }

    function getAllChatRooms(){
        // check that user is either user1 or user2 in firestore
        // if they are add the chatroom to the list of chatrooms
        // if they are not, do nothing
        const chatRoomRef = collection(db, "chatroom");
        getDocs(chatRoomRef).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().user1email === current_user || doc.data().user2email === current_user){
                    if(doc.data().user1email === current_user){
                        setChatrooms(chatrooms => [...chatrooms, doc.data().user2email]);
                        setChatroom_ids(chatroom_ids => [...chatroom_ids, doc.id]);
                    }else{
                        setChatrooms(chatrooms => [...chatrooms, doc.data().user1email]);
                        setChatroom_ids(chatroom_ids => [...chatroom_ids, doc.id]);
                    }
                }
            });
        });


    }

    useEffect(() => {
        setChatroom_ids([]);
        setChatrooms([]);
        getAllChatRooms();

    }, []);

    return( 
        <View style={styles.container}>
            <View>
                {
                    chatrooms.map((chatroom, index) => {
                        return(
                            <Pressable
                                key={index}
                                style={styles.chats}
                                onPress={() => navigation.navigate('ChatRoom', {chatroom_id: chatroom_ids[index], current_user: current_user})}
                            >
                                <Text>{chatroom}</Text>
                            </Pressable>
                        )
                    }
                    )
                }
            </View>

            <Pressable
                style={styles.sendmessage}
            >
                   <TextInput 
                        placeholder="Enter an email:"
                        onChangeText={setEmail}
                        value={email}
                   />
            </Pressable>

            <Pressable
                style={styles.sendmessage}
                onPress={createRoom}
            >
                    <Text>Send a message</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sendmessage : {
        color: 'white',
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    chats: {
        width: 350,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },

});

export default DisplayAllChats;