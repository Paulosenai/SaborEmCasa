import React, { useState } from "react";
import { Image, SafeAreaView, View, Alert, Animated, Easing, ActivityIndicator, TouchableOpacity, Modal } from "react-native";
import { Input, Text } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'galio-framework';
import styles from "./Styles";
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email é obrigatório');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Digite um email válido');
      return false;
    }
    setEmailError('');
    return true;
  };


  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Senha é obrigatória');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(senha);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      const data = { email, senha };
      const response = await axios.post('http://10.0.2.2:8085/api/validate', data);

      if (response.status === 200) {
        setEmail('');
        setSenha('');
        const userData = {
          id: response.data.id,
          email: response.data.email,
          senha: response.data.senha,
          nome: response.data.nome
        };
        navigation.navigate('TabScreen', { userData });
        showSuccessModal('Login realizado com sucesso!', 'Sucesso');
      } else {
        showErrorModal('Email ou senha incorretos, por favor tente novamente', 'Erro');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showErrorModal('Email ou senha incorretos. Por favor, tente novamente', 'Erro');
      } else {
        console.log(error);
        showErrorModal('Ocorreu um erro ao fazer o login, por favor, tente novamente', 'Erro');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessModal = (message, title) => {
    setModalMessage(message);
    setModalTitle(title);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };

  const showErrorModal = (message, title) => {
    setModalMessage(message);
    setModalTitle(title);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };


  const handleNavigateToRegister = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('RegisterScreen');
      animation.setValue(0);
    });
  };

  const handleNavigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  return (
    <SafeAreaView>
      <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.imageContainer}>
          <Image source={require("../../../res/img/logosaboremcasa.png")} style={styles.logo} />
        </View>
        <View style={styles.fundo}>
          <Text h4 style={styles.tittle}>Login</Text>
          <View>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholderTextColor={'#FFA92C'}
              style={styles.boxlogin}
              placeholder='Email:'
              value={email}
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
                validateEmail(text.toLowerCase());
              }}
              keyboardType="email-address"
              errorMessage={emailError}
              errorStyle={{ color: 'red', marginLeft: 10 }}
            />
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholderTextColor={'#FFA92C'}
              style={styles.boxlogin}
              placeholder='Senha:'
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                validatePassword(text);
              }}
              secureTextEntry={!showPassword}
              color='#FFA92C'
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ position: "absolute", right: 15, top: 10 }} size={20} color="#FFA92C" />
                </TouchableOpacity>
              }
              errorMessage={passwordError}
              errorStyle={{ color: 'red', marginLeft: 10 }}
            />
            <View style={styles.buttonContainer}>
              <Button
                onlyText
                title="Entrar"
                color='red'
                onPress={handleLogin}
                style={styles.buttonCont}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </Button>
            </View>
            <Text style={styles.remember} onPress={handleNavigateToRegister}>
              Não possui login? Faça o cadastro!
            </Text>
            <Text
              style={[styles.forgotPassword, { textAlign: 'center', fontWeight: 'bold', color: '#FFA92C', fontSize: 15 }]}
              onPress={handleNavigateToForgotPassword}
            >
              Esqueceu a senha?
            </Text>
          </View>
        </View>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text h4>{modalTitle}</Text>
            <Text>{modalMessage}</Text>
            <Button
              onlyText
              title="Fechar"
              color='red'
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >Fechar</Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Login;
