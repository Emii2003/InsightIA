import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Titulo = ({ style, children }) => {
    return (
        <Text style={[styles.title, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Titulo;