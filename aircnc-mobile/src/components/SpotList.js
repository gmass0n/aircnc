// IMPORTS
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';


function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        // FUNÇÃO PARA CARREGAR A LISTA DE SPOTS
        async function loadSpots() {
            // PEGAR INFORMAÇÕES DA API COM O PARAMETRO DE TECNOLOGIA
            const response = await api.get('/spots', {
                params: { tech },
            })

            // ARMAZENA AS INFORMAÇÕES QUE PEGARAM DA API NA VARIAVEL 'setSpots'
            setSpots(response.data);
        }

        // EXECUTA A FUNÇÃO PARA CARREGAR A LISTA DE SPOTS
        loadSpots();
    }, []);

    // FUNÇÃO QUE SERA EXECUTADA QUANDO O USARIO APRTAR O BOTAO PARA REALIZAR A RESERVA
    function handleNavigate(id) {
        // NAVEGA PARA A ROTA 'Book' PASSANDO COMO PARAMETRO O 'id' DO SPOT
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList 
                style={styles.list}
                // ONDE ESTA ARMAZENADO OS DADOS DESSA LISTA
                data={spots}
                // INFORMAÇÃO UNICA DE CADA ITEM DA LISTA
                keyExtractor={spot => spot._id}
                // PARA A LISTA RENDERIZAR NA HORIZONTAL
                horizontal
                // REMOVE A BARRA DE ROLAGEM
                showsHorizontalScrollIndicator={false}
                // COMO A LISTA IRA SE RENDERIZAR PARA O USUARIO
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }}/>

                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>

                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    )
}


// ESTILIZAÇÃO
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#DDD'
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',        
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }

});

// EXPORT
export default withNavigation(SpotList);