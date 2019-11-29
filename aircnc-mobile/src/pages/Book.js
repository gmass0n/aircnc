// IMPORTS
import React, { useState } from 'react';
import { SafeAreaView, Text, AsyncStorage, Platform, StyleSheet, TextInput, View, TouchableOpacity, Alert } from 'react-native';

import api from '../services/api';

import * as Localization from 'expo-localization';
import moment from 'moment';
import 'moment/min/locales';

const deviceLanguage = Localization.locale.replace(/_/g, '-').toLowerCase();

// DEFINE A LOCALIZAÇÃO DO DISPOSITIVO COMO 'pt-BR'
moment.locale([ deviceLanguage, 'pt-br' ]);

// IMPORTANDO O DATE PICKER PARA ANDROID E IOS
 const DatePicker =
    Platform.OS === 'ios'
        ? require('DatePickerIOS')
        : require('../components/DatePickerAndroid')

// EXPORT
export default function Book({ navigation }) {

    const [date, setDate] = useState(Platform.OS === 'ios' ? new Date() : 'Qual data você quer reservar?');

    // ARMAZENA O ID DO SPOT QUE VEIO PELO PARAMETROS DA NAVAGEÇÃO 
    const id = navigation.getParam('id');

    // FUNÇÃO QUE SERA EXECUTADA QUANDO O USARIO APERTAR O BOTAO DE 'REALIZAR RESERVA'
    async function handleSubmit() {
        // RECUPERANDO O ID DO USUARIO NO BANCO DE DADOS
        const user_id = await AsyncStorage.getItem('user');

        // CHAMADA A API DE CRIAÇÃO DE RESERVAS
        await api.post(`/spots/${id}/bookings`, {
            date:
            Platform.OS === 'ios'
            ? moment(date).format('LL')
            : date            
        }, {
            headers: {user_id}
        })

        // ALERTA QUE SERA CHAMADO DEPENDENDO DO S.O DO DISPOSTIVO
        Platform.OS === 'ios' 
            ? Alert.alert(`Solitação de reserva para ${moment(date).format('LL')} enviada.`)
            : Alert.alert(`Solicitação de reserva para ${date} enviada.`)
        

        // VAI PARA A ROTA 'List'
        navigation.navigate('List');
    }

    // FUNÇÃO QUE SERA EXECUTADA QUANDO O USUÁRIO APERTAR O BOTAO DE 'CANCELAR'
    function handleCancel() {
        // VAI PARA A ROTA 'List'
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE * </Text>
            
            {<DatePicker
                mode="date"
                date={date} 
                onDateChange={setDate}
                locale={deviceLanguage}
                moment={moment}
            />}
            
            <TouchableOpacity onPress={handleSubmit} style={styles.button}> 
                <Text style={styles.buttonText}>SOLICITAR RESERVA</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}> 
                <Text style={styles.buttonText}>CANCELAR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// ESTILIZAÇÃO
const styles = StyleSheet.create({
    container: {
        margin: 23
    },

    label: {
        marginTop: 20,
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

    cancelButton: {
        marginTop: 10,
        height: 42,
        backgroundColor: '#999',
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