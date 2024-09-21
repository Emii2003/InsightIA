import React, { ScrollView } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Botao from '../components/Botao';
import Rodape from '../components/Rodape';

const ResultadoAnaliseScreen = ({ }) => {
    const currentRoute = useRoute().name;
    const navigation = useNavigation();

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [10, 20, 15, 25, 30],
    };

    return (

        <View style={styles.container}>
            <View style={styles.row}>
                <Botao
                    name="Minha empresa"
                    onPress={() => navigation.navigate('AnaliseConcorrenciaScreen')}
                    backgroundColor="#A03651"
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20, width: 150, marginRight: 30}}
                />
                <Botao
                    name="Concorrentes"
                    onPress={() => navigation.navigate('AnaliseConcorrenciaScreen')}
                    backgroundColor="#A03651"
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20, width: 150, backgroundColor: '#431420'}}
                />
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Image
                        source={require('../assets/ResultadoAnaliseScreen/ReclameAqui.png')}
                        style={{ marginRight: 15 }}
                    />
                    <Text style={styles.headerText}>Reclame aqui</Text>
                </View>
                <Text style={styles.sectionHeaderText}>Dados coletados</Text>
                <Botao
                    name="Reclamações"
                    onPress={() => navigation.navigate('ReclamacoesScreen')}
                    backgroundColor="#A03651"
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20 }}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeaderText}>Insights Gerados</Text>
                <Botao
                    name="Sugestões de melhoria"
                    onPress={() => navigation.navigate('SugestoesMelhoriaRA')}
                    backgroundColor="#A03651"
                    textColor="#FFFFFF"
                    style={{ marginBottom: 20 }}
                />
                <Botao
                    name="Visualizar em gráfico"
                    onPress={() => navigation.navigate('GraficoScreen', chartData)}
                    backgroundColor="#A03651"
                    textColor="#FFFFFF"
                />
            </View>

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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    section: {
        padding: 20,
        backgroundColor: '#333333',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    sectionHeaderText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    loadingText: {
        color: '#FFFFFF',
    },
    errorText: {
        color: '#FF0000',
    },
    reclamacaoItem: {
        marginBottom: 10,
    },
    reclamacaoText: {
        color: '#FFFFFF',
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

export default ResultadoAnaliseScreen;