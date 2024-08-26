import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const Subtitulo = ({ style, children, onPress }) => {
    return (
      <Text style={[styles.subtitulo, style]} onPress={onPress}>
      {children}
  </Text>
    );
}

Subtitulo.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
};

Subtitulo.defaultProps = {
    style: {},
};

const styles = StyleSheet.create({
  subtitulo: {
        fontSize: 15,
        fontWeight: '300', 
        color: '#fff',
    },
});

export default Subtitulo;