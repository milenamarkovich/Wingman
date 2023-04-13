import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { FAB } from 'react-native-paper';


function Details(props) {

    const data = props.route.params.data;

    const deleteData = (data) => {
        fetch(`http://192.168.0.101:5000/delete/${data.id}/`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset="utf-8"'
        },
      })
      .then(config => {
        props.navigation.navigate("SetsScreen");
      })
      .catch(error => console.log(error))
    }

    return(
        <ScrollView>
            <Button
                style = {{backgroundColor: '#F2F2F2', alignItems: 'left', marginTop: 10}}
                labelStyle = {{color: '#FAC623', fontSize: 40}}
                icon = "arrow-left"
                mode = "contained"
                title = "Back"
                onPress = {() => props.navigation.goBack()}
            ></Button>
            <View style={styles.viewStyle} >
                
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>{data.title}</Text>
                </View>
                
                <Text style={styles.bodyStyle}>Pitch Angle: {data.pitch}</Text>
                <Text style={styles.bodyStyle}>X: {data.x}</Text>
                <Text style={styles.bodyStyle}>Y: {data.y}</Text>
                <Text style={styles.bodyStyle}>Z: {data.z}</Text>
                <View style={{alignSelf: 'center', marginTop: 40, flexDirection: 'row', justifyContent: 'space-around', margin: 15, padding: 10}}>
                <Button 
                    style = {{margin:10, backgroundColor: '#FAC623'}}
                    icon = "update"
                    mode = "contained"
                    onPress = {() => props.navigation.navigate('Edit', {data: data})}
                    title = "Update"
                    > Update </Button>
                <Button 
                    style = {{margin:10, backgroundColor: '#FAC623'}}
                    icon = "delete"
                    mode = "contained"
                    onPress = {() => deleteData(data)}
                    title = "Delete"
                    > Delete </Button>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        padding: 16,
        margin: 10,
        backgroundColor: '#F7F8F8'
    },
    titleStyle: {
        flexDirection: 'column',
        flex: 1,
        fontSize: 40,
    },
    titleContainer: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 20
    },
    bodyStyle: {
        fontSize: 16,
        marginTop: 20
    }
})

export default Details