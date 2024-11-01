import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Header } from '@rneui/themed';
import styles from "./Style"; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { ActivityIndicator } from "react-native-paper";

const Sidebar = ({ isOpen, onClose }) => {
  const [translateX] = useState(new Animated.Value(300));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    onClose();
  };

  return (
    <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
      <View style={styles.sidebarContent}>
        <Text style={styles.sidebarTitle}>Login</Text>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('LoginScreen')}>
          <Text style={styles.sidebarItemText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen('RegisterScreen')}>
          <Text style={styles.sidebarItemText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const ReceitasUsuario = ({ route }) => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id_usuario = route.params.obj.id;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8085/api/readReceitaUser/${id_usuario}`);
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error(error);
    }
  }, [id_usuario]);

  useEffect(() => {
    fetchData().finally(() => setIsLoading(false));
  }, [fetchData]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleVizualizar = (id) => {
    navigation.navigate('VisualizaçãoReceitas', { id });
  };

  const deleteRecipe = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar esta receita?",
      [
        {
          text: "cancelar",
          onPress: () => console.log("Exclusão cancelada"),
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:8085/api/deleteReceita/${id}`);
              setData(currentData => currentData.filter(recipe => recipe.id !== id));
              setFilteredData(currentData => currentData.filter(recipe => recipe.id !== id));
              console.log("Receita deletada com sucesso!");
            } catch (err) {
              console.error("Erro ao deletar receita:", err);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handleVizualizar(item.id)}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.imagemReceita}` }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.nome}</Text>
            <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

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
              onPress={toggleSidebar}
              style={{ position: "absolute", left: 30, }}
            />
          </View>
        )}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.newsCard}>
            <ImageBackground
              source={require("../../../res/img/ReceitasUsuarios.png")}
              style={styles.newsImage}
            />
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator style={{ alignSelf: 'center', width: 150, height: '400' }} color="orange" />
        ) : (
          filteredData.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 400 }}>
              <Text style={{ fontSize: 18, color: '#333' }}>Cadastre sua receita</Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => String(item.id)}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
            />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReceitasUsuario;