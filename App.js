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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SetConfigScreen from './components/SetConfig';
import SequencesScreen from './components/Sequences';
import PlayersScreen from './components/Players';
import MediaScreen from './components/Media';
import SettingsScreen from './components/Settings';
import HomeScreen from './components/Home';
import Create from './components/CreateConfig';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SetConfig" component={SetConfigScreen} />
        <Stack.Screen name="Sequences" component={SequencesScreen} />
        <Stack.Screen name="Players" component={PlayersScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="CreateConfig" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;