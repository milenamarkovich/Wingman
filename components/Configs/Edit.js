import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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
      fetch(`http://10.43.56.82:5000/update/${data.id}/`, {
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
          <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 16, borderRadius: 5}}>
            <Button
                style = {{backgroundColor: 'white', alignItems: 'left'}}
                labelStyle = {{color: '#FAC623', fontSize: 25, alignSelf: 'flex-start'}}
                icon = "arrow-left"
                mode = "contained"
                title = "Back"
                onPress = {() => props.navigation.navigate('SetsScreen')}
            />

          <Text style={{flex: 1, fontSize: 18}}>Please Enter Your New Configuration Details Below ...</Text>
          </View>

          <ScrollView>
            <TextInput style = {styles.inputStyle}
            label = "Name of Configuration"
            value = {title}
            onChangeText = {text => setTitle(text)}
            />

            <TextInput style = {styles.inputStyle}
            label = "Please Enter Yaw"
            value = {yaw}
            onChangeText = {text => setYaw(text)}
            />

            <TextInput style = {styles.inputStyle}
            label = "Please Enter Horizontal Displacement"
            value = {delta_x}
            onChangeText = {text => setDeltaX(text)}
            />

            <TextInput style = {styles.inputStyle}
            label = "Please Enter Vertical Displacement"
            value = {delta_y}
            onChangeText = {text => setDeltaY(text)}
            />
          </ScrollView>

          {/*<ScrollView style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
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
          style = {{margin:10, backgroundColor: '#FAC623'}}
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
    backgroundColor: '#F7F8F8',
    padding: 16,
    flex: 1
  },
  dropdown: {
    height: 50,
    borderColor: 'white',
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    underlineColorAndroid: "transparent"
  }
});

