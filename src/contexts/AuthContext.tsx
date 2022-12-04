import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import Config from "react-native-config";
import { AuthTokensType } from "../utils/TypeHelper";

interface AuthContextType {
   isLoading: boolean,
   authTokens: AuthTokensType | null,
   setAuthTokens: (oauth:AuthTokensType) => void,
   login: (email:string,password:string) => void,
   logout: () => void
}
export const AuthContext = createContext<AuthContextType>({
   isLoading: false,
   authTokens: null,
   setAuthTokens: () => {},
   login: () => {},
   logout: () => {}
})

export const AuthProvider = ({children}:any) => {
   const [isLoading, setIsLoading] = useState(false);
   const [authTokens, setAuthTokens] = useState<AuthTokensType|null>(null);

   useEffect(() => {
      isLoggedIn();
   }, [])

   const login = async (email:string,password:string) => {
      await axios.post(`${Config.API_BASE_URL}/oauth/login`, {
         'email': email,
         'password': password
      })
         .then(res => res.data)
         .then(res => {
            if(res.status == 'success') {
               setAuthTokens(res.data.oauth);
               AsyncStorage.setItem('oauth', JSON.stringify(res.data.oauth));
            }
         })
         .catch(err => {
            switch (err.response.status + err.response?.data?.error) {
               case 401+'credentials_error':
                  throw('Incorrect email or password')
            
               default:
                  console.log(err)
                  throw('Please try again')
            }
         })
   }
   const logout = () => {
      setAuthTokens(null);
      AsyncStorage.removeItem('oauth');
   }

   const isLoggedIn = async () => {
      try {
         setIsLoading(true);
         const jwt = await AsyncStorage.getItem('oauth');
         setAuthTokens(jwt ? JSON.parse(jwt) : null);
         setIsLoading(false);
      } catch (err) {
         console.error('isLoggedIn Error: ',err)
      }
   }

   return (
      <AuthContext.Provider value={{isLoading, authTokens, setAuthTokens, login, logout}} >
         {!isLoading ? children : null}
      </AuthContext.Provider>
   )
}