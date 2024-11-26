import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import { Text, Header } from '@rneui/themed';
import { Button } from 'galio-framework';
import { launchImageLibrary } from 'react-native-image-picker';
import { SegmentedButtons } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import styles from './Styles';

export default function CadastrarReceitas({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Controle de visibilidade da modal
  const [modalMessage, setModalMessage] = useState(''); // Mensagem da modal
  const [modalType, setModalType] = useState('error'); // Tipo de modal ('error' por padrão)
  const userData = route.params.obj;
  const id_usuario = route.params.obj.id;

  const handleImageLibraryLaunch = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    try {
      const response = await launchImageLibrary(options);
      console.warn('Resposta da galeria:', response);

      if (response.didCancel) {
        setModalMessage('Você cancelou a seleção da imagem.');
        setModalType('error');
        setIsModalVisible(true); // Exibe a modal de erro
      } else if (response.error) {
        setModalMessage('Erro ao abrir a galeria. Tente novamente.');
        setModalType('error');
        setIsModalVisible(true); // Exibe a modal de erro
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        setImagem(image);
        console.warn('Imagem selecionada:', image);
      } else {
        setModalMessage('Nenhuma imagem selecionada. Por favor, selecione uma imagem.');
        setModalType('error');
        setIsModalVisible(true); // Exibe a modal de erro
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
      setModalMessage('Ocorreu um erro ao tentar selecionar a imagem. Tente novamente.');
      setModalType('error');
      setIsModalVisible(true); // Exibe a modal de erro
    }
  };

  const handleSubmit = async () => {
    if (!nome || !ingredientes || !modoPreparo || !value || !status) {
      setModalMessage('Por favor, preencha todos os campos obrigatórios.');
      setModalType('error');
      setIsModalVisible(true); // Exibe a modal de erro
      console.warn('Campos obrigatórios não preenchidos.');
      return;
    }

    if (!imagem) {
      setModalMessage('Por favor, selecione uma imagem para sua receita.');
      setModalType('error');
      setIsModalVisible(true); // Exibe a modal de erro
      console.warn('Tentativa de envio sem imagem.');
      return;
    }

    try {
      const imageData = await RNFS.readFile(imagem.uri, 'base64');
      const data = {
        id: '',
        nome,
        ingredientes,
        modo_preparo: modoPreparo,
        categoria: value,
        imagemBase64: imageData,
        privacidade: status,
        id_usuario: id_usuario,
      };

      console.warn('Dados da receita que serão enviados:', data);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const apiUrl = 'http://10.0.2.2:8085/api/cadastrarReceitas';

      const response = await axios.post(apiUrl, data, config);
      console.warn('Resposta da API:', response);

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
        navigation.push('TabScreen', { userData });
        setNome('');
        setIngredientes('');
        setModoPreparo('');
        setImagem(null);
        setValue('');
        setStatus('');
      } else {
        setModalMessage('Ocorreu um erro ao cadastrar a receita. Tente novamente.');
        setModalType('error');
        setIsModalVisible(true); // Exibe a modal de erro
      }
    } catch (error) {
      console.error('Erro ao cadastrar a receita:', error);
      setModalMessage('Ocorreu um erro ao cadastrar a receita. Tente novamente.');
      setModalType('error');
      setIsModalVisible(true); // Exibe a modal de erro
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const data = [
    { label: 'Bebidas', value: 'bebida' },
    { label: 'Doces', value: 'doce' },
    { label: 'Salgados', value: 'salgado' },
    { label: 'Saudaveis', value: 'saudavel' },
    { label: 'Sem Açucar', value: 'sem-acucar' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        backgroundColor="#FFA92C"
        barStyle="light-content"
        leftComponent={
          <View style={styles.headerComponentContainer}>
            <Image
              source={require('../../../res/img/logo2.png')}
              style={{ width: 90, height: 50 }}
            />
          </View>
        }
        rightComponent={
          <View style={styles.headerIconsContainer}>
            <Icon name="person" size={30} color="#fff" />
          </View>
        }
      />
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require('../../../res/img/adicionarReceitas.png')}
              style={styles.newsImage}
            />
          </View>
        </View>

        <View style={styles.cadastroContainer}>
          <Button
            onPress={handleImageLibraryLaunch}
            style={{ backgroundColor: '#fff', width: '100%', height: 200, alignSelf: 'center', alignItems: 'center', marginBottom: 20 }}
          >
            <Image
              style={{ width: 170, height: 150, resizeMode: 'contain' }}
              source={imagem ? { uri: imagem.uri } : require('../../../res/img/imageIcon.png')}
            />
          </Button>

          <Text style={styles.title}>Nome da sua receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            placeholderTextColor="#FFA92C"
            value={nome}
            onChangeText={text => setNome(text)}
          />

          <Text style={styles.title}>Ingredientes para a receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingredientes:"
            placeholderTextColor="#FFA92C"
            value={ingredientes}
            onChangeText={text => setIngredientes(text)}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.title}>Modo de preparo da receita:</Text>
          <TextInput
            style={styles.input}
            placeholder="Modo de Preparo:"
            placeholderTextColor="#FFA92C"
            value={modoPreparo}
            onChangeText={text => setModoPreparo(text)}
            multiline
            numberOfLines={4}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Categoria"
            searchPlaceholder="Procurar..."
            value={value}
            onChange={item => setValue(item.value)}
            renderItem={renderItem}
          />

          <SegmentedButtons
            value={status}
            onValueChange={value => setStatus(value)}
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
            <Button
              onlyText
              color="red"
              onPress={handleSubmit}
              style={styles.receitaButton}
            >
              <Text style={styles.buttonText}>CADASTRAR RECEITA</Text>
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Erro */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, modalType === 'error' ? styles.modalError : styles.modalSuccess]}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
