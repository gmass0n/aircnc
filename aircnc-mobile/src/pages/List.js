// IMPORTS
import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, Image, AsyncStorage, ScrollView, TouchableOpacity, Platform, Alert} from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';
import logout from '../assets/logout.png';

import socketio from 'socket.io-client';

// EXPORT
export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
          const socket = socketio('https://gmass0n-backend.herokuapp.com', {
            query: { user_id }
          })
    
          socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
          })
        })
      }, []);

    // FUNÇÃO QUE SERA CHAMADA SOMENTE UMA VEZ QUANDO ABIR A PAGINA
    useEffect(() => {
        // BUSCA 'techs' NO BANCO DE DADOS E A TRANSFORMA EM ARRAY
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            // ARMAZENA O ARRAY NA VARIAVEL 'setTechs'
            setTechs(techsArray);
        })
    }, [])

    // FUNÇÃO QUE SERA CHAMADA QUANDO ABERTAR O BOTAO DE LOGOUT
    function handleLogout() {
        // LIMPA OS DADOS SALVOS NO BANCO DE DADOS DA APLICAÇÃO
        AsyncStorage.clear();

        // VAI PARA A PAGINA DE LOGIN
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
        
            <Image style={styles.logo} source={logo} />

            <TouchableOpacity style={styles.logout} onPress={handleLogout}> 
                <Image style={styles.logoutButton} source={logout}/>
            </TouchableOpacity>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}


// ESTILIZAÇÃO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
 
    logout: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 43 : 0,
        right: 0,
        alignSelf:'flex-end'
    },

    logoutButton: {
        height: 32,
        marginTop: 10,
        resizeMode: 'contain',
        alignSelf:'center'
    }
});