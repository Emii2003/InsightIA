import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Botao = ({ name, onPress, backgroundColor, textColor, borderColor, style }) => {
  return (
      <TouchableOpacity
        style={[
          styles.buttonBase,
          backgroundColor && { backgroundColor },
          borderColor && { borderColor, borderWidth: 2 },
          style 
        ]}
        onPress={onPress}
      >
          <Text style={[styles.buttonText, textColor && { color: textColor }]}>
            {name}
          </Text>
      </TouchableOpacity>
  );
}

export default Botao;

const styles = StyleSheet.create({
  buttonBase: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 15,
  }
});