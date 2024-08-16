// In Routes.js in a new project

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LoginNavigator from './screens/auth/login/LoginNavigator';
import SignupNavigator from './screens/auth/signup/SignupNavigator';
import MyPager from './screens/onBoarding/MyPager';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPager" component={MyPager} />
      <Stack.Screen name="SignupNavigator" component={SignupNavigator} />
      <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
    </Stack.Navigator>
  );
}

export default Routes;
