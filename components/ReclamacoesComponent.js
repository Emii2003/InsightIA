import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Botao from './Botao';

const ReclamacoesComponent = ({ titulo, empresa, apelido, tempo, descricao, status, link, dataOperacao, onPress }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.apelido}>{apelido}</Text>
            <Text style={styles.empresa}>{empresa}</Text>
            <Text style={styles.tempo}>{tempo}</Text>
            <Text style={styles.status}>Status: {status}</Text>
            <Text style={styles.dataOperacao}>Data: {dataOperacao}</Text>

            <Botao
                name={showDetails ? "Esconder detalhes" : "Ver detalhes"}
                onPress={handleToggleDetails}
                backgroundColor="#A03651"
                textColor="#FFFFFF"
            />

            {showDetails && (
                <View style={styles.descricaoContainer}>
                    <Text style={styles.descricao}>{descricao}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(link)}>
                        <Text style={styles.link}>Ver mais detalhes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#333333',
        borderRadius: 5,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    apelido: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 5,
    },
    empresa: {
        fontSize: 16,
        color: '#fff',
    },
    tempo: {
        fontSize: 14,
        color: '#bbb',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        color: '#FFA500',
        marginBottom: 5,
    },
    dataOperacao: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    descricaoContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#444444',
        borderRadius: 5,
    },
    descricao: {
        fontSize: 14,
        color: '#fff',
    },
    link: {
        fontSize: 14,
        color: '#1E90FF',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
});

export default ReclamacoesComponent;