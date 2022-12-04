import React from 'react';
import styled from "styled-components/native"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SimpleNavbar(props:any) {
   const navigation = useNavigation();

   const goBack = () => {
      navigation.goBack();
   }

   return (
      <Title>
         <BackIcon onPress={() => goBack()}><AntDesign name="arrowleft" size={26} color="#FFFFFF" /></BackIcon>
         <TitleText>{props.title}</TitleText>
      </Title>
   )
}
const Title = styled.View`
   margin: 20px 0 20px;
   align-items: flex-start;
   padding: 0 20px;
   flex-direction: row;
   align-items: stretch;
`
const BackIcon = styled.TouchableOpacity`
   background-color: #4DB6AC;
   border-radius: 50px;
   margin-right: 10px;
   padding: 4px;
`
const TitleText = styled.Text`
   font-size: 22px;
   font-weight: 400;
   text-transform: uppercase;
   background-color: #F6F6F6;
   color: #4DB6AC;
   padding: 0 5px;
`