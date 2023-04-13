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
import Onboarding from 'react-native-onboarding-swiper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard1 from '../svg/onboarding1.svg';
import Onboard2 from '../svg/onboarding2.svg';
import Onboard3 from '../svg/onboarding3.svg';
import Onboard4 from '../svg/onboarding4.svg';

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
        onSkip = {() => navigation.navigate("Login")}
        onDone = {() => navigation.navigate("Login")}
        bottomBarColor = 'white'
        pages={[
            {
            backgroundColor: '#fff',
            image: <Onboard1 width="110%" height="110%" alignSelf="center"/>,
            },
            {
            backgroundColor: '#fff',
            image: <Onboard2 width="100%" height="120%" alignSelf="center"/>,
            },
            {
            backgroundColor: '#fff',
            image: <Onboard3 width="100%" height="120%" alignSelf="center"/>,
            },
            {
            backgroundColor: '#fff',
            image: <Onboard4 width="100%" height="120%" alignSelf="center"/>,
            }
        ]}
    />
  );
} 