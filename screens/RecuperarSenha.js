import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../Firebase'; // Importação do Firebase

import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo';
import Subtitulo from '../components/Subtitulo'

const RecuperarSenha = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const auth = getAuth(app);

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
            navigation.navigate('Login'); // Redireciona para a tela de login
        } catch (error) {
            console.error('Erro ao redefinir senha:', error.message);
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentMain}>

                <View style={styles.campoCadastro}>
                    <Titulo style={styles.title}>Digite seu E-mail</Titulo>
                    <CampoTexto
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Botao
                    name="Enviar e-mail de redefinição"
                    onPress={handlePasswordReset}
                    backgroundColor="#A03651"
                    textColor="#fff"
                />
                <Subtitulo style={styles.textSecondary} onPress={() => navigation.navigate('Login')}>
                    Lembrou a senha? <Subtitulo style={styles.innerText}>Entre aqui</Subtitulo>
                </Subtitulo>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272727',
    },
    contentMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    campoCadastro: {
        marginBottom: 15,
        width: '75%',
    },
    title: {
        marginBottom: 30,
        color: '#fff',
    },

    innerText: {
        color: '#A03651',
    },
});

export default RecuperarSenha;
