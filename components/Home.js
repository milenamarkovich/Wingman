import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Alert,
  Button
} from 'react-native';
import { createDrawerNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles/styles';


export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Page</Text>
        </View>
      </View>
    );
  }
