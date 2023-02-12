import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';

function Create(props) {

    const yaw_list = [
        {
          label: "0",
          value: 0,
        },
        {
          label: "15",
          value: 15,
        },
        {
          label: "30",
          value: 30,
        },
        {
          label: "45",
          value: 45,
        },
        {
          label: "60",
          value: 60,
        },
        {
          label: "75",
          value: 75,
        },
        {
          label: "90",
          value: 90,
        },
        {
          label: "105",
          value: 105,
        },
        {
          label: "120",
          value: 120,
        },
        {
          label: "135",
          value: 135,
        },
      ];
    
      const delta_x_list = [
        {
          label: "9",
          value: 9,
        },
        {
          label: "10",
          value: 10,
        },
        {
          label: "11",
          value: 11,
        },
        {
          label: "12",
          value: 12,
        },
        {
          label: "13",
          value: 13,
        },
        {
          label: "14",
          value: 14,
        },
        {
          label: "15",
          value: 15,
        },
        {
          label: "16",
          value: 16,
        },
        {
          label: "17",
          value: 17,
        },
        {
          label: "18",
          value: 18,
        },
      ];
    
      const delta_y_list = [
        {
          label: "1.75",
          value: 1.75,
        },
        {
          label: "2.00",
          value: 2.00,
        },
        {
          label: "2.25",
          value: 2.25,
        },
        {
          label: "2.50",
          value: 2.50,
        },
        {
          label: "2.75",
          value: 2.75,
        },
        {
          label: "3.00",
          value: 3.00,
        },
        {
          label: "3.25",
          value: 3.25,
        },
        {
          label: "3.50",
          value: 3.50,
        },
        {
          label: "3.75",
          value: 3.75,
        },
        {
          label: "4.00",
          value: 4.00,
        },
        {
          label: "4.25",
          value: 4.25,
        },
        {
          label: "4.50",
          value: 4.50,
        },
        {
          label: "4.75",
          value: 4.75,
        },
      ];

    const [title, setTitle] = useState("");
    const [yaw, setYaw] = useState();
    const [delta_x, setDeltaX] = useState();
    const [delta_y, setDeltaY] = useState();

    const insertData = () => {
      fetch('http://10.0.0.179:5000/add', {
        method: 'POST', 
        Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json, utf8mb4_general_ci',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          yaw: yaw,
          delta_x: delta_x,
          delta_y: delta_y,
        })
      })
      .post('http://10.0.0.179:5000/add')
      .then((response = response.json()) => {
        console.log(JSON.stringify(response));
        return response.json;
      })
      .then(response => {
        props.navigation.navigate('SetConfig');
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
        });
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

          <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={yaw_list}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Yaw Axis (deg)'
          value={yaw}
          onChange={item => {
              setYaw(item.yaw);
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
          onChange={item => {
              setDeltaX(item.delta_x);
          }}
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
          onChange={item => {
              setDeltaY(item.delta_y);
          }}
          />
          <Button 
          style = {{margin:10}}
          icon = "pencil"
          mode = "contained"
          onPress = {() => insertData()}
          > Insert Configuration </Button>
        </View>
    )
}

export default Create;

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