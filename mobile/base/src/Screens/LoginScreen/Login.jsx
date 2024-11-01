import React, { useState } from "react";
import { Image, SafeAreaView, View, Alert, Animated, Easing, ActivityIndicator, TouchableOpacity } from "react-native";
import { Input, Text } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Button } from 'galio-framework';
import styles from "./Styles";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!email || !senha) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos!');
        setIsLoading(false);
        return;
      }

      const data = { email, senha };
      const response = await axios.post('http://10.0.2.2:8085/api/validate', data);

      if (response.status === 200) {
        // Autenticação bem-sucedida, salvar os dados do usuário
        setEmail('');
        setSenha('');
        const userData = {
          id: response.data.id,
          email: response.data.email,
          senha: response.data.senha,
          nome: response.data.nome
        };
        // Enviar os dados do usuário para a HomePage
        navigation.navigate('TabScreen', { userData });
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos, por favor tente novamente');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer o login, por favor, tente novamente');
      } else {
        console.log(error);
        Alert.alert('Erro', 'Email ou senha incorretos. Por favor, tente novamente');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    // Animação ao mudar para a tela de registro
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
    navigation.navigate('Esqueceuasenha'); 
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
              onChangeText={(text) => setEmail(text.toLowerCase())}
              keyboardType="email-address"
            />
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholderTextColor={'#FFA92C'}
              style={styles.boxlogin}
              placeholder='Senha:'
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              color='#FFA92C'
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ position: "absolute", right: 15, top: 10 }} size={20} color="#FFA92C" />
                </TouchableOpacity>
              }
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
              style={[styles.forgotPassword, { textAlign: 'center', fontWeight: 'bold', color: '#FFA92C', fontSize: 15, }]} 
              onPress={handleNavigateToForgotPassword}
            >
              Esqueceu a senha?
            </Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default Login;