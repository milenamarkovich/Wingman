import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput, Button} from 'react-native-paper';
import SelectableGrid from 'react-native-selectable-grid';
import Net from '../svg/net.svg';
import PerspCourt from '../svg/perspective_court.svg';

function EditHeight(props) {

    const data = props.route.params.data;
    const title = data.title;
    const pitch = Number(data.pitch).toFixed(2);
    const x = Number(data.x).toFixed(2);
    const y = Number(data.y).toFixed(2);

    const [z_val, setZ] = useState(Number(data.z).toFixed(2));

    const updateData = (props) => {
        fetch(`http://192.168.0.101:5000/update/${data.id}/`, {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset="utf-8"'
          },
          body: JSON.stringify({title: title, x: x, y: y, z: z_val, pitch: pitch})
        })
        .then(resp => resp.json())
        .then(data => {
          console.log('Success: ', data);
          props.navigation.navigate("SetsScreen", {data: data});
        })
        .catch(error => {
          console.log(JSON.stringify({title: title, x: x, y: y, z: z_val, pitch: pitch}))
          console.log(error)
        })
      }

    let courtData = [];

    for (var i = 4; i > 2; i-=0.5) {
        for (var j = 0.5; j < 9.5; j+=0.5) {
          courtData.push({
            z: (i),
            x_temp: (j)
          });
        }
      }
  
    const handleGridSelect = (data) => {
        if (courtData[data].x_temp != x){
            Alert.alert("Error! Please select a height value along your previously selected x-axis")
        }
        else{
        setZ(courtData[data].z);
        console.log(courtData[data]);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{flexDirection: 'column', padding: 16, borderRadius: 5}}>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Set Title: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>{title}</Text>
            </View>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Set Pitch Angle: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>{pitch}</Text>
            </View>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>XY 2D Hitting Point: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>({x}, {y})</Text>
            </View>
            <View style={{flexDirection: 'row', borderRadius: 5}}>
                <Text style={{fontSize: 20, alignItems: 'center', color: '#7EA8BB'}}>Current Set Height: </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#7EA8BB'}}>{z_val}</Text>
            </View>
          </View>

          <ScrollView style={{backgroundColor: '#fff', marginTop: 10, marginBottom: 30, paddingTop: 16, paddingLeft: 3, borderRadius: 15}}>
            
            <View style={styles.grid}>
            <Text style={{position: 'absolute', left: 30}}>1        2       3       4      5       6      7      8      9</Text>
            <Text style={{position: 'absolute',left:0, top:25}}>{`4\n\n3`}</Text>
            <Text style={{position: 'absolute',left:0, top:90, color: '#C8BFC0'}}>{`2\n\n1`}</Text>
            <SelectableGrid
              data={courtData}
              maxPerRow={18}
              onSelect={(data) => (handleGridSelect(data))}
              unselectedStyle={{backgroundColor: 'white', borderColor: '#7EA8BB', borderWidth: 0.3}}
              selectedStyle={{backgroundColor: '#FAC623'}}
              unselectedRender={
                data => (
                <View>
                  <Text style={{ color: 'blue', fontSize: 12 }}></Text>
                </View>
                )
                }
              selectedRender={data => (
                <View>
                  <Text style={{ color: 'blue', fontSize: 12 }}></Text>
                </View>
              )}
              />
              <Net style={{position: 'absolute', top: 70, left: 15}}/>
              <PerspCourt style={{position: 'absolute', top: -70, left: -43}} width="145%"/>
            
            </View>

          </ScrollView>

        <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40, padding: 5}}>
          <Button
                style = {{marginRight:10, backgroundColor: '#FAC623'}}
                mode = "contained"
                icon = "cancel"
                title = "Back"
                onPress = {() => props.navigation.goBack()}
          > Cancel </Button>
          <Button 
            style = {{marginLeft:10, backgroundColor: '#FAC623'}}
            icon = "pencil"
            mode = "contained"
            onPress = {() => updateData(props)}
          > Save </Button>
        </View>
        </KeyboardAvoidingView>
    )
}

export default EditHeight;

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