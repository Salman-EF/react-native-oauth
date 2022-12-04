import React from "react"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Text } from "react-native";
dayjs.extend(utc)
dayjs.extend(timezone)

const HomeScreen = () => {

   return (
      <Text>Hello World</Text>
   )
}
export default HomeScreen;