import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  FlatList,
  ListItem
} from 'react-native';
import { Card, FAB, IconButton, Colors } from 'react-native-paper';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import styles from '../styles/styles';
import Create from './Configs/Create';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from 'react-native-feather';

export default function SetConfigScreen(props) {
  
  const navigationRef = useNavigationContainerRef();

  const [data, setData] = useState([])
  const [loading, setIsLoading] = useState(true)

  const loadData = () => {
    fetch('http://10.43.56.82:5000/get', {
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

  const clickedItem = (data) => {
    props.navigation.navigate('Details', {data: data})
  }

  const renderData = (item) => {
    return (
      <Card style = {styles.container} onPress = {() => clickedItem(item)}>
        <View style = {{
          paddingVertical: 5,
          paddingHorizontal: 10,
          margin: 5,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <IconButton icon='volleyball' size={40} color='white' style={{margin: 0, backgroundColor:'#9ABBCE', color: 'white'}} />
          <Text style={{fontSize: 20, paddingLeft: 20}}>{item.title}</Text>
        </View>
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
      color = 'white'
      onPress = {() => props.navigation.navigate('Create')}
      />
    </View>
  );
}