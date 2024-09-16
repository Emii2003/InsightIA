import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../api/Firebase';

import { UserContext } from '../context/UserContext';
import Rodape from '../components/Rodape';
import Historico from '../components/Historico';

const AnaliseInterna = () => {
    const { user } = useContext(UserContext); 
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentRoute = useRoute().name;

    useEffect(() => {
        const fetchData = async () => {
          await fetch(`https://insightiaapi-production.up.railway.app/historico/`)
            .then(response => response.json())
            .then(data => setData(data.dados))
            .catch(error => console.log('Erro ao buscar dados:', error))
            .finally(() => setLoading(false));
        };
    
        fetchData();
      }, []);

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

                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                <Historico
                    empresa={item.empresa}
                    apelido={item.apelido}
                    qtdReclamacoes={item.qtd_reclamacoes}
                    dataOperacao={item['data-operacao']}
                    onPress={() => navigation.navigate('Detalhes', { item })} 
                />
        )}
      />
            </ScrollView>

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
    },
    scrollViewContainer: {
        padding: 30,
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