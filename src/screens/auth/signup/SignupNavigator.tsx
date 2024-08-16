import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './Signup';
import FarmInfo from './FarmInfo';
import Verificaton from './Verificaton';
import BusinessHrs from './BusinessHrs';
import Done from './Done';

const Stack = createNativeStackNavigator();
export default function SignupNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="FarmInfo" component={FarmInfo} />
      <Stack.Screen name="Verificaton" component={Verificaton} />
      <Stack.Screen name="BusinessHrs" component={BusinessHrs} />
      <Stack.Screen name="Done" component={Done} />
    </Stack.Navigator>
  );
}
