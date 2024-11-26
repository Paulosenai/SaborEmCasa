import React, { useState } from "react";
import { Image, SafeAreaView, View, Modal, TouchableOpacity, Text as RNText, ScrollView, } from "react-native";
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

    // Estado para controlar a Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success'); // 'success' ou 'error'

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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        return passwordRegex.test(senha);
    };

    // Função para mostrar a modal
    const showModal = (message, type) => {
        setModalMessage(message);
        setModalType(type); // Definir se é 'success' ou 'error'
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleCadastrar = async () => {
        const { nome, email, senha } = formData;

        if (!nome || !email || !senha) {
            showModal('*Todos os campos são obrigatórios*', 'error');
            return;
        }

        if (!isEmailValid(email)) {
            showModal('Email inválido. Use um dos domínios permitidos (gmail.com, hotmail.com, yahoo.com, outlook.com).', 'error');
            return;
        }

        if (!isPasswordStrong(senha)) {
            showModal('Senha fraca. A senha deve ter pelo menos 6 caracteres, incluindo letras maiúsculas, letras minúsculas, um número e um caractere especial.', 'error');
            return;
        }

        try {
            await axios.post('http://10.0.2.2:8085/api/registerUser', formData);
            showModal('Cadastro realizado com sucesso!', 'success');
            setTimeout(() => {
                navigation.navigate("LoginScreen");
            }, 2000); // Redireciona para o login após 2 segundos
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                showModal('O email já existe na base de dados.', 'error');
            } else {
                showModal('Ocorreu um erro ao cadastrar o usuário. Tente novamente!', 'error');
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

                {/* Modal de Sucesso ou Erro */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={hideModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, modalType === 'success' ? styles.modalSuccess : styles.modalError]}>
                            <RNText style={styles.modalMessage}>{modalMessage}</RNText>
                            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
                                <RNText style={styles.modalButtonText}>Fechar</RNText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
}
