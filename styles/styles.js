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
        backgroundColor: '#fff',
    },

    button: {
        paddingTop: 20
    },

    cardStyle: {
        margin: 10,
        padding: 10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});