import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Button
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SequencesScreen from './components/Sequences';
import ProfileScreen from './components/Profile';
import HomeScreen from './components/Home';
import Create from './components/Configs/Create';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SetConfigScreen from './components/SetConfig';
import Details from './components/Configs/Details';
import Edit from './components/Configs/Edit'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function CreateStackScreen() {
  return(
    <Stack.Navigator initialRouteName='SetsScreen'>
      <Stack.Screen name="SetsScreen" component={SetConfigScreen} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <Tab.Navigator initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Practice') {
              iconName = focused ? 'stopwatch' : 'stopwatch-outline';
            }
            else if (route.name === 'Sets') {
              iconName = focused ? 'football' : 'football-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons style={{alignItems: "center"}} name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: '#FAC623',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Practice" component={SequencesScreen} />
      <Tab.Screen name="Sets" component={CreateStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default() => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
