import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';


const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false); 

  const handleEmailSubmit = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post('http://10.0.2.2:8085/api/reset', { email });

      if (response.status === 200 && response.data.msg === 'E-mail enviado com sucesso!') {
        Alert.alert('Sucesso', 'Instruções enviadas para o seu e-mail.');
        setStep('password'); 
        setEmail('');
      } else {
        Alert.alert('Erro', 'E-mail não encontrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar a solicitação.');
    } finally {
      setLoading(false); 
    }
  };

  // Função para atualizar a senha
  const handlePasswordSubmit = async () => {
    if (!password) {
      Alert.alert("Erro", "Por favor, insira a nova senha.");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post('http://10.0.2.2:8085/api/resetpassword', { email, password });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        setStep('email'); 
        setPassword('');
      } else {
        Alert.alert('Erro', 'Não foi possível alterar a senha. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar alterar a senha.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Deseja alterar sua senha?</Text>
        {step === 'email' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleEmailSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? "Enviando..." : "Enviar Instruções"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handlePasswordSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? "Alterando..." : "Redefinir Senha"}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFA92C',
  },
  input: {
    height: 50,
    borderColor: '#FFA92C',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#FFA92C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
  },
  
});

export default ForgotPassword;
