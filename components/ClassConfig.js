import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/styles';

class ClassConfig extends Component{

    state = {
        name: "IGEN"
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>{this.state.name}</Text>
                <Button title = "Click Me" onPress = {() => this.setState({name: "New phone who dis"})}/>
            </View>
        )
    }
}

export default ClassConfig