import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

const CampoTexto = ({ style, ...props }) => {
    return (
        <TextInput 
            style={[styles.input, style]}
            placeholderTextColor="#fff"
            {...props}
        />
    );
}

export default CampoTexto;

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#232222',
        height: 60,
        borderRadius: 8,
        padding: 10,
        color: '#DC8AA8',
    },
});
