import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../contexts/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from "react-native";
import SimpleNavbar from "../components/Navbars";

interface Error {
   type: string,
   message: string
}
export default function LoginScreen(props:any) {
   const [email,setEmail] = useState<string>("");
   const [password,setPassword] = useState<string>("");
   const [errorMessage, setErrorMessage] = useState<Error|null>(null);
   const {login} = useContext(AuthContext)
   const [isLoading, setIsLoading] = useState(false);

   const submit = async () => {
      // Email input validation
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
         setErrorMessage({ type: 'email', message: "Please enter a valid Email address" })
      } else if(!password) {
         setErrorMessage({ type: 'password', message: "Please enter a valid password" })
      } else {
         setErrorMessage(null)
         try {
            setIsLoading(true);
            await login(email,password)
         } catch(err:any) {
            setErrorMessage({ type: 'server', message: err })
         } finally {
            setIsLoading(false)
         }
      }
   }

   const validationError = (errorMessage) ? (
      <ErrorContainer>
         <MaterialIcons name="error-outline" size={24} color="red" /><ErrorText>{errorMessage.message}</ErrorText>
      </ErrorContainer>
   ) : null

   return (
      <Container contentContainerStyle={{ flexGrow: 1 }}>
         <SimpleNavbar title="Sign in" />
         <Body>
            <FormContainer>
               <View style={{marginBottom: 15}}>
                  <Label>Email address</Label>
                  <Input keyboardType="email-address" onChangeText={(email) => setEmail(email)} invalid={errorMessage?.type == 'email' ? true:false} />
               </View>
               <View style={{marginBottom: 8}}>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText={(pass) => setPassword(pass)} invalid={errorMessage?.type == 'password' ? true:false} />
               </View>
               <ColoredText onPress={() => props.navigation.navigate('ForgotPassword')}>Forgot Password?</ColoredText>
               { validationError }
               <JoinButton onPress={() => submit()} disabled={isLoading} >
                  <JoinButtonText>Login</JoinButtonText><AntDesign name="arrowright" size={24} color="#FFFFFF" style={{marginLeft: "auto"}} />
               </JoinButton>
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
   min-height: 70%;
   background-color: #FFFFFF;
   padding: 40px 20px;
`
const Label = styled.Text`
   font-size: 16px;
   font-weight: 500;
   color: #777a82;
   margin-bottom: 5px;
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
const JoinButton = styled.TouchableOpacity`
   margin-top: auto;
   padding: 10px 15px;
   background-color: #4DB6AC;
   color: #FFFFFF;
   border-radius: 3px;
   flex-direction: row;
`
const JoinButtonText = styled.Text`
   flex: 1;
   text-align: center;
   font-size: 20px;
   font-weight: 300;
   color: #ffffff;
`
const ErrorContainer = styled.View`
   background-color: #fff7f5;
   border-radius: 3px;
   padding: 5px;
   margin: 10px 0;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`
const ErrorText = styled.Text`
   text-align: center;
   font-size: 14px;
   font-weight: 400;
   color: red;
   margin: 0 5px;
`
const ColoredText = styled.Text`
   text-align: right;
   font-size: 16px;
   font-weight: 500;
   color: #4DB6AC;
`