import React, { Component, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import Court from '../svg/court.svg';
import Launch from '../svg/launched.svg';

export default function HomeScreen(props) {

  const [selected, setSelected] = useState([]);
  const [numLaunch, setNumLaunch] = useState([]);
  const [data, setData] = useState([]);
  const [launched, setLaunchState] = useState(0);
  const [configData, setConfigData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isNFocus, setNFocus] = useState(false);

  const seq = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
  ];

  const loadData = () => {
    fetch('http://192.168.0.101:5000/get', {
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
        setRefreshing(false);
    })
    .catch(error => console.log(error) )
  };

  useEffect(() => {
    loadData()
  }, [])

  const launchConfig = (selected, numLaunch) => {
    fetch(`http://192.168.0.101:5000/launch/${selected.value}/${numLaunch.value}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset="utf-8"'
      },
    })
    .catch(error => console.log(error) )
  }

  const clickedItem = () => {
    setModalVisible(true);
    launchConfig(selected, numLaunch);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Launch width="90%" height="76%"/>
            <Text style={styles.congrats}>Your Set Has Launched!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{margin: 20, fontSize: 16, borderRadius: 50, color: 'white'}}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.name_container}>
      <Text style={styles.welcome}>Welcome Back,</Text>
      <Text style={styles.name}>Test User</Text>
      </View>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.dropLabel}>Select Configuration for Launch: </Text>
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
          placeholder={!isFocus ? 'My Set Configurations' : '...'}
          searchPlaceholder="Search..."
          value={configData}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}            
          />
        <Text style={styles.dropLabel}>Select # of Consecutive Launches: </Text>
        <Dropdown 
          label="Select Item" 
          data={seq} 
          onChange = {setNumLaunch}
          style={[styles.dropdown, isNFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={175}
          labelField="label"
          valueField="value"
          placeholder={!isNFocus ? 'Sequence Duration' : '...'}
          searchPlaceholder="Search..."
          value={numLaunch}
          onFocus={() => setNFocus(true)}
          onBlur={() => setNFocus(false)}            
        />
          <Court width={300} height={150} />
      </ScrollView>
      <Button 
        style = {[styles.button, styles.buttonOpen]}
        icon = "launch"
        mode = "contained"
        onPress = {() => clickedItem()}
        title = "Launch"
        > Launch </Button>
    </View>
    );
  }

  const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#FAC623',
      borderRadius: 20,
      margin: 10,
      marginTop: 20,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#FAC623',
    },
    buttonClose: {
      backgroundColor: '#9ABBCE',
      borderRadius: 40,
      margin: 10,
      elevation: 2
    },
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignContent: 'center',
    },
    name_container: {
      padding: 12,
      justifyContent: 'center',
      alignContent: 'center',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 25,
      marginTop: 5,
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
    name: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#7EA8BB'
    },
    welcome: {
      fontSize: 20,
      color: '#ADA4A5'
    },
    dropLabel: {
      fontSize: 16,
      color: '#ADA4A5',
      padding: 2
    },
    congrats: {
      fontSize: 20,
      color: '#ADA4A5',
      marginBottom: 20,
      alignSelf: 'center',
      fontWeight: 'bold'
    }
  });
