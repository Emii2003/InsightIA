import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../api/Firebase';

import { UserContext } from '../context/UserContext';
import Rodape from '../components/Rodape';
import ReclamacoesComponent from '../components/ReclamacoesComponent';

const ReclamacoesScreen = () => {
    const { user } = useContext(UserContext); 
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentRoute = useRoute().name;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/reclamacoes/lojas-marisa-loja-fisica`);
                const result = await response.json();
                setData(result.dados);
            } catch (error) {
                setError('Erro ao buscar dados da API.');
                console.log('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <TouchableOpacity style={styles.closeButtonContainer} onPress={() => navigation.goBack()}>
                    <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ReclamacoesComponent
                            titulo={item.titulo}
                            apelido={item.apelido}
                            empresa={item.empresa}
                            tempo={item.tempo}
                            descricao={item.descricao}
                            status={item.status}
                            link={item.link}
                            dataOperacao={item['data-operacao']}
                            onPress={() => navigation.navigate('Detalhes', { item })} 
                        />
                    )}
                />
            </ScrollView>

            <View style={styles.footer}>
                <Rodape
                    onAnalisePress={() => navigation.navigate('ResultadoAnaliseScreen')}
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
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    closeButton: {
        fontSize: 30,
        color: '#FFF',
    },
    scrollViewContainer: {
        padding: 30,
        paddingTop: 60,
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

export default ReclamacoesScreen;