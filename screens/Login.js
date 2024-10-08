import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../api/Firebase';
import { UserContext } from '../context/UserContext'; 

import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo';
import Subtitulo from '../components/Subtitulo';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);  

    const auth = getAuth(app);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            const db = getFirestore(app);
            const userDoc = await getDoc(doc(db, 'dadosUsuarios', user.uid));
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
    
                if (user.emailVerified) {
                    const userInfo = {
                        uid: user.uid,
                        email: user.email,
                        name: userData.name,
                        nomeEmpresa: userData.nomeEmpresa,
                        categoriaEmpresa: userData.categoriaEmpresa,
                    };
    
                    await AsyncStorage.setItem('@user_data', JSON.stringify(userInfo));
                    setUser(userInfo);  // Atualiza o estado global do usuário
    
                    navigation.replace('Profile');
                    Alert.alert('Sucesso', 'Usuário logado com sucesso!');
                } else {
                    Alert.alert('Erro', 'Por favor, verifique seu e-mail antes de fazer login.');
                    await auth.signOut();
                }
            } else {
                Alert.alert('Erro', 'Dados do usuário não encontrados no Firestore.');
                await auth.signOut();
            }
        } catch (error) {
            console.error('Erro de autenticação:', error.message);
            Alert.alert('Erro', error.message.includes('auth/user-not-found') 
                ? 'Usuário não encontrado.' 
                : 'Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.contentMain}>
                <View style={styles.input}>
                    <Titulo style={styles.title}>Digite seu E-mail</Titulo>
                    <CampoTexto
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.input}>
                    <Titulo style={styles.title}>Digite sua Senha</Titulo>
                    <CampoTexto
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <Botao
                    name="Entrar"
                    onPress={handleLogin}
                    backgroundColor="#A03651"
                    textColor="#fff"
                />
                <View style={styles.textContainer}>
                    <Subtitulo style={styles.textSecondary} onPress={() => navigation.navigate('RegistraUsuario')}>
                        Ainda não tem uma conta?
                        <Text style={styles.innerText}> Registre-se aqui </Text>
                    </Subtitulo>
                    <Subtitulo style={styles.textSecondary} onPress={() => navigation.navigate('RecuperarSenha')}>
                        Esqueceu sua senha?
                        <Text style={styles.innerText}> Recupere aqui </Text>
                    </Subtitulo>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272727',
    },
    contentMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 50,
        width: '80%'
    },
    title: {
        marginBottom: 10,
        color: '#fff',
    },
    textContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    textSecondary: {
        color: '#fff',
        marginBottom: 10,
    },
    innerText: {
        color: '#A03651',
    },
});
