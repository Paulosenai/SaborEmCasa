import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("Senha deve ter pelo menos 6 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("Deve conter 1 letra maiúscula");
    if (!/[a-z]/.test(password)) errors.push("Deve conter 1 letra minúscula");
    if (!/\d/.test(password)) errors.push("Deve conter 1 número");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Deve conter 1 caractere especial");
    return errors;
  };

  const handleResetSenha = async () => {
    if (!email) {
      showModal("Por favor, insira seu email.", false);
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8085/api/reset', { email });

      if (response.status === 200) {
        setMostrarFormulario(true);
      }
    } catch (error) {
      console.error("Erro ao enviar email", error);
      showModal("Não foi possível enviar o email. Tente novamente.", false);
    }
  };

  const handleTrocarSenha = async () => {
    const validationErrors = validatePassword(novaSenha);
  
    if (validationErrors.length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }
  
    if (novaSenha !== confirmarSenha) {
      showModal("As senhas não coincidem.", false);
      return;
    }
  
    try {
      const data = { email, senha: novaSenha };
      const response = await axios.put('http://10.0.2.2:8085/api/resetpassword', data);
  
      if (response.status === 200) {
        showModal("Senha trocada com sucesso!", true);
        navigation.navigate("LoginScreen");
      } else {
        showModal("Erro ao trocar a senha. Tente novamente.", false);
      }
    } catch (error) {
      showModal(`Erro ao trocar a senha: ${error.message}`, false);
    }
  };
  

  const showModal = (message, isSuccess) => {
    setModalMessage(message);
    setIsSuccess(isSuccess);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <Text style={styles.subtitle}>
        {!mostrarFormulario
          ? "Insira seu email para redefinir sua senha"
          : "Crie uma nova senha segura"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        editable={!mostrarFormulario}
      />


      {mostrarFormulario && (
        <>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nova Senha"
              value={novaSenha}
              onChangeText={(text) => {
                setNovaSenha(text);
                setPasswordErrors([]);
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ padding: 10 }} size={20} color="#FFA92C" />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar Nova Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ padding: 10 }} size={20} color="#FFA92C" />
            </TouchableOpacity>
          </View>

          {passwordErrors.length > 0 && (
            <View style={styles.errorContainer}>
              {passwordErrors.map((error, index) => (
                <Text key={index} style={styles.errorText}>
                  {error}
                </Text>
              ))}
            </View>
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={!mostrarFormulario ? handleResetSenha : handleTrocarSenha}
      >
        <Text style={styles.buttonText}>
          {!mostrarFormulario ? "Enviar" : "Redefinir Senha"}
        </Text>
      </TouchableOpacity>

      {!mostrarFormulario && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Voltar para Login</Text>
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, isSuccess ? styles.successText : styles.errorText]}>
              {modalMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backLink: {
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
  },
  errorText: {
    color: 'red',
  },
  modalButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
