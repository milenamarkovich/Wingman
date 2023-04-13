import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import SelectableGrid from 'react-native-selectable-grid';
import Net from '../svg/net.svg';

{/*let customFonts = {
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
};*/}

function Create(props) {

  const angle_list = [
      {
        label: "60",
        value: 60,
      },
      {
        label: "65",
        value: 65,
      },
      {
        label: "70",
        value: 70,
      },
      {
        label: "75",
        value: 75,
      },
      {
        label: "80",
        value: 80,
      },
    ];

    const velocity_list = [
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
      {
        label: "5",
        value: 5,
      },
      {
        label: "6",
        value: 6,
      },
      {
        label: "7",
        value: 7,
      },
      {
        label: "8",
        value: 8,
      },
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
    ];

    const [title, setTitle] = useState("");

    const [yaw, setYaw] = useState([]);
    const [pitch, setPitch] = useState([]);

    let item = [];
    
    const [velocity, setVelocity] = useState([]); 
    const [isPFocus, setPFocus] = useState(false);
    const [isVFocus, setVFocus] = useState(false);


    {/*state = {
      fontsLoaded: false,
    }
  
    let _loadFontsAsync = async() => {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    let componentDidMount = () => {
      this._loadFontsAsync();
    }*/}

    const clickedItem = () => {
      item.push(title)
      item.push(pitch)
      item.push(0)
      item.push(0)
      item.push(0)
      props.navigation.navigate('CreateGrid', {item})
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{flexDirection: 'row', padding: 16, borderRadius: 5}}>

          <Text style={{flex: 1, fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Create New Configuration</Text>
          </View>

          <ScrollView style={{backgroundColor: '#fff', marginTop: 10, padding: 10, borderRadius: 15}}>
            
            <TextInput style = {styles.inputStyle}
            label = "Name of Configuration"
            value = {title}
            onChangeText = {text => setTitle(text)}
            />

            {/*<Dropdown 
              label="Select Item" 
              data={angle_list} 
              onChange = {item => {
                setYaw(item.value);
                setYFocus(false);
              }}
              style={[styles.dropdown, isYFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isYFocus ? 'Select Yaw Angle' : '...'}
              searchPlaceholder="Search..."
              value={yaw}
              onFocus={() => setYFocus(true)}
              onBlur={() => setYFocus(false)}            
            />*/}

            <Dropdown 
              label="Select Item" 
              data={angle_list} 
              onChange = {item => {
                setPitch(item.value);
                setPFocus(false);
              }}
              style={[styles.dropdown, isPFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              maxHeight={240}
              labelField="label"
              valueField="value"
              placeholder={!isPFocus ? 'Select Pitch Angle' : '...'}
              searchPlaceholder="Search..."
              value={pitch}
              onFocus={() => setPFocus(true)}
              onBlur={() => setPFocus(false)}            
            />

            {/*<Dropdown 
              label="Select Item" 
              data={velocity_list} 
              onChange = {item => {
                setVelocity(item.value);
                setVFocus(false);
              }}
              style={[styles.dropdown, isVFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isVFocus ? 'Select Launching Velocity' : '...'}
              searchPlaceholder="Search..."
              value={velocity}
              onFocus={() => setVFocus(true)}
              onBlur={() => setVFocus(false)}            
            />*/}

          </ScrollView>

        <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', margin: 30, padding: 16}}>
          <Button
                style = {{margin:10, backgroundColor: '#FAC623'}}
                mode = "contained"
                icon = "cancel"
                title = "Back"
                onPress = {() => props.navigation.goBack()}
          > Cancel </Button>
          <Button 
          style = {{margin:10, backgroundColor: '#FAC623'}}
          icon = "forward"
          mode = "contained"
          onPress = {() => clickedItem()}
          > Next </Button>
        </View>
        </KeyboardAvoidingView>
    )
}

export default Create;

const styles = StyleSheet.create({
    grid: {
      position: 'relative',
      height: 340,
      width: 340,
      padding: 20,
      flex: 1,
      aligntItems: 'center',
    },
    container: {
      backgroundColor: '#F7F8F8',
      padding: 16,
      flex: 1,
    },
    dropdown: {
      height: 70,
      borderColor: '#7EA8BB',
      borderWidth: 3,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 30,
      justifyContent: 'center',
      alignContent: 'center'
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
      height: 50,
      borderColor: '#7EA8BB',
      borderWidth: 3,
      borderRadius: 5,
      padding: 12,
      marginBottom: 40,
      marginTop: 20,
      backgroundColor: 'white',
      underlineColorAndroid: "transparent"
    }
  })

  