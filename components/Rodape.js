import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const Rodape = ({ onHomePress, onSearchPress, onProfilePress, currentRoute }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={onHomePress}>
                <Ionicons
                    name="analytics"
                    size={30}
                    color={currentRoute === 'Home' ? '#A03651' : '#fff'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSearchPress}>
                <Feather
                    name="search"
                    size={30}
                    color={currentRoute === 'Search' ? '#A03651' : '#fff'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                console.log('Navigating to Profile');
                onProfilePress();
            }}>
                <Ionicons
                    name="people"
                    size={30}
                    color={currentRoute === 'Profile' ? '#A03651' : '#fff'}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#333',
        position: 'absolute',
        bottom: 25,
    },
});

export default Rodape;