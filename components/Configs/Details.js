import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { FAB } from 'react-native-paper';


function Details(props) {

    const data = props.route.params.data;

    const deleteData = (data) => {
        fetch(`http://10.43.56.82:5000/delete/${data.id}/`, {
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
            <View style={styles.viewStyle} >
                
                <Text style={styles.titleStyle}>
                    <Button
                        style = {{marginLeft:0, padding: 0, backgroundColor: '#F7F8F8', alignItems: 'left'}}
                        labelStyle = {{color: '#FAC623', fontSize: 25, alignSelf: 'flex-start'}}
                        icon = "arrow-left"
                        mode = "contained"
                        title = "Back"
                        onPress = {() => props.navigation.navigate('SetsScreen')}
                    />
                    {data.title}
                </Text>
                
                <Text style={styles.bodyStyle}>Yaw Angle: {data.yaw}</Text>
                <Text style={styles.bodyStyle}>Max. Horizontal Displacement: {data.delta_x}</Text>
                <Text style={styles.bodyStyle}>Peak Height: {data.delta_y}</Text>
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
        padding: 10,
        margin: 10,
        backgroundColor: '#F7F8F8'
    },
    titleStyle: {
        flexDirection: 'column',
        fontSize: 40,
        marginBottom: 20
    },
    bodyStyle: {
        fontSize: 16,
        marginTop: 20
    }
})

export default Details