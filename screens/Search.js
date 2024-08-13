import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Titulo from '../components/Titulo';
import Rodape from '../components/Rodape';

const Search = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const currentRoute = route.name;

    // Confirma o parâmetro 'user'
    const user = route.params?.user;
    console.log('Search Screen - Current Route:', currentRoute);
    console.log('Search Screen - User:', user);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Titulo style={styles.headerNameUser}>{user?.name || 'User Name'}</Titulo>
                <Titulo style={styles.headerText}>ID: 230 000 000 000</Titulo>
            </View>

            <View style={styles.footer}>
                <Rodape
                    onHomePress={() => navigation.navigate('Home', { user })}
                    onSearchPress={() => navigation.navigate('Search', { user })}
                    onProfilePress={() => navigation.navigate('Profile', { user })} 
                    currentRoute={currentRoute}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272727',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#A03651',
        width: '100%',
        height: '20%',
        padding: 30,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '100'
    },
    headerNameUser: {
        fontSize: 30,
        fontWeight: 900,
    },
    footer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#333',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        bottom: 0,
    }
});

export default Search;
