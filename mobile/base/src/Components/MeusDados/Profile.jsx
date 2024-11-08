import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MeusDadosScreen = ({ route, navigation }) => {
  const { obj } = route.params;

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Dados</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} // Substitua com a URL ou imagem do avatar do usuário
          style={styles.avatar}
        />
        <Text style={styles.userName}>{obj.nome}</Text>
        <Text style={styles.userEmail}>{obj.email}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{obj.nome}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{obj.email}</Text>
        </View>
      </View>

      {/* Esqueceu a Senha Button */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
        <Text style={styles.buttonText}>Alterar senha do usuario</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#FFA92C',
    borderRadius: 50,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFA92C',
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Sombra suave para o container
    marginBottom: 30,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  forgotPasswordButton: {
    paddingVertical: 12,
    backgroundColor: '#FFA92C',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default MeusDadosScreen;
