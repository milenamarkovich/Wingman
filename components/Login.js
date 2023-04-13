import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function LoginScreen(props) {

    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    const logIn = (props) => {
        fetch("http://192.168.0.101:5000/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset="utf-8"'
          },
          body: JSON.stringify({username: username, password: password})
        })
        .then(resp => resp.json())
        .then(data => {
          console.log('Success: ', data);
          props.navigation.navigate("App");
        })
        .catch(error => {
          console.log(JSON.stringify({username: username, password: password}))
          console.log(error)
        })
      }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{flexDirection:'column', alignItems:'center', padding: 16, marginBottom: 30}}>
        <Text style={{fontSize: 24}}>Hey there,</Text>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome Back!</Text>
        </View>
        <View style={{flexDirection:'column', padding: 16, marginBottom: 16}}>
      <TextInput style = {styles.inputStyle}
            label = "Username"
            value = {username}
            onChangeText = {text => setUsername(text)}
        />
        <TextInput style = {styles.inputStyle}
            label = "Password"
            value = {password}
            onChangeText = {text => setPassword(text)}
        />
        </View>
        <View>
          <Button
                style = {{margin:10, backgroundColor: '#FAC623'}}
                mode = "contained"
                icon = "cancel"
                title = "test"
                onPress = {() => props.navigation.navigate('App')}
          > Test Mode </Button>
          <Button 
                style = {{margin:10, backgroundColor: '#FAC623'}}
                icon = "pencil"
                mode = "contained"
                title = "login"
                onPress = {() => Alert.alert("Login Test")}
          > Log In </Button>
          <View style={{flexDirection:'row', alignSelf:'center', padding: 16, paddingTop: 20}}>
          <Text>Don't have an account? </Text>
          <Text style={{color: '#FAC623', fontWeight: 'bold'}} onPress={()=>Alert.alert("Registration Test")}>Register Here!</Text>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: "center",
      padding: 30,
    },
    inputStyle: {
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#F7F8F8',
      borderRadius: 8,
      underlineColorAndroid: "transparent"
    }
  });