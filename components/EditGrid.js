import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';
import SelectableGrid from 'react-native-selectable-grid';
import Net from '../svg/net.svg';
import Star from '../svg/star.svg';

function EditGrid(props) {

    const data = props.route.params.data;

    const title = data.title; 
    const pitch = Number(data.pitch).toFixed(2);
    const [x_val, setX] = useState(Number(data.x).toFixed(2));
    const [y_val, setY] = useState(Number(data.y).toFixed(2));

    let courtData = [];

    for (var i = 9; i > 0; i-=0.5) {
        for (var j = 0.5; j < 9.5; j+=0.5) {
          courtData.push({
            x: (j),
            y: (i),
          });
        }
    }

    const handleGridSelect = (data) => {
        setX(courtData[data].x);
        setY(courtData[data].y);
        console.log(courtData[data]);
    }
    
    const clickedItem = (data) => {
        data.x = x_val
        data.y = y_val
        props.navigation.navigate('EditHeight', {data: data})
      }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{flexDirection: 'column', marginBottom: 10, borderRadius: 5}}>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Set Title: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>{title}</Text>
            </View>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Set Pitch Angle: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>{pitch}</Text>
            </View>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Set XY 2D Hitting Point: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>({x_val}, {y_val})</Text>
            </View>
          </View>

          <ScrollView style={{backgroundColor: '#fff', marginBottom: 30, paddingTop: 16, paddingLeft: 3, borderRadius: 15}}>
            
            <View style={styles.grid}>
            <Text style={{position: 'absolute', left: 30, bottom: -15}}>1        2       3       4      5       6      7      8      9</Text>
            <Text style={{position: 'absolute',left:0, top:40}}>{`9\n\n8\n\n7\n\n6\n\n5\n\n4\n\n3\n\n2\n\n1`}</Text>
            <SelectableGrid
              data={courtData}
              maxPerRow={18}
              onSelect={(data) => {
                console.log(courtData[data])
                setX(courtData[data].x)
                setY(courtData[data].y)
              }}
              unselectedStyle={{backgroundColor: '#7EA8BB', borderColor: 'white', borderWidth: 0.3}}
              selectedStyle={{backgroundColor: '#FAC623'}}
              />
              <Star style={{position: 'absolute', top: 52, left: 179}} />
              <Net style={{position: 'absolute', top: -20, left: 15}} />
            
            </View>

          </ScrollView>

        <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25}}>
          <Button
                style = {{marginRight:10, backgroundColor: '#FAC623'}}
                mode = "contained"
                icon = "cancel"
                title = "Back"
                onPress = {() => props.navigation.goBack()}
          > Cancel </Button>
          <Button 
          style = {{marginLeft:10, backgroundColor: '#FAC623'}}
          icon = "forward"
          mode = "contained"
          onPress = {() => clickedItem(data)}
          > Next </Button>
        </View>
        </KeyboardAvoidingView>
    )
}

export default EditGrid;

const styles = StyleSheet.create({
    grid: {
      position: 'relative',
      height: 340,
      width: 340,
      padding: 20,
      paddingTop: 30,
      paddingBottom: 5,
      flex: 1,
      aligntItems: 'center',
    },
    container: {
      backgroundColor: '#F7F8F8',
      padding: 16,
      flex: 1,
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
  })