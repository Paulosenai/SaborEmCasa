import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Image, Text, SafeAreaView, ScrollView, Modal, TouchableOpacity } from "react-native";
import axios from 'axios';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown'; 
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
  const [imagem ] = useState(recipe.imagemReceita); 
  const [categoria, setCategoria] = useState(recipe.categoria);
  const [status, setStatus] = useState(recipe.privacidade || 'publico');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); 
  const [EditselectedImage, setEditSelectedImage] = useState(null)
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
        setEditSelectedImage(selectedImage.uri); 
      }
    });
  };

  // Função para exibir a Modal
  const showModal = (message, type) => {
    setModalMessage(message);
    setModalType(type); // success or error
    setIsModalVisible(true);
  };

  // Função para esconder a Modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    // Verificação de todos os campos obrigatórios
    if (!nome) {
      showModal('Por favor, preencha o nome da receita.', 'error');
      return;
    }
    if (!ingredientes) {
      showModal('Por favor, adicione os ingredientes.', 'error');
      return;
    }
    if (!modoPreparo) {
      showModal('Por favor, descreva o modo de preparo.', 'error');
      return;
    }
    if (!categoria) {
      showModal('Por favor, selecione uma categoria.', 'error');
      return;
    }
    if (!status) {
      showModal('Por favor, selecione a privacidade da receita.', 'error');
      return;
    }
    if (!imagem) {
      showModal('Por favor, adicione uma imagem para a receita.', 'error');
      return;
    }

    try {
      // Se a imagem for válida, converta-a para base64
      if (EditselectedImage) {
        imageData = await RNFS.readFile(imagem, 'base64');
      }
      else {
        imageData = imagem
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
        showModal("Receita atualizada com sucesso!", 'success');
        setTimeout(() => {
          navigation.goBack();
        }, 2000); // Redireciona após 2 segundos
      } else {
        showModal("Não foi possível atualizar a receita.", 'error');
      }
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
      showModal("Ocorreu um erro ao atualizar a receita.", 'error');
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
                    ? { uri: `data:image/jpeg;base64,${imagem}`}  
                    : require('../../../res/img/imageIcon.png') 
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

      {/* Modal de Sucesso ou Erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, modalType === 'success' ? styles.modalSuccess : styles.modalError]}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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

  // Estilos da Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalSuccess: {
    backgroundColor: '#28a745',
  },
  modalError: {
    backgroundColor: '#dc3545',
  },
  modalMessage: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#28a745',
  },
});

export default EditRecipe;
