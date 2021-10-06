import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import Location from './src/screens/Location'

import FlashMessage from "react-native-flash-message";


const Stack = createStackNavigator()

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: 'false'
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Location" component={Location} />
            </Stack.Navigator>

            <FlashMessage
                position='top'

            />
        </NavigationContainer>
    )
}

export default App

