import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Historico = ({ empresa, apelido, qtdReclamacoes, dataOperacao, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.empresa}>{apelido}</Text>
      <Text style={styles.data}>Data: {new Date(dataOperacao).toLocaleDateString()}</Text>
      <Text style={styles.qtd}>Qtd. reclamações: {qtdReclamacoes}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  empresa: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    color: '#ccc',
    marginTop: 5,
  },
  qtd: {
    color: '#ccc',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#DC8AA8',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Historico;