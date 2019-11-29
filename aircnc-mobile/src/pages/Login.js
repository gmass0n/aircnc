// IMPORTS
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Alert, AsyncStorage, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

// EXPORT
export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    // FUNÇÃO QUE SERA CHAMADA SOMENTE UMA VEZ QUANDO ABIR A PAGINA
    useEffect(() => {
        // VERIFICAÇÃO QUE BUSCA O 'user' NO BANCO DE DADOS E CASO O USUARIO JA EXISTIR IR DIRETAMENTA PARA A OUTRA ROTA
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    // FUNÇÃO QUE SERA CHAMADA APOS SUBMIT DO FORMULARIO
    async function handleSubmit() {
        // CHAMANDO A API
        const response = await api.post('/sessions', {
            email,
        });

        const { _id } = response.data;

        // SALVANDO O '_id' NA VARIAVEL 'user' E ARMAZENANDO NO BANCO DE DADOS DA APLICAÇÃO
        await AsyncStorage.setItem('user', _id);
        // SALVANDO AS 'techs' NA VARIAVEL 'techs' E ARMAZENANDO NO BANCO DE DADOS DA APLICAÇÃO
        await AsyncStorage.setItem('techs', techs);

        if (!email && !techs) {
            Alert.alert(
                'Ops, algo deu errado!',
                'Você esqueceu de preencher os campos',
                [
                  {text: 'OK'},
                ]
              );
        } else if (email && !techs) {
            Alert.alert(
                'Ops, algo deu errado!',
                'Você esqueceu das tecnologias',
                [
                  {text: 'OK'},
                ]
            );
        } else if (!email && techs) {
            Alert.alert(
                'Ops, algo deu errado!',
                'Você esqueceu de inserir seu e-mail',
                [
                  {text: 'OK'},
                ]
            );
        } else {
            // VAI PARA A ROTA 'list' APOS O SUBMIT 
            navigation.navigate('List');
        }
     }

    return (
        // KeyboardAvoidingView = FAZ COM QUE A APLICAÇÃO SUBA AO ABRIR O TECLADO
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        
            <Image source={logo} />

            <View style={styles.form}> 
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    // DEFINE A COR DO TEXTO DENTRO DO INPUT
                    placeholderTextColor="#999"
                    // DEFINE O TIPO DO TECLADO
                    keyboardType="email-address"
                    // FAZ COM TODAS AS PRIMEIRAS LETRAS DAS PALAVRAS FIQUEM MINUSCULAS
                    autoCapitalize="none"
                    // REMOVE A AUTO-CORREÇÃO DO TECLADO
                    autoCorrect={false}
                    // VALOR DO INPUT
                    value={email}
                    // ONDE IRA ARMAZENAR O VALOR DO INPUT
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de Interesse"
                    // DEFINE A COR DO TEXTO DENTRO DO INPUT
                    placeholderTextColor="#999"
                    // DEFINE O TIPO DO TECLADO
                    keyboardType="default"
                    // FAZ COM TODAS AS PRIMEIRAS LETRAS DAS PALAVRAS FIQUEM MAIUSCULAS
                    autoCapitalize="words"
                    // REMOVE A AUTO-CORREÇÃO DO TECLADO
                    autoCorrect={false}
                    // VALOR DO INPUT
                    value={techs}
                    // ONDE IRA ARMAZENAR O VALOR DO INPUT
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}> 
                    <Text style={styles.buttonText}>ENCONTRAR SPOTS</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

// ESTILIZAÇÃO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
    },
    
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',        
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
 