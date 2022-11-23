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

import SetConfigScreen from './pages/SetConfig';
import SequencesScreen from './pages/Sequences';
import PlayersScreen from './pages/Players';
import MediaScreen from './pages/Media';
import SettingsScreen from './pages/Settings';
import HomeScreen from './pages/Home';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;