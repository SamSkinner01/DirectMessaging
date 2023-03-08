import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './components/Signup';
import Login from './components/Login';
import DisplayAllChats from './components/DisplayAllChats';
import ChatRoom from './components/Chat';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Chats" component={DisplayAllChats}/>
          <Stack.Screen name="ChatRoom" component={ChatRoom}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


