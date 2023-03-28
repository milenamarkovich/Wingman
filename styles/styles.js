import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Button
  } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    button: {
        paddingTop: 20,
        backgroundColor: '#FAC623'
    },

    cardStyle: {
        backgroundColor: '#F7F8F8',
        margin: 10,
        padding: 10
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#FAC623',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});