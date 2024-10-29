import React, { useState } from "react";
import { Image, SafeAreaView, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Input, Text } from '@rneui/themed';
import { Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import axios from 'axios';
import styles from "./Styles";

export default function Register({ navigation }) {
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        senha: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        const domain = email.split('@')[1];
        return allowedDomains.includes(domain);
    };

    const isPasswordStrong = (senha) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return passwordRegex.test(senha);
    };

    const showAlert = (message) => {
        Alert.alert("Erro", message, [{ text: "OK" }]);
    };

    const handleCadastrar = async () => {
        const { nome, email, senha } = formData;

        if (!nome || !email || !senha) {
            showAlert('*Todos os campos são obrigatórios*');
            return;
        }
        
        if (!isEmailValid(email)) {
            showAlert('Email inválido. Use um dos domínios permitidos (gmail.com, hotmail.com, yahoo.com, outlook.com).');
            return;
        }

        if (!isPasswordStrong(senha)) {
            showAlert('Senha fraca. A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, letras minúsculas, um número e um caractere especial.');
            return;
        }

        try {
            await axios.post('http://10.0.2.2:8085/api/registerUser', formData);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso', [
                { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
            ]);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                showAlert('O email ' + email + ' já existe na base de dados.');
            } else {
                showAlert('Ocorreu um erro ao cadastrar o usuário. Tente novamente!');
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
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            inputStyle={styles.inputText}
                            placeholder="Nome:"
                            onChangeText={(text) => handleInputChange('nome', text)}
                            value={formData.nome}
                            color='#FFA92C'
                        />
                        <Input
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            inputStyle={styles.inputText}
                            placeholder="Email:"
                            onChangeText={(text) => handleInputChange('email', text.toLowerCase())}
                            value={formData.email}
                            color='#FFA92C'
                        />
                        <Input
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            placeholderTextColor={'#FFA92C'}
                            style={styles.boxlogin}
                            placeholder="Senha:"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => handleInputChange('senha', text)}
                            value={formData.senha}
                            color='#FFA92C'
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ position: "absolute", right: 15, top: 10, }} size={20} color="#FFA92C" />
                                </TouchableOpacity>
                            }
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                color='red'
                                onPress={handleCadastrar}
                                style={styles.buttonCont}
                            >
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </Button>
                        </View>
                        <Text style={styles.remember} onPress={() => navigation.navigate('LoginScreen')}>
                            Já possui cadastro? Faça o login!
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}