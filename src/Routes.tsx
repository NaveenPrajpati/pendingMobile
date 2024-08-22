// In Routes.js in a new project

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LoginNavigator from './screens/auth/login/LoginNavigator';
import SignupNavigator from './screens/auth/signup/SignupNavigator';
import MyPager from './screens/onBoarding/MyPager';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Project from './screens/Project';
import Calender from './screens/Calender';
import Inbox from './screens/Inbox';
import {BottomNavigation} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import VectorIcon from './components/VectorIcon';
import Header from './components/Header';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPager" component={MyPager} />
      <Stack.Screen name="SignupNavigator" component={SignupNavigator} />
      <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
    </Stack.Navigator>
  );
}

function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{header: () => <Header />}}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          style={{backgroundColor: 'white'}}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 20});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <VectorIcon iconName="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Project"
        component={Project}
        options={{
          tabBarLabel: 'Project',
          tabBarIcon: ({color, size}) => {
            return <VectorIcon iconName="tasks" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarLabel: 'Calender',
          tabBarIcon: ({color, size}) => {
            return <VectorIcon iconName="calendar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({color, size}) => {
            return <VectorIcon iconName="inbox" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => {
            return <VectorIcon iconName="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
