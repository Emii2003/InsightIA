import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Grafico from '../components/Grafico'; 

const GraficoScreen = ({ route }) => {
  const { labels, data } = route.params;
  const navigation = useNavigation(); // Hook para navegação

  return (
    <View style={styles.container}>
      {/* Botão de X para voltar */}
      <TouchableOpacity style={styles.closeButtonContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Gráfico de Reclamações</Text>
      
      <Grafico
        labels={labels}
        data={data}
        yAxisLabel=""
        yAxisSuffix=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});

export default GraficoScreen;