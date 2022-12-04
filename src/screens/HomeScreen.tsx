import React, { useContext } from "react"
import styled from "styled-components/native";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AuthContext } from "../contexts/AuthContext";
dayjs.extend(utc)
dayjs.extend(timezone)

export default function HomeScreen() {
   const {logout} = useContext(AuthContext)

   return (
      <Container contentContainerStyle={{ flexGrow: 1 }}>
         <HelloText>Hello World</HelloText>
         <JoinButton onPress={() => logout()} >
            <JoinButtonText>Logout</JoinButtonText>
         </JoinButton>
      </Container>
   )
}

const Container = styled.ScrollView`
   flex: 1;
   background-color: #F6F6F6;
`
const HelloText = styled.Text`
   font-size: 30px;
   margin-top: 40px;
   text-align: center;
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