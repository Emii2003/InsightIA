import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CampoBusca = ({ style, onSearch, loading, apelido }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const empresa = 'ifood';

    const handleSearch = async () => {
        console.log('Search button pressed');
        if (!searchTerm) {
            Alert.alert('Erro', 'Por favor, insira o nome da empresa.');
            return;
        }
    
        console.log('Buscando por:', searchTerm);
    
        const apelido = searchTerm; // Ou outro valor se necessário
        const maxPage = 2; // Defina o número máximo de páginas
    
        try {
            const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/scraping/${apelido}?apelido=${apelido}&max_page=${maxPage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Não precisa enviar nada no body já que estamos usando query params
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Erro na resposta: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Dados recebidos:', data);
            Alert.alert('Sucesso', 'Os dados foram salvos com sucesso!');
    
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Falha ao realizar a busca.');
        }
    };
    
    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={styles.input}
                placeholder="Nome da sua empresa..."
                placeholderTextColor="#fff"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {loading ? (
                <ActivityIndicator size="small" color="#fff" style={styles.button} />
            ) : (
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#232222',
        width: '100%',
        borderRadius: 8,
        borderWidth: 2, 
        borderColor: '#A03651',
    },
    input: {
        flex: 1,
        height: 60,
        padding: 10,
        color: '#DC8AA8',
    },
    button: {
        padding: 20,
        backgroundColor: '#A03651',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CampoBusca;