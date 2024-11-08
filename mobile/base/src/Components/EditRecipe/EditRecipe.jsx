import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Image, Text, SafeAreaView, ScrollView } from "react-native";
import axios from 'axios';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';  // Element Dropdown
import { SegmentedButtons } from 'react-native-paper';
import { Button } from "galio-framework";

const categories = [
  { label: 'Bebidas', value: 'bebida' },
  { label: 'Doces', value: 'doce' },
  { label: 'Salgados', value: 'salgado' },
  { label: 'Saudáveis', value: 'saudavel' },
  { label: 'Sem Açúcar', value: 'sem-acucar' },
];

const EditRecipe = ({ route, navigation }) => {
  const { recipe } = route.params;

  const [nome, setNome] = useState(recipe.nome);
  const [ingredientes, setIngredientes] = useState(recipe.ingredientes);
  const [modoPreparo, setModoPreparo] = useState(recipe.modo_preparo);
  const [imagem, setImagem] = useState(null); 
  const [categoria, setCategoria] = useState(null);
  const [status, setStatus] = useState(recipe.privacidade || 'publico'); 

  // Função para abrir a galeria e selecionar a imagem
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("Seleção de Imagem", "Você cancelou a seleção da imagem.");
      } else if (response.errorCode) {
        Alert.alert("Erro", "Erro ao abrir a galeria. Tente novamente.");
        console.error("Erro ao abrir a galeria:", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImagem(selectedImage.uri); 
      }
    });
  };

  const handleSave = async () => {
    // Verificação de todos os campos obrigatórios
    if (!nome) {
      Alert.alert('Campo Obrigatório', 'Por favor, preencha o nome da receita.');
      return;
    }
    if (!ingredientes) {
      Alert.alert('Campo Obrigatório', 'Por favor, adicione os ingredientes.');
      return;
    }
    if (!modoPreparo) {
      Alert.alert('Campo Obrigatório', 'Por favor, descreva o modo de preparo.');
      return;
    }
    if (!categoria) {
      Alert.alert('Campo Obrigatório', 'Por favor, selecione uma categoria.');
      return;
    }
    if (!status) {
      Alert.alert('Campo Obrigatório', 'Por favor, selecione a privacidade da receita.');
      return;
    }
    if (!imagem) {
      Alert.alert('Campo Obrigatório', 'Por favor, adicione uma imagem para a receita.');
      return;
    }

    try {
      // Se a imagem for válida, converta-a para base64
      let imageData = null;
      if (imagem) {
        imageData = await RNFS.readFile(imagem, 'base64'); 
      }

      const updatedRecipe = {
        ...recipe,
        nome,
        ingredientes,
        modo_preparo: modoPreparo,
        categoria: categoria,  
        privacidade: status,  
        imagemBase64: imageData,
      };

      const response = await axios.put(`http://10.0.2.2:8085/api/updateReceita/${recipe.id}`, updatedRecipe);

      if (response.status === 200) {
        Alert.alert("Sucesso", "Receita atualizada com sucesso!", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível atualizar a receita.");
      }
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar a receita.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cadastroContainer}>
            <Text style={styles.title}>Editar Receita</Text>
            <Button
              onPress={handleImagePicker}
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 200,
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Image
                style={{ width: 170, height: 150, resizeMode: 'contain' }}
                source={
                  imagem 
                    ? { uri: imagem }  // Se o usuário selecionou uma imagem, exibe a imagem selecionada
                    : require('../../../res/img/imageIcon.png') // Caso contrário, exibe a imagem padrão
                }
              />
            </Button>

            <TextInput
              style={styles.input}
              placeholder="Nome da Receita"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingredientes"
              value={ingredientes}
              onChangeText={setIngredientes}
            />
            <TextInput
              style={styles.input}
              placeholder="Modo de Preparo"
              value={modoPreparo}
              onChangeText={setModoPreparo}
            />

            {/* Categoria Dropdown */}
            <Text style={styles.label}>Categoria</Text>
            <Dropdown
              data={categories}
              value={categoria}
              onChange={item => setCategoria(item.value)}  
              labelField="label"
              valueField="value"
              placeholder="Selecione uma categoria"
              style={styles.dropdown}
            />

            <Text style={styles.label}>Privacidade</Text>
            <SegmentedButtons
              value={status}
              onValueChange={setStatus}  
              buttons={[
                {
                  value: 'privado',
                  label: 'Privado',
                  style: {
                    backgroundColor: status === 'privado' ? '#FFA92C' : 'transparent',
                    color: status === 'privado' ? '#fff' : '#000',
                  },
                },
                {
                  value: 'publico',
                  label: 'Público',
                  style: {
                    backgroundColor: status === 'publico' ? '#FFA92C' : 'transparent',
                    color: status === 'publico' ? '#fff' : '#000',
                  },
                },
              ]}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.receitaButton}>
                <Text style={styles.buttonText} onPress={handleSave}>Salvar Receita</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilo aplicado diretamente na página
const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  cadastroContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA92C',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#FFA92C',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: '#FFA92C',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  receitaButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFA92C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditRecipe;
