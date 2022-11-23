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

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'right', justifyContent: 'right' }}>
      <Button
        title="Set Configuration"
        onPress={() => navigation.navigate('SetConfig')}
      />
      <Button
        title="Sequences"
        onPress={() => navigation.navigate('Sequences')}
      />
      <Button
        title="Players"
        onPress={() => navigation.navigate('Players')}
      />
      <Button
        title="Media"
        onPress={() => navigation.navigate('Media')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}
