import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../api/Firebase'; 

import CampoTexto from '../components/CampoTexto';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo'; 
import Subtitulo from '../components/Subtitulo';

const RegistraUsuario = ({ navigation }) => {
    const [step, setStep] = useState(1);

    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [categoriaEmpresa, setCategoriaEmpresa] = useState('');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = getAuth(app);
    const db = getFirestore(app);

    const handleNextStep = (currentStep) => {
        if (currentStep === 1) {
            if (!nomeEmpresa || !categoriaEmpresa) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos da empresa.');
                return;
            }
            setStep(2);
        } else if (currentStep === 2) {
            if (!email || !name) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos pessoais.');
                return;
            }
            setStep(3);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            await setDoc(doc(db, 'dadosUsuarios', user.uid), {
                email,
                name,
                nomeEmpresa,
                categoriaEmpresa,
                createdAt: new Date(), // Adiciona a data de criação
            });
    
            await sendEmailVerification(user);
    
            // Armazena os dados do usuário no AsyncStorage
            await AsyncStorage.setItem('@user_data', JSON.stringify({
                uid: user.uid,
                email,
                name,
                nomeEmpresa,
                categoriaEmpresa,
            }));
    
            Alert.alert('Sucesso', 'Usuário criado com sucesso! Verifique seu e-mail para ativar sua conta.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro de autenticação:', error.message);
            Alert.alert('Erro', error.message.includes('auth/email-already-in-use') 
                ? 'O e-mail já está em uso.' 
                : 'Erro ao criar conta. Tente novamente.');
        }
    };    

    return (
        <View style={styles.container}>
            <View style={styles.contentMain}>
                {step === 1 ? (
                    <>
                        <Titulo style={styles.title}>Dados da Empresa</Titulo>
                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Nome da Empresa" />
                            <CampoTexto
                                placeholder="Nome da Empresa"
                                value={nomeEmpresa}
                                onChangeText={setNomeEmpresa}
                            />
                        </View>

                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Categoria Empresa" />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={categoriaEmpresa}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setCategoriaEmpresa(itemValue)}
                                >
                                    <Picker.Item label="Selecione o Ramo" value="" />
                                    <Picker.Item label="Tecnologia" value="Tecnologia" />
                                    <Picker.Item label="Saúde" value="Saúde" />
                                    <Picker.Item label="Educação" value="Educação" />
                                    <Picker.Item label="Comércio" value="Comércio" />
                                    <Picker.Item label="Outro" value="Outro" />
                                </Picker>
                            </View>
                        </View>
                        <Botao
                            name="Próximo"
                            onPress={() => handleNextStep(1)}
                            backgroundColor="#A03651"
                            textColor="#fff"
                            style={styles.buttonContainer}
                        />
                    </>
                ) : step === 2 ? (
                    <>
                        <Titulo style={styles.title}>Seus Dados</Titulo>
                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Seu Nome" />
                            <CampoTexto
                                placeholder="Digite seu nome"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Seu Email" />
                            <CampoTexto
                                placeholder="example@gmail.com"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <Botao
                            name="Próximo"
                            onPress={() => handleNextStep(2)}
                            backgroundColor="#A03651"
                            textColor="#fff"
                            style={styles.buttonContainer}
                        />
                        <Subtitulo style={styles.textSecondary} onPress={() => setStep(1)}>
                            Voltar
                        </Subtitulo>
                    </>
                ) : (
                    <>
                        <Titulo style={styles.title}>Defina sua Senha</Titulo>
                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Senha" />
                            <CampoTexto
                                placeholder="Senha"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.campoCadastro}>
                            <Subtitulo name="Confirmar Senha" />
                            <CampoTexto
                                placeholder="Confirmar senha"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>
                        <Botao
                            name="Registrar"
                            onPress={handleRegister}
                            backgroundColor="#A03651"
                            textColor="#fff"
                            style={styles.buttonContainer}
                        />
                        <Subtitulo style={styles.textSecondary} onPress={() => setStep(2)}>
                            Voltar
                        </Subtitulo>
                    </>
                )}
                {step === 3 && (
                    <>
                        <Subtitulo style={styles.textSecondary} onPress={() => navigation.navigate('Login')}>
                            Já tem uma conta?
                            <Text style={styles.innerText}> Entre aqui </Text>
                        </Subtitulo>
                        <Subtitulo style={styles.textSecondary} onPress={() => navigation.navigate('RecuperarSenha')}>
                            Esqueceu sua senha?
                            <Text style={styles.innerText}> Recupere aqui </Text>
                        </Subtitulo>
                    </>
                )}
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
        paddingHorizontal: 20,
    },
    title: {
        marginBottom: 20,
    },
    campoCadastro: {
        marginBottom: 15,
        width: '100%', 
    },
    textSecondary: {
        marginTop: 20,
    },
    innerText: {
        color: '#A03651',
    },
    pickerContainer: {
        backgroundColor: '#232222',
        borderRadius: 8,
        overflow: 'hidden', // Garante que as bordas arredondadas funcionem
        width: '100%',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        color: '#DC8AA8', 
    },
    buttonContainer:{
        position: 'absolute',
        bottom: '15%',
        right: 20,
        alignItems: 'flex-end',
        width: 150,
        alignItems: 'center'
    }
});

export default RegistraUsuario;
