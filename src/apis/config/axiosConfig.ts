import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import dayjs from 'dayjs';
import { useContext } from 'react';
import Config from "react-native-config";
import { AuthContext } from '../../contexts/AuthContext';

const API_BASE_URL = Config.API_BASE_URL

const APIAxios = () => {

   const {setAuthTokens} = useContext(AuthContext)

   const axiosInstance = axios.create({
      baseURL: API_BASE_URL
   });
   
   axiosInstance.interceptors.request.use(async (req) => {

      let storeTokens:any = await AsyncStorage.getItem('oauth');
      storeTokens = storeTokens ? JSON.parse(storeTokens) : null

      let headerToken = storeTokens.token;
   
      const isExpired = dayjs.unix(storeTokens!.token_expiry).diff(dayjs()) < 5000;
      if(isExpired) {
   
         const response = await axios.post(`${API_BASE_URL}/oauth/refresh`, {
            refresh: storeTokens?.refresh_token
         })
   
         const jwt = response.data.data;
         headerToken = jwt.token;
         await AsyncStorage.setItem('oauth', JSON.stringify(jwt))
         setAuthTokens(jwt)
      }
      
      req.headers!.Authorization = `Bearer ${headerToken}`
      return req
   })
    
   return axiosInstance
}
export default APIAxios;