import React, { useContext } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';

import { UserContext } from '../context/UserContext';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo';
import Rodape from '../components/Rodape';

const Profile = () => {
    const navigation = useNavigation();
    const currentRoute = useRoute().name;
    const { user, setUser } = useContext(UserContext);  // Consumindo o UserContext

    const handleLogout = async () => {
        try {
            await getAuth().signOut();
            setUser(null);
            Alert.alert("Logout", "Você saiu da conta com sucesso.", [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao sair da conta. Tente novamente.");
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Usuário não encontrado.</Text>
                <Botao
                    name="Voltar"
                    onPress={() => navigation.goBack()}
                    borderColor="#DC8AA8"
                    textColor="#DC8AA8"
                    style={styles.logoutButton}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Titulo style={styles.headerNameUser}>{user.name}</Titulo>
                <Titulo style={styles.headerText}>ID: 230 000 000 000  </Titulo>
            </View>

            <View style={styles.buttonContainer}>
                <Botao
                    name="Sair da Conta"
                    onPress={handleLogout}
                    borderColor="#DC8AA8"
                    textColor="#DC8AA8"
                    style={styles.logoutButton}
                />
            </View>

            <View style={styles.footer}>
                <Rodape
                    onAnalisePress={() => navigation.navigate('AnaliseInterna')}
                    onSearchPress={() => navigation.navigate('Search')}
                    onProfilePress={() => navigation.navigate('Profile')}
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
        alignItems: 'center',
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
        fontWeight: '100',
        color: '#fff',
    },
    headerNameUser: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '15%',
        right: 20,
        alignItems: 'flex-end',
    },
    logoutButton: {
        width: 150,
    },
    footer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#333',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        bottom: 0,
    },
    errorText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
});

export default Profile;