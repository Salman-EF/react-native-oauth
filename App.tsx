import { NavigationContainer } from '@react-navigation/native'
import { RootSiblingParent } from 'react-native-root-siblings';
import React from 'react'
import { AuthProvider } from './src/contexts/AuthContext'
import AppNav from './src/navigation/AppNav'

export default function App() {

    return (
        <NavigationContainer>
        <RootSiblingParent>
        <AuthProvider>
            <AppNav />
        </AuthProvider>
        </RootSiblingParent>
        </NavigationContainer>
    )
}