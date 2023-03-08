import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import styles from '../styles/styles';
import Create from './CreateConfig';
import { createStackNavigator } from '@react-navigation/stack';

export default function SetConfigScreen(props) {
  
  const navigationRef = useNavigationContainerRef();

  const [data, setData] = useState([])
  const [loading, setIsLoading] = useState(true)

  const loadData = () => {
    fetch('http://10.0.0.179:5000/get', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(config => {
      setData(config)
      setIsLoading(false)
    })
    .catch(error => console.log(error) )
  }

  useEffect(() => {
    loadData()
  }, [])


  const renderData = (item) => {
    return (
      <Card style = {styles.cardStyle}>
        <Text style={styles.nameText}>{item.title}</Text>
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
      onRefresh = {() => loadData()}
      refreshing = {loading}
      keyExtractor = {item => `${item.id}`}
      />
      
      <FAB
      style = {styles.fab}
      small={false}
      icon="plus"
      theme = {{colors:{accent:"green"}}}
      onPress = {() => props.navigation.navigate('Create')}
      />
    </View>
  );
}