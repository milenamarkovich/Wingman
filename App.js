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
import SetConfigScreen from './components/SetConfig';
import SequencesScreen from './components/Sequences';
import PlayersScreen from './components/Players';
import MediaScreen from './components/Media';
import HomeScreen from './components/Home';
import Create from './components/CreateConfig';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function CreateStackScreen() {
  return(
    <Stack.Navigator initialRouteName='SetConfig'>
      <Stack.Screen name="SetConfig" component={SetConfigScreen} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Players" component={PlayersScreen} />
      <Tab.Screen name="Sequences" component={SequencesScreen} />
      <Tab.Screen name="SetConfig" component={CreateStackScreen} />
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
