import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';

function Edit(props) {

    const data = props.route.params.data;

    const [title, setTitle] = useState(data.title);
    const [yaw, setYaw] = useState(data.yaw);
    const [delta_x, setDeltaX] = useState(data.delta_x);
    const [delta_y, setDeltaY] = useState(data.delta_y); 

    const updateData = (props) => {
      fetch(`http://10.43.216.33:5000/update/${data.id}/`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset="utf-8"'
        },
        body: JSON.stringify({title: title, yaw: yaw, delta_x: delta_x, delta_y: delta_y})
      })
      .then(resp => resp.json())
      .then(data => {
        console.log('Success: ', data);
        props.navigation.navigate("SetsScreen", {data: data});
      })
      .catch(error => {
        console.log(JSON.stringify({title: title, yaw: yaw, delta_x: delta_x, delta_y: delta_y}))
        console.log(error)
      })
    }


    return (
        <View style={styles.container}>

          <Text>Please Enter Your New Configuration Details</Text>

          <TextInput style = {styles.inputStyle}
          label = "Name of Configuration"
          value = {title}
          mode = "outlined"
          onChangeText = {text => setTitle(text)}
          />

          <TextInput style = {styles.inputStyle}
          label = "Please Enter Yaw"
          value = {yaw}
          mode = "outlined"
          onChangeText = {text => setYaw(text)}
          />

          <TextInput style = {styles.inputStyle}
          label = "Please Enter Horizontal Displacement"
          value = {delta_x}
          mode = "outlined"
          onChangeText = {text => setDeltaX(text)}
          />

          <TextInput style = {styles.inputStyle}
          label = "Please Enter Vertical Displacement"
          value = {delta_y}
          mode = "outlined"
          onChangeText = {text => setDeltaY(text)}
          />

          {/*<Dropdown
          style={styles.dropdown}
          iconStyle={styles.iconStyle}
          data={yaw_list}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Yaw Axis (deg)'
          value={yaw}
          onSelectItem={(item) => {
            console.log(item);
          }}
          />

          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={delta_x_list}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Horizontal Displacement (m)'
          value={delta_x}
          onChangeText={text => setDeltaX(text)}
          />

          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={delta_y_list}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Vertical Displacement (m)'
          value={delta_y}
          onChangeText={text => setDeltaY(text)}
    />*/}
          <Button 
          style = {{margin:10}}
          icon = "update"
          mode = "contained"
          onPress = {() => updateData(props)}
          > Update Configuration </Button>
        </View>
    )
}

export default Edit;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
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
      marginHorizontal: 5,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginHorizontal: 5,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    inputStyle: {
      padding: 12,
      paddingHorizontal: 0,
      marginTop: 20,
      marginBottom: 10,
    }
  });