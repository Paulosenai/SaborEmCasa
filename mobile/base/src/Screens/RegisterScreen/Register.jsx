import React, { useState } from "react";
import { Image, SafeAreaView, View, Alert, ScrollView } from "react-native";
import { Input, Text } from '@rneui/themed';
import { Button } from 'galio-framework';
import axios from 'axios';
import styles from "./Styles";

export default function Register({ navigation }) {
    const [mensagem, setMensagem] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        senha: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastrar = async () => {
        if (!formData.nome || !formData.email || !formData.senha) {
            setMensagem('*Todos os campos são obrigatórios*');
            return;
        }
        if (!formData.email.includes('@gmail.com')) {
            setMensagem('Email inválido. Certifique-se de incluir "@gmail.com"');
            return;
        }

        console.log(formData);

        try {
            await axios.post('http://10.0.2.2:8085/api/registerUser', formData);
            Alert.alert('Cadastro realizado com sucesso');
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                Alert.alert('O email ' + formData.email + ' já existe na base de dados');
            } else {
                setMensagem('Ocorreu um erro ao cadastrar o usuário. Tente novamente!!!');
            }
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../../res/img/logosaboremcasa.png")} style={styles.logo} />
                </View>
                <View style={styles.fundo}>
                    <Text h4 style={styles.tittle}>Cadastro</Text>
                    <View>
                        <Input
                            inputContainerStyle={{
                            borderBottomWidth: 0
                            }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            inputStyle={styles.inputText}
                            placeholder="Nome:"
                            onChangeText={(text) => handleInputChange('nome', text)}
                            value={formData.nome}
                            color='#FFA92C'
                        />
                        <Input
                            inputContainerStyle={{
                            borderBottomWidth: 0
                            }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            inputStyle={styles.inputText}
                            placeholder="Email:"
                            onChangeText={(text) => handleInputChange('email', text.toLowerCase())}
                            value={formData.email}
                            color='#FFA92C'
                        />
                        <Input
                            inputContainerStyle={{
                            borderBottomWidth: 0
                            }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            placeholder="Senha:"
                            secureTextEntry
                            onChangeText={(text) => handleInputChange('senha', text)}
                            value={formData.senha}
                            color='#FFA92C'
                        />
                        {mensagem ? <Text style={styles.errorText}>{mensagem}</Text> : null}
                        <View style={styles.buttonContainer}>
                            <Button
                                color='red'
                                onPress={handleCadastrar}
                                style={styles.buttonCont}
                            >
                               <Text style={styles.buttonText}>Cadastrar</Text>
                            </Button>
                        </View>
                        <Text style={styles.remember} onPress={() => navigation.navigate('LoginScreen')}>Já possui cadastro? faça o login!</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
