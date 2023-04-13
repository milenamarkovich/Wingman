import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../svg/profile.svg';
import Change from '../svg/change_acc_details.svg';
import LogOut from '../svg/logout.svg';
import Delete from '../svg/delete.svg';

export default function ProfileScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', paddingRight: 30, paddingTop: 16, borderRadius: 5}}>
        <Profile />
        <View style={styles.name_container}>
          <Text style={styles.name}>Test User</Text>
          <Text style={styles.welcome}>Player</Text>
        </View>
      </View>
      <ScrollView style={styles.account}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>My Account</Text>
        <Change style={{padding: 20, paddingTop: 40}} width="100%"/>
        <LogOut style={{padding: 20}} width="100%" onPress = {() => navigation.navigate('Onboarding')}/>
        <Delete style={{padding: 20}} width="100%"/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
  alignContent: 'center',
},
name_container: {
  alignItems: 'flex-start',
  paddingLeft: 20,
  marginBottom: 20,
},
name: {
  fontSize: 24,
  paddingBottom: 5,
  marginTop: 10
},
welcome: {
  fontSize: 18,
  color: '#ADA4A5',
},
account: {
  backgroundColor: '#F7F8F8',
  padding: 20,
  flex: 1,
  borderRadius: 20,
  marginBottom: "65%",
  marginTop: 25
},
})