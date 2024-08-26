// screens/AnaliseInterna.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../api/Firebase'; 

import Titulo from '../components/Titulo';
import Rodape from '../components/Rodape';
import Subtitulo from '../components/Subtitulo';

const AnaliseInterna = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentRoute = route.name;

    const user = route?.params?.user;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.uid) {
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
    }, [user]);

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
                    <Titulo style={styles.headerText}>Análise Interna</Titulo>
                    <View style={styles.line} />
                    <Subtitulo style={styles.subtituloMain}>Aqui estão suas análises internas.</Subtitulo>
                </View>
                {/* Conteúdo adicional da tela de análise interna */}
            </ScrollView>

            <View style={styles.footer}>
                <Rodape
                    onAnalisePress={() => navigation.navigate('AnaliseInterna', { user: userData })}
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
    line: {
        width: '100%',
        height: 10,
        backgroundColor: '#A03651',
        marginTop: 20,
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

export default AnaliseInterna;