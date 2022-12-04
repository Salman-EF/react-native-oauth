import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from "react-native";
import Config from "react-native-config";
import axios from "axios";
import Toasts from "../components/Toasts";
import SimpleNavbar from "../components/Navbars";

export default function ForgotPasswordScreen(props:any) {
   const [email,setEmail] = useState<string>("");
   const [errorMessage, setErrorMessage] = useState<string|null>(null);
   const [isLoading, setIsLoading] = useState(false);

   const submit = async () => {
      setErrorMessage(null)
      // Email input validation
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
         setErrorMessage("Please enter a valid Email address")
      } else {
         setIsLoading(true)
         forgotPassword()
            .then(res => {
               setEmail("");
               Toasts.SimpleToast("Password reset instructions has been sent to your email.");
               props.navigation.goBack();
            })
            .catch(err => {
               setErrorMessage(err)
            })
            .finally(() => {
               setIsLoading(false)
            })
      }
   }

   const forgotPassword = async () => {
      await axios.post(`${Config.API_BASE_URL}/oauth/password/forgot`, {
         'email': email
      })
         .then(res => res.data)
         .then(res => {
            if(res.status != 'success')
               throw('Please try again')
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

   const ErrorMessage = (errorMessage) ? (
      <TextContainer>
         <MaterialIcons name="error-outline" size={24} color="red" /><ErrorText>{errorMessage}</ErrorText>
      </TextContainer>
   ) : null

   return (
      <Container contentContainerStyle={{ flexGrow: 1 }}>
         <SimpleNavbar title="Forgot your password?" />
         <Body>
            <FormContainer>
               <View style={{marginBottom: 15}}>
                  <Label>Don't worry! just enter the email address associated with your Inatlantis account.</Label>
                  <Input placeholder="Email address" keyboardType="email-address" value={email} onChangeText={(txt) => setEmail(txt)} invalid={errorMessage ? true:false} />
               </View>
               { ErrorMessage }
               <SendButton onPress={() => submit()} disabled={isLoading} >
                  <SendButtonText>Send</SendButtonText><AntDesign name="arrowright" size={24} color="#FFFFFF" style={{marginLeft: "auto"}} />
               </SendButton>
            </FormContainer>
         </Body>
      </Container>
   )
}

const Container = styled.ScrollView`
   flex: 1;
   background-color: #F6F6F6;
`
const Body = styled.View`
   flex: 1;
   padding: 20px;
   justify-content: center;
`
const FormContainer = styled.View`
   width: 100%;
   min-height: 80%;
   background-color: #FFFFFF;
   padding: 40px 20px;
`
const Label = styled.Text`
   font-size: 16px;
   font-weight: 500;
   color: #777a82;
   margin-bottom: 15px;
`
const Input = styled.TextInput.attrs(( props: {invalid:boolean}) => props)`
  padding: 10px 15px;
  background-color: #F6F6F6;
  font-size: 16px;
  font-weight: 300;
  border: 1px solid #FEFEFE;
  border-radius: 3px;
  border-color: ${(props )=> props.invalid ? 'red':'#FEFEFE'};
`
const SendButton = styled.TouchableOpacity`
   margin-top: auto;
   padding: 10px 15px;
   background-color: #4DB6AC;
   color: #FFFFFF;
   border-radius: 3px;
   flex-direction: row;
`
const SendButtonText = styled.Text`
   flex: 1;
   text-align: center;
   font-size: 20px;
   font-weight: 300;
   color: #ffffff;
`
const TextContainer = styled.View`
   background-color: #fff7f5;
   border-radius: 3px;
   padding: 5px;
   margin: 10px 0;
   flex-direction: row;
   justify-content: center;
`
const ErrorText = styled.Text`
   text-align: center;
   font-size: 14px;
   font-weight: 400;
   color: red;
   margin: 0 5px;
`