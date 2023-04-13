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
import ProfileScreen from './components/Profile';
import HomeScreen from './components/Home';
import Create from './components/Create';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SetConfigScreen from './components/SetConfig';
import Details from './components/Details';
import Edit from './components/Edit';
import OnboardingScreen from './components/Onboarding';
import LoginScreen from './components/Login';
import CreateGrid from './components/CreateGrid';
import CreateHeight from './components/CreateHeight';
import EditGrid from './components/EditGrid';
import EditHeight from './components/EditHeight';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const AppStack = createStackNavigator();

function CreateStackScreen() {
  return(
    <Stack.Navigator initialRouteName='SetsScreen'
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SetsScreen" component={SetConfigScreen} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="CreateGrid" component={CreateGrid} />
      <Stack.Screen name="CreateHeight" component={CreateHeight} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="EditGrid" component={EditGrid} />
      <Stack.Screen name="EditHeight" component={EditHeight} />     
    </Stack.Navigator>
  )
}

function CreateTabNav(){
  return(
    <Tab.Navigator initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
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
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        })}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sets" component={CreateStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function App({navigation}) {
  
  return (
    <AppStack.Navigator
    initialRouteName='Onboarding'
    screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Onboarding" component={OnboardingScreen}/>
      <AppStack.Screen name="Login" component={LoginScreen}/>
      <AppStack.Screen name="App" component={CreateTabNav}/>
    </AppStack.Navigator>
  );
}

export default() => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
