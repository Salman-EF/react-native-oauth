import React, { useContext } from 'react'
import {StatusBar} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthContext } from '../contexts/AuthContext'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

const AppNav = () => {
   const {authTokens} = useContext(AuthContext)

   return (
      <GestureHandlerRootView style={{ flex: 1, paddingTop:StatusBar.currentHeight }} >
         <StatusBar barStyle="light-content" translucent backgroundColor="black" />
         {authTokens !== null ? <AppStack /> : <AuthStack />}
      </GestureHandlerRootView>
   )
}

export default AppNav