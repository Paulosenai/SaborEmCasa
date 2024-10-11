import React, { useState } from 'react';
import { View, TextInput, Alert, SafeAreaView, Image, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs'
import { Text, Header } from '@rneui/themed';
import { Button } from 'galio-framework';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from './Styles';

export default function CadastrarReceitas({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleCameraLaunch = async () => {
    const options = {
        mediaType: 'photo',
    };

    try {
        const response = await launchCamera(options);
        console.log('pickedFile', response);

        // Verifica se a imagem foi selecionada com sucesso
        if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            setImagem(image);
        } else {
            console.log('Nenhuma imagem selecionada.');
        }
    } catch (error) {
        console.error('Erro ao selecionar a imagem:', error);
    }
};

  const handleImageLibraryLaunch = async () => {
    const options = {
        mediaType: 'photo',
    };

    try {
        const response = await launchImageLibrary(options);
        console.log('pickedFile', response);

        // Verifica se a imagem foi selecionada com sucesso
        if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            setImagem(image);
        } else {
            console.log('Nenhuma imagem selecionada.');
        }
    } catch (error) {
        console.error('Erro ao selecionar a imagem:', error);
    }
};

  const handleSubmit = async () => {
   
    // Verificar se todos os campos estão preenchidos
    if (!nome || !ingredientes || !modoPreparo) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const imageData = await RNFS.readFile(imagem.uri, 'base64');
      const data = 
        {
          nome,
          ingredientes,
          modo_preparo: modoPreparo,
          imagemBase64: imageData
        }
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const apiUrl = 'http://10.0.2.2:8085/api/cadastrarReceitas'

      const response = await axios.post(apiUrl, data, config);
      console.log(response.data)
      
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
        setNome('');
        setIngredientes('');
        setModoPreparo('');
        setImagem(null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar a receita.');
    }
    
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor="#FFA92C"
        barStyle="light-content"
        leftComponent={
          <View style={styles.headerComponentContainer}>
            <Image source={require('../../../res/img/logo2.png')} style={{ width: 90, height: 50 }} />
          </View>
        }
        rightComponent={(
          <View style={styles.headerIconsContainer}>
            <Icon
              name="person"
              size={30}
              color="#fff"
            />
          </View>
        )}
      />
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/adicionarReceitas.png")}
              style={styles.newsImage}
            />
          </View>
        </View>
       
        <View style={styles.cadastroContainer}>
          <Button onPress={handleImageLibraryLaunch} style={{ backgroundColor:'#fff', height: 200, alignSelf: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Image style={{ width: 150, height: 150 }} source={imagem ? { uri: imagem.uri } : require('../../../res/img/bell.png')} />
          </Button>
          
          <Text style={styles.title}>Nome da sua receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            placeholderTextColor={'#FFA92C'}
            value={nome}
            onChangeText={setNome}
          />
          
          <Text style={styles.title}>Ingredientes para a receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingredientes:"
            placeholderTextColor={'#FFA92C'}
            value={ingredientes}
            onChangeText={setIngredientes}
            multiline 
            numberOfLines={4}
          />
          
          <Text style={styles.title}>Modo de preparo da receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Modo de Preparo:"
            placeholderTextColor={'#FFA92C'}
            value={modoPreparo}
            onChangeText={setModoPreparo}
            multiline 
            numberOfLines={4}
          />
          
          <View style={styles.buttonContainer}>
            <Button
              onlyText
              color='red'
              onPress={handleSubmit}
              style={styles.receitaButton}
            >
              <Text style={styles.buttonText}>CADASTRAR RECEITA</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
    
  
}

