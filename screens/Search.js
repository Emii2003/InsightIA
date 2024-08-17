import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../Firebase'; 

import Titulo from '../components/Titulo';
import Rodape from '../components/Rodape';
import Subtitulo from '../components/Subtitulo'
import CampoBusca from '../components/CampoBusca';

const Search = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentRoute = route.name;

    // Obtendo o ID do usuário dos parâmetros da rota
    const user = route?.params?.user;

    const handleSearch = (searchTerm) => {
        console.log('Buscando por:', searchTerm);
    };

    console.log('Search Screen - User:', user);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setError('ID do usuário não fornecido.');
                setLoading(false);
                return;
            }

            try {
                const db = getFirestore(app);
                const userDocRef = doc(db, 'dadosUsuarios', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    setError('Usuário não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados do usuário:', error);
                setError('Erro ao recuperar os dados do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.uid]);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.header}>
                    <Titulo style={styles.headerText}>Sua empresa</Titulo>
                    <Titulo style={styles.headerNameUser}>{userData?.nomeEmpresa || 'Não disponível'}</Titulo>
                    <View style={styles.line} />
                    <Subtitulo style={styles.subtituloMain}> Veja os pontos negativos das suas empresas concorrentes e receba insights valiosos.</Subtitulo>
                    <Subtitulo style={styles.subtituloMain}> Insira a nome da empresa concorrente</Subtitulo>
                </View>

                <View style={styles.main}>
                    <CampoBusca onSearch={handleSearch} />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Rodape
                    onHomePress={() => navigation.navigate('Home', { user: userData })}
                    onSearchPress={() => navigation.navigate('Search', { user: userData })}
                    onProfilePress={() => navigation.navigate('Profile', { user: userData })}
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
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'right',
        padding: 30,
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 100,
        zIndex: 1,
        padding: 30,
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
    line: {
        width: '100%',
        height: 10,
        backgroundColor: '#A03651',
        marginTop: 20,
    },
    main: {
        marginTop: 100
    },
    subtituloMain: {
        fontSize: 18,
        top: 50,
        lineHeight: 30
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

export default Search;
