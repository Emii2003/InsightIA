import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display'; // Importando a biblioteca de Markdown

const GraficoScreen = ({ route }) => {
  const { empresa } = route.params; // Recebendo a empresa como parâmetro da rota
  const navigation = useNavigation(); // Hook para navegação
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [insightMessage, setInsightMessage] = useState(''); // Para armazenar a mensagem de insight

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://b4c0-187-49-184-225.ngrok-free.app/gemini/individual/${empresa}`, {
          method: 'POST', // Mudando para POST
          headers: {
            'Content-Type': 'application/json', // Definindo o cabeçalho para JSON
          },
          body: JSON.stringify({ empresa }), // Enviando a empresa no corpo da requisição
        });

        // Verifica se a resposta não está OK
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ao buscar dados: ${response.status} ${errorText}`);
        }

        const result = await response.json();

        // Verifique se o formato do resultado está correto
        console.log('Resultado da API:', result); // Para depuração
        if (!result.mensagem) {
          throw new Error('Formato de resposta inesperado');
        }

        // Atualiza o estado com a mensagem recebida
        setInsightMessage(result.mensagem); // Armazenar a mensagem de insight
      } catch (error) {
        console.error('Erro ao buscar dados:', error); // Log do erro
        Alert.alert('Erro', error.message); // Exibe um alerta em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [empresa]);

  // Exibe um indicador de carregamento com mensagem
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    ); // Mostra um indicador de carregamento
  }

  return (
    <View style={styles.container}>
      {/* Botão de X para voltar */}
      <TouchableOpacity style={styles.closeButtonContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Análise Individual</Text>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Texto formatado usando Markdown */}
        <View style={styles.markdownContainer}>
          <Markdown style={markdownStyles}>
            {insightMessage}
          </Markdown>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilo para Markdown
const markdownStyles = {
  text: {
    color: '#FFFFFF', // Cor do texto em branco
    fontSize: 20, // Aumentar o tamanho da fonte
  },
  heading1: {
    color: '#FFFFFF', // Cor do texto do título em branco
    fontSize: 26, // Aumentar o tamanho do título
  },
  heading2: {
    color: '#FFFFFF', // Cor do texto do subtítulo em branco
    fontSize: 22, // Aumentar o tamanho do subtítulo
  },
  listItem: {
    color: '#FFFFFF', // Cor dos itens da lista em branco
    fontSize: 20, // Aumentar o tamanho da fonte dos itens
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'flex-start', // Ajusta para iniciar do topo
    padding: 20, // Adiciona espaçamento
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo
  },
  loadingText: {
    color: '#FFFFFF', // Cor do texto de carregamento
    marginTop: 10, // Espaço entre o indicador e o texto
    fontSize: 16, // Tamanho da fonte
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
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 100, 
  },
  scrollView: {
    flexGrow: 1, // Permite que o ScrollView expanda
    alignItems: 'center', // Centraliza o conteúdo
  },
  markdownContainer: {
    marginTop: 20, // Espaço entre o gráfico e o texto
    width: '100%', // Define largura para o container
    backgroundColor: '#333333', // Fundo do container para destaque
    borderRadius: 8,
    padding: 15, // Aumentar padding interno do container
  },
});

export default GraficoScreen;