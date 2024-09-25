import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../api/Firebase';
import { UserContext } from '../context/UserContext';
import Titulo from '../components/Titulo';
import Rodape from '../components/Rodape';
import Subtitulo from '../components/Subtitulo';
import CampoBusca from '../components/CampoBusca';
import CampoTexto from '../components/CampoTexto';

const Search = () => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [apelido, setApelido] = useState('');
    const currentRoute = useRoute().name;

    const handleSearch = async (data) => {
        setSearchLoading(true);  // Iniciar o loading
        console.log('Dados recebidos na busca:', data);
        // Aqui você pode lidar com os dados recebidos da busca
        // Simulação de busca com delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula a busca
        setSearchLoading(false); // Finalizar o loading
    };

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
                    <Titulo style={styles.headerText}>Sua empresa</Titulo>
                    <Titulo style={styles.headerNameUser}>{userData?.nomeEmpresa || 'Não disponível'}</Titulo>
                    <View style={styles.line} />
                    <Subtitulo style={styles.subtituloMain}>Veja os pontos negativos da sua empresa e receba insights valiosos.</Subtitulo>
                </View>

                <View style={styles.main}>
                    <CampoTexto
                        placeholder="Digite um apelido"
                        value={apelido}
                        onChangeText={setApelido}
                        style={styles.apelidoInput}
                    />
                    <CampoBusca onSearch={handleSearch} loading={searchLoading} apelido={apelido} />
                </View>

                {searchLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                )}
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
        marginTop: 100,
    },
    subtituloMain: {
        fontSize: 18,
        top: 50,
        lineHeight: 30,
    },
    apelidoInput: {
        marginBottom: 20,
        color: '#fff',
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
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loadingText: {
        color: '#fff',
        marginLeft: 10,
    },
});

export default Search;