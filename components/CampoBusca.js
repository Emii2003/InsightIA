import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CampoBusca = ({ style, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={styles.input}
                placeholder="Empresa concorrente..."
                placeholderTextColor="#fff"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Ionicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#232222',
        width: '100%',
        borderRadius: 8,
        borderWidth: 2, 
        borderColor: '#A03651',
        position: 'fixed'
    },
    input: {
        flex: 1,
        height: 60,
        padding: 10,
        color: '#DC8AA8',
    },
    button: {
        padding: 20,
        backgroundColor: '#A03651',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CampoBusca;
