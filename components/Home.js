import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import e from 'cors';

export default function HomeScreen(props) {

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [launched, setLaunchState] = useState(0);
  const [configData, setConfigData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetch('http://10.0.0.179:5000/get', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(config => {
      var count = Object.keys(config).length;
        let configArray = [];
        for (var i = 0; i < count; i++) {
          configArray.push({
            value: config[i].id,
            label: config[i].title,
          });
        }
        setConfigData(configArray);
    })
    .catch(error => console.log(error) )
  },[]);

  const getConfig = (selected) => {
    fetch(`http://10.0.0.179:5000/get/${selected.value}`, {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(config => {
      setData(config)
    })
    .catch(error => console.log(error) )
  }

  const launchConfig = (data) => {
    fetch(`http://10.0.0.179:5000/launch/${data.id}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset="utf-8"'
      },
    })
    .then(data => {
      setLaunchState(1)
    })
    .catch(error => console.log(error) )
  }

  const clickedItem = (data) => {
    getConfig(selected);
    launchConfig(data);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
      {!!selected && (
        <Text>
          Selected: label = {selected.label} and value = {selected.value}
        </Text>
      )}
      <Dropdown 
        label="Select Item" 
        data={configData} 
        onChange = {setSelected}
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Configuration' : '...'}
        searchPlaceholder="Search..."
        value={configData}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}            
        />
      </ScrollView>
      <Button 
        style = {{margin:10, backgroundColor: '#FAC623'}}
        icon = "launch"
        mode = "contained"
        onPress = {() => clickedItem(data)}
        title = "Launch"
        > Launch </Button>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignContent: 'center',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
      justifyContent: 'center',
      alignContent: 'center'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
