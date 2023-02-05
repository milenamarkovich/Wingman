import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Button,
  FlatList
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassConfig from './ClassConfig';
import styles from '../styles/styles';

export default function SetConfigScreen() {
  
  const data = [
    {id: 1, yaw: '5', delta_x: '2', delta_y: '3'},
    {id: 2, yaw: '6', delta_x: '3', delta_y: '5'},
    {id: 3, yaw: '7', delta_x: '4', delta_y: '6'}
  ]

  const renderData = (item) => {
    return (
      <Card style = {styles.cardStyle}>
        <Text>{item.yaw}</Text>
        <Text>{item.delta_x}</Text>
        <Text>{item.delta_y}</Text>
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
      data = {data}
      renderItem = {({item}) => {
        return renderData(item)
      }}
      keyExtractor = {item => `${item.id}`}
      />
      <FAB
      style = {styles.fab}
      small={false}
      icon="plus"
      theme = {{colors:{accent:"green"}}}
      onPress = {() => console.log("Pressed")}
      />
    </View>
  );
}